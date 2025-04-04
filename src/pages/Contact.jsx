import '../styles/Home.css';
import '../styles/About.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

import HeroSection from '../sections/HeroSection';
import FAQList from '../components/FAQList';

import useInView from '../hooks/useInView';

const Contact = () => {

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
                            <h1 className="hero-title">Contact</h1>
                        </div>
                        <div ref={subtitleRef} className={`slideInTextAnimation ${subtitleInView ? "show" : ""}`}>
                            <h2 className="hero-subtitle">Cu RUMO, afacerea ta prinde avânt!</h2>
                        </div>
                    </div>
                    <div ref={descriptionRef} className={`eq-column slideInTextAnimation ${descriptionInView ? "show" : ""}`}>
                        <h2>Ești pregătit să-ți <span style={{ color: 'var(--blue)' }}>accelerezi</span> creșterea pe piață?</h2>
                        <p>Îți dorești un partener de marketing online care să înțeleagă exact provocările tale de business? Accesează secțiunea Contact și hai să ne cunoaștem! </p>
                        <p>La RUMO, ne concentrăm pe rezolvarea problemelor specifice afacerilor mici și mijlocii, oferind tactici personalizate, analize clare și îndrumare pas cu pas spre un ROI excelent.</p>
                    </div>
                </div>
            </HeroSection>
            <section style={{ padding: '60px 0', minHeight: 600, maxHeight: 600, height: 600 }} className="darkbg layout darkbg-sm-img bg-url  imgEffect">
                <h2 style={{ maxWidth: 1400, fontSize: 65, fontWeight: 900, lineHeight: '130px', margin: 'auto', }}>
                    <span style={{ color: 'var(--green)' }}>RUMO</span> – <span style={{ fontFamily: 'Kanit', fontWeight: 700 }}>Marketing digital</span> <br /> <span style={{ marginLeft: 200 }}>creat cu pasiune pentru afacerea ta</span>
                </h2>
            </section >
            <section className="whitebg layout">
                <div className="container">
                    <p style={{
                        fontSize: 34,
                        lineHeight: '42px',
                        letterSpacing: -1,
                    }}>
                        Știm cât de mult ai muncit pentru visul tău și cât de important este să-l vezi crescând. De aceea, ca soluție la provocările afacerii tale, creăm <b>strategii personalizate</b>, adaptate exact nevoilor tale.
                    </p>
                    <div className="text-content-container">
                        <h3>Cum lucrăm?</h3>
                        <p>Suntem o agenție de marketing digital cu rădăcini în România, dar cu viziune și ambiție globală. Am pornit la drum cu un nucleu de specialiști pasionați de marketing, business growth, design, copywriting, analiză de date și altele; ne dorim sa ne aducem aportul în ecosistemul antreprenorial din România.</p>
                        <p>În timp, am crescut organic, am adăugat membri noi și am îmbunătățit constant procesele interne, rămânând, totuși, aceeași echipă de oameni cu inimă și energie pozitivă.</p>
                        <p>Filosofia noastră este simplă: <b>ascultăm, planificăm, construim și scalăm</b>. Înțelegem că fiecare afacere are propriile obiective și provocări, motiv pentru care nu credem în „rețete” generale. Fiecare proiect primește atenția noastră completă și personalizată, astfel încât să creăm soluții originale și strategii bine ancorate în realitatea ta de business.</p>
                        <h3>De ce suntem o alegere potrivită:</h3>
                        <ul>
                            <li>Dispunem de expertiză atât în <b>campanii PPC</b>, cât și în <b>optimizarea SEO</b></li>
                            <li>Am implementat <b>planuri strategice de marketing online</b> pentru start-up-uri</li>
                            <li>Suntem o <b>agenție PPC</b> care știe să convertească bugete mici sau mari în rezultate tangibile</li>
                            <li>Punem preț pe date și analiză aprofundată, pentru a identifica și replica <b>cele mai eficiente tactici</b></li>
                            <li>Ne place să dăm viață brandurilor prin <b>creare branding</b> și să le facem memorabile pentru public</li>
                        </ul>
                    </div>
                    <h3 style={{
                        fontSize: 40,
                        marginBottom: 15,
                        marginTop: 80,
                        color: 'var(--blue)'
                    }}>Serviciile noastre și importanța lor în creșterea afacerii</h3>
                    <p style={{
                        fontSize: 24,
                        letterSpacing: -1
                    }}>
                        Fiecare serviciu din portofoliul nostru este atent construit pentru a răspunde nevoilor curente ale pieței, dar și pentru a-ți pregăti afacerea pentru viitor.<br /><br />Iată o scurtă prezentare a principalelor servicii:
                    </p>
                    <h4 style={{ fontSize: 20, fontWeight: 400, marginTop: 20, color: 'var(--grey)' }}><b style={{ color: 'var(--blue)' }}>Creare website –</b> Transformă-ți viziunea în realitate digitală și atrage mai mulți clienți. Oferim soluții moderne de web development (creare website) cu funcționalități intuitive și bine optimizate SEO, care generează conversii pe termen lung.</h4>
                    <h4 style={{ fontSize: 20, fontWeight: 400, marginTop: 20, color: 'var(--grey)' }}><b style={{ color: 'var(--blue)' }}>Campanii PPC –</b> Câștigă vizibilitate instantă și atrage publicul potrivit cu strategii PPC bine calibrate. Ajustăm bugetul și conținutul anunțurilor pentru a maximiza fiecare click și a crește profitul.</h4>
                    <h4 style={{ fontSize: 20, fontWeight: 400, marginTop: 20, color: 'var(--grey)' }}><b style={{ color: 'var(--blue)' }}>SEO –</b> Evidențiază-te în motoarele de căutare cu tehnici SEO avansate și conținut relevant. Creștem traficul organic, sporim notorietatea brandului și îți asigurăm o poziție solidă pe piață.</h4>
                    <h4 style={{ fontSize: 20, fontWeight: 400, marginTop: 20, color: 'var(--grey)' }}><b style={{ color: 'var(--blue)' }}>Social Media Management –</b> Conectează-te cu audiența ta prin postări creative și campanii interactive. Gestionăm eficient canalele sociale pentru a-ți mări comunitatea și a o menține activă și fidelă și pentru a-ți consolida imaginea.</h4>
                    <h4 style={{ fontSize: 20, fontWeight: 400, marginTop: 20, color: 'var(--grey)' }}><b style={{ color: 'var(--blue)' }}>Plan strategic de marketing –</b> Fii mereu cu un pas înaintea concurenței. Analizăm piața, definim obiective clare și dezvoltăm un plan flexibil, care să te susțină în fiecare etapă a creșterii afacerii tale.</h4>
                    <h4 style={{ fontSize: 20, fontWeight: 400, marginTop: 20, color: 'var(--grey)' }}><b style={{ color: 'var(--blue)' }}>Branding –</b> Creăm o identitate puternică ce reflectă valorile și personalitatea afacerii tale. Diferențiază-te de competiție cu un concept vizual coerent și mesaje care inspiră încredere.</h4>
                    <h4 style={{ fontSize: 20, fontWeight: 400, marginTop: 20, color: 'var(--grey)' }}><b style={{ color: 'var(--blue)' }}>Campanii de E-mail marketing –</b> Concepem mesaje puternice și bine segmentate, care să-ți aducă vânzări remarcabile nu doar pe termen scurt, ci și pe termen lung. Cu abordări personalizate și funnel-uri optimizate, maximizăm retenția și loialitatea clienților</h4>

                    <p style={{
                        fontSize: 24,
                        letterSpacing: -1,
                        marginTop: 60,
                        marginBottom: 40
                    }}>
                        Fie că ai nevoie de un website profesional, sa vinzi mai mult pe Google sau de o strategie de marketing completă, suntem aici să îți transformăm ambiția în succes real.
                    </p>
                    <p style={{ fontSize: 45, fontWeight: 900, lineHeight: '70px', color: 'var(--green)' }}>
                        Succesul tău este și succesul nostru!
                    </p>
                    <div className="text-content-container">
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
                    </div>
                    <FAQList />
                    <div className="text-content-container">
                        <h3>Acum e momentul potrivit să decizi</h3>
                        <p>Antreprenorii dedicați afacerii lor caută constant metode de creștere a afacerii prin marketing. Noi lucrăm umăr la umăr cu tine, ne sincronizăm cu valorile și viziunea ta, pentru ca rezultatele să reflecte cu adevărat esența brandului tău.</p>
                        <p>Dacă îți dorești o strategie coerentă, servicii eficiente și o echipă care să-ți fie alături pas cu pas, contactează-ne acum și hai să construim viitorul brandului tău!</p>
                    </div>
                </div>
            </section >
            <Footer />
        </>
    );
}

export default Contact;