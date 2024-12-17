import jwt, { SignOptions } from 'jsonwebtoken';
import { cookies } from 'next/headers';

const TYPE = "JWT";
const ROLE = "";
const SECRET_KEY = "0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef";      //64자리
const ALGORITHM = "HS256";
const MINUTE = 60;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

const claims = (usage: string, iat: number, data?: any): any => {
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

const generate = (data?: any) => {
    let now = Date.now();
    let iat = Math.floor(now / 1000);
    let accessExpires = iat + (3 * HOUR);
    let refreshExpires = iat + (7 * DAY);

    let accessToken = jwt.sign(
        claims("access", iat, data),
        SECRET_KEY,
        options(data?.uid, accessExpires)
    );
    let refreshToken = jwt.sign(
        claims("refresh", iat, data),
        SECRET_KEY,
        options(data?.uid, refreshExpires)
    );

    let cookieStore = cookies();
    cookieStore.set("x-access-token", accessToken);
    cookieStore.set("x-refresh-token", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: refreshExpires
    });

    return {
        accessToken, refreshToken, accessExpires, refreshExpires
    }
}

const refresh = (token: string) => {
    try {
        let decoded: any = jwt.verify(token, SECRET_KEY);
        if (decoded.usage === "refresh") {
            return generate({ uid: decoded.uid });
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

const verify = (token: string): any => {
    try {
        let decoded = jwt.verify(token, SECRET_KEY);
        return {
            "result": "success",
            "data": decoded
        }
    }
    catch (e: any) {
        return {
            "result": e.message
        }
    }
}

const validate = (key: string, onSuccess: Function, onFailure: Function) => {
    let cookieStore = cookies();
    let token: any = cookieStore.get(key);
    let verified: any = verify(token?.value);
    if (verified.result === "success") {
        onSuccess();
    }
    else {
        onFailure(verified.result);
    }
}

const auth = () => {
    let result : { code: string, message: string, data?: object } = { code: "", message: ""};
    let cookieStore = cookies();
    validate(
        "x-access-token",
        () => {
            result = {
                code: "200",
                message: "success",
                data: {
                    accessToken: cookieStore.get("x-access-token"),
                    refreshToken: cookieStore.get("x-access-token")
                }
            }
        },
        () => {
            validate(
                "x-refresh-token",
                () => {
                    let tokens = generate();
                    result = {
                        code: "200",
                        message: "success",
                        data: {
                            accessToken: tokens.accessToken,
                            refreshToken: tokens.refreshToken
                        }
                    }
                },
                (message?: string) => {
                    result = {
                        code: "401",
                        message: message ?? "Not authorized"
                    }
                }
            )
        }
    )
    return result;
}

const JwtUtils = {
    generate,
    refresh,
    verify,
    auth
}

export default JwtUtils;