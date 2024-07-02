const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./usermodel');
const Investor = require('./investormodel');
const StOwner = require('./stownermodel');
const Advisor = require('./advisormodel');
const Admin = require('./adminmodel');
const Startup = require('./startupmodel');
const Feedback = require('./feedbackmodel');
const Payment = require('./paymentmodel');
const ChatRequest = require('./chatrequestmodel');
const ChatHighlights = require('./chathighlightsmodel');
const Events = require('./eventsmodel');
const Meeting = require('./meetingmodel');
const Investments = require('./investmentsmodel');
const Offer = require('./offermodel');


User.hasOne(Investor, { foreignKey: 'userid' });
Investor.belongsTo(User, { foreignKey: 'userid' });

User.hasOne(Startup, { foreignKey: 'userid' });
Startup.belongsTo(User, { foreignKey: 'userid' });

User.hasOne(StOwner, { foreignKey: 'userid' });
StOwner.belongsTo(User, { foreignKey: 'userid' });

StOwner.hasMany(Startup, { foreignKey: 'userid' });
Startup.belongsTo(StOwner, { foreignKey: 'userid' });

User.hasOne(Advisor, { foreignKey: 'userid' });
Advisor.belongsTo(User, { foreignKey: 'userid' });

User.hasOne(Admin, { foreignKey: 'userid' });
Admin.belongsTo(User, { foreignKey: 'userid' });



Admin.hasMany(Startup, { foreignKey: 'userid' });
Startup.belongsTo(Admin, { foreignKey: 'userid' });

User.hasMany(Feedback, { foreignKey: 'userid' });
Feedback.belongsTo(User, { foreignKey: 'userid' });

User.hasMany(Payment, { foreignKey: 'userid' });
Payment.belongsTo(User, { foreignKey: 'userid' });



User.hasMany(ChatHighlights, { foreignKey: 'userid' });
ChatHighlights.belongsTo(User, { foreignKey: 'userid' });
Advisor.hasMany(ChatHighlights, { foreignKey: 'financialAdvisorId' });
ChatHighlights.belongsTo(Advisor, { foreignKey: 'financialAdvisorId' });

User.hasOne(ChatRequest, { foreignKey: 'userid' });
ChatRequest.belongsTo(User, { foreignKey: 'userid' });

Admin.hasMany(Events, { foreignKey: 'userid' });
Events.belongsTo(Admin, { foreignKey: 'userid' });

Admin.hasMany(Meeting, { foreignKey: 'userid' });
Meeting.belongsTo(Admin, { foreignKey: 'userid' });

// User.belongsToMany(Meeting, { through: ParticipateIn, foreignKey: 'userid' });
// Meeting.belongsToMany(User, { through: ParticipateIn, foreignKey: 'meetingId' });

Investor.hasMany(Investments, { foreignKey: 'userid' });
Investments.belongsTo(Investor, { foreignKey: 'userid' });
Startup.hasMany(Investments, { foreignKey: 'startupId' });
Investments.belongsTo(Startup, { foreignKey: 'startupId' });

// Investor.hasMany(Offer, { foreignKey: 'userid' });
// Offer.belongsTo(Investor, { foreignKey: 'userid' });
Offer.belongsTo(User, { foreignKey: 'userid' });
Startup.hasMany(Offer, { foreignKey: 'startupId' });
Offer.belongsTo(Startup, { foreignKey: 'startupId' });
User.hasMany(Offer, { foreignKey: 'userid' });

Meeting.hasMany(Offer, { foreignKey: 'meetingId' });
Offer.belongsTo(Meeting, { foreignKey: 'meetingId' });

module.exports = {
  User,
  Investor,
  StOwner,
  Advisor,
  Admin,
  Startup,
  Feedback,
  Payment,
  ChatRequest,
  ChatHighlights,
  Events,
  Meeting,
  Investments,
  Offer,
};