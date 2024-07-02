const { User, Startup, StOwner,Investor,Offer,Meeting, ChatHighlights,Investments } = require('../models/associations');
const fs = require('fs');
const path = require('path');
const { Op } = require('sequelize');

// Ensure the uploads directory exists
const uploadDir = path.join(__dirname, '..', 'uploads');
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

exports.createStartup = async (req, res) => {
    const {
        companyName, website, industry, location, stage, target, totalRaising, investorRole, usingFunds,
        investmentType, minInvestmentPp, businessExplanation, risks, theMarket, progress, objective, theDeal,
        nonProfit, legalStructure, founders, experience, teamRoles, biography, userid, startupId
    } = req.body;

    let errors = {};
    
    // Validation
    if (!companyName) errors.companyName = "Startup Name is required";
    if (!req.files?.pImage) errors.pImage = "Product Image is required";
    if (!req.files?.logo) errors.logo = "Logo is required";
    if (!industry) errors.industry = "Startup Industry is required";
    if (!theDeal) errors.theDeal = "Investment Amount is required";
    if (!businessExplanation) errors.businessExplanation = "Short Summary is required";
    if (!minInvestmentPp) errors.minInvestmentPp = "Minimum Investment per investor is required";
    if (!nonProfit) errors.nonProfit = "Net Profit is required";
    if (!theDeal > minInvestmentPp) errors.minInvestmentPp = "Minimum Investment per investor should be smaller than the investment amount";

    if (Object.keys(errors).length > 0) {
        return res.render('general/startupform', {
            userId: userid,
            errors,
            startup: req.body,
            startupOwner:req.body,
        });
    }
    try {
        const user = await User.findByPk(userid);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const files = req.files;
        const addFinancials = files?.addFinancials ? await uploadFile(files.addFinancials) : null;
        const pImage = files?.pImage ? await uploadFile(files.pImage) : null;
        const logo = files?.logo ? await uploadFile(files.logo) : null;
        const businessPlan = files?.businessPlan ? await uploadFile(files.businessPlan) : null;
        const taxRegister = files?.taxRegister ? await uploadFile(files.taxRegister) : null;
        const commercialRec = files?.commercialRec ? await uploadFile(files.commercialRec) : null;

        let startup;
        if (startupId) {
            // Update the existing Startup
            startup = await Startup.findByPk(startupId);
            if (startup) {
                startup = await startup.update({
                    companyName, website, industry, location, stage, target, totalRaising, investorRole, usingFunds,
                    investmentType, minInvestmentPp, businessExplanation, risks, theMarket, progress, objective, theDeal,
                    nonProfit, legalStructure, addFinancials, pImage, logo, businessPlan, taxRegister, commercialRec
                });
            }
        } else {
            // Create a new Startup
            startup = await Startup.create({
                companyName, website, industry, location, stage, target, totalRaising, investorRole, usingFunds,
                investmentType, minInvestmentPp, businessExplanation, risks, theMarket, progress, objective, theDeal,
                nonProfit, legalStructure, addFinancials, pImage, logo, businessPlan, taxRegister, commercialRec, userid
            });
        }

        let startupOwner = await StOwner.findOne({ where: { userid } });
        if (startupOwner) {
            startupOwner = await startupOwner.update({ founders, experience, teamRoles, biography });
        } else {
            startupOwner = await StOwner.create({ founders, experience, teamRoles, biography, userid });
        }

        console.log('You filled your startup info successfully');
        res.redirect(`/egypt-investopedia/startup-profile/${userid}`);
    } catch (error) {
        console.error('Error saving startup info:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.GetStartupProfile = async (req, res) => {
    const userid = req.params.userid;
  
    try {
      const user = await User.findByPk(userid);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      const startupOwner = await StOwner.findOne({ where: { userid: userid } });
      if (!StOwner) {
        return res.status(404).json({ error: 'Startup Owner information not found' });
      }
      const startup = await Startup.findOne({ where: { userid: userid } });
      if (!Startup) {
        return res.status(404).json({ error: 'Startup information not found' });
      }
      const highlights = await ChatHighlights.findAll({where: {userid:userid}});
      if(!ChatHighlights){
        return res.status(404).json({ error: 'chat highlights not found'})
      }
  
      res.render('general/startup-profile', { user,  startupOwner, startup, highlights});
    } catch (error) {
      console.error('Error retrieving Startup profile:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  exports.GetEditStartupForm = async (req, res) => {
    const userId = req.params.userid
    try {
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const startup = await Startup.findOne({ where: { userid: userId } });
        const startupOwner = await StOwner.findOne({ where: { userid: userId } });

        if (!startup || !startupOwner) {
            return res.status(404).json({ error: 'Startup information not found' });
        }

        res.render('general/startupForm', { user, userId , startup, startupOwner,errors: {} });
    } catch (error) {
        console.error('Error retrieving startup information:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.GetStartupInfo = async (req, res) => {
    const userId = req.params.userId
    try {
      const user = await User.findByPk(userId);
      console.log(userId)
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      const startupOwner = await StOwner.findOne({ where: { userid: userId } });
    
      const startup = await Startup.findOne({ where: { userid: userId } });
    
    res.render('general/startupform', { userId, startup, startupOwner,errors: {} });
}catch (error) {
    console.error('Error retrieving Startup profile:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.updateStartup = async (req, res) => {
    console.log("updateStartup method called");
    const {
        companyName, website, industry, location, stage, target, totalRaising, investorRole, usingFunds,
        investmentType, minInvestmentPp, businessExplanation, risks, theMarket, progress, objective, theDeal,
        nonProfit, legalStructure, founders, experience, teamRoles, biography, userid, startupId
    } = req.body;
    console.log("updateStartup called with data:", req.body);

    try {
        const user = await User.findByPk(userid);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const startup = await Startup.findByPk(startupId);
        if (!startup) {
            return res.status(404).json({ error: 'Startup not found' });
        }

        const files = req.files;

        // Retain existing file paths if no new file is uploaded
        const addFinancials = files?.addFinancials ? await uploadFile(files.addFinancials) : startup.addFinancials;
        const pImage = files?.pImage ? await uploadFile(files.pImage) : startup.pImage;
        const logo = files?.logo ? await uploadFile(files.logo) : startup.logo;
        const businessPlan = files?.businessPlan ? await uploadFile(files.businessPlan) : startup.businessPlan;
        const taxRegister = files?.taxRegister ? await uploadFile(files.taxRegister) : startup.taxRegister;
        const commercialRec = files?.commercialRec ? await uploadFile(files.commercialRec) : startup.commercialRec;

        await startup.update({
            companyName, website, industry, location, stage, target, totalRaising, investorRole, usingFunds,
            investmentType, minInvestmentPp, businessExplanation, risks, theMarket, progress, objective, theDeal,
            nonProfit, legalStructure, addFinancials, pImage, logo, businessPlan, taxRegister, commercialRec
        });

        let startupOwner = await StOwner.findOne({ where: { userid } });
        if (startupOwner) {
            await startupOwner.update({ founders, experience, teamRoles, biography });
        } else {
            await StOwner.create({ founders, experience, teamRoles, biography, userid });
        }

        console.log('Startup info updated successfully');
        res.redirect(`/egypt-investopedia/startup-profile/${userid}`);
    } catch (error) {
        console.error('Error updating startup info:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


exports.GetStartupMyInvestor = async (req, res) => {
  const startupId  = req.startupId;

  try {
    const investments = await Investments.findAll({
      where: { startupId },
      include: [
        {
          model: Investor,
          include: [
            {
              model: User,
              attributes: ['userid', 'email', 'firstName', 'lastName', 'phoneNumber', 'linkedIn', 'jobTitle', 'role']
            }
          ]
        }
      ]
    });

    if (investments.length > 0) {
      const investors = investments.map(investment => investment.Investor.User);
      res.render('general/stratup-myinvestor', { investors });
    }else{
      res.render('general/stratup-myinvestor', { investors:[],message: 'No investments found for this startup' });
    }

    

   
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while fetching investors' });
  }

};


exports.GetStartupOffers = async (req, res) => {
  try {
    const startupId = req.startupId;
    if (!startupId) {
      return res.status(400).send('Startup ID is required');
    }

    const offers = await Offer.findAll({
      where: { startupId },
      include: [
        {
          model: User,
          attributes: ['firstName', 'lastName']
        },
        {
          model:Meeting,
          attributes:['date','place','link']
        }
      ]
    });

    console.log('Fetched Offers:', JSON.stringify(offers, null, 2));
    res.render('general/stratup-offers', { offers });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};


  exports.acceptOffer = async (req, res) => {
    try {
      const { offerId } = req.params;
      await Offer.update({ status: 'Accepted' }, { where: { offerId } });
      res.redirect('back'); // Redirect back to the offers page
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }
  };
  
  exports.rejectOffer = async (req, res) => {
    try {
      const { offerId } = req.params;
      await Offer.update({ status: 'Rejected' }, { where: { offerId } });
      res.redirect('back'); // Redirect back to the offers page
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }
  };
  
  exports.deleteOffer = async (req, res) => {
    try {
      const { offerId } = req.params;
      const deleted = await Offer.destroy({ where: { offerId } });
  
      if (deleted) {
        res.redirect('back'); // Redirect back to the offers page
      } else {
        res.status(404).send('Offer not found');
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }
  };