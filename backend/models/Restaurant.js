const mongoose = require('mongoose');

const RestaurantSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: [true, 'Please add a restaurant name'],
      trim: true,
    },
    logo: {
      type: String,
      default: '', // Cloudinary secure URL or base64 data string
    },
    address: {
      type: String,
      required: [true, 'Please add an address'],
    },
    contactNumber: {
      type: String,
      required: [true, 'Please add a contact number'],
    },
    openingHours: {
      type: String,
      default: '09:00 AM - 10:00 PM',
    },
    tables: {
      type: [String],
      default: ['Table 1', 'Table 2', 'Table 3', 'Table 4', 'Table 5'],
    },
    companies: [
      {
        name: { type: String, required: true },
        address: { type: String, default: '' },
        contactPerson: { type: String, default: '' },
        phone: { type: String, default: '' },
        createdAt: { type: Date, default: Date.now },
      },
    ],
    upiId: {
      type: String,
      default: 'merchant@okaxis',
    },
    // Cashfree Payment Gateway Settings
    cashfreeAppId: {
      type: String,
      default: '',
    },
    cashfreeSecretKey: {
      type: String,
      default: '',
    },
    cashfreeEnvironment: {
      type: String,
      enum: ['sandbox', 'production'],
      default: 'sandbox',
    },
    cashfreeEnabled: {
      type: Boolean,
      default: true,
    },
    // Developer / Platform Fee Split Settings (Easy Split)
    developerSplitEnabled: {
      type: Boolean,
      default: false,
    },
    developerSplitVendorId: {
      type: String,
      default: '',
    },
    developerSplitPercentage: {
      type: Number,
      default: 5, // e.g. 5% developer cut
      min: 0,
      max: 100,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Restaurant', RestaurantSchema);
