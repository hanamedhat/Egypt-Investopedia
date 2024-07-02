const path = require('path');

const express = require('express');
const StartupController = require('../controllers/startupController');
const { User, Startup, StOwner } = require('../models/associations');
const router = express.Router();



router.get('/egypt-investopedia/startup-profile/:userid', StartupController.GetStartupProfile);
router.get('/egypt-investopedia/startup-profile/edit/:userid', StartupController.GetEditStartupForm);
router.post('/startups-info/update', StartupController.updateStartup);
router.get('/egypt-investopedia/startup-profile/myinvestor/:userid', StartupController.GetStartupMyInvestor)
router.get('/egypt-investopedia/startup-profile/offers/:userid', StartupController.GetStartupOffers)
router.post('/startups-info', StartupController.createStartup);
router.get('/startups-info/:userId',StartupController.GetStartupInfo);
router.post('/offers/:offerId/delete', StartupController.deleteOffer);
//router.get('/egypt-investopedia/startup-profile/offers/:startupId', StartupController.GetStartupOffers);

router.get('/filter-startups', async (req, res) => {
    const { stage, industry, investmentType } = req.query;
    const filters = {};
  
    if (stage) {
      filters.stage = stage;
    }
    if (industry) {
      filters.industry = industry;
    }
    if (investmentType) {
      filters.investmentType = investmentType;
    }
  
    try {
      const startups = await Startup.findAll({
        where: filters,
        include: [{ model: User },
                  { model: StOwner }
        ] // Include the User model
    });
      res.render('general/allStartups-cards-page', { startups });
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }
  });

  
  router.get('/clear-filters', (req, res) => {
    res.redirect('/egypt-investopedia/startups');
  });

  router.post('/offers/:offerId/accept', StartupController.acceptOffer);
  router.post('/offers/:offerId/reject', StartupController.rejectOffer);
module.exports = router;