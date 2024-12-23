'use client';

import useAppStore from "@/stores/store.app";
import instance from "@/utils/http/utils.http.axios";
import { BooleanUtils } from "@/utils/utils.common";
import { useEffect } from "react";
import { Cookies } from "react-cookie";

const Authenticator = ({ children } : { children?: React.ReactNode }) => {
    const { setLoading } = useAppStore();

    const load = async () => {
        const cookies = new Cookies();
        const accessToken = cookies.get("x-access-token");

        // 비어있으면 refresh 실행
        if (BooleanUtils.isEmpty(accessToken)) {
            // await instance.post("/api/auth/refresh");
        }

        // const res = await instance.post("/api/admin/info");
        // setInfo(res.data.data);

        setLoading(false);
    }

    useEffect(() => {
        load();
    }, []);
    
    return children;
}

export default Authenticator;