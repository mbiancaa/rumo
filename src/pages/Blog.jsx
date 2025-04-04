import '../styles/Home.css';
import '../styles/About.css';
import '../styles/Blog.css';
import '../styles/Pagination.css';
import '../styles/Filters.css';

import Header from '../components/Header';
import Footer from '../components/Footer';

import HeroSection from '../sections/HeroSection';
import BlogBox from '../components/BlogBox';

import useInView from '../hooks/useInView';

const Blog = () => {
    const [textRef, textInView] = useInView(100);
    const [subtitleRef, subtitleInView] = useInView(600);
    const [descriptionRef, descriptionInView] = useInView(650);
    const [separatorRef, separatorInView] = useInView(350);

    return (
        <>

            <Header />
            <HeroSection>
                <div className="layout eq-columns">
                    <div ref={separatorRef} className={`eq-column separator ${separatorInView ? "show" : ""}`}>
                        <div ref={textRef} className={`slideInTextAnimation ${textInView ? "show" : ""}`}>
                            <h1 className="hero-title">Blog</h1>
                        </div>
                        <div ref={subtitleRef} className={`slideInTextAnimation ${subtitleInView ? "show" : ""}`}>
                            <h2 className="hero-subtitle">Cu RUMO, afacerea ta prinde avânt!</h2>
                        </div>
                    </div>
                    <div ref={descriptionRef} className={`eq-column slideInTextAnimation ${descriptionInView ? "show" : ""}`}>
                        <h2>Antreprenori care iau decizii informate</h2>
                        <p>Într-un blog profesionist de marketing vei găsi recomandări bazate pe experiență și sfaturi utile despre implementarea oricărui serviciu de marketing online.</p>
                        <p>Când preiei informații de la specialiști, scazi considerabil riscul de a face experimente costisitoare și de a trece prin situații necunoscute și riscante pentru afacerea ta. Blogul nostru sumarizează toate actualitățile serviciilor oferite de noi din domeniul marketing digital.</p>
                    </div>
                </div>
            </HeroSection >

            <section style={{ padding: '260px 0' }} className="darkbg layout darkbg-sm-img bg-url  imgEffect">
                <h2 style={{ margin: 'auto', textAlign: 'center' }}>Lucrăm cu branduri mici și mijlocii care aspiră să fie mari!</h2>
            </section >

            <section className="whitebg layout">
                <div className="container" style={{ paddingTop: 20 }}>
                    <div className="filters">
                        <span className="active">Cele mai recente</span>
                        <span>Advertising</span>
                        <span>Branding</span>
                        <span>Marketing</span>
                        <span>SEO</span>
                        <span>PPC</span>
                        <span>Social Media Marketing</span>
                        <span>Web Development</span>
                    </div>
                    <div className="blog-container">
                        <BlogBox />
                        <BlogBox />
                        <BlogBox />
                        <BlogBox />
                        <BlogBox />
                        <BlogBox />
                    </div>
                    <div className="pagination">
                        <span className="pageNr active">1</span>
                        <span className="pageNr ">2</span>
                        <span className="pageNr ">..</span>
                        <span className="pageNr ">22</span>
                        <span className="pageNr nextPage"><span className="arrow"></span></span>
                    </div>

                    <div className="text-content-container" style={{ marginTop: 120 }}>
                        <h3>Blog de marketing online</h3>
                        <p>Pe blogul RUMO Digital Path, aducem la un loc informațiile și tendințele cele mai importante și mai actuale din sfera marketingului online. Indiferent dacă ești antreprenor la început de drum sau ai deja o afacere matură, vei descoperi <b>tacticile prin care îți poți crește sau dezvolta afacerea</b>, exemple concrete și sfaturi bazate pe experiența noastră de lucru.</p>
                        <p>Iată câteva tipuri de articole și materiale pe care le vei putea citi:</p>
                        <ul>
                            <li>Ghiduri pas cu pas despre cum să te folosești de servicii de creare website pentru a atrage clienți noi</li>
                            <li>Studii comparative și analize din zona servicii SEO, pentru a înțelege ce funcționează și ce nu</li>
                            <li>Informații practice despre gestionare eficientă campanii PPC și optimizarea bugetelor de promovare</li>
                            <li>Tehnici de creștere a vizibilității prin social media și exemple de bune practici din partea unei agenții social media management</li>
                            <li>Detalii despre tendințele globale care influențează campaniile de promovare online la nivel local și internațional</li>
                            <li>Idei de plan strategic de marketing online pentru industrii diferite, adaptate nevoilor publicului românesc</li>
                            <li>Sfaturi despre creare branding și cum să te diferențiezi de competiție</li>
                            <li>Recomandări și noutăți legate de campanii de e-mail marketing, care pot fi implementate rapid și cu investiții minime</li>
                        </ul>
                        <p>În plus, pe pagina Studii de caz vom împărtăși exemple de colaborări de succes ale RUMO Digital Path cu diverse afaceri, precum și alte hint-uri utile pentru antreprenorii din sfera IMM-urilor. Considerăm că cele mai bune lecții provin din exemple reale, unde putem vedea exact cum anumite strategii au fost aplicate, testate și îmbunătățite de-a lungul timpului.</p>
                        <p>Noi suntem o agenție de marketing online care urmărește cu pasiune și dedicare fiecare pas al dezvoltării tale în mediul digital. Credem în puterea creativă a marketingului și în potențialul de creștere pe care îl oferă atunci când este implementat corect.</p>
                        <p>Suntem RUMO Digital Path, o echipă de specialiști ce adorăm provocările și ne dedicăm 100% pentru a crește afaceri la nivelul la care antreprenorii visează. Ne motivează impactul pe care îl avem asupra ecosistemului antreprenorial românesc și apreciem în mod deosebit conexiunea cu fiecare client care ne alege. Fiecare nou parteneriat ne stimulează să găsim soluții creative și să punem în practică metode de creștere a afacerii prin marketing online, în așa fel încât să oferim un plus de valoare vizibil și tangibil.</p>
                        <h3>De ce contează marketingul online?</h3>
                        <p>Marketingul online nu mai este opțional în contextul actual, ci reprezintă un motor de dezvoltare esențial pentru orice afacere. Indiferent că discutăm despre companii la început de drum sau despre branduri deja consacrate, prezența în mediul digital îți poate propulsa afacerea spre audiențe extinse și oportunități reale de vânzare. Cu alte cuvinte, dacă nu ții pasul cu acest mare mecanism al promovării online, riști să pierzi din relevanță și să intri într-un declin treptat, dificil de redresat ulterior.</p>
                        <p>Noi, la RUMO Digital Path, suntem mereu la curent cu tendințele, instrumentele și resursele de actualitate, pentru ca tu să beneficiezi de strategii eficiente și de un suport profesionist. Pentru a-ți consolida poziția în piață, punem accent pe:</p>
                        <ul>
                            <li><b>Optimizare continuă și testare</b> – Ne adaptăm rapid la schimbările algoritmilor și pieței</li>
                            <li><b>Colaborare strânsă cu tine</b> – Credem că sinergia echipă-client aduce cele mai bune rezultate</li>
                            <li><b>Transparență totală</b> – Îți oferim rapoarte clare și te implicăm activ în luarea deciziilor</li>
                            <li><b>Experiență diversificată</b> – Am derulat campanii de promovare online în multiple industrii, de la e-commerce la servicii financiare și high-tech</li>
                        </ul>
                        <h3>Cum lucrăm?</h3>
                        <p>Suntem o agenție de marketing digital cu rădăcini în România, dar cu viziune și ambiție globală. Am pornit la drum cu un nucleu de specialiști pasionați de marketing, business growth, design, copywriting, analiză de date și altele; ne dorim sa ne aducem aportul în ecosistemul antreprenorial din România.</p>
                        <p>În timp, am crescut organic, am adăugat membri noi și am îmbunătățit constant procesele interne, rămânând, totuși, aceeași echipă de oameni cu inimă și energie pozitivă.</p>
                        <p>Filosofia noastră este simplă: ascultăm, planificăm, construim și scalăm. Înțelegem că fiecare afacere are propriile obiective și provocări, motiv pentru care nu credem în „rețete” generale. Fiecare proiect primește atenția noastră completă și personalizată, astfel încât să creăm soluții originale și strategii bine ancorate în realitatea ta de business.</p>
                        <h3>De ce suntem o alegere potrivită:</h3>
                        <ul>
                            <li>Dispunem de expertiză atât în <b>campanii PPC</b>, cât și în <b>optimizarea SEO</b></li>
                            <li>Am implementat <b>planuri strategice de marketing online</b> pentru start-up-uri</li>
                            <li>Suntem o <b>agenție PPC</b> care știe să convertească bugete mici sau mari în rezultate tangibile</li>
                            <li>Punem preț pe date și analiză aprofundată, pentru a identifica și replica <b>cele mai eficiente tactici</b></li>
                            <li>Ne place să dăm viață brandurilor prin <b>creare branding</b> și să le facem memorabile pentru public</li>
                        </ul>
                        <h3>Serviciile noastre și importanța lor în creșterea afacerii</h3>
                        <p>Fiecare serviciu din portofoliul nostru este atent construit pentru a răspunde nevoilor curente ale pieței, dar și pentru a-ți pregăti afacerea pentru viitor.</p>
                        <p>Iată o scurtă prezentare a principalelor servicii:</p>
                        <ol>
                            <li>
                                <p><b>Creare website</b></p>
                                <p>Un website bine structurat și optimizat reprezintă fundația prezenței tale online. Te ajutăm să ai o platformă funcțională, rapidă și atrăgătoare, unde potențialii clienți să descopere valorile brandului și să facă rapid conversia dorită</p>
                            </li>
                            <li>
                                <p><b>PPC (Pay-Per-Click)</b></p>
                                <p>Prin campanii PPC targetate, generăm trafic relevant și creștem vânzările. Monitorizăm constant costurile, randamentul și comportamentul consumatorilor pentru a maximiza profitul și a menține rentabilitatea investiției.</p>
                            </li>
                            <li>
                                <p><b>SEO (Search Engine Optimization)</b></p>
                                <p>Vrei să fii vizibil în rezultatele organice de căutare? Serviciile SEO sunt strategice și asigură un flux constant de trafic calificat. Te ajutăm să te poziționezi mai sus în Google și să atragi publicul interesat exact de produsele sau serviciile tale.</p>
                            </li>
                            <li>
                                <p><b>SMM (Social Media Marketing)</b></p>
                                <p>Creăm conținut atractiv și gestionăm comunitățile din social media pentru a crește notorietatea brandului și implicarea fanilor. În calitate de agenție social media management, ne asigurăm că mesajele tale sunt coerente și captivante, sporind interacțiunea cu potențialii clienți.</p>
                            </li>
                            <li>
                                <p><b>Plan strategic de marketing online</b></p>
                                <p>Un plan strategic bine definit îți oferă direcție și claritate. Noi analizăm piața, competitorii și publicul țintă, apoi conturăm obiective măsurabile și tactici prin care să-ți atingi obiectivele de business, asigurându-ne că fiecare acțiune contribuie la creșterea brandului tău.</p>
                            </li>
                            <li>
                                <p><b>Branding</b></p>
                                <p>Prin serviciile de creare branding, imaginăm și rafinăm identitatea afacerii tale, de la logo și paletă de culori, până la limbaj și personalitate. Astfel, brandul devine memorabil și relevant pentru public, crescând loialitatea clienților.</p>
                            </li>
                            <li>
                                <p><b>E-mail Marketing</b></p>
                                <p>Campanii de e-mail marketing bine planificate îți păstrează clienții informați și motivați să revină. Segmentăm baza de date, personalizăm conținutul și măsurăm performanța, pentru a crește gradul de implicare și rata de conversie.</p>
                            </li>
                        </ol>
                        <h3>Rămâi mereu la curent cu noutățile</h3>
                        <p>Piața de marketing digital evoluează într-un ritm accelerat. Algoritmii motoarelor de căutare se schimbă constant, platformele de advertising se actualizează și preferințele publicului pot trece prin transformări radicale în perioade relativ scurte.</p>
                        <p>A rămâne up to date cu aceste modificări este vital pentru orice antreprenor.</p>
                        <p>Ne dedicăm să-ți punem la dispoziție cele mai fresh informații, direct din surse oficiale și de la experți recunoscuți, pentru ca tu să poți lua deciziile corecte pentru afacerea ta. De asemenea, pe blogul RUMO Digital vei găsi analize de ultimă oră, exemple de implementare și soluții creative, toate prezentate într-un mod ușor de înțeles și aplicat.</p>
                        <h3>Ești pregătit să crești?</h3>
                        <p>Noi, la RUMO Digital Path, știm că viteza de adaptare face diferența în piață. <b>Vrei să iei inițiativa și să faci următorul pas pentru business-ul tău?</b></p>
                        <p style={{ fontWeight: 900 }}>Programează o discuție cu noi și hai să vedem cum putem participa la atingerea obiectivelor afacerii tale!</p>
                        <h3>De ce RUMO Digital Path este partenerul ideal?</h3>
                        <ol>
                            <li>
                                <p><b>Experiență în multiple industrii</b></p>
                                <p>Fie că discutăm despre servicii medicale, e-commerce, servicii de consultanță, HoReCa sau altele, am acumulat cunoștințe vaste și am derulat numeroase campanii de promovare online. Astfel, știm cum să ne adaptăm rapid și să creăm strategii specifice fiecărui domeniu.</p>
                            </li>
                            <li>
                                <p><b>Consultanță personalizată</b></p>
                                <p>Nu credem în șabloane și rețete unice. Analizăm, discutăm și explorăm potențialele căi de creștere pentru afacerea ta, punând un accent deosebit pe aspectele cu cel mai mare impact asupra vânzărilor și reputației.</p>
                            </li>
                            <li>
                                <p><b>Transparență și rezultate măsurabile</b></p>
                                <p>Îți oferim rapoarte periodice și acces la discuții deschise despre evoluția campaniilor. Orice decizie luăm împreună, avem la bază date concrete și obiective precise.</p>
                            </li>
                            <li>
                                <p><b>Abordare holistică</b></p>
                                <p>Reunim toate serviciile de care ai nevoie sub același acoperiș: de la servicii de creare website, la servicii SEO, campanii PPC, campanii de e-mail marketing, social media management și altele. Astfel, ai o echipă completă care înțelege toate fațetele brandului tău.</p>
                            </li>
                            <li>
                                <p><b>Focus pe antreprenorii români</b></p>
                                <p>Noi înțelegem specificul pieței românești și provocările cu care se confruntă antreprenorii locali. Suntem convinși că un brand autohton poate deveni un jucător redutabil inclusiv la nivel internațional, atâta vreme cât dispune de un plan strategic de marketing online bine articulat.</p>
                            </li>
                        </ol>
                        <h3>De ce e important să investești acum?</h3>
                        <p>Într-o lume conectată digital, nevoia de a rămâne competitiv e mai stringentă decât oricând. Fiecare zi în care nu implementezi acțiuni de marketing poate însemna clienți pierduți în favoarea competitorilor care aleg să acționeze rapid. În plus, un brand care nu este constant îmbunătățit și promovat riscă să cadă în irelevanță.</p>
                        <p>Dacă te bazezi doar pe vechile metode de promovare sau dacă lași la voia întâmplării tot ceea ce ține de imaginea și strategia ta online, există un risc real de declin gradual al afacerii. Aceasta nu este doar o frază de efect, ci un adevăr susținut de statisticile care arată că firmele care nu inovează și nu investesc în marketing online își pierd poziția, chiar și atunci când au un produs de calitate.</p>
                        <h3>Ce urmează?</h3>
                        <p>Noi, la RUMO Digital Path, considerăm că fiecare antreprenor merită să aibă parte de metode de creștere a afacerii prin marketing, fără să se simtă copleșit de toate detaliile tehnice și de termeni complicati. Lucrăm umăr la umăr cu tine, ne sincronizăm cu valorile și viziunea ta, pentru ca rezultatele să reflecte cu adevărat esența brandului tău.</p>
                        <p>Tot ceea ce facem se bazează pe principiul colaborării deschise. Ne dorim să îți alimentăm încrederea prin rezultate și printr-un parteneriat solid, în care fiecare succes este sărbătorit și fiecare dificultate este abordată ca pe o provocare pozitivă.</p>
                        <h3>Hai să ne cunoaștem mai bine!</h3>
                        <p>Dacă îți dorești o strategie coerentă, servicii eficiente și o echipă care să-ți fie alături pas cu pas, contactează-ne acum și hai să construim viitorul brandului tău!</p>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}

export default Blog;