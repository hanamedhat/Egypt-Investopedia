const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/usermodel');
const userController  = require('../controllers/auth');
const GenralController = require('../controllers/genralController');
const investorController = require('../controllers/investor');
const startupController = require('../controllers/startupController')
const { check } = require('express-validator');
const router = express.Router();
const feedbackController = require('../controllers/feedbackController');


// Registration route with validation
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.get('/logout', userController.logoutUser);



// Investor info form route
router.get('/investor-info/:userId', (req, res) => {
    const userId = req.params.userId;
    res.render('general/investorform', { userId });
});
router.post('/investor-info', investorController.SaveInvestorInfo);



router.get('/reset-password', userController.GetResetPassword);
router.post('/reset-password', userController.resetPassword);
router.post('/verify-otp', userController.verifyOtp);
router.post('/set-new-password', userController.setNewPassword);
router.get('/', (req, res) => {
    res.render('general/index', { error: '', success: '' });
  });
// Feedback submission route
router.post('/feedback', feedbackController.submitFeedback);
module.exports = router;
