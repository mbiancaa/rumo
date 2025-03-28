import styles from '../styles/modules/Contact.module.css';

const FAQItem = ({ question, answer, isOpen, onClick }) => {

    return (
        <div className={`${styles.faqBox} ${isOpen ? styles.open : ''}`} onClick={onClick}>
            <h4 className={styles.faqTitle} style={{ cursor: 'pointer' }}>{question}</h4>
            <p className={styles.faqText} style={{ display: isOpen ? 'block' : 'none' }}>{answer}</p>
        </div>
    );
};

export default FAQItem;