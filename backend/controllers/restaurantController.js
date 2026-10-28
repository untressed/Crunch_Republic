const mongoose = require('mongoose');
const Restaurant = require('../models/Restaurant');
const { uploadImage } = require('../config/cloudinary');
const QRCode = require('qrcode');
const jwt = require('jsonwebtoken');

// @desc    Get restaurant profile of current logged in user
// @route   GET /api/restaurant/profile
// @access  Private
const getRestaurantProfile = async (req, res) => {
  try {
    let restaurant = await Restaurant.findOne({ owner: req.user._id });
    if (!restaurant) {
      // Auto create Crunch Republic profile if not found
      restaurant = await Restaurant.create({
        owner: req.user._id,
        name: 'Crunch Republic',
        address: 'Main Cafe Street, Near City Center, Crunch Republic HQ',
        contactNumber: '+91 98765 43210',
        openingHours: '10:00 AM - 11:00 PM',
        upiId: 'crunchrepublic@okaxis',
        tables: [
          'Table 1',
          'Table 2',
          'Table 3',
          'Table 4',
          'Table 5',
          'Table 6',
          'Table 7',
          'Table 8',
          'Takeaway / Counter',
        ],
      });
    }
    res.status(200).json({ success: true, data: restaurant });
  } catch (error) {
    console.error('Fetch restaurant profile error:', error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get restaurant profile by ID or default (Public for customers scanning QR)
// @route   GET /api/restaurant/:id/public
// @access  Public
const getPublicRestaurantProfile = async (req, res) => {
  try {
    let restaurant;
    const { id } = req.params;

    if (!id || id === 'default' || !mongoose.Types.ObjectId.isValid(id)) {
      restaurant = await Restaurant.findOne().sort({ createdAt: -1 });
    } else {
      restaurant = await Restaurant.findById(id);
      if (!restaurant) {
        restaurant = await Restaurant.findOne().sort({ createdAt: -1 });
      }
    }

    if (!restaurant) {
      return res.status(404).json({ success: false, message: 'Crunch Republic profile not found' });
    }
    res.status(200).json({ success: true, data: restaurant });
  } catch (error) {
    console.error('Fetch public restaurant profile error:', error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update restaurant profile details
// @route   PUT /api/restaurant/profile
// @access  Private
const updateRestaurantProfile = async (req, res) => {
  try {
    const { name, address, contactNumber, openingHours, logo, tables } = req.body;
    let restaurant = await Restaurant.findOne({ owner: req.user._id });

    if (!restaurant) {
      return res.status(404).json({ success: false, message: 'Restaurant profile not found' });
    }

    // Process image logo if provided (base64 string)
    let logoUrl = restaurant.logo;
    if (logo && logo !== restaurant.logo) {
      // Upload using helper which handles Cloudinary / Base64 fallback gracefully
      logoUrl = await uploadImage(logo);
    }

    // Prepare updates
    const updates = {
      name: name !== undefined ? name : restaurant.name,
      address: address !== undefined ? address : restaurant.address,
      contactNumber: contactNumber !== undefined ? contactNumber : restaurant.contactNumber,
      openingHours: openingHours !== undefined ? openingHours : restaurant.openingHours,
      logo: logoUrl,
      upiId: req.body.upiId !== undefined ? req.body.upiId : restaurant.upiId,
      cashfreeAppId: req.body.cashfreeAppId !== undefined ? req.body.cashfreeAppId : restaurant.cashfreeAppId,
      cashfreeSecretKey: req.body.cashfreeSecretKey !== undefined ? req.body.cashfreeSecretKey : restaurant.cashfreeSecretKey,
      cashfreeEnvironment: req.body.cashfreeEnvironment !== undefined ? req.body.cashfreeEnvironment : restaurant.cashfreeEnvironment,
      cashfreeEnabled: req.body.cashfreeEnabled !== undefined ? req.body.cashfreeEnabled : restaurant.cashfreeEnabled,
      developerSplitEnabled: req.body.developerSplitEnabled !== undefined ? req.body.developerSplitEnabled : restaurant.developerSplitEnabled,
      developerSplitVendorId: req.body.developerSplitVendorId !== undefined ? req.body.developerSplitVendorId : restaurant.developerSplitVendorId,
      developerSplitPercentage: req.body.developerSplitPercentage !== undefined ? Number(req.body.developerSplitPercentage) : restaurant.developerSplitPercentage,
    };

    // If tables are provided, update them
    if (tables && Array.isArray(tables)) {
      updates.tables = tables;
    }

    restaurant = await Restaurant.findByIdAndUpdate(
      restaurant._id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    res.status(200).json({ success: true, data: restaurant });
  } catch (error) {
    console.error('Update restaurant profile error:', error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Generate a QR Code for a table or company
// @route   GET /api/restaurant/qr
// @access  Private
const generateTableQR = async (req, res) => {
  try {
    const { tableNumber, companyName, orderType = 'dine_in' } = req.query;

    if (orderType === 'company_delivery' && !companyName) {
      return res.status(400).json({ success: false, message: 'Please provide a company name' });
    }
    if (orderType === 'dine_in' && !tableNumber) {
      return res.status(400).json({ success: false, message: 'Please provide a table number' });
    }

    const restaurant = await Restaurant.findOne({ owner: req.user._id });
    if (!restaurant) {
      return res.status(404).json({ success: false, message: 'Restaurant profile not found' });
    }

    // Generate a tamper-proof cryptographic token
    const tokenPayload = {
      restaurantId: restaurant._id.toString(),
      orderType,
    };
    if (orderType === 'company_delivery') {
      tokenPayload.companyName = companyName;
    } else {
      tokenPayload.tableNumber = tableNumber;
    }

    const qrToken = jwt.sign(
      tokenPayload,
      process.env.JWT_SECRET || 'supersecretjwtkeyforrestaurantqrmenusaas',
      { expiresIn: '365d' }
    );

    // Target URL for scanning - Customer QR codes must always target menu subdomain in production
    let menuOrigin = 'https://menu.thecrunchrepublic.com';
    const reqOrigin = req.headers.origin || (req.headers.referer ? new URL(req.headers.referer).origin : '');
    if (reqOrigin && (reqOrigin.includes('localhost') || reqOrigin.includes('127.0.0.1'))) {
      menuOrigin = reqOrigin;
    }

    let clientUrl = '';
    if (orderType === 'company_delivery') {
      clientUrl = `${menuOrigin}/?type=company_delivery&company=${encodeURIComponent(companyName)}&token=${qrToken}`;
    } else {
      clientUrl = `${menuOrigin}/?type=dine_in&table=${encodeURIComponent(tableNumber)}&tableToken=${qrToken}`;
    }

    // Generate QR Code as a Data URL with High Error Correction (allows centered logo)
    const qrDataUrl = await QRCode.toDataURL(clientUrl, {
      errorCorrectionLevel: 'H',
      margin: 1,
      width: 380,
      color: {
        dark: '#1e293b', // slate-800
        light: '#ffffff',
      },
    });

    res.status(200).json({
      success: true,
      data: {
        orderType,
        tableNumber: tableNumber || '',
        companyName: companyName || '',
        token: qrToken,
        targetUrl: clientUrl,
        qrCodeUrl: qrDataUrl,
      },
    });
  } catch (error) {
    console.error('QR code generation error:', error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Verify if a table/company token is authentic
// @route   GET /api/restaurant/verify-table
// @access  Public
const verifyTableAccess = async (req, res) => {
  try {
    const { table, company, token } = req.query;

    if (!token || (!table && !company)) {
      return res.status(403).json({
        success: false,
        isTampered: true,
        message: 'Access is strictly restricted. Please scan an authentic QR code from your table or company pantry.',
      });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'supersecretjwtkeyforrestaurantqrmenusaas');
      
      if (decoded.orderType === 'company_delivery') {
        if (decoded.companyName !== company) {
          return res.status(403).json({
            success: false,
            isTampered: true,
            message: `Tampering Detected: This QR code belongs to "${decoded.companyName}". You cannot switch companies by editing the URL!`,
          });
        }
        return res.status(200).json({
          success: true,
          orderType: 'company_delivery',
          companyName: decoded.companyName,
          verified: true,
        });
      } else {
        if (decoded.tableNumber !== table) {
          return res.status(403).json({
            success: false,
            isTampered: true,
            message: `Tampering Detected: This QR code belongs to "${decoded.tableNumber}". You cannot switch tables by editing the URL!`,
          });
        }
        return res.status(200).json({
          success: true,
          orderType: 'dine_in',
          table: decoded.tableNumber,
          verified: true,
        });
      }
    } catch (err) {
      return res.status(403).json({
        success: false,
        isTampered: true,
        message: 'Security Verification Failed: The QR signature is invalid or modified. Please scan the official QR code again.',
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Add a registered company for corporate delivery
// @route   POST /api/restaurant/companies
// @access  Private
const addCompany = async (req, res) => {
  try {
    const { name, address, contactPerson, phone } = req.body;
    if (!name || name.trim() === '') {
      return res.status(400).json({ success: false, message: 'Company name is required' });
    }

    const restaurant = await Restaurant.findOne({ owner: req.user._id });
    if (!restaurant) {
      return res.status(404).json({ success: false, message: 'Restaurant profile not found' });
    }

    // Check duplicate
    const exists = restaurant.companies?.some(c => c.name.toLowerCase() === name.trim().toLowerCase());
    if (exists) {
      return res.status(400).json({ success: false, message: 'Company with this name already exists' });
    }

    const newCompany = {
      name: name.trim(),
      address: address || '',
      contactPerson: contactPerson || '',
      phone: phone || '',
    };

    restaurant.companies.push(newCompany);
    await restaurant.save();

    res.status(201).json({ success: true, data: restaurant.companies });
  } catch (error) {
    console.error('Add company error:', error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete a registered company
// @route   DELETE /api/restaurant/companies/:id
// @access  Private
const deleteCompany = async (req, res) => {
  try {
    const { id } = req.params;
    const restaurant = await Restaurant.findOne({ owner: req.user._id });
    if (!restaurant) {
      return res.status(404).json({ success: false, message: 'Restaurant profile not found' });
    }

    restaurant.companies = restaurant.companies.filter(c => c._id?.toString() !== id && c.name !== id);
    await restaurant.save();

    res.status(200).json({ success: true, data: restaurant.companies });
  } catch (error) {
    console.error('Delete company error:', error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update a registered company
// @route   PUT /api/restaurant/companies/:id
// @access  Private
const updateCompany = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, address, contactPerson, phone } = req.body;
    if (!name || name.trim() === '') {
      return res.status(400).json({ success: false, message: 'Company name is required' });
    }

    const restaurant = await Restaurant.findOne({ owner: req.user._id });
    if (!restaurant) {
      return res.status(404).json({ success: false, message: 'Restaurant profile not found' });
    }

    const companyIndex = restaurant.companies.findIndex(
      c => c._id?.toString() === id || c.name === id
    );

    if (companyIndex === -1) {
      return res.status(404).json({ success: false, message: 'Company not found' });
    }

    // Check duplicate name on other companies
    const duplicate = restaurant.companies.some(
      (c, idx) => idx !== companyIndex && c.name.toLowerCase() === name.trim().toLowerCase()
    );
    if (duplicate) {
      return res.status(400).json({ success: false, message: 'Another company with this name already exists' });
    }

    restaurant.companies[companyIndex].name = name.trim();
    restaurant.companies[companyIndex].address = address || '';
    restaurant.companies[companyIndex].contactPerson = contactPerson || '';
    restaurant.companies[companyIndex].phone = phone || '';

    await restaurant.save();
    res.status(200).json({ success: true, data: restaurant.companies });
  } catch (error) {
    console.error('Update company error:', error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all registered companies
// @route   GET /api/restaurant/companies
// @access  Private
const getCompanies = async (req, res) => {
  try {
    const restaurant = await Restaurant.findOne({ owner: req.user._id });
    if (!restaurant) {
      return res.status(404).json({ success: false, message: 'Restaurant profile not found' });
    }

    if (!restaurant.companies || restaurant.companies.length === 0) {
      restaurant.companies = [
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
      await restaurant.save();
    }

    res.status(200).json({ success: true, data: restaurant.companies || [] });
  } catch (error) {
    console.error('Get companies error:', error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getRestaurantProfile,
  getPublicRestaurantProfile,
  updateRestaurantProfile,
  generateTableQR,
  verifyTableAccess,
  addCompany,
  updateCompany,
  deleteCompany,
  getCompanies,
};
