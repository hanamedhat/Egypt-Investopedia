const { Offer, Startup } = require('../models/associations');

exports.renderOfferPage = async (req, res) => {
    const { startupId } = req.params;
    const userid = req.session.userid;
  
    if (!userid) {
      return res.redirect('/egypt-investopedia/login'); // Redirect to login if not logged in
    }
    try {
      const startup = await Startup.findByPk(startupId);
      if (!startup) {
        return res.status(404).send('Startup not found');
      }
      res.render('general/offers', { startup, userid,success: false, errors:{}, body:{}  });
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }
  };

  exports.sendOffer = async (req, res) => {
    const { amount, offerDescription, offerComment, startupId } = req.body;
    const userid = req.session.userid; // Ensure userId is retrieved from session
    let errors = {};
    if (!userid) {
      return res.status(400).send('User not logged in');
    }
  
    // Parse the startupId to an integer
    const parsedStartupId = parseInt(startupId, 10);
    if (isNaN(parsedStartupId)) {
      return res.status(400).send('Invalid Startup ID');
    }
  

    try {
      const startup = await Startup.findByPk(parsedStartupId);
      if (!startup) {
        return res.status(404).send('Startup not found');
      }

      // if(amount > startup.theDeal)errors.amount = "The offer must be smaller than the requested investment!"
      // if(amount < startup.minInvestmentPp)errors.amount = `The minimum per investor is ${startup.minInvestmentPp}`
      // if (Object.keys(errors).length > 0) {
      //   return res.render('general/offers', { errors, body: req.body, success: false, startup, userid });
      // }
      const offer = await Offer.create({
        amount,
        offerDescription,
        offerComment,
        startupId: parsedStartupId,
        userid // Ensure userId is passed correctly
      });
  
      res.render('general/offers', { success: true, startup, userid , errors});
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }
  };
  