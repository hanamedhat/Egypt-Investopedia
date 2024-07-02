const axios = require('axios');
const Payment = require('../models/paymentmodel')
const User = require("../models/usermodel")
const PAYMOB_API_KEY = process.env.PAYMOB_API_KEY;
const PAYMOB_INTEGRATION_ID = process.env.PAYMOB_INTEGRATION_ID;
const PAYMOB_IFRAME_ID = process.env.PAYMOB_IFRAME_ID;

exports.paymentGateway = async (req, res) => {
    const { amount } = req.body;
    const userid = req.session.userid;
  
    if (!userid) {
      return res.redirect('/egypt-investopedia/login'); // Redirect to login if not logged in
    }
  
    try {
      const authResponse = await axios.post('https://accept.paymobsolutions.com/api/auth/tokens', {
        api_key: PAYMOB_API_KEY
      });
  
      const authToken = authResponse.data.token;
  
      const orderResponse = await axios.post('https://accept.paymobsolutions.com/api/ecommerce/orders', {
        auth_token: authToken,
        delivery_needed: false,
        amount_cents: amount * 100,
        currency: "EGP",
        items: []
      });
  
      const orderId = orderResponse.data.id;
  
      const paymentKeyResponse = await axios.post('https://accept.paymobsolutions.com/api/acceptance/payment_keys', {
        auth_token: authToken,
        amount_cents: amount * 100,
        expiration: 3600,
        order_id: orderId,
        billing_data: {
          apartment: "NA",
          email: "test@example.com",
          floor: "NA",
          first_name: "John",
          street: "NA",
          building: "NA",
          phone_number: "+20123456789",
          shipping_method: "NA",
          postal_code: "NA",
          city: "NA",
          country: "NA",
          last_name: "Doe",
          state: "NA"
        },
        currency: "EGP",
        integration_id: PAYMOB_INTEGRATION_ID
      });
  
      const paymentKey = paymentKeyResponse.data.token;
  
      await Payment.create({
        amount,
        status: 'pending',
        userid: userid
      });

      await User.update({ package: 'pending' }, { where: { userid: userid } });

      res.redirect(`https://accept.paymobsolutions.com/api/acceptance/iframes/${PAYMOB_IFRAME_ID}?payment_token=${paymentKey}`);
    } catch (error) {
      console.error(error);
      res.status(500).send("An error occurred");
    }
  };

exports.webhook =  async (req, res) => {
    // Handle webhook notifications here
    const { type, obj } = req.body;
    if (type === 'transaction_paid') {
      const transactionId = obj.paymentId;
      const amount = obj.amount_cents / 100;
      await Payment.update({ status: 'paid' }, { where: { paymentId: transactionId } });
    }
    res.status(200).send('Webhook received');
  };