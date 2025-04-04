import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';

const useLenis = () => {
    useEffect(() => {
        const isMobile = /Mobi|Android/i.test(navigator.userAgent); // Check if it's mobile device
        if (isMobile) return; // Skip Lenis if it's a mobile device

        const lenis = new Lenis({
            duration: 1.2, // Control speed of scroll
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Easing function
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        // Cleanup on unmount
        return () => {
            lenis.destroy();
        };
    }, []);
};

export default useLenis;
