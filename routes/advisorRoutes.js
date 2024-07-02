
const express = require('express');
const AdvisorController = require('../controllers/advisor');
const router = express.Router();

router.get('/advisor/index', AdvisorController.GetIndexAdvisor)
router.get('/advisor/meetings', AdvisorController.GetMeetingsAdvisor)
router.get('/advisor/startups', AdvisorController.GetStartupsAdvisor)
// router.get('/advisor/chat-requests', AdvisorController.GetChatRequestPage)
module.exports = router;