const admin = require('firebase-admin');

// Initialize Firebase Admin SDK with your service account credentials
const serviceAccount = require('./keyy.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = admin;
