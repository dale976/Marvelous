import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'marvelous';

export const storeData = async (value) => {
    console.log('SAVE : ', value)
    try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
    } catch (e) {
        // saving error
        console.log('Error: ', e)
    }
};

export const getData = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
        console.log("GET :", jsonValue)
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        // error reading value
    }
};
