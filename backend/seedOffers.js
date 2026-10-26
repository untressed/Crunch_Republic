const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.join(__dirname, '.env') });

const User = require('./models/User');
const Offer = require('./models/Offer');

const seedOffers = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) throw new Error('MONGODB_URI not found');

    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB for offers seed...');

    const admin = await User.findOne({ email: 'admin@crunchrepublic.com' });
    if (!admin) {
      console.log('Admin user not found, skipping offer seed.');
      process.exit(0);
    }

    const defaultOffers = [
      {
        restaurant: admin._id,
        title: 'Welcome Cruncher: 20% OFF',
        code: 'CRUNCH20',
        description: 'Get 20% discount on your full order value. Valid across all menu items!',
        discountType: 'percentage',
        discountValue: 20,
        minOrderValue: 199,
        maxDiscount: 100,
        applicableFor: 'all',
        badgeText: 'MOST POPULAR',
        bannerColor: 'rose',
        isActive: true,
        usageCount: 14,
      },
      {
        restaurant: admin._id,
        title: 'Corporate Desk Special: Flat ₹50 OFF',
        code: 'OFFICE50',
        description: 'Exclusive perk for corporate partner employees. Fast delivery straight to your floor!',
        discountType: 'flat',
        discountValue: 50,
        minOrderValue: 249,
        maxDiscount: null,
        applicableFor: 'company_delivery',
        badgeText: 'OFFICE EXCLUSIVE',
        bannerColor: 'indigo',
        isActive: true,
        usageCount: 29,
      },
      {
        restaurant: admin._id,
        title: 'Happy Hours Feast: 15% OFF',
        code: 'HAPPY15',
        description: 'Special afternoon and evening treat for cafe dine-in tables.',
        discountType: 'percentage',
        discountValue: 15,
        minOrderValue: 149,
        maxDiscount: 75,
        applicableFor: 'dine_in',
        badgeText: 'DINE-IN SPECIAL',
        bannerColor: 'amber',
        isActive: true,
        usageCount: 8,
      },
    ];

    for (const off of defaultOffers) {
      await Offer.findOneAndUpdate(
        { restaurant: admin._id, code: off.code },
        off,
        { upsert: true, new: true }
      );
    }

    console.log('Successfully seeded default Crunch Republic offers!');
    process.exit(0);
  } catch (err) {
    console.error('Error seeding offers:', err);
    process.exit(1);
  }
};

seedOffers();
