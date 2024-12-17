import { useEffect, useRef } from "react";

const useInterval = (callback?: any, delay?: number) => {
    const savedCallback = useRef<any>();
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
        function tick() {
            savedCallback?.current();
        }

        if (null !== delay) {
            let id = setInterval(tick, delay ?? 5000);
            return () => clearInterval(id);
        }
    }, [delay])
}

export default useInterval;