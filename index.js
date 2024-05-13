import express from 'express';
import cors from 'cors';
import { admin } from './firebaseAdmin';

const app = express();

// Allow all origins
app.use(cors());

// Your API route for phone authentication
app.post('/api/phoneAuth', async (req, res) => {
  if (req.method === 'POST') {
    const { phoneNumber } = req.body;

    try {
      const number = "+976" + phoneNumber; // Adjust country code accordingly
      const confirmationResult = await admin.auth().signInWithPhoneNumber(number);

      // Here you might want to save `confirmationResult` or send it back to the client for further processing

      res.status(200).json({ success: true, message: 'Phone authentication initiated.' });
    } catch (error) {
      console.error('Error in phoneAuth:', error);
      res.status(500).json({ success: false, message: error.message });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
