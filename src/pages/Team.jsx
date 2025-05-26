import '../styles/Home.css';
import '../styles/About.css';
import style from '../styles/modules/Team.module.css';
import { useState, useEffect } from 'react';
import { teamMemberService, pageService } from '../services/api';
import { getImageUrl } from '../utils/imageHelpers';
import { BarLoader } from 'react-spinners';

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
            setLoading(true);
            
            try {
                const members = await teamMemberService.getAll();
                setTeamMembers(members);
            } catch (err) {
                console.error('Error fetching team members:', err);
                setTeamMembers([]);
            }

            try {
                const pageData = await pageService.getBySlug('echipa');
                setPageContent(pageData);
            } catch (err) {
                console.error('Error fetching page content:', err);
                setError("Eroare la încărcarea conținutului paginii. Reîncercați mai târziu.");
            }

            setLoading(false);
        };

        fetchData();
    }, []);

    return (
        <>
            <SEO 
                title={pageContent?.metaTitle || pageContent?.name || "Echipa | RUMO - Your Digital Path"}
                description={pageContent?.metaDescription || "Reunim experți din cele mai solicitate servicii de marketing online pentru a oferi afacerii tale o creștere predictibilă și constantă."}
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
            <section className="whitebg layout">
                <div className="container" style={{ paddingTop: 20 }}>
                    {loading ? (
                        <div>Se încarcă...</div>
                    ) : error ? (
                        <div>{error}</div>
                    ) : teamMembers.length === 0 ? (
                        <div>Nu există membri în echipă</div>
                    ) : (
                        teamMembers.map((member, index) => (
                            <div key={member.id} className={style.teamMember}>
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