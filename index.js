const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { admin } = require('./firebaseAdmin');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/api/phoneAuth', async (req, res) => {
  const { phoneNumber } = req.body;

  try {
    const number = "+976" + phoneNumber; // Adjust country code accordingly
    const confirmationResult = await admin.auth().signInWithPhoneNumber(number);
    res.status(200).json({ success: true, message: 'Phone authentication initiated.' });
  } catch (error) {
    console.error('Error in phoneAuth:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
