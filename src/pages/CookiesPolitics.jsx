import '../styles/Home.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from '../styles/modules/Terms.module.css';

const CookiesPolitics = () => {

    return (
        <>

            <Header />

            <section className="whitebg layout">
                <div className="container">
                    <h1 className={styles.title}>Politica de utilizare a cookies</h1>

                    <p className={styles.paragraph}>
                        Această politică se referă la cookie-urile utilizate pe orice pagină web (website, landing page etc.) deținută, administrată sau aflată sub umbrela <strong>RUMO</strong>.
                    </p>

                    <p className={styles.paragraph}>
                        Vă rugăm să consultați această secțiune în mod regulat, deoarece politica poate suporta modificări sau actualizări. Orice modificări semnificative ale acestei politici vor fi notificate.
                    </p>

                    <p className={styles.paragraph}>
                        În completarea acestei notificări, vă rugăm să citiți și <a className={styles.link} href="/politica-de-confidentialitate">Politica de confidențialitate</a>.
                    </p>

                    <h2 className={styles.subtitle}>De ce folosim cookie-uri</h2>
                    <p className={styles.paragraph}>
                        Cookie-urile sunt foarte utile și îndeplinesc diferite funcții ce fac ca navigarea dvs. pe site să fie ușoară și plăcută. Ați putea spune că sunt ca niște „amintiri” pe care site-ul le păstrează despre dvs., ajutându-l să țină minte cum ați navigat pe paginile sale și alegerile pe care le-ați făcut pe parcurs.
                    </p>

                    <p className={styles.paragraph}>
                        Puteți naviga mai ușor și mai rapid pe un site care își amintește de dvs., decât pe unul care nu vă recunoaște. De aceea, majoritatea site-urilor pe care le știți și vă plac folosesc cookie-uri.
                    </p>

                    <h2 className={styles.subtitle}>Ce este într-un cookie?</h2>
                    <p className={styles.paragraph}>
                        Un cookie este un fragment simplu de informație sub forma unui fișier text foarte mic. Fiecare cookie în parte este unic și este compus din numele site-ului care l-a creat și un șir unic de cifre și litere.
                    </p>

                    <p className={styles.paragraph}>
                        Majoritatea site-urilor plasează cookie-uri pe hard disk-ul dispozitivului tău (calculator, telefon mobil sau tabletă) când navighezi pe o pagină de internet. Acest lucru este posibil din browser – de exemplu Google Chrome, Internet Explorer, Safari sau Firefox. Un cookie poate fi citit și recuperat doar de site-ul care l-a creat. Site-urile nu pot niciodată să facă schimb de informații între ele prin cookie-uri.
                    </p>

                    <h2 className={styles.subtitle}>Ce nu este într-un cookie?</h2>
                    <ul>
                        <li>Informații personale – nu poți fi identificat personal doar pe baza unui cookie.</li>
                        <li>Cod de program – spre deosebire de un virus informatic, un cookie nu este compus din cod, asta însemnând că nu este capabil să strice dispozitivul tău.</li>
                    </ul>

                    <h2 className={styles.subtitle}>În ce scopuri folosim cookie-urile?</h2>
                    <p className={styles.paragraph}>
                        O vizită pe acest site poate plasa următoarele tipuri de cookie-uri:
                    </p>
                    <ul>
                        <li>Cookie-uri strict necesare pentru funcționarea site-ului.</li>
                        <li>Cookie-uri de analiză a comportamentului vizitatorilor site-ului.</li>
                        <li>Cookie-uri pentru publicitate personalizată.</li>
                    </ul>

                    <h3 className={styles.subsection}>Cookie-uri necesare</h3>
                    <p className={styles.paragraph}>
                        În primul rând, pot fi necesare pentru a asigura funcţionarea corectă a site-ului web. De exemplu, cookie-urile pot fi folosite pentru asigurarea securității site-ului și a vizitatorilor, prin prevenirea falsificării inter site-uri. Această categorie de cookie-uri este activă în mod automat, nefiind condiţionată de acordul vizitatorului.
                    </p>

                    <p className={styles.paragraph}>
                        Am inclus aici şi cookie-urile plasate pentru a-ţi afişa publicitate nepersonalizată (care reţin faptul că o reclamă a fost afişată), precum şi cele care ne măsoară audienţa pe site (fără însă a include componenta demografică ori de segmentare a audienţei), întrucât fără măsurarea traficului site-ul nostru nu poate fi profitabil, iar regulile de protejare a vieţii private nu urmăresc a bloca afişarea publicităţii.
                    </p>

                    <h3 className={styles.subsection}>Cookie-uri de analiză</h3>
                    <p className={styles.paragraph}>
                        Cookie-urile de analiză colectează informații despre modul în care vizitatorii folosesc o pagină de internet, cum ar fi cele mai populare pagini, ce metodă de conectare a paginilor este cea mai eficace și dacă utilizatorii primesc mesaje de eroare de la paginile de internet. Aceste cookie-uri ne permit să oferim utilizatorilor o experiență de utilizare de înaltă calitate.
                    </p>

                    <h3 className={styles.subsection}>Cookie-uri pentru publicitate personalizată</h3>
                    <p className={styles.paragraph}>
                        De asemenea, folosim cookie-uri pentru a permite personalizarea publicităţii online. Folosirea cookie-urilor de personalizare a publicității este un standard actual al majorității site-urilor importante pe care le vizitați.
                    </p>

                    <p className={styles.paragraph}>
                        Publicitatea de acest tip ne ajută să ajungem la categoriile de clienți interesați de un anumit tip de produs, către care se afişează reclamele respective. De regulă, informațiile despre categoriile care definesc plaja de utilizatori interesați nu sunt date personale, dar profilul care se creează despre vizitatori are la bază datele colectate prin intermediul cookie-urilor de profilare publicitară, intră în categoria datelor personale.
                    </p>

                    <p className={styles.paragraph}>
                        Cum aceste cookie-uri sunt plasate de terți cu acordul nostru, rezultă că profilarea (care este o prelucrare de date personale) prin intermediul acestor cookie-uri este efectuată de noi ca operator de date.
                    </p>

                    <p className={styles.paragraph}>
                        Puteţi opta să nu fiţi profilat de Google în scop publicitar, accesând <a className={styles.link} href="https://www.google.com/settings/ads">https://www.google.com/settings/ads</a>.
                    </p>

                    <h2 className={styles.subtitle}>Cookie-urile care pot fi blocate din browser</h2>
                    <p className={styles.paragraph}>
                        Majoritatea browserelor sunt setate să accepte cookie-uri. Însă dacă nu doriți acest lucru, puteți seta browserul dvs. fie să vă anunțe ori de câte ori primiți câte un cookie, fie să refuze acceptarea cookie-urilor.
                    </p>

                    <p className={styles.paragraph}>
                        Trebuie însă să știți că unele secțiuni ale site-ului nostru nu vor putea fi vizualizate normal dacă ați setat browserul dvs. să respingă toate cookie-urile. Acest lucru nu se întâmplă în mod intenționat, ci pentru că unele funcții ale website-ului nostru nu pot funcționa corect fără folosirea cookie-urilor.
                    </p>

                    <h3 className={styles.subsection}>Informaţii şi instrucţiuni</h3>
                    <p className={styles.paragraph}>
                        Cum să editaţi această funcţie puteţi obţine în funcţie de furnizorul dumneavoastră de browser:
                    </p>
                    <ul>
                        <li><a className={styles.link} href="https://www.mozilla.org/ro/firefox/dnt/">Mozilla Firefox</a></li>
                        <li><a className={styles.link} href="https://support.microsoft.com/ro-ro/help/17288/windows-internet-explorer-11-use-do-not-track">Internet Explorer</a></li>
                        <li><a className={styles.link} href="https://support.google.com/chrome/answer/2790761?co=GENIE.Platform=Desktop&hl=ro">Google Chrome</a></li>
                        <li><a className={styles.link} href="https://help.opera.com/en/latest/web-preferences/#cookies">Opera</a></li>
                        <li><a className={styles.link} href="https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac">Safari</a></li>
                    </ul>

                    <h2 className={styles.subtitle}>Third Party Cookies</h2>
                    <p className={styles.paragraph}>
                        Cookie-uri de la terți sunt create de „terțe părți”, altele decât site-ul web pe care utilizatorul îl vizitează în prezent, în scopul de a furniza servicii de publicitate, retargeting, analiză și urmărire.
                    </p>

                    <h3 className={styles.subsection}>YouTube</h3>
                    <p className={styles.paragraph}>
                        Am încorporat pe site-ul nostru videoclipuri de pe YouTube utilizând Modul de îmbunătățire a confidențialității YouTube. Acest mod poate seta cookie-uri pe computerul dvs. când conținutul video este redat, însă YouTube nu va stoca informații de cookie-uri care pot fi identificate personal.
                    </p>

                    <p className={styles.paragraph}>
                        Pentru a afla mai multe, vă rugăm să vizitați pagina de informații cu privire la încorporarea videoclipurilor YouTube.
                    </p>

                    <h3 className={styles.subsection}>Double Click</h3>
                    <p className={styles.paragraph}>
                        Google Ads (Double Click) reprezintă un furnizor de servicii de promovare și marketing. DoubleClick utilizează cookie-uri pentru a vă prezenta publicitate relevantă.
                    </p>

                    <h3 className={styles.subsection}>Facebook pixel</h3>
                    <p className={styles.paragraph}>
                        Facebook Pixel este un instrument de analiză care vă permite să măsurați eficiența publicității dvs. prin înțelegerea acțiunilor pe care oamenii le întreprind pe site-ul dvs. web.
                    </p>

                    <h3 className={styles.subsection}>Plugin-urile sociale</h3>
                    <p className={styles.paragraph}>
                        Am integrat pe site-ul nostru următoarele plugin-uri ale rețelelor sociale care, în mod independent, pot seta cookie-uri pe computerul dvs.:
                    </p>
                    <ul>
                        <li>Facebook</li>
                        <li>Instagram</li>
                        <li>LinkedIn</li>
                    </ul>

                    <p className={styles.paragraph}>
                        Vă rugăm să rețineți că nu avem niciun control asupra modului în care sunt utilizate informațiile colectate prin intermediul acestor cookie-uri și nici nu avem acces la acestea.
                    </p>

                    <p className={styles.paragraph}>
                        Cu toate acestea suntem răspunzători împreuna cu rețelele sociale de aceste prelucrări, în conformitate cu politicile europene.
                    </p>

                    <p className={styles.paragraph}>
                        Furnizorul de plugin-uri stochează datele pe care le colectează ca profiluri de utilizare și le folosește în scopul publicității, cercetării de piață și / sau a designului bazat pe necesități al site-ului său.
                    </p>

                    <b className={styles.paragraph}>
                        Prin utilizarea acestui site, sunteți de acord cu prelucrarea datelor despre dvs. în modul și în scopurile menționate mai sus.
                    </b>

                </div>
            </section>

            <Footer />
        </>
    );
}

export default CookiesPolitics;