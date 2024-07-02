const { User, Investor, StOwner, Startup,Offer,Meeting } = require('../models/associations');

exports.GetIndexAdvisor = async (req, res) => {
    try {
        const investorCount = await Investor.count();
        const startupCount = await Startup.count();
        const stOwnerCount = await StOwner.count();
    
        res.render('advisor/index', {
          investorCount,
          startupCount,
          stOwnerCount,
        });
      } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
      }
};

exports.GetMeetingsAdvisor = async (req, res) => {
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
        res.render('advisor/meeting', { offers });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};


exports.GetStartupsAdvisor = async (req, res) => {
    try {
        // Fetch all startups with status 'pending'
        const startup = await Startup.findAll({
            where: { status: 'pending' }
        });
        res.render('advisor/startups', { startup });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};

// exports.GetChatRequestPage = async (req,res) => {
//   res.render('advisor/chat_request')
// }