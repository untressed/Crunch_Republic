const express = require('express');
const router = express.Router();
const {
  getPaymentConfig,
  createCashfreeOrder,
  verifyCashfreeOrder,
  handleCashfreeWebhook,
} = require('../controllers/paymentController');

// Public route to get payment settings (Cashfree enabled, UPI ID, etc.)
router.get('/config', getPaymentConfig);

// Cashfree payment order session creation
router.post('/cashfree/create-order', createCashfreeOrder);

// Cashfree client-side verification
router.post('/cashfree/verify', verifyCashfreeOrder);

// Cashfree asynchronous webhook listener
router.post('/cashfree/webhook', handleCashfreeWebhook);

module.exports = router;
