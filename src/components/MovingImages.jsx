import { useState, useEffect } from 'react';
import AgencyImg1 from '../assets/home/agency-img1.jpg';
import AgencyImg2 from '../assets/home/agency-img2.jpg';
import styles from '../styles/modules/MovingImages.module.css';

const MovingImages = () => {
    const [scrollOffset, setScrollOffset] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            let offsY =
                window.scrollY / 70 > 100 || window.scrollY / 70 < -100
                    ? 40
                    : window.scrollY / 70;
            setScrollOffset(offsY);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="flexContainer d-flex">
            <div className={`p-relative ${styles.imageOneContainer}`}>
                <img
                    src={AgencyImg1}
                    className={styles.imageOne}
                    style={{ marginTop: (-scrollOffset) * 2 }}
                    alt="RUMO Digital Path - Imagine agenție marketing digital"
                    loading="lazy"
                    decoding="async"
                />
                <span className={styles.reversed}>Your Digital Path</span>
            </div>
            <img
                src={AgencyImg2}
                className={styles.imageTwo}
                style={{ marginTop: scrollOffset * 2 }}
                alt="RUMO Digital Path - Servicii marketing digital"
                loading="lazy"
                decoding="async"
            />
        </div>
    );
};

export default MovingImages;
