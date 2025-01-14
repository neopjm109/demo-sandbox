import JwtUtils from "@/utils/utils.jwt";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { Cookies } from "react-cookie";

enum AuthStatus {
    WAIT = "WAIT",
    AUTH = "AUTH"
}

class JwtStates {
    accessToken: string | undefined;
    refreshToken: string | undefined;
    status: AuthStatus = AuthStatus.WAIT;
    auth = (data: any, onSuccess?: Function, onFailure?: Function) => {};
    refresh = () => {};
    signout = (after?: Function) => {};
}

const cookies = new Cookies();

const JwtContext = React.createContext<JwtStates>(new JwtStates());
const useJwtContext = () => {
    return useContext(JwtContext);
}

const JwtProvider = ({ children }: any) => {
    const [ accessToken, setAccessToken ] = useState<any>(cookies.get("x-access-token"));
    const [ refreshToken, setRefreshToken ] = useState<any>(cookies.get("x-refresh-token"));
    const [ status, setStatus ] = useState<any>(AuthStatus.WAIT);

    const setToken = (data: any) => {
        const {
            accessToken, refreshToken, accessExpire, refreshExpire
        } = data;
        setAccessToken(accessToken);
        setRefreshToken(refreshToken);
        cookies.set("x-access-token", accessToken, { expires: accessExpire, sameSite: 'lax', secure: true });
        cookies.set("x-refresh-token", refreshToken, { expires: refreshExpire, sameSite: 'lax', secure: true });
        setStatus(AuthStatus.AUTH);
    }

    const auth = async (data: any, onSuccess?: Function, onFailure?: Function) => {
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
                setToken(json?.data);
                onSuccess?.(json?.data);
            }
            else {
                onFailure?.();
            }
        }
        else {
            onFailure?.();
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
                setToken(json?.data);
            }
            else {
                signout();
            }
        }
    }

    const signout = (after?: Function) => {
        setAccessToken(undefined);
        setRefreshToken(undefined);
        cookies.remove("x-access-token");
        cookies.remove("x-refresh-token");
        setStatus(AuthStatus.WAIT);
        if (after) after?.();
        else location.href = "/";
    }

    const value = useMemo(() => {
        return {
            accessToken, refreshToken, status,
            auth, refresh, signout
        }
    }, [ accessToken, refreshToken, status]);

    useEffect(() => {
        if (status === AuthStatus.WAIT) {
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
            else if (refreshToken) {
                refresh();
            }
        }
    }, [accessToken, status])

    return (
        <JwtContext.Provider value={ value }>
            { children }
        </JwtContext.Provider>
    );
}

export {
    JwtContext, JwtProvider, useJwtContext
}