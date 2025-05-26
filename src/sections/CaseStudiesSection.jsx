import React, { useState, useEffect } from 'react';
import CaseStudiesSlider from "../components/sliders/CaseStudiesSlider";
import { NavLink } from "react-router-dom";
import styles from '../styles/modules/CaseStudiesSection.module.css';
import { caseStudyService } from '../services/api';
const CaseStudiesSection = () => {

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await caseStudyService.getAll(1, '', true); // Get first page with publishedOnly=true
                if (!response || !Array.isArray(response.caseStudies)) {
                    throw new Error('Formatul răspunsului este invalid');
                }
                setPosts(response.caseStudies);
                setError(null);
            } catch (err) {
                console.error('Eroare la încărcarea studiilor de caz:', err);
                setError('Nu s-au putut încărca studiile de caz');
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    if (loading) {
        return <div className={styles.loading}>Se încarcă...</div>;
    }

    if (error) {
        return <div className={styles.error}>{error}</div>;
    }

    if (!posts.length) {
        return null;
    }

    return (
        <section className="whitebg layout">
            <div className="container caseStudies">
                <span className="smTitle">Studii de caz</span>
                <div className={`d-flex ${styles.containerMain}`}>
                    <div className={styles.container1}>
                        <h2 className={styles.title}>Cu RUMO,<br /> afacerile își iau avântul</h2>
                    </div>
                    <div className={styles.container2}>
                        <p className={styles.description}>De la vizibilitate la conversii! Studii de caz care demonstrează impactul strategiilor noastre digitale asupra afacerilor mici și mijlocii!</p>
                        <NavLink to="/studii-de-caz" className="linkCTA"><span>Vezi aici studiile de caz</span></NavLink>
                    </div>
                </div>
                <CaseStudiesSlider caseStudies={posts} />
            </div>
        </section>
    );

}

export default CaseStudiesSection;