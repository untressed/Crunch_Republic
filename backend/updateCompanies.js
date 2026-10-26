const mongoose = require('mongoose');
require('dotenv').config({ path: __dirname + '/.env' });
const Restaurant = require('./models/Restaurant');

const newCompanies = [
  {
    name: 'Amazon',
    address: 'Corporate Delivery Desk / Floor Pantry',
    contactPerson: 'Help Desk / Reception',
    phone: '+91 98000 00001',
  },
  {
    name: 'Savista',
    address: 'Corporate Delivery Desk / Floor Pantry',
    contactPerson: 'Help Desk / Reception',
    phone: '+91 98000 00002',
  },
  {
    name: 'LTM',
    address: 'Corporate Delivery Desk / Floor Pantry',
    contactPerson: 'Help Desk / Reception',
    phone: '+91 98000 00003',
  },
  {
    name: 'Artck',
    address: 'Corporate Delivery Desk / Floor Pantry',
    contactPerson: 'Help Desk / Reception',
    phone: '+91 98000 00004',
  },
  {
    name: 'ION',
    address: 'Corporate Delivery Desk / Floor Pantry',
    contactPerson: 'Help Desk / Reception',
    phone: '+91 98000 00005',
  },
  {
    name: 'Pinelabs',
    address: 'Corporate Delivery Desk / Floor Pantry',
    contactPerson: 'Help Desk / Reception',
    phone: '+91 98000 00006',
  },
  {
    name: 'Barclays',
    address: 'Corporate Delivery Desk / Floor Pantry',
    contactPerson: 'Help Desk / Reception',
    phone: '+91 98000 00007',
  },
  {
    name: 'UKG',
    address: 'Corporate Delivery Desk / Floor Pantry',
    contactPerson: 'Help Desk / Reception',
    phone: '+91 98000 00008',
  },
];

const updateCompanies = async (isInline = false) => {
  try {
    if (!isInline) {
      await mongoose.connect(process.env.MONGODB_URI);
      console.log('MongoDB Connected for Company Update');
    }

    const restaurants = await Restaurant.find({});
    console.log(`Found ${restaurants.length} restaurant(s) to update companies`);

    for (const r of restaurants) {
      if (!r.companies) {
        r.companies = [];
      }

      let addedCount = 0;
      for (const comp of newCompanies) {
        const exists = r.companies.some(
          (c) => c.name.trim().toLowerCase() === comp.name.trim().toLowerCase()
        );
        if (!exists) {
          r.companies.push(comp);
          addedCount++;
        }
      }

      await r.save();
      console.log(`Updated restaurant ${r.name}: Added ${addedCount} new companies. Total: ${r.companies.length}`);
    }

    console.log('✅ Company update completed successfully');
  } catch (err) {
    console.error('Error updating companies:', err);
  } finally {
    if (!isInline) {
      await mongoose.disconnect();
    }
  }
};

if (require.main === module) {
  updateCompanies();
}

module.exports = { updateCompanies, newCompanies };
