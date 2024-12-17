import CryptoJS from "crypto-js";

export const encrypt = (key: string, iv: string, plainText:any) => {
    return CryptoJS.AES.encrypt(
        plainText,
        CryptoJS.enc.Utf8.parse(key),
        {
            iv: CryptoJS.enc.Utf8.parse(iv),
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        }
    ).toString();
}

export const decrypt = (key: string, iv: string, encrypted:any) => {
    return CryptoJS.AES.decrypt(
        encrypted,
        CryptoJS.enc.Utf8.parse(key),
        {
            iv: CryptoJS.enc.Utf8.parse(iv),
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        }
    ).toString(CryptoJS.enc.Utf8);
}