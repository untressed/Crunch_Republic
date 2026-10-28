const mongoose = require('mongoose');
require('dotenv').config({ path: __dirname + '/.env' });
const Restaurant = require('./models/Restaurant');

/**
 * Standardized Master List of Corporate Delivery Partners
 * Checks existing entries, standardizes/replaces them, and inserts new ones.
 */
const standardizedCompanies = [
  {
    name: 'Amazon',
    address: 'Corporate Delivery Desk / Floor Pantry',
    contactPerson: 'Help Desk / Reception',
    phone: '+91 98000 00001',
  },
  {
    name: 'Artech Infosystems - Noida, India',
    address: 'Corporate Delivery Desk / Floor Pantry',
    contactPerson: 'Help Desk / Reception',
    phone: '+91 98000 00002',
  },
  {
    name: 'Innovaccer',
    address: 'Corporate Delivery Desk / Floor Pantry',
    contactPerson: 'Help Desk / Reception',
    phone: '+91 98000 00003',
  },
  {
    name: 'Trangile Services Pvt Ltd',
    address: 'Corporate Delivery Desk / Floor Pantry',
    contactPerson: 'Help Desk / Reception',
    phone: '+91 98000 00004',
  },
  {
    name: '3Pillar Global',
    address: 'Corporate Delivery Desk / Floor Pantry',
    contactPerson: 'Help Desk / Reception',
    phone: '+91 98000 00005',
  },
  {
    name: 'ION Trading India',
    address: 'Corporate Delivery Desk / Floor Pantry',
    contactPerson: 'Help Desk / Reception',
    phone: '+91 98000 00006',
  },
  {
    name: 'LTM',
    address: 'Corporate Delivery Desk / Floor Pantry',
    contactPerson: 'Help Desk / Reception',
    phone: '+91 98000 00007',
  },
  {
    name: 'Pine Labs',
    address: 'Corporate Delivery Desk / Floor Pantry',
    contactPerson: 'Help Desk / Reception',
    phone: '+91 98000 00008',
  },
  {
    name: 'Xceedance',
    address: 'Corporate Delivery Desk / Floor Pantry',
    contactPerson: 'Help Desk / Reception',
    phone: '+91 98000 00009',
  },
  {
    name: 'Savista Global',
    address: 'Corporate Delivery Desk / Floor Pantry',
    contactPerson: 'Help Desk / Reception',
    phone: '+91 98000 00010',
  },
  {
    name: 'Barclays',
    address: 'Corporate Delivery Desk / Floor Pantry',
    contactPerson: 'Help Desk / Reception',
    phone: '+91 98000 00011',
  },
  {
    name: 'UKG',
    address: 'Corporate Delivery Desk / Floor Pantry',
    contactPerson: 'Help Desk / Reception',
    phone: '+91 98000 00012',
  },
];

// Mapping to recognize existing entries and upgrade/replace them cleanly
const replacementAliases = {
  'artck': 'Artech Infosystems - Noida, India',
  'artech': 'Artech Infosystems - Noida, India',
  'artech infosystems': 'Artech Infosystems - Noida, India',
  'ion': 'ION Trading India',
  'ion trading': 'ION Trading India',
  'pinelabs': 'Pine Labs',
  'pine labs': 'Pine Labs',
  'savista': 'Savista Global',
  'savista global': 'Savista Global',
  'xceeedance': 'Xceedance',
  'xceedance': 'Xceedance',
  '3 pillar global': '3Pillar Global',
  '3pillar global': '3Pillar Global',
  'trangile': 'Trangile Services Pvt Ltd',
  'trangile services': 'Trangile Services Pvt Ltd',
};

const updateCompanies = async (isInline = false) => {
  try {
    if (!isInline) {
      await mongoose.connect(process.env.MONGODB_URI);
      console.log('MongoDB Connected for Company Update');
    }

    const restaurants = await Restaurant.find({});
    console.log(`Found ${restaurants.length} restaurant(s) to synchronize companies`);

    for (const r of restaurants) {
      let existingCompanies = r.companies || [];

      // 1. Upgrade / Replace any older alias names
      for (const comp of existingCompanies) {
        const cleanName = comp.name.trim().toLowerCase();
        if (replacementAliases[cleanName]) {
          console.log(`Upgrading existing company "${comp.name}" -> "${replacementAliases[cleanName]}"`);
          comp.name = replacementAliases[cleanName];
        }
      }

      // 2. Add any missing companies from the standardized master list
      for (const targetComp of standardizedCompanies) {
        const exists = existingCompanies.some(
          (c) => c.name.trim().toLowerCase() === targetComp.name.trim().toLowerCase()
        );
        if (!exists) {
          console.log(`Adding new corporate partner: "${targetComp.name}"`);
          existingCompanies.push(targetComp);
        }
      }

      // Deduplicate by normalized name
      const uniqueMap = new Map();
      for (const c of existingCompanies) {
        const key = c.name.trim().toLowerCase();
        if (!uniqueMap.has(key)) {
          uniqueMap.set(key, c);
        }
      }
      r.companies = Array.from(uniqueMap.values());

      await r.save();
      console.log(`Synchronized ${r.name}: Total ${r.companies.length} corporate partners active.`);
    }

    console.log('✅ All corporate partners successfully updated and verified');
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

module.exports = { updateCompanies, standardizedCompanies };
