import '../styles/Home.css';
import '../styles/Home2.css';
import styles from '../styles/modules/HomeEndTextSection.module.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Services from '../components/Services';
import WorkProcess from '../components/WorkProcess';
import SEO from '../components/SEO';

import HeroSection from '../sections/HeroSection';
import CustomerSection from '../sections/CustomerSection';
import CeoSection from '../sections/CeoSection';
import TeamSection from '../sections/TeamSection';
import BlogSection from '../sections/BlogSection';
import CaseStudiesSection from '../sections/CaseStudiesSection';
import HeroContactSection from '../sections/HeroContactSection';

import homeVideo from '../assets/home/video/home_rumo_digital_video.mp4';
import homeVideoFallback from '../assets/video/video_fallback.jpg';
import bgSectionImg from '../assets/home/14.jpg';

const Home = () => {

    return (
        <div className="Homepage">
            <SEO
                title="RUMO - Your Digital Path"
                description="Agenție de marketing digital dedicată creșterii afacerilor mici și mijlocii. Oferim servicii de SEO, PPC, branding, social media și creare website-uri."
            />
            <Header />
            <HeroSection>
                <div className="d-flex p-relative j-center full-height">
                    <div className="hero-text">
                        <span>Ajutăm afacerile mici și mijlocii să crească <b>până dincolo de nori</b>.</span>
                        <span>Cu RUMO, afacerea ta prinde avânt!</span>
                    </div>
                    <video
                        className="home-background-video"
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="auto"
                        poster={homeVideoFallback}
                    >
                        <source src={homeVideo} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>

            </HeroSection>
            <CustomerSection />
            <HeroContactSection />
            <section className="whitebg layout">
                <WorkProcess />
                <Services />
            </section>
            <section className="darkbg layout darkbg-sm-img imgEffect" style={{ backgroundImage: `url(${bgSectionImg})`, backgroundSize: 'cover' }}>
                <h2>Cu RUMO,<br /> afacerea ta <br /> prinde avânt!</h2>
            </section>
            <CaseStudiesSection />
            <CeoSection />
            <TeamSection />
            <BlogSection />

            <section className={`whitebg layout ${styles.section}`}>
                <div className='container'>
                    <div className={`${styles.container}`}>
                        <h2 className={styles.heading}>
                            Marketing <b>cu suflet</b> pentru <span className={styles.blue}>afaceri cu viziune</span>
                        </h2>
                        <div className={`d-flex ${styles.flexContainer}`}>
                            <div className={`left ${styles.left}`}>
                                <p className={styles.blue}>Succesul unui IMM nu depinde doar de un produs bun, ci și de vizibilitate, strategie și conexiune autentică cu publicul.</p>
                            </div>
                            <div className={`right ${styles.right}`}>
                                <p className={styles.paragraph}>La RUMO, nu oferim doar servicii de SEO, PPC, branding, social media și creare website-uri ci construim povești care inspiră și vând.</p>
                                <p className={styles.paragraph}>Credem în marketingul făcut din empatie, adaptat realității antreprenorilor români.</p>
                                <p>Dacă vrei să-ți lansezi afacerea sau să o scalezi, suntem aici să îți oferim soluții eficiente și măsurabile.</p>
                            </div>
                        </div>
                        <h2 className={styles.bottomHeading}>
                            Hai să dăm <b className={styles.green}>împreună</b> avânt business-ului tău!
                        </h2>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}

export default Home;