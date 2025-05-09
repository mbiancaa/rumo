import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { blogService } from '../services/api';
import BlogSlider from '../components/sliders/BlogSlider';
import styles from '../styles/modules/BlogSection.module.css';

const BlogSection = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await blogService.getAll(1); // Get first page with publishedOnly=true
                if (!response || !Array.isArray(response.blogs)) {
                    throw new Error('Formatul răspunsului este invalid');
                }
                setPosts(response.blogs);
                setError(null);
            } catch (err) {
                console.error('Error fetching posts:', err);
                setError('Nu s-a putut încărca articolele de blog');
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
        <section className="whitebg layout blog">
            <div className="container">
                <span className="smTitle">BLOG</span>
                <div className={`d-flex ${styles.mainContainer}`}>
                    <div className={styles.titleContainer}>
                        <h2 className={styles.title}>Subiecte de mare interes <span style={{ fontWeight: 900 }}>pentru antreprenori</span></h2>
                    </div>
                    <div className={styles.descriptionContainer}>
                        <p className={styles.description}>Poți într-adevăr să-ți resetezi afacerea sau s-o duci la următorul nivel prin serviciile de marketing online? <br />Vei găsi toate răspunsurile în articolele noastre de blog. Dacă nu citești, n-ai cum să înțelegi! 😃</p>
                        <NavLink to="/blog" className="linkCTA"><span>Citește articolele aici!</span></NavLink>
                    </div>
                </div>
                <BlogSlider posts={posts} />
            </div>
        </section>
    );
};

export default BlogSection;