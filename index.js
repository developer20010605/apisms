const express = require("express");
const firebase = require("firebase");
const bodyParser = require("body-parser");

// Initialize Express app
const app = express();
const port = 3000;

// Initialize Firebase with appropriate config
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

// Initialize Firebase Authentication
const auth = firebase.auth();

// Middleware to parse JSON request body
app.use(bodyParser.json());

// API endpoint to trigger SMS authentication
app.post("/auth/sms", async (req, res) => {
  const { phoneNumber } = req.body;

  try {
    // Trigger SMS authentication

    // Set CORS headers to allow requests from any origin
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    const verification = await auth.signInWithPhoneNumber(phoneNumber);

    res.status(200).json({ success: true, message: "SMS verification sent successfully" });
  } catch (error) {
    console.error("Error sending SMS verification:", error);
    res.status(500).json({ success: false, message: "Failed to send SMS verification" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
