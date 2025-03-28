import '../styles/Home.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from '../styles/modules/Terms.module.css';

const GDPR = () => {

    return (
        <>

            <Header />

            <section className="whitebg layout">
                <div className="container">
                    <h1 className={styles.title}>Politica de confidențialitate</h1>
                    <p className={styles.paragraph}>
                        Prețuim dreptul la viață privată și protecția datelor personale ale fiecăruia dintre noi, astfel încât prin această politică de confidențialitate vrem să aducem la cunoștință vizitatorilor paginii web
                        <a href="https://www.rumodigitalpath.com" className={styles.link}>www.rumodigitalpath.com</a>, în continuare Site-ul, tipurile de date personale pe care le colectăm prin Site-ul nostru și modul în care folosim, dezvăluim și protejăm aceste informații.
                    </p>

                    <h2 className={styles.subtitle}>1. Cui i se adresează această Politică de confidențialitate?</h2>
                    <p className={styles.paragraph}>Această Politică de confidențialitate se aplică:</p>
                    <ul className={styles.list}>
                        <li>Prelucrării datelor dumneavoastră personale colectate de către noi prin Site și folosirii de către dumneavoastră a Site-ului.</li>
                        <li>Datelor personale colectate de RUMO prin intermediul paginilor noastre marcate pe platforme de social media.</li>
                        <li>Conținutului vizat de RUMO, inclusiv ofertelor și anunțurilor pentru produsele și serviciile RUMO.</li>
                    </ul>

                    <h2 className={styles.subtitle}>2. Ce date cu caracter personal prelucrăm?</h2>
                    <h3 className={styles.subsection}>A. Ce date prelucrăm?</h3>
                    <p className={styles.paragraph}>În funcție de modul în care utilizați Site-ul, colectăm anumite date personale și non-personale, după cum urmează:</p>
                    <ul className={styles.list}>
                        <li>Adresa IP;</li>
                        <li>Versiunea și tipul de web browser;</li>
                        <li>Tipul de sistem de operare;</li>
                        <li>O listă de URL-uri vizitate.</li>
                    </ul>

                    <h3 className={styles.subsection}>B. Care sunt scopurile prelucrării?</h3>
                    <p className={styles.paragraph}>În general, scopul prelucrării datelor cu caracter personal îl constituie prestarea serviciilor în beneficiul dumneavoastră, cum ar fi:</p>
                    <ul className={styles.list}>
                        <li>Furnizarea și administrarea accesului la site;</li>
                        <li>Personalizarea experienței dumneavoastră pe site;</li>
                        <li>Furnizarea de răspunsuri la e-mailurile dumneavoastră;</li>
                        <li>Furnizarea de materiale pentru care v-ați exprimat consimțământul;</li>
                        <li>Marketing.</li>
                    </ul>

                    <h2 className={styles.subtitle}>3. Drepturile de care beneficiați</h2>
                    <p className={styles.paragraph}>Conform Regulamentului, beneficiați de următoarele drepturi:</p>
                    <ul className={styles.list}>
                        <li>Dreptul de acces;</li>
                        <li>Dreptul la rectificare;</li>
                        <li>Dreptul la ștergere („dreptul de a fi uitat”);</li>
                        <li>Dreptul la restricționarea prelucrării;</li>
                        <li>Dreptul la portabilitatea datelor;</li>
                        <li>Dreptul de opoziție la prelucrare.</li>
                    </ul>
                    <p className={styles.paragraph}>Pentru exercitarea drepturilor de care beneficiați, vă puteți adresa cu o cerere scrisă către RUMO la adresa de e-mail: <a href="mailto:office@rumodigitalpath.com" className={styles.link}>office@rumodigitalpath.com</a>.</p>

                    <h2 className={styles.subtitle}>4. Contact</h2>
                    <p className={styles.paragraph}>RMM OFFICIAL SRL, persoană juridică înregistrată în Cluj-Napoca, Str. Orastie 10 E;</p>
                    <p className={styles.paragraph}>Email: <a href="mailto:office@rumodigitalpath.com" className={styles.link}>office@rumodigitalpath.com</a></p>
                </div>
            </section>

            <Footer />
        </>
    );
}

export default GDPR;