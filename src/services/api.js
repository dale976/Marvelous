import axios from 'axios';
import * as CryptoJS from 'crypto-js';
import {mockComics} from '../mocks/mockComics';
import {mockCharacters} from '../mocks/mockCharacters';

const PRODUCTION = false;
const apiUrl = "https://gateway.marvel.com:443/v1/public";
console.log("PRODUCTION: ", PRODUCTION);

const getAuthorizationString = () => {
    const currentDate = new Date();
    const timestamp = currentDate.getTime();
    const marvelPublicApiKey = "73225e6e8cf745bf63eb46f1d3aba751";
    const marvelPrivateApiKey = "67d2d6228016f3c2109a8c47e37a4d850c98a7f2";
    const hash = CryptoJS.default.MD5(timestamp + marvelPrivateApiKey + marvelPublicApiKey);
    const hashedKey = hash.toString(CryptoJS.enc.Hex);
    // console.log('HASHED KEY: ', hashedKey);

    return `ts=${timestamp}&apikey=${marvelPublicApiKey}&hash=${hashedKey}`;
}


export const getThisWeeksComics = async () => {
    if (PRODUCTION) {
        const query = "&dateDescriptor=thisWeek&offset=0&limit=12&orderBy=issueNumber";
        const req = await axios.get(`${apiUrl}/comics?${getAuthorizationString()}${query}`);
        return req.data;
    } else {
        return mockComics;
    }

}

export const getComicById = async (id) => {
    const req = await axios.get(`${apiUrl}/comics/${id}?${getAuthorizationString()}`);
    return req.data;
}

export const getPopularCharacters = async () => {
    if (PRODUCTION) {
        const query = "&orderBy=-modified&limit=12";
        const req = await axios.get(`${apiUrl}/events/238/characters?${getAuthorizationString()}${query}`);
        return req.data;
    } else {
        return mockCharacters;
    }
}

export const getCharacters = async (id) => {
    if(PRODUCTION) {
        const query = "&orderBy=-modified&limit=12";
        const req = await axios.get(`${apiUrl}/comics/${id}/characters?${getAuthorizationString()}${query}`);
        return req.data;
    } else {
        return mockCharacters;
    }

}

export const getLatestEvents = async () => {
    const query = "&orderBy=-modified&limit=12";
    const req = await axios.get(`${apiUrl}/series?${getAuthorizationString()}${query}`);
    return req.data;
}

export const getStories = async (id) => {
    const req = await axios.get(`${apiUrl}/stories/${id}?${getAuthorizationString()}`);
    return req.data;
}

export const searchComics = async (title) => {
    const query = `&titleStartsWith=${title}&offset=0&limit=20`;
    const req = await axios.get(`${apiUrl}/comics?${getAuthorizationString()}${query}`);
    return req.data;
}
