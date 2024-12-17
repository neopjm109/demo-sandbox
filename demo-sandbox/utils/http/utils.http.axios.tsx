import axios from "axios";
import { Cookies } from "react-cookie";

const instance = axios.create({
    baseURL: "http://localhost:8888"
})

instance.interceptors.request.use((config) => {
    let cookies = new Cookies();
    let accessToken = cookies.get("x-access-token");

    if (accessToken) {
        config.headers["Authorization"] = `Bearer ${accessToken}`
    }
    return config;
});

instance.interceptors.response.use((config) => {
    return config;
}, async (error) => {
    const { config, response: { status, data }} = error;
    if (status === 401 && data.code === "401") {
        const tokenRefreshResponse = await instance.post("/refresh");
        if (tokenRefreshResponse.status === 200) {
            // const { accessToken } = tokenRefreshResponse.data;
            return instance(config);
        }
    }

    return Promise.reject(error);
})

export default instance;