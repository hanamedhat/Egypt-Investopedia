// controllers/authController.js
const bcrypt = require('bcrypt');
const validator = require('validator');
const User = require('../models/usermodel');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const { Op } = require('sequelize');
const StartupOwner = require('../models/stownermodel'); 
const Investor = require('../models/investormodel');

exports.registerUser = async (req, res) => {
    const { password, email, age, firstName, lastName, phoneNumber, linkedIn, jobTitle, gender, confirmPassword, role } = req.body;
    let errors = {};
    try {
        if (!firstName) errors.firstName = "First name is required";
        if (!lastName) errors.lastName = "Last name is required";
        if (!email) {
            errors.email = "Email is required";
        } else if (!validator.isEmail(email)) {
            errors.email = "Invalid email address";
        }
        if (!password) {
            errors.password = "Password is required";
        } else if (!validator.isStrongPassword(password)) {
            errors.password = "Password must be strong";
        }
        if (!confirmPassword) {
            errors.confirmPassword = "Confirm Password is required";
        } else if (password !== confirmPassword) {
            errors.confirmPassword = "Passwords do not match";
        }
        if (!age) errors.age = "Age is required";
        if (!phoneNumber) errors.phoneNumber = "Phone number is required";
        if (!linkedIn) errors.linkedIn = "LinkedIn profile URL is required";
        if (!jobTitle) errors.jobTitle = "Job title is required";
        if (!gender) errors.gender = "Gender is required";
        if (!role) errors.role = "role is required";
        const emailExists = await User.emailExists(email);
        if (emailExists) {
            errors.email = "Email already exists";
        }

        if (Object.keys(errors).length > 0) {
            return res.render('auth/registerationn', { errors, body: req.body,success: false });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ password: hashedPassword, email, age, firstName, lastName, phoneNumber, linkedIn, jobTitle, gender, role });

        console.log('User registered successfully');
        if (role === 'startupOwner') {
            await StartupOwner.create({ userid: newUser.userid });
            return res.redirect(`/startups-info/${newUser.userid}`);
        } else if (role === 'investor') {
            await Investor.create({ userid: newUser.userid });
            return res.redirect(`/investor-info/${newUser.userid}`);
        }
        return res.render('auth/registerationn', { success: true, body: {}, errors,userId: newUser.userid}); // Pass success message
        //res.redirect(`/investor-info/${newUser.userid}`);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
    }
};


// controllers/authController.js
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    let errors = {};
    try {
        // Check if the email and password fields are provided
        if (!email) {
            errors.email = "Email is required";
        } else if (!validator.isEmail(email)) {
            errors.email = "Invalid email format";
        }

        if (!password) {
            errors.password = "Password is required";
        }

        // If there are validation errors, render the login page with errors
        if (Object.keys(errors).length > 0) {
            return res.render('auth/login', { errors, body: req.body, success: false });
        }

        // Check if user exists
        const user = await User.findOne({ where: { email } });
        if (!user) {
            errors.email = "Invalid email or password";
            return res.render('auth/login', { errors, body: req.body, success: false });
        }

        // Check if the password is correct
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            errors.email = "Invalid email or password";
            return res.render('auth/login', { errors, body: req.body, success: false });
        }

        req.session.isLoggedIn = true;
        req.session.user = user;
        req.session.userid = user.userid;
        req.session.userType = user.role;
        req.session.startupId = user.startupId;
        
        // Save session and redirect
        req.session.save(err => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Could not log in' });
            }
            console.log('User logged in successfully');
            // let redirectUrl;

            // if (user.role === 'admin') {
            //   redirectUrl = '/admin/index';
            // } else if (user.role === 'advisor') {
            //   redirectUrl = '/advisor/index';
            // } else {
            //   redirectUrl = '/';
            // }
            res.render('auth/login', { errors: {}, body: {}, success: true });
            // res.redirect('/');
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
    }
};

exports.logoutUser = (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.error('Error destroying session:', err);
        return res.status(500).json({ error: 'Could not log out' });
      }
      res.clearCookie('connect.sid', { path: '/' }); // Clear the session cookie
      res.redirect('/');
    });
  }


  // Generate and send OTP
exports.resetPassword = async (req, res) => {
    const { email } = req.body;
    let errors = {};

    try {
        if (!email) {
            errors.email = "Email is required";
        } else if (!validator.isEmail(email)) {
            errors.email = "Invalid email address";
        }

        if (Object.keys(errors).length > 0) {
            return res.render('auth/reset-password', { errors, body: req.body });
        }

        const user = await User.findOne({ where: { email } });
        if (!user) {
            errors.email = "Email not found";
            return res.render('auth/reset-password', { errors, body: req.body });
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        user.resetPasswordToken = otp;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

        await user.save();

        // Send OTP to user's email
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'egyptinvestopedia@gmail.com',
                pass: 'xzdk spff ofdb rbfp'
            }
        });

        const mailOptions = {
            to: email,
            from: 'egyptinvestopedia@gmail.com',
            subject: 'Password Reset OTP',
            text: `Your OTP for password reset is ${otp}`
        };

        await transporter.sendMail(mailOptions);

        res.render('auth/enter-otp', { errors: {}, email });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
    }
};

// Verify OTP
exports.verifyOtp = async (req, res) => {
    const { otp, email } = req.body;
    let errors = {};

    console.log('Received OTP:', otp);
    console.log('Received Email:', email);

    try {
        if (!otp) {
            errors.otp = "OTP is required";
        }
        if (!email) {
            errors.email = "Email is required";
        }

        if (Object.keys(errors).length > 0) {
            console.log('Validation errors:', errors);
            return res.render('auth/enter-otp', { errors, email });
        }

        const user = await User.findOne({
            where: {
                email,
                resetPasswordToken: otp,
                resetPasswordExpires: { [Op.gt]: Date.now() }
            }
        });

        if (!user) {
            errors.otp = "Invalid or expired OTP";
            console.log('User not found or OTP expired');
            return res.render('auth/enter-otp', { errors, email });
        }

        console.log('OTP verification successful');
        res.render('auth/reset-password-new', { errors: {}, email });
    } catch (error) {
        console.error('Error during OTP verification:', error);
        res.status(500).json({ error: 'An error occurred' });
    }
};

// Set new password
exports.setNewPassword = async (req, res) => {
    const { password, confirmPassword, email } = req.body;
    let errors = {};

    try {
        if (!email) {
            errors.email = "Email is required";
        }
        if (!password) {
            errors.password = "Password is required";
        } else if (!validator.isStrongPassword(password)) {
            errors.password = "Password must be strong";
        }

        if (!confirmPassword) {
            errors.confirmPassword = "Confirm Password is required";
        } else if (password !== confirmPassword) {
            errors.confirmPassword = "Passwords do not match";
        }

        if (Object.keys(errors).length > 0) {
            return res.render('auth/reset-password-new', { errors, email });
        }

        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ error: 'User not found' });
        }

        user.password = await bcrypt.hash(password, 10);
        user.resetPasswordToken = null;
        user.resetPasswordExpires = null;

        await user.save();
        console.log('password change successfully')
        res.render('auth/password-changed-success', { email });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
    }
};

exports.GetResetPassword = (req, res) => {
    res.render('auth/reset-password', { errors: {}, body: {} });
};
