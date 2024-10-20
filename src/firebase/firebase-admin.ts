// firebaseAdmin.ts
import admin, { type ServiceAccount } from 'firebase-admin';
import * as dotenv from 'dotenv';
dotenv.config();
/**/
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'), // Firebase requiere que las nuevas líneas en la private key sean reales
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    }),
  });
}

export const auth = admin.auth();
export const firestoreAdmin = admin.firestore();