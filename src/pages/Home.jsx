import '../styles/Home.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MovingImages from '../components/MovingImages';
import Services from '../components/Services';
import WorkProcess from '../components/WorkProcess';


import HeroSection from '../sections/HeroSection';
import CustomerSection from '../sections/CustomerSection';
import CeoSection from '../sections/CeoSection';
import TeamSection from '../sections/TeamSection';
import BlogSection from '../sections/BlogSection';
import CaseStudiesSection from '../sections/CaseStudiesSection';


const Home = () => {

    return (
        <>

            <Header />
            <HeroSection>
                <div className="hero-text">
                    <span style={{
                        fontSize: 40,
                    }}>Ajutăm afacerile mici și mijlocii să crească <b className="highlight">până dincolo de nori</b>.</span>
                    <span style={{
                        fontSize: 25,
                        marginTop: 15,
                        fontWeight: 'bold'
                    }}>Cu RUMO, afacerea ta prinde avânt!</span>
                </div>
            </HeroSection>
            <CustomerSection />
            <section className="darkbg layout darkbg-img imgEffect" style={{ minHeight: 630 }}>
                <div style={{ justifyContent: 'space-around', gap: 60, paddingBottom: 0 }}
                    className="content container d-flex">
                    <MovingImages />
                    <div style={{
                        width: 'calc(100% - 400px)',
                        maxWidth: 800
                    }}
                        className="flexContainer p-relative">
                        <h2 style={{ fontSize: 50 }}>Dezvoltarea afacerii tale prin marketing online strategic.</h2>
                        <p style={{
                            fontSize: 24,
                            letterSpacing: -1,
                        }}>Ajutăm afacerile mici și mijlocii să devină mari!</p>
                        <a href="" className="CTA_darkbg">Contactează-ne!</a>
                        <span style={{
                            fontWeight: 'bold',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: 130,
                            position: 'absolute',
                            bottom: 0,
                            right: 0,
                            fontFamily: 'Kanit'
                        }}
                        ><span className="highlightedBorder">+5</span> ani experiență</span>
                    </div>
                </div>
            </section>
            <section className="whitebg layout">
                <WorkProcess />
                <Services />
            </section>
            <section className="darkbg layout darkbg-sm-img bg-sm-url imgEffect">
                <h2>Cu RUMO,<br /> afacerea ta prinde avânt!</h2>
            </section>
            <CaseStudiesSection />
            <CeoSection />
            <TeamSection />
            <BlogSection />
            <section className="whitebg layout" style={{ minHeight: 500 }}>
                <div className="container" style={{ padding: 0 }}>


                    <h2 className="bottomHightlight" style={{
                        fontSize: 58,
                        fontFamily: 'Kanit',
                        marginBottom: 80
                    }}>Marketing cu suflet pentru afaceri cu viziune</h2>
                    <div className="d-flex">
                        <div className="left">
                            <p>Succesul unui IMM nu depinde doar de un produs bun, ci și de vizibilitate, strategie și conexiune autentică cu publicul.</p>
                        </div>
                        <div style={{
                            fontSize: 16,
                            lineHeight: '26px',
                            marginLeft: 80,
                            fontFamily: 'Kanit',
                            fontWeight: 300
                        }} className="right">
                            <p style={{ marginBottom: 10 }}>La RUMO, nu oferim doar servicii de SEO, PPC, branding, social media și creare website-uri ci construim povești care inspiră și vând.</p>
                            <p style={{ marginBottom: 10 }}>Credem în marketingul făcut din empatie, adaptat realității antreprenorilor români.</p>
                            <p>Dacă vrei să-ți lansezi afacerea sau să o scalezi, suntem aici să îți oferim soluții eficiente și măsurabile.</p>
                        </div>
                    </div>
                    <h2 style={{
                        fontSize: 58,
                        fontFamily: 'Kanit',
                        marginTop: 80,
                        marginBottom: 100,
                        color: 'var(--light-grey)'
                    }}>Hai să dăm împreună avânt business-ului tău!</h2>
                </div>
            </section >
            <Footer />
        </>
    );
}

export default Home;