
import admin, { type ServiceAccount } from 'firebase-admin';

/**/
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: import.meta.env.FIREBASE_PROJECT_ID,
      privateKey: import.meta.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'), // Firebase requiere que las nuevas líneas en la private key sean reales
      clientEmail: import.meta.env.FIREBASE_CLIENT_EMAIL,
    }),
  });
}

export const auth = admin.auth();
export const firestoreAdmin = admin.firestore();