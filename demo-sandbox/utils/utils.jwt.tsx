import jwt, { SignOptions } from 'jsonwebtoken';

const TYPE = "JWT";
const ROLE = "";
const SECRET_KEY = "0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef";      //64자리
const ALGORITHM = "HS256";
const MINUTE = 60;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

const payload = (usage: string, iat: number, data?: any): any => {
    return {
        typ: TYPE,
        role: ROLE,
        ...data,
        iat,
        usage
    }
}

const options = (uid?: any, expiresIn?: number): SignOptions => {
    return {
        audience: uid ?? "0",
        algorithm: ALGORITHM,
        expiresIn
    }
}

const sign = (data?: any) => {
    let now = Date.now();
    let iat = Math.floor(now / 1000);
    let accessExpires = iat + (3 * HOUR);
    let refreshExpires = iat + (7 * DAY);

    let accessToken = jwt.sign(
        payload("access", iat, data),
        SECRET_KEY,
        options(data?.uid, accessExpires)
    );
    let refreshToken = jwt.sign(
        payload("refresh", iat, data),
        SECRET_KEY,
        options(data?.uid, refreshExpires)
    );

    return {
        accessToken, refreshToken, accessExpires, refreshExpires
    }
}

const refresh = (token: string) => {
    try {
        let payload: any = claims(token);
        if (payload.usage === "refresh") {
            return sign({ uid: payload.uid });
        }
        return {
            "result": "not refresh token"
        }
    }
    catch (e: any) {
        return {
            "result": e.message
        }
    }
}

const claims = (token: string): any => jwt.verify(token, SECRET_KEY);
const claimsByKey = (token: string, key: string): any => claims(token)?.[key];

const verify = (token: string): any => {
    try {
        let decoded: any = claims(token);
        return decoded !== null;
    }
    catch (e: any) {
    }
    return null;
}

const JwtUtils = {
    sign,
    refresh,
    verify,
    claims,
    claimsByKey
}

export default JwtUtils;