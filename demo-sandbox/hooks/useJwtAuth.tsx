import JwtUtils from "@/utils/utils.jwt";
import { useEffect, useState } from "react";
import { Cookies } from "react-cookie";
import useLink from "./useLink";
import useAppStore from "@/stores/store.app";

const cookies = new Cookies();

const AuthType = {
    WAIT : "WAIT",
    AUTH : "AUTH"
}

/**
 * @hook useJwtAuth
 * @description
 * JwtAuth
 */
const useJwtAuth = () => {
    const { onLink } = useLink();
    const { setLoading } = useAppStore();
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

    const load = async (accessToken: string) => {
        setLoading(false);
    }

    const auth = async (data: any) => {
        const response = await fetch(
            "ApiUrl.SIGNIN",
            {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(data)
            }
        );
        if (response.status === 200) {
            const json = await response.json();
            if (json && json?.code === '200') {
                setToken({
                    accessToken: json?.data?.accessToken,
                    refreshToken: json?.data?.refreshToken,
                    accessTokenExpire: json?.data?.accessTokenExpire,
                    refreshTokenExpire: json?.data?.refreshTokenExpire
                });
                load(json?.data?.accessToken);
            }
            else {
                onLink("/");
            }
        }
        else {
            onLink("/");
        }
    }

    const refresh = async () => {
        const response = await fetch(
            "ApiUrl.REFRESH",
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
                    accessToken: json?.data?.accessToken,
                    refreshToken: json?.data?.refreshToken,
                    accessTokenExpire: json?.data?.accessTokenExpire,
                    refreshTokenExpire: json?.data?.refreshTokenExpire
                });
                load(json?.data?.accessToken);
            }
            else {
                signout();
            }
        }
    }

    const signout = () => {
        setAccessToken(undefined);
        setRefreshToken(undefined);
        cookies.remove("x-access-token");
        cookies.remove("x-refresh-token");
        setStatus(AuthType.WAIT);
        onLink("/");
    }

    useEffect(() => {
        if (status === AuthType.WAIT) {
            if (accessToken) {
                let verified = JwtUtils.verify(accessToken);
                
                if (!verified) {
                    if (refreshToken) {
                        refresh();
                    }
                    else {
                        signout();
                    }
                }
            }
            else {
                onLink("/");
            }
        }
        if (status === AuthType.AUTH) {
            onLink("/dashboard");
        }
    }, [accessToken, status])

    return {
        accessToken, refreshToken, status,
        auth, refresh, signout
    }
}

export default useJwtAuth;