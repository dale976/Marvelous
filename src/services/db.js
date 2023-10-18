import {collection, doc, getDocs, setDoc, updateDoc} from 'firebase/firestore/lite';
import {FIREBASE_DB} from '../../FirebaseConfig';

export const getUsers = async () => {
    const usersCol1 = collection(FIREBASE_DB, 'users');
    const usersSnapshot = await getDocs(usersCol1);
    const userList = usersSnapshot.docs.map(doc => doc.data());
}

export const getUser = async (uid) => {
    const usersCol1 = collection(FIREBASE_DB, 'users');
    const usersSnapshot = await getDocs(usersCol1);
    const users = usersSnapshot.docs.map(doc => doc.data());
    return users.find(u => u.uid === uid);
}

export const setUser = async (uid) => {
    const docData = {
        uid: uid,
        displayName: '',
        favourites: [],
        avatar: '',
    };
    await setDoc(doc(FIREBASE_DB, "users", "user"), docData);
}

export const updateUser = async (uid, {displayName, avatar, favourites}) => {
    const docData = {
        uid: uid,
        displayName,
        favourites: favourites || [],
        avatar,
    };
    await updateDoc(doc(FIREBASE_DB, "users", "user"), docData);
}
