const path = require('path');

const express = require('express');
const GenralController = require('../controllers/genralController');
const paymentController = require('../controllers/payment')
const router = express.Router();

router.get('/', GenralController.GetIndex)
router.get('/egypt-investopedia/about', GenralController.GetAboutUs)
router.get('/egypt-investopedia/login', GenralController.GetLogin)
router.get('/egypt-investopedia/registration', GenralController.GetRegistration)



router.get('/egypt-investopedia/startups',GenralController.GetAllStartupPage)
router.get('/egypt-investopedia/startup-details/:id',GenralController.GetStartupDetailsPage)
router.get('/egypt-investopedia/events',GenralController.GetEventsPage)
router.get('/egypt-investopedia/Packages',GenralController.GetPackagesPage)



router.get('/indexx',GenralController.gettest)
router.get('/advisor-dashboard',GenralController.getAdvisorDashboard)
router.get('/api/rooms',GenralController.getApiRooms)
router.get('/api/highlight',GenralController.getApiHighlight)
router.post('/send_highlight', GenralController.postSendHighlight)


router.post('/pay',paymentController.paymentGateway)
router.post('/webhook',paymentController.webhook)
module.exports = router;