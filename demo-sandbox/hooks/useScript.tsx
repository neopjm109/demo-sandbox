'use client';

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * @hook useScript
 * @description
 * 외부 스크립트를 호출할 때 쓰며, 해당 파일은 digitalData.js 만 국한된다.
 */
const useScript = (src: string, after?: any) => {
    const pathname = usePathname();
    useEffect(() => {
        const script = document.createElement("script");
        script.src = src;
        script.async = true;
        document.body.appendChild(script);
        script.onload = () => {
            after?.();
        }

        return () => {
            document.body.removeChild(script);
        }
    }, [pathname])
}

export default useScript;