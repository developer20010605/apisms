const admin = require('./firebaseAdmin'); // Import Firebase Admin SDK
const cors = require('cors');

export default async function handler(req, res) {
  // Enable CORS
  await cors()(req, res);

  if (req.method === 'POST') {
    const { phoneNumber } = req.body;

    try {
      const number = "+976" + phoneNumber; // Adjust country code accordingly
      const verification = await admin.auth().sendPhoneNumberVerification(number);

      console.log('Verification ID:', verification);

      res.status(200).json({ success: true, message: 'Verification code sent.' });
    } catch (error) {
      console.error('Error in phoneAuth:', error);
      res.status(500).json({ success: false, message: error.message });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }
}
