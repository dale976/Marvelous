import {createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from '@firebase/auth';
import {FIREBASE_AUTH} from '../../FirebaseConfig';

let signedIn = false;

export const isSignedIn = () => signedIn;

export const signIn = async (email, password) => {
    try {
        await signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
        signedIn = true;
    } catch (error) {
        signedIn = false;
        console.log(error);
        alert('Sign in failed: ' + error.message);
    }
}

export const signUp = async (email, password) => {
    try {
        const response = await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);
        console.log(response);
        alert('Account created! Check your emails!');
    } catch (error) {
        console.log(error)
        alert('Signup Failed: ' + error.message);
    }
}

export const logout = async () => {
    await signOut(FIREBASE_AUTH);
}
