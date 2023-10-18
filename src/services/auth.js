import {createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from '@firebase/auth';
import {FIREBASE_AUTH} from '../../FirebaseConfig';
import {setUser} from './db';

let userInstance;
console.log('User Instance', userInstance)


export const getUserInstance = () => userInstance;

export const signIn = async (email, password) => {
    try {
        await signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
        userInstance = FIREBASE_AUTH.currentUser;
    } catch (error) {
        userInstance = undefined;
        console.log(error);
        alert('Sign in failed: ' + error.message);
    }
}

export const signUp = async (email, password) => {
    try {
        const response = await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);
        console.log(response?.user?.uid);
        await setUser(response?.user?.uid);
        userInstance = FIREBASE_AUTH.currentUser;
        alert('Account created! Check your emails!');
    } catch (error) {
        console.log(error)
        alert('Signup Failed: ' + error.message);
    }
}

export const logout = async () => {
    await signOut(FIREBASE_AUTH);
}
