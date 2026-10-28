const express = require('express');
const router = express.Router();
const {
  getRestaurantProfile,
  getPublicRestaurantProfile,
  updateRestaurantProfile,
  generateTableQR,
  verifyTableAccess,
  addCompany,
  updateCompany,
  deleteCompany,
  getCompanies,
} = require('../controllers/restaurantController');
const { protect } = require('../middleware/authMiddleware');

// Private routes
router.get('/profile', protect, getRestaurantProfile);
router.put('/profile', protect, updateRestaurantProfile);
router.get('/qr', protect, generateTableQR);

// Corporate delivery company management
router.get('/companies', protect, getCompanies);
router.post('/companies', protect, addCompany);
router.put('/companies/:id', protect, updateCompany);
router.delete('/companies/:id', protect, deleteCompany);

// Public routes for customers scanning QR
router.get('/verify-table', verifyTableAccess);
router.get('/:id/public', getPublicRestaurantProfile);

module.exports = router;
