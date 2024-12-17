import { useEffect } from "react"

const lock = () => {
    history.go(1);
}

export function useHistoryBackLock() {
    useEffect(() => {
        history.pushState(null, '', location.href);
        window.addEventListener("popstate", lock);
        return () => window.removeEventListener("popstate", lock)
    }, [])
}