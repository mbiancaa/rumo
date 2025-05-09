import React from 'react';
import { NavLink } from 'react-router-dom';

import MovingImages from '../components/MovingImages';

import styles from '../styles/modules/HeroContactSection.module.css';

import backgroundImg from '../assets/home/home-rumo-background.jpg';

const HeroContactSection = () => {

    return (
        <section style={{ backgroundImage: `url(${backgroundImg})` }}
            className={`darkbg darkOverlay layout imgEffect ${styles.heroSection}`}
        >
            <div
                className={`content container d-flex ${styles.contentWrapper}`}
            >
                <MovingImages />
                <div className={`flexContainer p-relative ${styles.textContainer}`}>
                    <h2 className={styles.title}>
                        Dezvoltarea afacerii tale prin marketing online strategic.
                    </h2>
                    <p className={styles.subtitle}>
                        Ajutăm afacerile mici și mijlocii să devină mari!
                    </p>
                    <NavLink to="/contact" className={`CTA_darkbg ${styles.button}`}>
                        Contactează-ne!
                    </NavLink>
                    <span className={styles.experienceBadge}>
                        <span className="highlightedBorder">+5</span> ani experiență
                    </span>
                </div>
            </div>
        </section>
    );
};

export default HeroContactSection;
