import admin from 'firebase-admin';

const serviceAccount = require('../../path/to/your/firebase-service-account.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

export const firebaseAuth = admin.auth();
