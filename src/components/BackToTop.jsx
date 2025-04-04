import { useState, useEffect } from 'react';
import style from '../styles/modules/BackToTop.module.css';

const BackToTop = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (scrollTop / docHeight) * 360;

            setIsVisible(scrollTop > 600);
            setScrollProgress(progress);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleClick = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <>
            {isVisible && (
                <div
                    className={style.wrapper}
                    style={{ '--progress': `${scrollProgress}deg` }}
                >
                    <button className={style.button} onClick={handleClick}>
                        <span className={`arrow ${style.green}`}></span>
                    </button>
                </div>
            )}
        </>
    );
};

export default BackToTop;
