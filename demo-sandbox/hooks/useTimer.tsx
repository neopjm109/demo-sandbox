import { useEffect, useState } from "react";

export default function useTimer(time: any) {
    const [ current, setCurrent ] = useState(time);
    const [ status, setStatus ] = useState("WAIT");

    useEffect(() => {
        let id: any;
        if (status === "START") {
            id = setInterval(tick, 1000);
        }
        return () => clearInterval(id)
    }, [status]);

    function tick() {
        setCurrent((state: any) => {
            state = state - 1;
            if (state === 0) {
                setStatus("STOP");
            }
            return state;
        });
    }
    
    const start = () => {
        setStatus("START");
    }

    const pause = () => {
        setStatus("PAUSE");
    }
    
    const reset = () => {
        setStatus("START");
        setCurrent(time);
    }

    const stop = () => {
        setStatus("STOP");
        setCurrent(time);
    }

    return {
        current,
        start,
        pause,
        reset,
        stop
    }
}