const path = require('path');

const express = require('express');
const AdminController = require('../controllers/admin');
const isAdmin = require('../middleware/is-admin');
const router = express.Router();


router.get('/admin/index',isAdmin, AdminController.GetIndexAdmin)
router.get('/admin/events', isAdmin, AdminController.GetEventsAdmin)
router.get('/admin/meetings', isAdmin, AdminController.GetMeetingsAdmin)
router.get('/admin/startups', isAdmin, AdminController.GetStartupsAdmin)
router.post('/admin/approve-startup', isAdmin, AdminController.approveStartup);
router.post('/admin/reject-startup', isAdmin, AdminController.rejectStartup);
router.post('/admin/addEvent', isAdmin, AdminController.addEvent);
router.get('/admin/updateEvent/:eventId',isAdmin, AdminController.getUpdateEvent);
router.post('/admin/updateEvent/:eventId', isAdmin, AdminController.updateEvent);
router.post('/admin/deleteEvent/:eventId', isAdmin, AdminController.deleteEvent);
router.post('/admin/arrange-meeting', isAdmin, AdminController.arrangeMeeting);
router.post('/admin/save-investment',isAdmin, AdminController.saveInvestment);


module.exports = router;