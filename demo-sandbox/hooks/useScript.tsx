'use client';

import { usePathname } from "next/navigation";
import { useEffect } from "react";

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