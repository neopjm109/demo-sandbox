import { useEffect } from "react"

const lock = () => {
    history.go(1);
}

/**
 * @hook useHistoryBackLock
 * @description
 * 뒤로 가기 방지
 */
const useHistoryBackLock = () => {
    useEffect(() => {
        history.pushState(null, '', location.href);
        window.addEventListener("popstate", lock);
        return () => window.removeEventListener("popstate", lock)
    }, [])
}

export default useHistoryBackLock;