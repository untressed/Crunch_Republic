const express = require('express');
const router = express.Router();
const {
  getOffers,
  getActiveOffers,
  createOffer,
  updateOffer,
  toggleOfferStatus,
  deleteOffer,
  validateCoupon,
} = require('../controllers/offerController');
const { protect } = require('../middleware/authMiddleware');

// Public routes for customers
router.get('/active', getActiveOffers);
router.post('/validate', validateCoupon);

// Owner Protected routes
router.route('/')
  .get(protect, getOffers)
  .post(protect, createOffer);

router.route('/:id')
  .put(protect, updateOffer)
  .delete(protect, deleteOffer);

router.patch('/:id/toggle', protect, toggleOfferStatus);

module.exports = router;
