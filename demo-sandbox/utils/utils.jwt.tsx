import jwt from "jsonwebtoken";

const ROLE = "ADMIN";
const SECRET_KEY = "eff0dc5014184aaa3da921774e4fc1466c76793845a9beb43d36582b5b914520";
const ALGORITHM = "HS256";
const MINUTES = 60;
const HOURS = 60 * MINUTES;
const DAY = 24 * HOURS;

const sign = (payload?: object) => {
    let now = Date.now();
    let iat = Math.floor(now / 1000);
    let accessExpire = Math.floor(now / 1000) + (3 * HOURS);
    let refreshExpire = Math.floor(now / 1000) + (7 * DAY);

    let accessToken = jwt.sign(
        {
            ...payload,
            role: ROLE,
            usage: "access",
            iat: iat,
            nbf: iat,
            exp: accessExpire
        },
        SECRET_KEY,
        {
            algorithm: ALGORITHM
        }
    );
    
    let refreshToken = jwt.sign(
        {
            ...payload,
            role: ROLE,
            usage: "refresh",
            iat: iat,
            nbf: iat,
            exp: refreshExpire
        },
        SECRET_KEY,
        {
            algorithm: ALGORITHM
        }
    );

    return {
        accessToken, refreshToken, accessExpire, refreshExpire
    };
}

const refresh = (token: string) => {
    let data = null;
    let code = "200";
    let message = "success";

    let payload = claims(token);
    
    if (payload.message !== "success") {
        code = "401";
        message = payload.message;
    }
    else if (payload?.data?.usage === 'refresh') {
        data = sign({ uid: payload.uid });
    }

    return {
        code,
        message,
        data
    }
}

const claims : any = (token: string) => {
    try {
        return {
            message: "success",
            data: jwt.verify(token, SECRET_KEY)
        };
    }
    catch (e: any) {
        return {
            message: e.message
        };
    }
}

const verify : any = (token: string) => claims(token)?.message === "success";
const claimsByKey : any = (token: string, key: string) => claims(token)?.data?.[key];

const JwtUtils = {
    sign,
    refresh,
    verify,
    claims,
    claimsByKey
}

export default JwtUtils;