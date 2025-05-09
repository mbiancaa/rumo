import '../styles/Home.css';
import '../styles/About.css';
import style from '../styles/modules/Team.module.css';
import { useState, useEffect } from 'react';
import { teamMemberService, pageService } from '../services/api';

import Header from '../components/Header';
import Footer from '../components/Footer';

import HeroSection from '../sections/HeroSection';

import useInView from '../hooks/useInView';
import SEO from '../components/SEO';

const Team = () => {
    const [textRef, textInView] = useInView(100);
    const [subtitleRef, subtitleInView] = useInView(600);
    const [descriptionRef, descriptionInView] = useInView(650);
    const [separatorRef, separatorInView] = useInView(350);
    const [teamMembers, setTeamMembers] = useState([]);
    const [pageContent, setPageContent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [members, pageData] = await Promise.all([
                    teamMemberService.getAll(),
                    pageService.getBySlug('echipa')
                ]);
                setTeamMembers(members);
                setPageContent(pageData);
                setError(null);
            } catch (err) {
                console.error('Error fetching data:', err);
                setError('Failed to load data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Helper function to get the full image URL
    const getImageUrl = (imagePath) => {
        if (!imagePath) return '';
        if (imagePath.startsWith('http') || imagePath.startsWith('data:')) {
            return imagePath;
        }
        return `${process.env.REACT_APP_URL || 'http://localhost:5002'}${imagePath}`;
    };

    return (
        <>
            <SEO 
                title={pageContent?.metaTitle || pageContent?.name || "Echipa RUMO"}
                description={pageContent?.metaDescription || "Cunoaște echipa RUMO - profesioniști dedicați care transformă ideile tale în strategii de succes pentru afacerea ta."}
            />
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
            <section className="whitebg layout">
                <div className="container" style={{ paddingTop: 20 }}>
                    {loading ? (
                        <div>Se încarcă...</div>
                    ) : error ? (
                        <div>Eroare: {error}</div>
                    ) : teamMembers.length === 0 ? (
                        <div>Nu există membri în echipă</div>
                    ) : (
                        teamMembers.map((member, index) => (
                            <div key={member._id} className={style.teamMember}>
                                <div className={`text-content-container ${style.textContent}`}>
                                    <h3>{member.name} <span className={style.category}>{member.keyword}</span></h3>
                                    <span className={style.textContentSpan}>{member.title}</span>
                                    <div dangerouslySetInnerHTML={{ __html: member.description }} />
                                </div>
                                <div className={style.imageContainer}>
                                    <img src={getImageUrl(member.image)} alt={member.name} />
                                </div>
                            </div>
                        ))
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

export default Team;