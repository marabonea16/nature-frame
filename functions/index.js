const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
const cors = require('cors')({ origin: true });

admin.initializeApp();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'marabonea16@gmail.com',
      pass: 'tmup jcjg mlmp zges',
    },
  });
  
  exports.sendOrderConfirmation = functions.https.onRequest((req, res) => {
    cors(req, res, async () => {
      if (req.method !== 'POST') {
        return res.status(405).send('Method Not Allowed');
      }
  
      const { email, name, phone, address, city, postalCode, country, totalPrice, orderDetails } = req.body.data;

      console.log('Request body:', req.body);
      console.log(`Email: ${email}`);
      if (!email) {
        return res.status(400).send({ success: false, error: 'Email is required' });
      }
      console.log(`Sending order confirmation to: ${email}`);

      const mailOptions = {
        from: 'marabonea160@gmail.com',
        to: email,
        subject: 'Order Confirmation',
        text: `Hello ${name},\n\nThank you for your order!\n\nOrder Details:\n${orderDetails}\n\nTotal Price: ${totalPrice} RON\n\nShipping Address:\n${address}\n${city}, ${postalCode}\n${country}\n\n Phone number:\n${phone}\n\nBest regards,\nNature Frames`,
      };
  
      try {
        await transporter.sendMail(mailOptions);
        return res.status(200).send({ success: true });
      } catch (error) {
        console.error('There was an error while sending the email:', error);
        return res.status(500).send({ success: false, error: error.message });
      }
    });
  });