import '../styles/Home.css';
import '../styles/About.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

import HeroSection from '../sections/HeroSection';
import ClientTestimonialSlider from '../components/sliders/ClientTestimonialSlider';
import BusinessTargets from '../components/about/BusinessTargets';

import AboutBusiness1 from '../assets/about1.jpg';
import AboutBusiness2 from '../assets/about2.jpg';
import BusinessImage from '../assets/businessmen-businesswomen-meeting-brainstorming-ideas.jpg';
import BusinessPrinciplesImg from '../assets/close-up-businesswoman-businessman-shaking-hands.jpg';
import ServicesList from '../components/ServicesList';

import useInView from '../hooks/useInView';

const About = () => {
    const [textRef, textInView] = useInView(100);
    const [subtitleRef, subtitleInView] = useInView(600);
    const [descriptionRef, descriptionInView] = useInView(650);
    const [separatorRef, separatorInView] = useInView(350);
    const [imageColumnRef, imageColumnInView] = useInView(10);

    return (
        <>

            <Header />
            <HeroSection>
                <div className="layout eq-columns">
                    <div ref={separatorRef} className={`eq-column separator ${separatorInView ? "show" : ""}`}>
                        <div ref={textRef} className={`slideInTextAnimation ${textInView ? "show" : ""}`}>
                            <h1 className="hero-title">Despre noi</h1>
                        </div>
                        <div ref={subtitleRef} className={`slideInTextAnimation ${subtitleInView ? "show" : ""}`}>
                            <h2 className="hero-subtitle">Cu RUMO, afacerea ta prinde avânt!</h2>
                        </div>
                    </div>
                    <div ref={descriptionRef} className={`eq-column slideInTextAnimation ${descriptionInView ? "show" : ""}`}>
                        <h2>Știm câtă <span style={{ color: 'var(--green)', opacity: 0.8, fontFamily: 'Roboto' }}>muncă</span> și <span style={{ color: 'var(--blue)', opacity: 0.8, fontFamily: 'Roboto' }}>pasiune</span> ai investit <br />în afacerea ta.</h2>
                        <p>De aceea, înainte de orice strategie, te ascultăm, analizăm și înțelegem provocările și oportunitățile pe care le ai.</p>
                        <p>La RUMO, nu aplicăm soluții universale ci construim un plan digital personalizat, și dezvoltăm strategii care aduc vizibilitate și clienți noi.</p>
                    </div>
                </div>
            </HeroSection>
            <section className="darkbg layout heroAfter-img imgEffect">
            </section>

            <section className="whitebg layout">
                <div style={{
                    borderBottom: '1px solid var(--white-grey)'
                }}
                    className="container">

                    <h2 style={{ fontSize: 65, fontWeight: 900, lineHeight: '130px' }}><span style={{ color: 'var(--green)' }}>RUMO</span> – <span style={{ fontFamily: 'Kanit', fontWeight: 700, color: 'var(--grey)' }}>Marketing digital</span> <br /> <span style={{ marginLeft: 200 }}>creat cu pasiune pentru afacerea ta</span></h2>
                    <p style={{
                        fontSize: 24,
                        letterSpacing: -1,
                        marginBottom: 30,
                        marginTop: 80
                    }}>Știm cât de mult ai muncit pentru visul tău și cât de important este să-l vezi crescând. De aceea, ca soluție la provocările afacerii tale, creăm strategii personalizate, adaptate exact nevoilor tale.</p>
                    <p style={{
                        fontSize: 24,
                        letterSpacing: -1,
                        marginBottom: 30
                    }}>Creăm campanii PPC eficiente, optimizăm site-ul tău prin SEO avansat, gestionăm Social Media pentru o conexiune autentică și dezvoltăm branding puternic.</p>
                    <p style={{
                        fontSize: 24,
                        letterSpacing: -1,
                    }}>Fie că ai nevoie de un website profesional sau o strategie completă, suntem aici să îți transformăm ambiția în succes real. Pentru că succesul tău este și succesul nostru.</p>

                </div>
                <div className="container">
                    <div className="" style={{
                        marginBottom: 80
                    }}>
                        <span className="smTitle">Cu RUMO, afacerea ta nu are plafon!</span>
                        <h2 style={{
                            fontSize: 50,
                            maxWidth: 'calc(100% - 265px)',
                            fontWeight: 'bold',
                            fontFamily: 'Kanit',
                            letterSpacing: -1,
                            lineHeight: '55px',
                            minWidth: 764
                        }}>Fiecare afacere are nevoie de<br /> <span style={{ fontSize: 65, lineHeight: '80px', color: 'var(--green)' }}>o strategie clară</span></h2>
                        <p style={{
                            color: 'var(--light-grey)',
                            fontWeight: 400,
                            marginLeft: 'auto',
                            maxWidth: 400,
                            minWidth: 400,
                            fontFamily: 'Kanit',
                            fontSize: 18,
                            lineHeight: '18px',
                            letterSpacing: '-1px'
                        }}
                        >Creăm planuri de marketing integrate, setăm obiective măsurabile și aliniem fiecare acțiune la nevoile business-ului tău.</p>
                    </div>
                    <div className="boxContainer box-6">
                        <div className="box">
                            <span className="number">01</span>
                            <h3>Gândire strategică <br />& Planificare Digitală</h3>
                            <p>Crearea unor strategii integrate de marketing care includ SEO, PPC, Social Media, Content Marketing, E-mail Marketing etc. Stabilirea obiectivelor măsurabile (KPI-uri) și alinierea acestora la nevoile afacerii.</p>
                        </div>
                        <div className="box">
                            <span className="number">02</span>
                            <h3>Optimizare SEO <br />& Creștere Organică</h3>
                            <p>Vizibilitatea online nu este un lux, ci o necesitate. Folosim tehnici avansate de SEO On-Page, Off-Page și Tehnic pentru a-ți aduce brandul în topul căutărilor.</p>
                        </div>
                        <div className="box">
                            <span className="number">03</span>
                            <h3>Publicitate online <br />& Performance Marketing</h3>
                            <p>Investim inteligent în reclame plătite pe Google, Facebook, LinkedIn și alte platforme, optimizând fiecare campanie pentru ROI maxim și conversii reale.</p>
                        </div>
                        <div className="box">
                            <span className="number">04</span>
                            <h3>Content Marketing <br />& Copywriting Persuasiv</h3>
                            <p>Creăm conținut strategic și convingător, optimizat pentru SEO, care atrage, educă și transformă vizitatorii în clienți fideli.</p>
                        </div>
                        <div className="box">
                            <span className="number">05</span>
                            <h3>Social Media Management <br />& Community Engagement</h3>
                            <p>Construim prezența digitală a brandului tău, gestionăm interacțiunile și creăm conținut care generează engagement și loialitate pe platformele sociale.</p>
                        </div>
                        <div className="box">
                            <span className="number">06</span>
                            <h3>Analiză de date <br />& Optimizare Continuă</h3>
                            <p>Măsurăm fiecare acțiune, analizăm performanța și optimizăm constant strategia, folosind Google Analytics, A/B Testing și alte tool-uri avansate.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="whitebg layout">
                <div ref={imageColumnRef} className={`imageColumn imageRevealEffect ${imageColumnInView ? "show" : ""}`}>
                    <div className="imageRow">
                        <img
                            style={{
                                maxWidth: '100%',
                                objectFit: 'cover',
                                minWidth: '100%',
                                height: '100%'
                            }}
                            src={AboutBusiness1}
                        />
                    </div>
                    <div className="imageRow">
                        <img
                            style={{
                                maxWidth: '100%',
                                objectFit: 'cover',
                                minWidth: '100%',
                                height: '100%'
                            }}
                            src={AboutBusiness2}
                        />
                    </div>
                </div>
                <div className="container services">
                    <span className="smTitle">Servicii</span>
                    <div style={{ gap: 60, marginTop: 20, marginBottom: 50 }}
                        className="d-flex">
                        <h2 style={{
                            flex: 1,
                            width: 'calc(60% - 20px)',
                            fontSize: 52,
                            maxWidth: 600,
                            color: 'var(--blue)'
                        }}
                        >Dedicați creșterii afacerilor mici și mijlocii.</h2>
                        <p style={{
                            width: 'calc(40% - 20px)',
                            color: 'var(--grey)',
                            fontSize: 18,
                            fontFamily: 'Kanit',
                            lineHeight: '22px',
                            marginLeft: '40px',
                            maxWidth: 390
                        }}
                        >Strategii data-driven, optimizări constante, succes garantat!<br /><span style={{ color: 'var(--light-grey)', marginTop: 10, display: 'block' }}>Contactează-ne pentru a verifica cum putem să transformăm business-ul tău prin marketing digital!</span></p>
                    </div>
                    <ServicesList />
                </div>
            </section>
            <section className="whitebg layout">
                <div className="container">
                    <div className='reviews-bg'></div>
                    <ClientTestimonialSlider />
                </div>
            </section>
            <section className="whitebg layout">
                <div className="container">
                    <div style={{ gap: 60, marginTop: 20, marginBottom: 50 }}
                        className="d-flex">
                        <h2 style={{
                            flex: 1,
                            width: 'calc(60% - 20px)',
                            fontSize: 52,
                            maxWidth: 600,
                            color: 'var(--green)'
                        }}
                        > Creștem afacerile<br /> mici și mijlocii.</h2>
                        <p style={{
                            width: 'calc(40% - 20px)',
                            color: 'var(--grey)',
                            fontSize: 18,
                            fontFamily: 'Kanit',
                            lineHeight: '22px',
                            marginLeft: '40px',
                            maxWidth: 390
                        }}
                        >Creștem afaceri prin strategie, analiză și execuție impecabilă!</p>
                    </div>
                    <BusinessTargets />
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginTop: 100
                    }}>
                        <div style={{
                            minWidth: 'calc(50% + 70px)',
                            width: 'calc(50% + 70px)',
                            maxWidth: 570,
                            marginRight: 60,
                            marginLeft: -70
                        }}>
                            <img src={BusinessPrinciplesImg} style={{
                                width: '100%',
                                objectFit: 'cover',
                                height: 450
                            }} />
                        </div>
                        <div>
                            <h2 style={{
                                fontSize: 35,
                                fontWeight: 900,
                                marginBottom: 20,
                                color: 'var(--green)'
                            }}>De ce să lucrezi cu RUMO?</h2>
                            <p style={{
                                marginBottom: 10,
                                fontSize: 16,
                                fontFamily: 'Kanit',
                                fontWeight: 200
                            }}>La RUMO Digital Path, succesul tău este prioritatea noastră.</p>
                            <p style={{
                                marginBottom: 10,
                                fontSize: 16,
                                fontFamily: 'Kanit',
                                fontWeight: 200
                            }}>Nu aplicăm soluții standard, ci creăm strategii adaptate fiecărui business, indiferent de obiectiv – fie că vrei creștere accelerată sau doar optimizarea prezenței online.</p>
                            <p style={{
                                marginBottom: 10,
                                fontSize: 16,
                                fontFamily: 'Kanit',
                                fontWeight: 200
                            }}>Lucrăm transparent, analizăm datele în profunzime și oferim strategii de marketing digital personalizate care generează rezultate reale.</p>
                            <p style={{
                                marginBottom: 10,
                                fontSize: 16,
                                fontFamily: 'Kanit',
                                fontWeight: 200
                            }}>Alegem doar proiecte în care știm că putem aduce valoare, iar fiecare colaborare este un parteneriat bazat pe încredere. Dacă îți dorești un marketing digital orientat spre performanță, echipa noastră este gata să îți susțină afacerea la fiecare pas.</p>
                            <ul style={{
                                fontFamily: 'Kanit',
                                fontWeight: 400,
                                fontSize: 18
                            }}>
                                <li className="list-item-checkmark">Decizii bazate pe date</li>
                                <li className="list-item-checkmark">Vizibilitate extinsă</li>
                                <li className="list-item-checkmark">Targetare precisă</li>
                                <li className="list-item-checkmark">Conversii optimizate</li>
                                <li className="list-item-checkmark">Branding consolidat </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
            <section className="darkbg layout darkbg-sm-img bg-url  imgEffect">
                <h2>Lucrăm cu branduri mici <br />care aspiră să fie mari!</h2>
            </section>
            <section className="whitebg layout">
                <div className="container">
                    <div style={{ marginTop: 20, marginBottom: 50 }}
                        className="d-flex">
                        <h2 style={{
                            flex: 1,
                            width: 'calc(100% - 260px)',
                            fontSize: 95,
                            maxWidth: 600,
                            textTransform: 'uppercase',
                            fontFamily: 'Kanit',
                            fontWeight: 900
                        }}
                        >Tu ești
                            <img src={BusinessImage} width="185" height="80" style={{
                                objectFit: 'cover',
                                borderRadius: 50,
                                marginLeft: 20,
                                marginBottom: -10
                            }} />
                            <span style={{ display: 'block', marginLeft: 140 }}>pregătit?</span>
                        </h2>
                        <p style={{
                            width: 400,
                            color: 'var(--grey)',
                            fontSize: 20,
                            lineHeight: '26px',
                            marginLeft: 'auto',
                            maxWidth: 400,
                            marginTop: 20
                        }}
                        >Dacă afacerea ta ar putea vorbi,<br /> ți-ar spune că vrea să treacă<br /> la următorul nivel.</p>
                    </div>
                    <div style={{
                        maxWidth: 'calc(100% - 280px)',
                        fontSize: 24,
                        lineHeight: '42px',
                        marginLeft: 'auto',
                        fontWeight: 300
                    }}>
                        <p>Afacerea ta are potențial, dar oare îl valorifici la maximum?<br /> Într-o piață competitivă, nu e suficient să exiști – trebuie să fii vizibil, memorabil și convingător.</p>
                    </div>
                    <h2 style={{
                        fontSize: 50,
                        fontFamily: 'Kanit',
                        marginTop: 80
                    }}>La RUMO, <br />transformăm <span style={{ color: 'var(--grey)' }}>incertitudinea</span> în <span style={{ color: 'var(--blue)' }}>strategie</span> <br />și <span style={{ color: 'var(--grey)' }}>oportunitățile</span> în <span style={{ color: 'var(--green)' }}>rezultate</span>.</h2>
                </div>
            </section >
            <Footer />
        </>
    );
}

export default About;