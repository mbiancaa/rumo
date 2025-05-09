import '../styles/Home.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

import { NavLink } from 'react-router-dom';

const GDPR = () => {

    return (
        <>

            <Header />

            <section className="whitebg layout">
                <div className="container text-content-container">
                    <h1>Politica de confidențialitate</h1>
                    <p>
                        Prețuim dreptul la viață privată și protecția datelor personale ale fiecăruia dintre noi, astfel încât prin această politică de confidențialitate vrem să aducem la cunoștință vizitatorilor paginii web
                        <NavLink to="/" className={`link`}>www.rumodigitalpath.com</NavLink>, în continuare Site-ul, tipurile de date personale pe care le colectăm prin Site-ul nostru și modul în care folosim, dezvăluim și protejăm aceste informații.
                    </p>

                    <h2>1. Cui i se adresează această Politică de confidențialitate?</h2>
                    <p>Această Politică de confidențialitate se aplică:</p>
                    <ul>
                        <li>Prelucrării datelor dumneavoastră personale colectate de către noi prin Site și folosirii de către dumneavoastră a Site-ului.</li>
                        <li>Datelor personale colectate de RUMO prin intermediul paginilor noastre marcate pe platforme de social media.</li>
                        <li>Conținutului vizat de RUMO, inclusiv ofertelor și anunțurilor pentru produsele și serviciile RUMO.</li>
                    </ul>

                    <h2>2. Ce date cu caracter personal prelucrăm?</h2>
                    <h3>A. Ce date prelucrăm?</h3>
                    <p>În funcție de modul în care utilizați Site-ul, colectăm anumite date personale și non-personale, după cum urmează:</p>
                    <ul>
                        <li>Adresa IP;</li>
                        <li>Versiunea și tipul de web browser;</li>
                        <li>Tipul de sistem de operare;</li>
                        <li>O listă de URL-uri vizitate.</li>
                    </ul>

                    <h3>B. Care sunt scopurile prelucrării?</h3>
                    <p>În general, scopul prelucrării datelor cu caracter personal îl constituie prestarea serviciilor în beneficiul dumneavoastră, cum ar fi:</p>
                    <ul>
                        <li>Furnizarea și administrarea accesului la site;</li>
                        <li>Personalizarea experienței dumneavoastră pe site;</li>
                        <li>Furnizarea de răspunsuri la e-mailurile dumneavoastră;</li>
                        <li>Furnizarea de materiale pentru care v-ați exprimat consimțământul;</li>
                        <li>Marketing.</li>
                    </ul>

                    <h2>3. Drepturile de care beneficiați</h2>
                    <p>Conform Regulamentului, beneficiați de următoarele drepturi:</p>
                    <ul>
                        <li>Dreptul de acces;</li>
                        <li>Dreptul la rectificare;</li>
                        <li>Dreptul la ștergere („dreptul de a fi uitat”);</li>
                        <li>Dreptul la restricționarea prelucrării;</li>
                        <li>Dreptul la portabilitatea datelor;</li>
                        <li>Dreptul de opoziție la prelucrare.</li>
                    </ul>
                    <p>Pentru exercitarea drepturilor de care beneficiați, vă puteți adresa cu o cerere scrisă către RUMO la adresa de e-mail: <a href="mailto:office@rumodigitalpath.com" className={`link`}>office@rumodigitalpath.com</a>.</p>

                    <h2>4. Contact</h2>
                    <p>RMM OFFICIAL SRL, persoană juridică înregistrată în Cluj-Napoca, Str. Orastie 10 E;</p>
                    <p>Email: <a href="mailto:office@rumodigitalpath.com" className={`link`}>office@rumodigitalpath.com</a></p>
                </div>
            </section>

            <Footer />
        </>
    );
}

export default GDPR;