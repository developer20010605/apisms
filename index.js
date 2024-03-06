const express = require("express");
const firebase = require("firebase");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

// Initialize Firebase with appropriate config
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyATZPbmYzXjvbNh16nr4hnD_-VP2u97V_c",
  authDomain: "railwayproject-80596.firebaseapp.com",
  projectId: "railwayproject-80596",
  storageBucket: "railwayproject-80596.appspot.com",
  messagingSenderId: "111122909338",
  appId: "1:111122909338:web:06fe534b11f0331783b723",
  measurementId: "G-7MFDN0J7Y6"
};

firebase.initializeApp(firebaseConfig);

// Middleware
app.use(bodyParser.json());
app.use(cors());

// API endpoint to trigger SMS authentication
app.post("/auth/sms", async (req, res) => {
  const { phoneNumber } = req.body;

  try {
    // Trigger SMS authentication
    const auth = firebase.auth();
    const verification = await auth.signInWithPhoneNumber(phoneNumber);

    res.status(200).json({ success: true, message: "SMS verification sent successfully" });
  } catch (error) {
    console.error("Error sending SMS verification:", error);
    res.status(500).json({ success: false, message: "Failed to send SMS verification" });
  }
});

// Start the server
module.exports = app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
