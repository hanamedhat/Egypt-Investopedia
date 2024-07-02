const { User, Startup, StOwner, Events, ChatRequest,ChatHighlights } = require('../models/associations');
const sequelize = require("../config/db");

exports.GetIndex = (req, res) => {
    res.render('general/index'); 
};
exports.GetAboutUs = async (req, res) => {
  try{
    const user = await User.findAll()
    res.render('general/about',{user}); 
  }catch(error) {
    console.error(error);
    res.status(500).send('Server Error');
}   
};

exports.GetLogin = (req, res) => {
    res.render('auth/login', { errors: {}, body: {}, success: false});
};

exports.GetRegistration = (req, res) => {
    res.render('auth/registerationn', { errors: {}, body: {}, success: false }); 
};
exports.GetInvestorInfo =  (req, res) => {
    const { userid } = req.params;
    res.render('general/investorform', { userid });
};

exports.GetStartupProfile =  (req, res) => {
    //const { userid } = req.params; { userid }
    res.render('general/startup-profile');
};





exports.GetAllStartupPage = async (req,res) =>{
    try {
        // Fetch only approved startups
        const startups = await Startup.findAll({
            where: { status: 'approved' },
            include: [
                {
                    model: User,
                    attributes: ['userid', 'firstName', 'lastName', 'email', 'age', 'phoneNumber', 'linkedIn', 'jobTitle', 'resetPasswordToken', 'resetPasswordExpires', 'gender', 'role', 'createdAt', 'updatedAt']
                },
                {
                    model: StOwner,
                    attributes: ['id', 'founders', 'experience', 'teamRoles', 'biography', 'userid']
                }
            ]
        });
        res.render('general/allStartups-cards-page', { startups });
    } catch (error) {
        console.error('Error fetching startups:', error);
        res.status(500).send('Internal Server Error');
    }
}

exports.GetStartupDetailsPage = async (req, res) => {
  try {
      const startupId = req.params.id;
      console.log(`Fetching details for startup ID: ${startupId}`);
      
      const startup = await Startup.findByPk(startupId, {
          include: [
              {
                  model: User,
                  attributes: [
                      'userid', 'firstName', 'lastName', 'email', 'age', 
                      'phoneNumber', 'linkedIn', 'jobTitle', 
                      'resetPasswordToken', 'resetPasswordExpires', 
                      'gender', 'role', 'createdAt', 'updatedAt'
                  ]
              },
          ]
      });

      console.log(`Startup found: ${JSON.stringify(startup)}`);
      
      if (!startup) {
          return res.status(404).send('Startup not found');
      }

      const startupOwner = await StOwner.findOne({
        where: { userid: startup.userid }
    });

      console.log(`\n\n\n\n\Startup found: ${JSON.stringify(startup, null, 2)}\n\n\n\n\n`);
      res.render('general/startup-details-page', { startup,startupOwner });
  } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
  }
};


exports.GetEventsPage = async (req , res) =>{
    try {
        const events = await Events.findAll();
        res.render('general/eventsGeneral', { events });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
}

exports.GetPackagesPage= async (req,res)=>{
    console.log('hana')
    res.render('general/package')
}



/////CHATTTTTTT/////
exports.gettest = async (req, res, next) => {
    try {
      const rooms = await ChatRequest.findAll();
      res.render('general/indexx', { rooms });

    } catch (error) {
      next(error); // Pass the error to the next middleware (e.g., error handler)
    }
  };

  exports.getAdvisorDashboard =  async (req, res, next) => {
    try {
      const rooms = await ChatRequest.findAll();
    //   console.log(`getAdvisorDashboard ${rooms}`)
      res.render('advisor/chat_request', { rooms });
    } catch (error) {
      next(error); // Pass the error to the next middleware (e.g., error handler)
    }
  };


exports.getApiRooms = async (req, res, next) => {
  try {
    const rooms = await ChatRequest.findAll();
    res.json(rooms);
    // console.log(`api/getRooms ${rooms}`)
  } catch (error) {
    res.status(500).json({ error: 'Database query failed' });
  }
};
exports.getApiHighlight = async (req, res, next) => {
  try {
    const { userid } = req.query; // Extract userid from the query parameters
    if (!userid) {
      return res.status(400).json({ error: 'userid is required' }); // Handle missing userid
    }

    const highlights = await ChatHighlights.findAll({
      where: {
        userid: userid // Filter by userid
      }
      
    });
    console.log(`\n\n\nTHIS IS HIGHLIIIIIIIIIIIITTTTTTTTTTTTT${highlights}\n\n\n`);
    res.json(highlights);
  } catch (error) {
    res.status(500).json({ error: 'Database query failed' });
  }
};

exports.postSendHighlight = async (req, res) => {
    const { room_id, user_id, textareaHighlight } = req.body;
    console.log('Received data:', req.body);
  
    let currentDate = new Date();  // This gives you the current date and time
    let date = currentDate.toISOString().split('T')[0];  // Extract the date part in 'YYYY-MM-DD' format
    let time = currentDate.toISOString().split('T')[1].slice(0, 8);  // Extract the time part in 'HH:mm:ss' format
  
    try {
      const newHighlight = await ChatHighlights.create({
        date: date,
        time: time,
        highlightDescription: textareaHighlight,
        financialAdvisorId: 1, // Assuming 1 is the ID of the financial advisor
        userid: user_id,
      });
      console.log(`Highlight inserted into database for room ${room_id}`);
      res.status(201).json({ message: 'Chat Highlight Saved' });
    } catch (err) {
      console.error(`Error inserting highlight into database for room ${room_id}:`, err);
      res.status(500).json({ message: 'Failed to save chat highlight' });
    }
  };
  

