const https = require('https');
require('dotenv').config({ path: __dirname + '/.env' });
const mongoose = require('mongoose');
const Restaurant = require('./models/Restaurant');

const secretKey = process.env.CASHFREE_SECRET_KEY || '';
const appId = process.env.CASHFREE_APP_ID || '';
const isProdKey = secretKey.includes('prod');
const apiEnv = isProdKey ? 'production' : (process.env.CASHFREE_ENV || 'production');
const host = apiEnv === 'production' ? 'api.cashfree.com' : 'sandbox.cashfree.com';

console.log('--- Registering Easy Split Vendor (Bank Account) on Cashfree ---');
console.log('Environment:', apiEnv);
console.log('Host:', host);

const vendorPayload = {
  vendor_id: 'DD',
  status: 'ACTIVE',
  name: 'Deepankar Dayal',
  email: 'deepankar1562@gmail.com',
  phone: '8081158394',
  verify_account: false,
  bank: {
    account_number: '7946698636',
    account_holder: 'Deepankar Dayal',
    ifsc: 'KKBK0005315'
  },
  kyc_details: {
    account_type: 'INDIVIDUAL',
    business_type: 'Individual'
  }
};

const postData = JSON.stringify(vendorPayload);

const options = {
  hostname: host,
  port: 443,
  path: '/pg/easy-split/vendors',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'x-api-version': '2023-08-01',
    'x-client-id': appId,
    'x-client-secret': secretKey,
    'Content-Length': Buffer.byteLength(postData)
  }
};

const req = https.request(options, (res) => {
  let responseData = '';
  res.on('data', (chunk) => {
    responseData += chunk;
  });

  res.on('end', async () => {
    console.log(`Cashfree Status Code: ${res.statusCode}`);
    try {
      const parsed = JSON.parse(responseData);
      console.log('Cashfree Response:', JSON.stringify(parsed, null, 2));

      if (res.statusCode === 200 || res.statusCode === 201 || parsed.vendor_id || parsed.status === 'ACTIVE' || parsed.message?.includes('already exists')) {
        console.log('SUCCESS: Vendor registered on Cashfree!');

        await mongoose.connect(process.env.MONGODB_URI);
        const r = await Restaurant.findOne({});
        if (r) {
          r.cashfreeAppId = appId;
          r.cashfreeSecretKey = secretKey;
          r.cashfreeEnvironment = apiEnv;
          r.developerSplitVendorId = 'DD';
          r.developerSplitPercentage = 5;
          r.cashfreeEnabled = true;
          await r.save();
          console.log(`Updated Restaurant in MongoDB Atlas with Vendor ID: ${r.developerSplitVendorId} (5%)`);
        }
        await mongoose.disconnect();
      }
    } catch (e) {
      console.log('Raw Response:', responseData);
    }
  });
});

req.on('error', (e) => {
  console.error('Request error:', e.message);
});

req.write(postData);
req.end();

