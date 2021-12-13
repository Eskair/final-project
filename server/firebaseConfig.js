const { initializeApp, cert } = require('firebase-admin/app');
const {
  getFirestore,
  Timestamp,
  FieldValue,
} = require('firebase-admin/firestore');
const serviceAccount = require('./serviceAccountKey.json');

const app = initializeApp({ credential: cert(serviceAccount) });

//export db
const db = getFirestore(app);

module.exports = { db, Timestamp, FieldValue };
