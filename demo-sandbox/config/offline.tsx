'use client';

import { useEffect } from "react";

const OfflineObserver = ({
    online, offline, children
}: {
    online: Function,
    offline: Function,
    children: React.ReactNode
}) => {
    const checkOnline = () => online?.();
    const checkOffline = () => offline?.();

    useEffect(() => {
        window.addEventListener("online", checkOnline);
        window.addEventListener("offline", checkOffline);

        return () => {
            window.removeEventListener("online", checkOnline);
            window.removeEventListener("offline", checkOffline);
        }
    });
    
    return children
}

export default OfflineObserver;