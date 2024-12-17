import { Cookies } from "react-cookie";

type RequestConfig = {
    baseUrl?: string
}

const requestHeaders = (headers: any): any => {
    let cookies = new Cookies();
    let accessToken = cookies.get("x-access-token");
    
    if (accessToken) {
        headers["Authorization"] = `Bearer ${accessToken}`
    }
    return headers;
}

const failure = async (res: Response, reload: any): Promise<any> => {
    const { status, statusText } = res;
    if (status === 401 && statusText === "401") {
        await fetch("/refresh");
        if (reload.options.method === "POST") {
            request.post(reload.url, reload.options);
        }
        else {
            request.get(reload.url, reload.options);
        }
    }
}

const response = (res: Response, reload?: any): Promise<any> => {
    if (res.ok) return res.json();
    return failure(res, reload);
}

const run = async (url: string, options?: any) => {
    return response(
        await fetch(
            url,
            {
                ...options,
                headers: requestHeaders(options?.headers)
            }
        ),
        {
            url, options
        }
    )
}

const create = (config?: RequestConfig) => {
    return {
        get: async (url: string, options?: any): Promise<any> => await run(`${config?.baseUrl}${url}`, { ...options, method: "GET"}),
        post: async (url: string, options?: any): Promise<any> => await run(`${config?.baseUrl}${url}`, { ...options, method: "POST"})
    }
}

const request = create({
    baseUrl: "http://localhost:8888"
});

export default request;