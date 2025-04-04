import styles from '../../styles/modules/BusinessTargets.module.css';

const BusinessTargets = () => {
    const items = [
        { number: '01', title: 'Aliniere strategică', text: 'Obiective clare și coerente cu brandul.' },
        { number: '02', title: 'Analiză și optimizare', text: 'Utilizarea datelor pentru îmbunătățiri constante.' },
        { number: '03', title: 'Targetare precisă', text: 'Personalizarea mesajelor pentru audiențe specifice.' },
        { number: '04', title: 'Engagement interactiv', text: 'Implicarea activă a audienței.' },
        { number: '05', title: 'Inovație tehnologică', text: 'Adoptarea celor mai noi instrumente și tehnici.' },
        { number: '06', title: 'Monitorizare continuă', text: 'Evaluare și ajustare rapidă a performanței.' },
    ];

    return (
        <div className={styles.container}>
            {items.map((item, index) => (
                <div key={index} className={styles.item}>
                    <span className={styles.number}>{item.number}</span>
                    <h4 className={styles.title}>{item.title}</h4>
                    <p className={styles.text}>{item.text}</p>
                </div>
            ))}
        </div>
    );
};

export default BusinessTargets;