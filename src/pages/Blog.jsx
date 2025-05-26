import '../styles/Home.css';
import '../styles/About.css';

import '../styles/Blog.css';
import '../styles/Pagination.css';
import '../styles/Filters.css';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { BarLoader } from 'react-spinners';

import { blogService, pageService } from '../services/api';

import Header from '../components/Header';
import Footer from '../components/Footer';
import HeroSection from '../sections/HeroSection';
import BlogBox from '../components/BlogBox';
import MottoBgImageAnimation from '../components/MottoBgImageAnimation';
import Pagination from '../components/Pagination';

import useInView from '../hooks/useInView';
import SEO from '../components/SEO';

const Blog = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [textRef, textInView] = useInView(100);
    const [subtitleRef, subtitleInView] = useInView(600);
    const [descriptionRef, descriptionInView] = useInView(650);
    const [separatorRef, separatorInView] = useInView(350);
    const [posts, setPosts] = useState([]);
    const [pageContent, setPageContent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(parseInt(searchParams.get('page')) || 1);
    const [totalPages, setTotalPages] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');

    const categories = [
        'Advertising',
        'Branding',
        'Marketing',
        'SEO',
        'PPC',
        'Social Media Marketing',
        'Web Development'
    ];

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            
            try {
                const blogData = await blogService.getAll(currentPage, selectedCategory, true);
                setPosts(blogData.blogs);
                setTotalPages(blogData.totalPages || 1);
            } catch (err) {
                console.error('Error fetching blog posts:', err);
                setPosts([]);
                setTotalPages(1);
                setError("Eroare la încărcarea articolelor blog. Reîncercați mai târziu.");
            }

            try {
                const pageData = await pageService.getBySlug('blog');
                setPageContent(pageData);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching page content:', err);
                setLoading(true);
            }
            
        };

        fetchData();
    }, [currentPage, selectedCategory]);

    const handleCategoryClick = (category) => {
        const newParams = new URLSearchParams(searchParams);
        if (category) {
            newParams.set('category', category);
        } else {
            newParams.delete('category');
        }
        newParams.set('page', '1');
        setSearchParams(newParams);
        setSelectedCategory(category);
        setCurrentPage(1);
    };

    const handlePageChange = (page) => {
        const newParams = new URLSearchParams(searchParams);
        newParams.set('page', page.toString());
        setSearchParams(newParams);
        setCurrentPage(page);
    };

    return (
        <>
            <SEO 
                title={pageContent?.metaTitle || pageContent?.name || "Blog RUMO"}
                description={pageContent?.metaDescription || "Blog RUMO - resurse și articole despre marketing digital, SEO, PPC, social media și dezvoltare web pentru IMM-uri."}
            />
            {loading && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    zIndex: 9999
                }}>
                    <BarLoader
                        color="#26b3ff"
                        width="100%"
                        height={4}
                        loading={loading}
                    />
                </div>
            )}
            <Header />
            <>
                <HeroSection>
                    <div className="layout eq-columns">
                        <div className={`eq-column`}>
                            <div ref={textRef} className={`slideInTextAnimation ${textInView ? "show" : ""}`}>
                                <h1 className="hero-title">{pageContent?.name}</h1>
                            </div>
                            <div ref={subtitleRef} className={`slideInTextAnimation ${subtitleInView ? "show" : ""}`}>
                                <h2 className="hero-subtitle">Cu RUMO, afacerea ta prinde avânt!</h2>
                            </div>
                        </div>
                        <div ref={separatorRef} className={`eq-column separator ${separatorInView ? "show" : ""}`}>
                            <div ref={descriptionRef} className={`slideInTextAnimation ${descriptionInView ? "show" : ""}`}>
                                {pageContent?.upperContent && (
                                    <div dangerouslySetInnerHTML={{ __html: pageContent.upperContent }} />
                                )}
                            </div>
                        </div>
                    </div>
                </HeroSection>
                <MottoBgImageAnimation />
                <section className="whitebg layout">
                    <div className="container">
                        <div className="filters">
                            <span
                                className={`category-button ${!selectedCategory ? 'active' : ''}`}
                                onClick={() => handleCategoryClick('')}
                            >
                                Toate
                            </span>
                            {categories.map((category) => (
                                <span
                                    key={category}
                                    className={`category-button ${selectedCategory === category ? 'active' : ''}`}
                                    onClick={() => handleCategoryClick(category)}
                                >
                                    {category}
                                </span>
                            ))}
                        </div>
                        <div className="blog-container">
                            {loading ? (
                                <div className="loading">Se încarcă...</div>
                            ) : error ? (
                                <div className="error">{error}</div>
                            ) : posts.length === 0 ? (
                                <div>Nu există articole disponibile.</div>
                            ) : (
                                posts.map((post) => (
                                    <BlogBox 
                                        key={post.id}
                                        post={post}
                                    />
                                ))
                            )}
                        </div>
                        {totalPages > 1 && (
                            <Pagination 
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={handlePageChange}
                            />
                        )}
                        {pageContent?.lowerContent && (
                            <div style={{ marginTop: 60, marginBottom: 60 }}
                            className="text-content-container"
                            dangerouslySetInnerHTML={{ __html: pageContent.lowerContent }}
                            />
                        )}
                    </div>
                </section>
            </>
            <Footer />
        </>
    );
}

export default Blog;