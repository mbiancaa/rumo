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
import ValueItems from '../components/ValueItems';

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
                        <h2 style={{ color: 'var(--black)', fontFamily: 'Roboto', fontWeight: 900 }}>MISIUNE</h2>
                        <p>Într-o eră de escaladare digitală, misiunea RUMO este aceea de a simplifica viețile dezvoltatorilor de afaceri mici si mijlocii si de a contribui la creșterea lor semnificativă.</p>
                        <p><span style={{ color: 'var(--blue)' }}>Cum facem asta?</span> Prin soluții complete de marketing digital personalizat, implementate cu integritate și precizie.</p>
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
                    <div className="" style={{
                        marginBottom: 80
                    }}>
                        <h2 style={{
                            fontSize: 40,
                            fontWeight: '900',
                            letterSpacing: -1,
                            lineHeight: '55px',
                            color: 'var(--blue)'
                        }}>În ce mod dorim să contribuim la ecosistemul antreprenorial românesc?</h2>
                        <p style={{
                            fontSize: 26,
                            letterSpacing: -1,
                            marginBottom: 30,
                            marginTop: 40,
                            fontWeight: 400
                        }}
                        >Agenția de marketing online, <span style={{ color: 'var(--green)', fontWeight: 600 }}>RUMO</span> a fost fondată de <span style={{ fontWeight: 600 }}>CEO & Founder-ul Rusu Monica</span> si este o agenție <span style={{ color: 'var(--blue)', fontWeight: 500 }}>dedicată creșterii afacerilor mici si mijlocii</span>.</p>
                        <p style={{
                            fontSize: 24,
                            letterSpacing: -1,
                            marginBottom: 30,
                        }}>Suntem mai mult decât o agenție de marketing online — suntem parteneri de creștere pentru IMM-urile din România. Credem că impactul real vine din lucruri făcute cu integritate, cu pasiune și cu dorința de a evolua constant.</p>

                        <p style={{
                            fontSize: 24,
                            letterSpacing: -1,
                            marginBottom: 30
                        }}>Fiecare campanie, fiecare strategie digitală, fiecare colaborare de lungă durată reflectă convingerea noastră că succesul clienților noștri contribuie direct la dezvoltarea economică și socială a României.</p>
                        <p style={{
                            fontSize: 24,
                            letterSpacing: -1,
                            marginBottom: 30
                        }}>Valorile de mai jos ne ghidează în modul în care construim parteneriate durabile:</p>
                        <ValueItems />
                    </div>
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
            </section >

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
                <h2>Lucrăm cu <br />branduri mici și mijlocii <br />care aspiră să fie mari!</h2>
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
                    <div style={{ marginTop: 100 }} className="text-content-container">
                        <h3>Dacă în această pagină este prea multă informație, citește aici sinteza a tot ceea ne reprezintă:</h3>
                        <p>Noi suntem RUMO Digital Path, o agenție de marketing online cu o echipă de specialiști entuziaști și dedicați. Ne place să ne provocăm continuu și să oferim clienților noștri metode de creștere a afacerii prin marketing, bazate pe strategii testate și un know-how solid. Iubim să vedem cum brandurile cresc și se dezvoltă, ajungând la nivelul visului lor.</p>
                        <h3>Misiunea noastră</h3>
                        <p>Ne concentrăm pe impactul pe care îl putem aduce în dezvoltarea ecosistemului antreprenoriatului românesc. Credem că fiecare afacere are nevoie de susținere strategică, de creativitate și de o abordare integrată pentru a se extinde cu succes. Prin urmare, ne dorim să fim acea agenție de marketing digital care vă ajută să navigați sigur și eficient prin piața competitivă.</p>
                        <h3>De ce RUMO Digital?</h3>
                        <ul>
                            <li><b>Flexibilitate</b>: ne-am dezvoltat abilitatea de a implementa diverse campanii de promovare online în multiple industrii, datorită proiectelor reușite pe care le-am desfășurat.</li>
                            <li><b>Expertiză</b>: echipa noastră de specialiști se perfecționează constant în strategii SEO, campanii PPC, creare branding și alte tactici moderne de marketing.</li>
                            <li><b>Rezultate</b>: avem o abordare orientată spre performanță, astfel încât investiția voastră să genereze profit și o creștere sustenabilă.</li>
                        </ul>
                        <h3>Ce oferim</h3>
                        <ul>
                            <li><b>Servicii de creare website și optimizare pentru conversii</b></li>
                            <li><b>Servicii SEO</b> pentru a atrage trafic organic de calitate</li>
                            <li><b>Campanii PPC</b> personalizate</li>
                            <li><b>Creare branding</b> pentru o identitate memorabilă și unitară</li>
                            <li><b>Strategie de conținut și campanii de promovare online</b> pentru canalele sociale</li>
                            <li><b>Analize de cost</b>, menite să asigure un ROI pozitiv și alte servicii</li>
                        </ul>
                        <p>Noi credem în puterea colaborării transparente. Suntem convinși că, lucrând împreună, găsim soluții potrivite oricărei provocări de business. De la strategia inițială și până la implementarea tactică, rămânem mereu alături de voi, ajustând planul în funcție de datele reale de pe piață.</p>
                        <h3>Hai să lucrăm împreună</h3>
                        <p>Îți dorești să faci un pas înaintea spre realizarea obiectivului tău? <b>Contactează-ne acum</b> și vom începe să planificăm următoarea etapă de dezvoltare a brandului tău!</p>
                        <p>Știm ce înseamnă presiunea financiară și ne asumăm responsabilitatea de a oferi cele mai bune soluții. Prin experiența acumulată ca agentie de marketing online, ne asigurăm că fiecare canal de promovare este folosit eficient, de la campanii PPC până la tactici de remarketing și optimizare SEO.</p>
                        <p>Vrei să afli mai multe despre cum îți putem crește afacerea? <b>Programează o discuție gratuită</b> și vom găsi împreună direcțiile potrivite!</p>
                        <p>Scopul nostru este să vă aducem mai aproape de succes, pas cu pas. Rezultatele susținute și dedicarea cu care facem lucrurile ne-au format reputația de partener de încredere.</p>
                        <h3>Hai să ne unim forțele pentru succes! Scrie-ne chiar acum!</h3>
                    </div>
                </div>
            </section >
            <Footer />
        </>
    );
}

export default About;