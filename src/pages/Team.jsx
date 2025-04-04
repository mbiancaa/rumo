import '../styles/Home.css';
import '../styles/About.css';
import style from '../styles/modules/Team.module.css';

import TeamMember from '../assets/CEO.jpg';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HeroSection from '../sections/HeroSection';

import useInView from '../hooks/useInView';

const Team = () => {
    const [textRef, textInView] = useInView(100);
    const [subtitleRef, subtitleInView] = useInView(600);
    const [descriptionRef, descriptionInView] = useInView(650);
    const [separatorRef, separatorInView] = useInView(350);

    return (
        <>

            <Header />
            <HeroSection>
                <div className="layout eq-columns">
                    <div ref={separatorRef} className={`eq-column separator ${separatorInView ? "show" : ""}`}>
                        <div ref={textRef} className={`slideInTextAnimation ${textInView ? "show" : ""}`}>
                            <h1 className="hero-title">Echipa noastră</h1>
                        </div>
                        <div ref={subtitleRef} className={`slideInTextAnimation ${subtitleInView ? "show" : ""}`}>
                            <h2 className="hero-subtitle">Cu RUMO, afacerea ta prinde avânt!</h2>
                        </div>
                    </div>
                    <div ref={descriptionRef} className={`eq-column slideInTextAnimation ${descriptionInView ? "show" : ""}`}>
                        <h2>Oamenii din spatele proiectelor</h2>
                        <p>
                            Când ne gândim la brandul tău, analizăm întreaga experiență a clientului. Totul începând cu logo-ul, website-ul, activitatea pe social media, modul în care îți promovezi valorile și misiunea brandului. Noi suntem agenția ta integrată de marketing. Noi suntem echipa ta. Fericiți să ajutăm, fericiți să dezvoltăm, fericiți să livrăm.
                        </p>
                    </div>
                </div>
            </HeroSection >
            <section className="whitebg layout">
                <div className="container" style={{ paddingTop: 20 }}>
                    <div className={style.teamMember}>
                        <div className={`text-content-container ${style.textContent}`}>
                            <h3>Monica Rusu</h3>
                            <span className={style.textContentSpan}>CEO | Business Developer | Growth marketing strategist</span>
                            <p><b>Mă definesc integritatea, evoluția și pasiunea.</b></p>
                            <p>În următorii cinci ani, ne dorim să devenim un partener esențial pentru companiile mici și mijlocii, contribuind semnificativ la creșterea acestora.</p>
                            <p>Astăzi, în calitate de CEO al RUMO, mă concentrez pe menținerea și dezvoltarea unei echipe de profesioniști dedicată performanței și pe livrarea de servicii excelente clienților noștri.</p>
                        </div>
                        <div className={style.imageContainer}>
                            <img src={TeamMember} />
                        </div>
                    </div>
                    <div className={style.teamMember}>
                        <div className={`text-content-container ${style.textContent}`}>
                            <h3>Bianca D.</h3>
                            <span className={style.textContentSpan}>Full-Stack Software Engineer | Web Developer</span>
                            <p>Adaug mai tarziu</p>
                        </div>
                        <div className={style.imageContainer}>
                            <img src={TeamMember} />
                        </div>
                    </div>
                    <div className={style.teamMember}>
                        <div className={`text-content-container ${style.textContent}`}>
                            <h3>Nicoleta T.</h3>
                            <span className={style.textContentSpan}>SEO Strategist</span>
                            <p>Sunt Nicoleta, specialist SEO, pasionată de tot ce înseamnă marketing digital, cu un interes deosebit pentru optimizarea site-urilor pentru motoarele de căutare,. Sunt entuziastă, analitică și mereu în căutare de strategii care să aducă brandurile în topul rezultatelor Google. Reușita fiecărui proiect și învățăturile luate din acestea îmi alimentează dorința și determinarea de a ne ajuta masiv clienții.</p>
                        </div>
                        <div className={style.imageContainer}>
                            <img src={TeamMember} />
                        </div>
                    </div>
                    <div className={style.teamMember}>
                        <div className={`text-content-container ${style.textContent}`}>
                            <h3>Bogdan P.</h3>
                            <span className={style.textContentSpan}>PPC strategist</span>
                            <p>Sunt Bogdan și cred că Ad-urile bune fac mai mult decât o reducere de BF. Promovez businessuri locale și Ecommerce-uri, le ajut să devină vizibile și … în sfârșit înțelese de algoritm. Pe lângă asta, îmi place să sap în date: analizez comportamentul consumatorilor, testez, optimizez și iau decizii pe FAPTE, nu pe feeling.</p>
                        </div>
                        <div className={style.imageContainer}>
                            <img src={TeamMember} />
                        </div>
                    </div>
                    <div className={style.teamMember}>
                        <div className={`text-content-container ${style.textContent}`}>
                            <h3>Ștefana I.</h3>
                            <span className={style.textContentSpan}>Social Media Expert</span>
                            <p>Sunt Social Media Manager la agenția Rumo și mă ocup de planificarea, crearea și gestionarea conținutului pentru rețelele de socializare ale clienților noștri. Sunt pasionată de social media, de actualități și de tot ce înseamnă creativitate aplicată strategic. Mă motivează diversitatea proiectelor Rumo și dinamica fiecărei zile. Îmi place să învăț constant și să găsesc soluții adaptate pentru fiecare brand, iar ambiția și reziliența sunt trăsături care mă ajută să merg mai departe chiar și atunci când apar provocări.</p>
                        </div>
                        <div className={style.imageContainer}>
                            <img src={TeamMember} />
                        </div>
                    </div>
                    <div className={style.teamMember}>
                        <div className={`text-content-container ${style.textContent}`}>
                            <h3>Nicoleta M.</h3>
                            <span className={style.textContentSpan}>Brand Manager</span>
                            <p>Sunt Nicoleta, un grafician pasionat și multidisciplinar. Povestea mea a implicat întotdeauna creativitate. Am un background artistic cu o diplomă în artă și o experiență de peste 10 ani într-o companie integrată de marketing. Scopul meu este de a ajuta fiecare brand să iasă în evidență prin întinderea limitelor designului grafic. Sunt aici pentru a crea mărci și produse autentice, dar mai important, de succes.</p>
                        </div>
                        <div className={style.imageContainer}>
                            <img src={TeamMember} />
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}

export default Team;