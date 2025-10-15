import {
  createUserWithEmailAndPassword,
  getAuth,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut
} from '@react-native-firebase/auth';

const auth = getAuth();

export const firebaseAuthService = {
  async signIn(email: string, password: string) {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  },

  async register(email: string, password: string) {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  },

  async logout() { await signOut(auth) },

 async resetPassword(email: string) {
    await sendPasswordResetEmail(auth, email);
  },

};
