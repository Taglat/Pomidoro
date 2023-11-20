import { useCallback, useEffect, useRef, useState } from "react";

export default function useCountdown({minutes, onStart, onStop, onComplete}) {
    const timerId = useRef(null);
    const time = minutes; 
    const [timeLeft, setTimeLeft] = useState(time);
    const [ticking, setTicking] = useState(false); 

    const clear = () => {
        clearInterval(timerId.current);
        timerId.current = null; 
    }

    const tick = useCallback(() => {
        if (timeLeft > 0) {
            setTimeLeft(timeLeft - 1);
        }
        if (timeLeft <= 1) {
            setTicking(false);
            clear(); 
            onComplete?.();
        }
    }, [onComplete, timeLeft]);

    useEffect(() => {
        if (ticking) {
            timerId.current = setInterval(tick, 1000);
        } else {
            clear();
        }

        return clear;
    }, [tick, ticking]);

    useEffect(() => {
        setTimeLeft(time);
    }, [time])

    const start = useCallback(() => {
        setTicking(true);
        onStart?.(); 
    }, [onStart]);

    const stop = useCallback(() => {
        setTicking(false);
        onStop?.()
    }, [onStop]);

    const reset = useCallback(() => {
        setTicking(false);
        onStop?.();
        setTimeLeft(time)
    }, [onStop]);

    return {
        start,
        stop,
        reset,
        ticking,
        timeLeft,
    }
} 