import styles from '../../styles/modules/HomeEndTextSection.module.css';
const EndTextSection = () => {
    return (
        <section className={`whitebg layout ${styles.section}`}>
            <div className={`container ${styles.container}`}>
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
        </section>
    );
}

export default EndTextSection;