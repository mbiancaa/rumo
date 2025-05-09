import { useState, useEffect, useRef, useCallback } from "react";

const useInView = (delay = 0, refresh = false, threshold = 0) => {
    const [isInView, setIsInView] = useState(false);
    const ref = useRef(null);
    const observerRef = useRef(null);

    useEffect(() => {
        if (!ref.current) return;

        observerRef.current = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        setIsInView(true);
                    }, delay);
                } else if (refresh) {
                    setIsInView(false);
                }
            },
            { threshold }
        );

        observerRef.current.observe(ref.current);

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
        };
    }, [delay, refresh, threshold]);

    return [ref, isInView];
};

export default useInView;
