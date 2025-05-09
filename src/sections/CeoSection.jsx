import CEOTestimonialSlider from "../components/sliders/CEOTestimonialSlider";
import CEOImage from '../assets/CEO-RUMO-MonicaRusu.jpg';
import styles from '../styles/modules/CeoSection.module.css';

const CeoSection = () => {

    return (
        <section className={`lightgreybg layout ${styles.layoutSection}`}>
            <div className={`container d-flex ceo ${styles.mainContainer}`}>
                <img className={styles.ceoImage} src={CEOImage} alt="Monica Rusu - CEO RUMO Digital Path" />
                <div className="ceoTestimonialWrapper">
                    <CEOTestimonialSlider />
                </div>
                <div>
                    <span className={`smTitle ${styles.headline}`}>Monica Rusu, CEO & Founder, RUMO Digital Path</span>
                    <h2 className={styles.title}>Ajutăm<br /> <span style={{ fontWeight: 600 }}>IMM-urile</span><br /> <span style={{ fontWeight: 800 }}>să prospere</span></h2>
                    <p className={styles.description}>În următorii cinci ani, ne dorim să devenim un partener esențial pentru companiile mici și mijlocii, contribuind semnificativ la creșterea acestora!</p>
                </div>
            </div>
        </section >
    );

}

export default CeoSection;