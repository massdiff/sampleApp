const admin = require('firebase-admin');
const serviceAccount = require('/Users/matthewgraziani/.serviceKey/serviceKey.json');

// Initialize Firebase Admin SDK with your service account
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://your-project-id.firebaseio.com' // Replace with your Firebase DB URL
});

const db = admin.firestore();

module.exports = db;
