const Offer = require('../models/Offer');
const Restaurant = require('../models/Restaurant');
const Order = require('../models/Order');

// @desc    Get all offers for the logged-in restaurant owner
// @route   GET /api/offers
// @access  Private (Owner)
const getOffers = async (req, res) => {
  try {
    const offers = await Offer.find({ restaurant: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: offers.length, data: offers });
  } catch (error) {
    console.error('Error fetching offers:', error);
    res.status(500).json({ success: false, message: 'Server error fetching offers' });
  }
};

// @desc    Get active offers for customers (Public)
// @route   GET /api/offers/active
// @access  Public
const getActiveOffers = async (req, res) => {
  try {
    const { orderType } = req.query;
    const now = new Date();

    const query = {
      isActive: true,
      $or: [
        { endDate: null },
        { endDate: { $gte: now } },
      ],
    };

    if (orderType) {
      query.$and = [
        {
          $or: [
            { applicableFor: 'all' },
            { applicableFor: orderType },
          ],
        },
      ];
    }

    const offers = await Offer.find(query).sort({ discountValue: -1, createdAt: -1 });
    res.status(200).json({ success: true, count: offers.length, data: offers });
  } catch (error) {
    console.error('Error fetching active offers:', error);
    res.status(500).json({ success: false, message: 'Server error fetching active offers' });
  }
};

// @desc    Create a new offer / promo code
// @route   POST /api/offers
// @access  Private (Owner)
const createOffer = async (req, res) => {
  try {
    const {
      title,
      code,
      description,
      discountType = 'percentage',
      discountValue,
      minOrderValue = 0,
      maxDiscount = null,
      applicableFor = 'all',
      targetAudience = 'all',
      usageLimitPerUser = 1,
      badgeText = 'SPECIAL OFFER',
      bannerColor = 'rose',
      startDate,
      endDate,
      isActive = true,
    } = req.body;

    if (!title || !code || !discountValue) {
      return res.status(400).json({ success: false, message: 'Please provide title, coupon code, and discount value' });
    }

    const formattedCode = code.trim().toUpperCase();

    // Check if code already exists for this restaurant
    const existing = await Offer.findOne({ restaurant: req.user.id, code: formattedCode });
    if (existing) {
      return res.status(400).json({ success: false, message: `Coupon code "${formattedCode}" already exists.` });
    }

    const offer = await Offer.create({
      restaurant: req.user.id,
      title: title.trim(),
      code: formattedCode,
      description: description ? description.trim() : '',
      discountType,
      discountValue: Number(discountValue),
      minOrderValue: Number(minOrderValue) || 0,
      maxDiscount: maxDiscount ? Number(maxDiscount) : null,
      applicableFor,
      targetAudience,
      usageLimitPerUser: Number(usageLimitPerUser) || 0,
      badgeText: badgeText ? badgeText.trim() : 'SPECIAL OFFER',
      bannerColor,
      startDate: startDate ? new Date(startDate) : new Date(),
      endDate: endDate ? new Date(endDate) : null,
      isActive: Boolean(isActive),
    });

    res.status(201).json({ success: true, message: 'Offer created successfully', data: offer });
  } catch (error) {
    console.error('Error creating offer:', error);
    res.status(500).json({ success: false, message: error.message || 'Server error creating offer' });
  }
};


// @desc    Update an offer
// @route   PUT /api/offers/:id
// @access  Private (Owner)
const updateOffer = async (req, res) => {
  try {
    let offer = await Offer.findById(req.params.id);
    if (!offer) {
      return res.status(404).json({ success: false, message: 'Offer not found' });
    }

    if (offer.restaurant.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Not authorized to update this offer' });
    }

    const updates = { ...req.body };
    if (updates.code) {
      updates.code = updates.code.trim().toUpperCase();
      // Check for code conflict with other offers
      const conflict = await Offer.findOne({
        restaurant: req.user.id,
        code: updates.code,
        _id: { $ne: req.params.id },
      });
      if (conflict) {
        return res.status(400).json({ success: false, message: `Coupon code "${updates.code}" is already in use.` });
      }
    }

    if (updates.discountValue) updates.discountValue = Number(updates.discountValue);
    if (updates.minOrderValue !== undefined) updates.minOrderValue = Number(updates.minOrderValue);
    if (updates.maxDiscount !== undefined) updates.maxDiscount = updates.maxDiscount ? Number(updates.maxDiscount) : null;
    if (updates.usageLimitPerUser !== undefined) updates.usageLimitPerUser = Number(updates.usageLimitPerUser);

    offer = await Offer.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true });
    res.status(200).json({ success: true, message: 'Offer updated successfully', data: offer });
  } catch (error) {
    console.error('Error updating offer:', error);
    res.status(500).json({ success: false, message: error.message || 'Server error updating offer' });
  }
};

// @desc    Toggle offer active status
// @route   PATCH /api/offers/:id/toggle
// @access  Private (Owner)
const toggleOfferStatus = async (req, res) => {
  try {
    const offer = await Offer.findById(req.params.id);
    if (!offer) {
      return res.status(404).json({ success: false, message: 'Offer not found' });
    }

    if (offer.restaurant.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    offer.isActive = !offer.isActive;
    await offer.save();

    res.status(200).json({
      success: true,
      message: `Offer ${offer.isActive ? 'activated' : 'paused'}`,
      data: offer,
    });
  } catch (error) {
    console.error('Error toggling offer:', error);
    res.status(500).json({ success: false, message: 'Server error toggling offer status' });
  }
};

// @desc    Delete an offer
// @route   DELETE /api/offers/:id
// @access  Private (Owner)
const deleteOffer = async (req, res) => {
  try {
    const offer = await Offer.findById(req.params.id);
    if (!offer) {
      return res.status(404).json({ success: false, message: 'Offer not found' });
    }

    if (offer.restaurant.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Not authorized to delete this offer' });
    }

    await Offer.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: 'Offer deleted successfully' });
  } catch (error) {
    console.error('Error deleting offer:', error);
    res.status(500).json({ success: false, message: 'Server error deleting offer' });
  }
};

// @desc    Validate a coupon code against an active cart & customer mobile eligibility
// @route   POST /api/offers/validate
// @access  Public
const validateCoupon = async (req, res) => {
  try {
    const { code, subtotal = 0, orderType = 'dine_in', customerMobile = '' } = req.body;

    if (!code) {
      return res.status(400).json({ success: false, valid: false, message: 'Please enter a coupon code' });
    }

    const formattedCode = code.trim().toUpperCase();
    const offer = await Offer.findOne({ code: formattedCode });

    if (!offer) {
      return res.status(404).json({
        success: false,
        valid: false,
        message: `Coupon "${formattedCode}" is invalid or does not exist.`,
      });
    }

    if (!offer.isActive) {
      return res.status(400).json({
        success: false,
        valid: false,
        message: `Coupon "${formattedCode}" is currently inactive or paused.`,
      });
    }

    // Check expiration date
    const now = new Date();
    if (offer.endDate && new Date(offer.endDate) < now) {
      return res.status(400).json({
        success: false,
        valid: false,
        message: `Coupon "${formattedCode}" has expired.`,
      });
    }

    // Check channel applicability
    if (offer.applicableFor !== 'all' && offer.applicableFor !== orderType) {
      const channelLabel = offer.applicableFor === 'dine_in' ? 'Dine-In Tables only' : 'Corporate Office Delivery only';
      return res.status(400).json({
        success: false,
        valid: false,
        message: `Coupon "${formattedCode}" is valid for ${channelLabel}.`,
      });
    }

    // Clean customer mobile (last 10 digits to match any +91 prefixes)
    const mobileDigits = customerMobile ? String(customerMobile).trim().replace(/\D/g, '').slice(-10) : '';

    // Check Customer Eligibility (First Order vs Regular Customers)
    if (offer.targetAudience && offer.targetAudience !== 'all') {
      if (!mobileDigits) {
        return res.status(400).json({
          success: false,
          valid: false,
          requiresMobile: true,
          message: offer.targetAudience === 'first_order'
            ? 'Please enter your mobile number in the bucket below to verify your 1st-Time Customer discount.'
            : 'Please enter your mobile number in the bucket below to claim this Loyalty discount.',
        });
      }

      // Check how many previous orders this mobile number has placed
      const pastOrdersCount = await Order.countDocuments({
        customerMobile: { $regex: mobileDigits + '$' },
      });

      if (offer.targetAudience === 'first_order' && pastOrdersCount > 0) {
        return res.status(400).json({
          success: false,
          valid: false,
          message: `Coupon "${formattedCode}" is exclusively for new customers placing their first order. (Previous orders detected for this mobile number)`,
        });
      }

      if (offer.targetAudience === 'repeat_customers' && pastOrdersCount === 0) {
        return res.status(400).json({
          success: false,
          valid: false,
          message: `Coupon "${formattedCode}" is an exclusive reward for returning customers. Place your first order with Crunch Republic to unlock it!`,
        });
      }
    }

    // Check Redemption Limit Per Phone Number (e.g. 1 time per mobile number)
    if (offer.usageLimitPerUser && offer.usageLimitPerUser > 0 && mobileDigits) {
      const timesUsed = await Order.countDocuments({
        customerMobile: { $regex: mobileDigits + '$' },
        couponCode: formattedCode,
      });

      if (timesUsed >= offer.usageLimitPerUser) {
        return res.status(400).json({
          success: false,
          valid: false,
          message: `You have already claimed coupon "${formattedCode}" the maximum allowed number of times (${offer.usageLimitPerUser}x) on this mobile number.`,
        });
      }
    }

    // Check minimum order value
    const orderSubtotal = Number(subtotal) || 0;
    if (offer.minOrderValue > 0 && orderSubtotal < offer.minOrderValue) {
      return res.status(400).json({
        success: false,
        valid: false,
        message: `Coupon requires a minimum order value of ₹${offer.minOrderValue}. Add items worth ₹${(offer.minOrderValue - orderSubtotal).toFixed(2)} more!`,
      });
    }

    // Calculate discount amount
    let discount = 0;
    if (offer.discountType === 'percentage') {
      discount = (orderSubtotal * offer.discountValue) / 100;
      if (offer.maxDiscount && offer.maxDiscount > 0) {
        discount = Math.min(discount, offer.maxDiscount);
      }
    } else {
      discount = Math.min(orderSubtotal, offer.discountValue);
    }

    discount = Math.round(discount * 100) / 100;
    const finalTotal = Math.max(0, orderSubtotal - discount);

    res.status(200).json({
      success: true,
      valid: true,
      message: `Coupon "${formattedCode}" applied successfully! You saved ₹${discount.toFixed(2)}.`,
      data: {
        code: offer.code,
        title: offer.title,
        discountType: offer.discountType,
        discountValue: offer.discountValue,
        discount,
        finalTotal,
        offerId: offer._id,
        targetAudience: offer.targetAudience,
      },
    });
  } catch (error) {
    console.error('Error validating coupon:', error);
    res.status(500).json({ success: false, valid: false, message: 'Server error validating coupon' });
  }
};

module.exports = {
  getOffers,
  getActiveOffers,
  createOffer,
  updateOffer,
  toggleOfferStatus,
  deleteOffer,
  validateCoupon,
};
