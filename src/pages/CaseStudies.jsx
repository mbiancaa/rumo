import '../styles/Home.css';
import '../styles/About.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

import HeroSection from '../sections/HeroSection';

import useInView from '../hooks/useInView';

const CaseStudies = () => {
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
                            <h1 className="hero-title">Studii de caz</h1>
                        </div>
                        <div ref={subtitleRef} className={`slideInTextAnimation ${subtitleInView ? "show" : ""}`}>
                            <h2 className="hero-subtitle">Cu RUMO, afacerea ta prinde avânt!</h2>
                        </div>
                    </div>
                    <div ref={descriptionRef} className={`eq-column slideInTextAnimation ${descriptionInView ? "show" : ""}`}>
                        <h2>Antreprenori care iau decizii informate</h2>
                        <p>Într-un blog profesionist de marketing vei găsi recomandări bazate pe experiență și sfaturi utile despre implementarea oricărui serviciu de marketing online.</p>
                        <p>Când preiei informații de la specialiști, scazi considerabil riscul de a face experimente costisitoare și de a trece prin situații necunoscute și riscante pentru afacerea ta. Blogul nostru sumarizează toate actualitățile serviciilor oferite de noi din domeniul marketing digital.</p>
                    </div>
                </div>
            </HeroSection>

            <section className="whitebg layout">
                <div className="container">

                </div>
            </section>
            <Footer />
        </>
    );
}

export default CaseStudies;