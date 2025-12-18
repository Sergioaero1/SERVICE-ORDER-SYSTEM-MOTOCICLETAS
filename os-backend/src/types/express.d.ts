import * as admin from 'firebase-admin';

declare global {
  namespace Express {
    interface Request {
      // Define que o user pode ser o token decodificado do Firebase
      user?: admin.auth.DecodedIdToken;
    }
  }
}
