const Investor = require("../models/investormodel");
const User = require("../models/usermodel");
const Offer = require("../models/offermodel")
const Startup = require("../models/startupmodel")
const Meeting = require("../models/meetingmodel")
const Investments = require("../models/investmentsmodel")
const path = require('path');
const fs = require('fs');

exports.SaveInvestorInfo = async (req, res) => {
  const {
    investmentHorizon,roiExpectations,profBackground,riskTolerance,areaOfExpertise,preference,involvementLevel,additionalValue,comments,ROI,
    wantedAmount, investmentType,industries, userid
  } = req.body;

  try {
    const user = await User.findByPk(userid);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const industriesString = JSON.stringify(industries);

    const userInvestmentInfo = await Investor.create({
      investmentHorizon,roiExpectations,profBackground,riskTolerance,areaOfExpertise,preference,
      involvementLevel,
      additionalValue,
      comments,
      ROI,
      wantedAmount,
      investmentType,
      industries: industriesString,
      userid
    });
    //req.session.user = { userid: newUser.userid };
    console.log('You Fill Your Investment Info successfully');
    res.redirect(`/`);
  } catch (error) {
    console.error('Error saving investment info:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


exports.GetInvestorProfile = async (req, res) => {
  const userid = req.params.userid;

  try {
    const user = await User.findByPk(userid);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const investor = await Investor.findOne({ where: { userid: userid } });
    if (!investor) {
      return res.status(404).json({ error: 'Investor information not found' });
    }

    res.render('general/profile-investor', { user, investor });
  } catch (error) {
    console.error('Error retrieving investor profile:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const uploadDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

exports.UploadPhoto = async (req, res) => {
  const userid = req.params.userid;

  try {
    const investor = await Investor.findOne({ where: { userid: userid } });
    if (!investor) {
      return res.status(404).json({ error: 'Investor information not found' });
    }

    if (!req.files || !req.files.profileImage) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const file = req.files.profileImage;
    const fileName = `${userid}-${Date.now()}${path.extname(file.name)}`;
    const filePath = path.join(uploadDir, fileName);

    file.mv(filePath, async (err) => {
      if (err) {
        console.error('Error uploading photo:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }

      // Update profile image path in the database
      investor.profileImage = fileName;
      await investor.save();

      console.log(`File uploaded successfully: ${fileName}`);
      res.redirect(`/egypt-investopedia/investor-profile/${userid}`);
    });
  } catch (error) {
    console.error('Error uploading photo:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.GetInvestorOffers = async (req, res) => {
  try {
    const { userid } = req.params;

    // Query the database for offers made by this investor, including the related startup
    const offers = await Offer.findAll({
      where: { userid },
      include: [
        { 
          model: Startup, 
          attributes: ["companyName", "logo"] 
        },
        {
          model:Meeting,
          attributes:['date','place','link']
        }
      ],
    });

    // Render the view with the offers data
    res.render("general/offer-investor", { offers });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

exports.GetInvestorMyStartup = async (req, res) => {
  try {
    const { userid } = req.params;

    // Find investments made by this investor
    const investments = await Investments.findAll({
      where: { userid },
      include: { model: Startup }  // Ensure the Startup model is included correctly
    });

    if (investments.length > 0) {
      const startups = investments.map(investment => investment.Startup);
      res.render('general/investor-mystartup', { startups });
    } else {
      res.render('general/investor-mystartup', { startups: [], message: "No startup invested in yet." });
    }

  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};