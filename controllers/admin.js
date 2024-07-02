const Admin = require('../models/adminmodel')
const { User, Investor, StOwner, Startup, Feedback, Investments, Events,Payment,Offer,Meeting } = require('../models/associations');
const Investment = require('../models/investmentsmodel')
const fs = require('fs');
const path = require('path');

exports.GetIndexAdmin = async (req, res) => {
    try {
        const userCount = await User.count();
        const investorCount = await Investor.count();
        const startupCount = await Startup.count();
        const feedbackCount = await Feedback.count();
        const stOwnerCount = await StOwner.count();
        const investmentsCount = await Investments.count();
        const eventsCount = await Events.count();
        const paymentCount = await Payment.count();
    
        res.render('admin/index', {
          userCount,
          investorCount,
          startupCount,
          feedbackCount,
          stOwnerCount,
          investmentsCount,
          eventsCount,
          paymentCount
        });
      } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
      }
};

exports.GetEventsAdmin = async (req, res) => {
    try {
        const events = await Events.findAll();
        res.render('admin/events', { events });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};

exports.GetMeetingsAdmin = async (req, res) => {
    try {
        const offers = await Offer.findAll({
            include: [
                {
                    model: User,
                    attributes: ['firstName', 'lastName']
                },
                {
                    model: Startup,
                    attributes: ['companyName']
                },
                {
                    model:Meeting,
                    attributes: ['date', 'place', 'link']
                },
            ]
        });
        res.render('admin/meetings', { offers });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};

exports.GetStartupsAdmin = async (req, res) => {
    try {
        // Fetch all startups with status 'pending'
        const startup = await Startup.findAll({
            where: { status: 'pending' }
        });
        res.render('admin/startups', { startup });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};

exports.approveStartup = async (req, res) => {
    try {
        const { startupId } = req.body;
        const startup = await Startup.findByPk(startupId);
        if (startup) {
            startup.status = 'approved';
            await startup.save();
            res.redirect('/admin/startups');
        } else {
            res.status(404).send('Startup not found');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};

exports.rejectStartup = async (req, res) => {
    try {
        const { startupId } = req.body;
        const startup = await Startup.findByPk(startupId);
        if (startup) {
            startup.status = 'rejected';
            await startup.save();
            res.redirect('/admin/startups');
        } else {
            res.status(404).send('Startup not found');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};

// Ensure the uploads directory exists
const uploadDir = path.join(__dirname, '..', 'public', 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

const uploadFile = (file) => {
    return new Promise((resolve, reject) => {
        const fileName = `${Date.now()}-${file.name}`;
        const filePath = path.join(uploadDir, fileName);
        file.mv(filePath, (err) => {
            if (err) {
                console.error('File upload failed', err);
                reject(err);
            } else {
                resolve(fileName);
            }
        });
    });
};

exports.addEvent = async (req, res) => {
    try {
        const { name, description, country, link, startDate, endDate } = req.body;
        const imageFile = req.files.image;

        if (!imageFile) {
            return res.status(400).send('No file uploaded');
        }

        const fileName = await uploadFile(imageFile);

        await Events.create({
            name,
            image: fileName,
            description,
            country,
            link,
            startDate,
            endDate,
            userid: 47// Assuming you have user information stored in req.user
        });

        res.redirect('/admin/events');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};


exports.getUpdateEvent = async (req, res) => {
    try {
        const event = await Events.findByPk(req.params.eventId);
        if (!event) {
            return res.status(404).send('Event not found');
        }
        res.render('admin/updateEvent', { event });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};

exports.updateEvent = async (req, res) => {
    try {
        const { name, description, country, link, startDate, endDate } = req.body;
        const event = await Events.findByPk(req.params.eventId);
        if (!event) {
            return res.status(404).send('Event not found');
        }

        let fileName = event.image;
        if (req.files && req.files.image) {
            const imageFile = req.files.image;
            fileName = await uploadFile(imageFile);
        }

        await event.update({
            name,
            image: fileName,
            description,
            country,
            link,
            startDate,
            endDate,
        });

        res.redirect('/admin/events');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};

exports.deleteEvent = async (req, res) => {
    try {
        const event = await Events.findByPk(req.params.eventId);
        if (!event) {
            return res.status(404).send('Event not found');
        }

        await event.destroy();
        res.redirect('/admin/events');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};



exports.arrangeMeeting = async (req, res) => {
    const { offerId,date, place, link } = req.body;
    try {
      // Create a new meeting
      const meeting = await Meeting.create({
        date: date, 
        place: place, 
        link: link, 
      });
      // Update the offer with the meetingId
      await Offer.update({ meetingId: meeting.meetingId }, {
        where: { offerId }
      });
      res.redirect('/admin/meetings'); // Redirect to the meetings page
    } catch (error) {
      console.error('Error arranging meeting:', error);
      res.status(500).send('Internal Server Error');
    }
  };
exports.saveInvestment = async (req, res) => {
    const { userid, startupId, amountInvested, investmentDate } = req.body;
    
    try {
        const investment = await Investment.create({
            userid,
            startupId,
            amountInvested,
            investmentDate
        });
        res.redirect('/admin/meetings',{investment})
    } catch (error) {
        console.error('Error saving investment:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};
  