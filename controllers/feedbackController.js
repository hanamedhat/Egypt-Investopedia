const { User, Feedback } = require('../models/associations');

exports.submitFeedback = async (req, res) => {
  const { email, subject, message } = req.body;

  try {
    // Check if the email exists
    const user = await User.findOne({ where: { email } });

    if (!user) {
      req.session.message = {
        type: 'error',
        content: 'Failed: You have to register',
      };
      return res.redirect('/#feedback-form');
    }

    // Create the feedback entry
    await Feedback.create({
      feedbackSubject: subject,
      feedbackMessage: message,
      userid: user.userid,
    });

    req.session.message = {
      type: 'success',
      content: 'Feedback sent successfully',
    };
    res.redirect('/#feedback-form');
  } catch (error) {
    console.error('Error submitting feedback:', error);
    req.session.message = {
      type: 'error',
      content: 'An error occurred. Please try again later.',
    };
    res.redirect('/#feedback-form');
  }
};
