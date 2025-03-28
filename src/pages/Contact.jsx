import '../styles/Home.css';
import '../styles/About.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

import HeroSection from '../sections/HeroSection';
import FAQList from '../components/FAQList';

import useInView from '../hooks/useInView';

const Contact = () => {

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
                            <h1 className="hero-title">Contact</h1>
                        </div>
                        <div ref={subtitleRef} className={`slideInTextAnimation ${subtitleInView ? "show" : ""}`}>
                            <h2 className="hero-subtitle">Cu RUMO, afacerea ta prinde avânt!</h2>
                        </div>
                    </div>
                    <div ref={descriptionRef} className={`eq-column slideInTextAnimation ${descriptionInView ? "show" : ""}`}>
                        <h2>Ești pregătit să-ți <span style={{ color: 'var(--blue)' }}>accelerezi</span> creșterea pe piață?</h2>
                        <p>Îți dorești un partener de marketing online care să înțeleagă exact provocările tale de business? Accesează secțiunea Contact și hai să ne cunoaștem! </p>
                        <p>La RUMO, ne concentrăm pe rezolvarea problemelor specifice afacerilor mici și mijlocii, oferind tactici personalizate, analize clare și îndrumare pas cu pas spre un ROI excelent.</p>
                    </div>
                </div>
            </HeroSection>

            <section className="whitebg layout">
                <div className="container">
                    <h2 style={{ fontSize: 65, fontWeight: 900, lineHeight: '130px' }}><span style={{ color: 'var(--green)' }}>RUMO</span> – <span style={{ fontFamily: 'Kanit', fontWeight: 700, color: 'var(--grey)' }}>Marketing digital</span> <br /> <span style={{ marginLeft: 200 }}>creat cu pasiune pentru afacerea ta</span></h2>
                    <p style={{
                        fontSize: 24,
                        letterSpacing: -1,
                        marginBottom: 30,
                        marginTop: 80
                    }}>
                        Știm cât de mult ai muncit pentru visul tău și cât de important este să-l vezi crescând. De aceea, ca soluție la provocările afacerii tale, creăm strategii personalizate, adaptate exact nevoilor tale.
                    </p>

                    <h3 style={{
                        fontSize: 40,
                        marginBottom: 15,
                        marginTop: 80,
                        color: 'var(--blue)'
                    }}>De ce să lucrezi cu noi?</h3>
                    <p style={{
                        fontSize: 24,
                        letterSpacing: -1
                    }}>
                        Pentru că putem, cu adevărat, crea o strategie de marketing, oferindu-ți următoarele servicii, atât independent cât și sub umbrela unei strategii complexe de marketing digital:
                    </p>
                    <h4 style={{ fontSize: 20, fontWeight: 400, marginTop: 20, color: 'var(--grey)' }}><b style={{ color: 'var(--blue)' }}>Creare website –</b> Transformă-ți viziunea în realitate digitală și atrage mai mulți clienți. Oferim soluții moderne de web development (creare website) cu funcționalități intuitive și bine optimizate SEO, care generează conversii pe termen lung.</h4>
                    <h4 style={{ fontSize: 20, fontWeight: 400, marginTop: 20, color: 'var(--grey)' }}><b style={{ color: 'var(--blue)' }}>Campanii PPC –</b> Câștigă vizibilitate instantă și atrage publicul potrivit cu strategii PPC bine calibrate. Ajustăm bugetul și conținutul anunțurilor pentru a maximiza fiecare click și a crește profitul.</h4>
                    <h4 style={{ fontSize: 20, fontWeight: 400, marginTop: 20, color: 'var(--grey)' }}><b style={{ color: 'var(--blue)' }}>SEO –</b> Evidențiază-te în motoarele de căutare cu tehnici SEO avansate și conținut relevant. Creștem traficul organic, sporim notorietatea brandului și îți asigurăm o poziție solidă pe piață.</h4>
                    <h4 style={{ fontSize: 20, fontWeight: 400, marginTop: 20, color: 'var(--grey)' }}><b style={{ color: 'var(--blue)' }}>Social Media Management –</b> Conectează-te cu audiența ta prin postări creative și campanii interactive. Gestionăm eficient canalele sociale pentru a-ți mări comunitatea și a o menține activă și fidelă și pentru a-ți consolida imaginea.</h4>
                    <h4 style={{ fontSize: 20, fontWeight: 400, marginTop: 20, color: 'var(--grey)' }}><b style={{ color: 'var(--blue)' }}>Plan strategic de marketing –</b> Fii mereu cu un pas înaintea concurenței. Analizăm piața, definim obiective clare și dezvoltăm un plan flexibil, care să te susțină în fiecare etapă a creșterii afacerii tale.</h4>
                    <h4 style={{ fontSize: 20, fontWeight: 400, marginTop: 20, color: 'var(--grey)' }}><b style={{ color: 'var(--blue)' }}>Branding –</b> Creăm o identitate puternică ce reflectă valorile și personalitatea afacerii tale. Diferențiază-te de competiție cu un concept vizual coerent și mesaje care inspiră încredere.</h4>
                    <h4 style={{ fontSize: 20, fontWeight: 400, marginTop: 20, color: 'var(--grey)' }}><b style={{ color: 'var(--blue)' }}>Campanii de E-mail marketing –</b> Concepem mesaje puternice și bine segmentate, care să-ți aducă vânzări remarcabile nu doar pe termen scurt, ci și pe termen lung. Cu abordări personalizate și funnel-uri optimizate, maximizăm retenția și loialitatea clienților</h4>

                    <p style={{
                        fontSize: 24,
                        letterSpacing: -1,
                        marginTop: 60,
                        marginBottom: 40
                    }}>
                        Fie că ai nevoie de un website profesional, sa vinzi mai mult pe Google sau de o strategie de marketing completă, suntem aici să îți transformăm ambiția în succes real.
                    </p>
                    <p style={{ fontSize: 45, fontWeight: 900, lineHeight: '70px', color: 'var(--green)' }}>
                        Succesul tău este și succesul nostru!
                    </p>

                    <FAQList />
                </div>
            </section>
            <Footer />
        </>
    );
}

export default Contact;