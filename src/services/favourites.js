import {getUser, updateUser} from './db';
import {getUserInstance} from './auth';

export const containsFavourite = async (id) => {
    const user = await getUser(getUserInstance().uid);
    const found = user.favourites.find(f => f.id === id);
    return !!found;
}

export const getFavourites = async () => {
    const user = await getUser(getUserInstance().uid);
    return user?.favourites;
}

export const setFavourites = async (favourites) => {
    const uid = await getUserInstance().uid;
    await updateUser(uid, {
        favourites: favourites
    })
}
