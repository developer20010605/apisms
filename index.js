// pages/api/phoneAuth.js

import admin from '../../firebaseAdmin'; // Import Firebase Admin SDK
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
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
