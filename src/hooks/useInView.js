import { useState, useRef, useCallback } from "react";

const useInView = (delay = 0, refresh = false, threshold = 0) => {
    const [isInView, setIsInView] = useState(false);
    const observerRef = useRef(null);

    const refCallback = useCallback((node) => {
        // Clean up any existing observer
        if (observerRef.current) {
            observerRef.current.disconnect();
        }

        if (node) {
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

            observerRef.current.observe(node);
        }
    }, [delay, refresh, threshold]);

    return [refCallback, isInView];
};

export default useInView;
