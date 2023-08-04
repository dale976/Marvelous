import axios from 'axios';
import * as CryptoJS from 'crypto-js';

const apiUrl = "https://gateway.marvel.com:443/v1/public/comics?";
const query = "&dateDescriptor=thisWeek&offset=0&limit=12&orderBy=issueNumber";

const getAuthorizationString = () => {
    // const ts = String.valueOf(new java.sql.Timestamp(System.currentTimeMillis()).getTime());
    const currentDate = new Date();
    const timestamp = currentDate.getTime();
    const marvelPublicApiKey = "73225e6e8cf745bf63eb46f1d3aba751";
    const marvelPrivateApiKey = "67d2d6228016f3c2109a8c47e37a4d850c98a7f2";
    // const hashedKey = getMD5(timestamp + marvelPrivateApiKey + marvelPublicApiKey);

    // const hashedKey = crypto.createHash('md5').update(timestamp + marvelPrivateApiKey + marvelPublicApiKey).digest('hex')
    const hash = CryptoJS.default.MD5(timestamp + marvelPrivateApiKey + marvelPublicApiKey);
    const hashedKey = hash.toString(CryptoJS.enc.Hex);
    console.log('HASHED KEY: ', hashedKey);
    return `ts=${timestamp}&apikey=${marvelPublicApiKey}&hash=${hashedKey}`;
}


export const getComics = async () => {
    const req = await axios.get(apiUrl + getAuthorizationString() + query);
    console.log('RESPONSE: ', req.data)
    return req.data;
}
