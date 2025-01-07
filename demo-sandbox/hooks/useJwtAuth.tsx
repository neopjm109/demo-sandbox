import JwtUtils from "@/utils/utils.jwt";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Cookies } from "react-cookie";

const cookies = new Cookies();

const AuthType = {
    WAIT : "WAIT",
    AUTH : "AUTH"
}

type AuthProps = {
    matcher: any,
    onAuthSuccess: Function,
    onAuthFailure: Function
}

/**
 * @hook useJwtAuth
 * @description
 * JwtAuth
 */
const useJwtAuth = (props?: AuthProps) => {
    const pathname = usePathname();
    const [ status, setStatus ] = useState(AuthType.WAIT)
    const [ accessToken, setAccessToken ] = useState(cookies.get("x-access-token"));
    const [ refreshToken, setRefreshToken ] = useState(cookies.get("x-refresh-token"));

    const setToken = (data: any) => {
        const {
            accessToken, refreshToken, accessExpire, refreshExpire
        } = data;
        setAccessToken(accessToken);
        setRefreshToken(refreshToken);
        cookies.set("x-access-token", accessToken, { expires: accessExpire, sameSite: 'lax', secure: true });
        cookies.set("x-refresh-token", refreshToken, { expires: refreshExpire, sameSite: 'lax', secure: true });
        setStatus(AuthType.AUTH);
    }

    const match = () => {
        console.log(pathname);
        if (props?.matcher) {
            for (let m of props.matcher) {
                console.log(m);
                if (pathname.indexOf(m) > -1 || RegExp(new RegExp(m)).exec(pathname)) {
                    return true;
                }
            }
            return false;
        }
        return true;
    }
    
    const auth = async (data: any) => {
        const response = await fetch(
            "/api/auth/request",
            {
                method: "POST",
                body: JSON.stringify(data)
            }
        );
        if (response.status === 200) {
            const json = await response.json();
            if (json) {
                setToken({
                    accessToken: json?.accessToken,
                    refreshToken: json?.refreshToken,
                    accessTokenExpire: json?.accessTokenExpire,
                    refreshTokenExpire: json?.refreshTokenExpire
                });
                props?.onAuthSuccess?.(json);
            }
        }
    }

    const refresh = async () => {
        const response = await fetch(
            "/api/auth/refresh",
            {
                method: "POST",
                headers: {
                    "x-refresh-token": refreshToken
                }
            }
        );
        if (response.status === 200) {
            const json = await response.json();
            if (json) {
                setToken({
                    accessToken: json?.accessToken,
                    refreshToken: json?.refreshToken,
                    accessTokenExpire: json?.accessTokenExpire,
                    refreshTokenExpire: json?.refreshTokenExpire
                });
                props?.onAuthSuccess?.(json);
            }
            else {
                signout(() => {
                    props?.onAuthFailure?.()
                });
            }
        }
    }

    const signout = (after?: Function) => {
        setAccessToken(undefined);
        setRefreshToken(undefined);
        cookies.remove("x-access-token");
        cookies.remove("x-refresh-token");
        after?.();
    }

    useEffect(() => {
        if (status === AuthType.WAIT && match()) {
            let verified = false;
            if (accessToken) {
                verified = JwtUtils.verify(accessToken);
            }
            
            if (!verified) {
                if (refreshToken) {
                    refresh();
                }
                else {
                    signout(() => {
                        props?.onAuthFailure?.()
                    });
                }
            }
        }
    }, [accessToken, status])

    return {
        accessToken, refreshToken, status,
        auth, refresh, signout
    }
}

export default useJwtAuth;