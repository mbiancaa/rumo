import ServicesList from "./ServicesList";
import styles from '../styles/modules/HomeServices.module.css';
const Services = () => {

    return (
        <div className="container services">
            <span className="smTitle">Servicii</span>
            <h2 className={styles.title}>Experții din echipa RUMO transformă visele brandului tău  <b style={{ color: 'var(--blue)' }}>cu ajutorul strategiei de marketing online 360°</b></h2>
            <p className={styles.description}>Îți oferim o abordare completă și integrată care acoperă toate canalele și tacticile necesare pentru a crește vizibilitatea, atrage clienți și genera conversii.</p>
            <ServicesList />
        </div>
    );

}

export default Services;