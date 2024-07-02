const path = require('path');

const express = require('express');
const investorController = require('../controllers/investor');
const offerController = require('../controllers/offerController');
const router = express.Router();

router.get('/egypt-investopedia/investor-profile/mystartups/:userid', investorController.GetInvestorMyStartup)
router.get('/egypt-investopedia/investor-profile/offers/:userid', investorController.GetInvestorOffers)
router.get('/egypt-investopedia/investor-profile/:userid', investorController.GetInvestorProfile);
router.post('/egypt-investopedia/upload-photo/:userid', investorController.UploadPhoto);
router.get('/send-offer/:startupId', offerController.renderOfferPage);
router.post('/send-offer', offerController.sendOffer);
module.exports = router;