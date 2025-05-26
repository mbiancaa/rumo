import '../styles/Home.css';
import '../styles/About.css';
import '../styles/Pagination.css';
import '../styles/CaseStudyBox.css';
import '../styles/Filters.css';

import { useState, useEffect } from 'react';
import { BarLoader } from 'react-spinners';
import { caseStudyService, pageService } from '../services/api';

import Header from '../components/Header';
import Footer from '../components/Footer';

import HeroSection from '../sections/HeroSection';
import CaseStudyBox from '../components/CaseStudyBox';
import MottoBgImageAnimation from '../components/MottoBgImageAnimation';
import Pagination from '../components/Pagination';

import useInView from '../hooks/useInView';
import SEO from '../components/SEO';

const CaseStudies = () => {
    const [textRef, textInView] = useInView(100);
    const [subtitleRef, subtitleInView] = useInView(600);
    const [descriptionRef, descriptionInView] = useInView(650);
    const [separatorRef, separatorInView] = useInView(350);
    
    const [caseStudies, setCaseStudies] = useState([]);
    const [pageContent, setPageContent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            
            try {
                const caseStudiesData = await caseStudyService.getAll(currentPage, '', true);
                setCaseStudies(caseStudiesData.caseStudies);
                setTotalPages(caseStudiesData.totalPages);
            } catch (err) {
                console.error('Error fetching case studies:', err);
                setCaseStudies([]);
                setTotalPages(1);
                setError("Eroare la încărcarea studiilor de caz. Reîncercați mai târziu.");
            }

            try {
                const pageData = await pageService.getBySlug('studii-de-caz');
                setPageContent(pageData);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching page content:', err);
                setLoading(true);
            }

            setLoading(false);
        };

        fetchData();
    }, [currentPage]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <>
            <SEO 
                title={pageContent?.metaTitle || pageContent?.name || "Studii de Caz RUMO"}
                description={pageContent?.metaDescription || "Descoperă studiile de caz RUMO și vezi cum am ajutat afaceri mici și mijlocii să-și atingă obiectivele prin strategii de marketing digital personalizate."}
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
                    
                    <div className="caseStudies-container">
                        {loading ? (
                            <div>Se încarcă studiile de caz...</div>
                        ) : error ? (
                            <div>{error}</div>
                        ) : caseStudies.length === 0 ? (
                            <div>Nu există studii de caz disponibile.</div>
                        ) : (
                            caseStudies.map((caseStudy) => (
                                <CaseStudyBox 
                                    key={caseStudy.id}
                                    post={caseStudy}
                                />
                            ))
                        )}
                    </div>
                    {!loading && !error && caseStudies.length > 0 && (
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
            <Footer />
        </>
    );
}

export default CaseStudies;