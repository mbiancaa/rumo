import '../styles/Home.css';
import '../styles/About.css';

import Header from '../components/Header';
import Footer from '../components/Footer';

import HeroSection from '../sections/HeroSection';

import useInView from '../hooks/useInView';

const Service = () => {
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
                            <h1 className="hero-title">Web Development</h1>
                        </div>
                        <div ref={subtitleRef} className={`slideInTextAnimation ${subtitleInView ? "show" : ""}`}>
                            <h2 className="hero-subtitle">Cu RUMO, afacerea ta prinde avânt!</h2>
                        </div>
                    </div>
                    <div ref={descriptionRef} className={`eq-column slideInTextAnimation ${descriptionInView ? "show" : ""}`}>
                        <h2>Website-uri și aplicații web care vând</h2>
                        <p>Când cineva află despre afacerea ta, în mediul online, ce impresie își face în primele secunde?</p>
                        <p>Un website lent, depășit sau neclar îți poate alunga clienții înainte să afle ce oferi. La RUMO, transformăm incertitudinea în încredere prin website-uri și aplicații web care conving și vând. Afacerea ta merită mai mult.</p>
                    </div>
                </div>
            </HeroSection >

            <section style={{ padding: '260px 0' }} className="darkbg layout darkbg-sm-img bg-url  imgEffect">
                <h2 style={{ margin: 'auto', textAlign: 'center' }}>Ești gata să faci un pas important?</h2>
            </section >

            <section className="whitebg layout">
                <div className="container" style={{ paddingTop: 20 }}>

                </div>
            </section>
            <Footer />
        </>
    );
}

export default Service;