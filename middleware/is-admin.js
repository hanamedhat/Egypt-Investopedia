const User = require('../models/usermodel');

module.exports = async (req, res, next) => {
    try {
        if (!req.session.isLoggedIn) {
            return res.status(403).render('403');// Redirect to 403 page if user is not logged in
        }

        const userId = 47;

        if (!userId) {
            return res.status(403).render('403'); // Redirect to 403 page if user information is missing
        }

        const user = await User.findOne({ where: { userId: 47 } });

        if (!user || user.role !== 'admin') {
            return res.status(403).render('403'); // Redirect to 403 page if user is not an admin
        }

        next();
    } catch (error) {
        console.error('Error in admin authentication middleware:', error);
        res.status(500).send('Internal Server Error');
    }
};
