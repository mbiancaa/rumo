import useInView from "../hooks/useInView";
import image1 from '../assets/business-woman-analyse-chalkboard.jpg';
import image2 from '../assets/marketing-young-cute-business-lady-striped-shirt-office-creating-new-marketing-plan.jpg';

const WorkProcess = () => {
    const [imageColumnRef1, imageColumnInView1] = useInView(0);
    const [imageColumnRef2, imageColumnInView2] = useInView(0);
    return (
        <div className="container" style={{
            borderBottom: '1px solid var(--white-grey)'
        }}>
            <span className="smTitle">Procesul nostru de lucru</span>
            <div style={{ gap: 60, marginTop: 30, marginBottom: 50 }}
                className={`d-flex`}>
                <h2 style={{
                    flex: 1,
                    width: 'calc(60% - 20px)',
                    fontSize: 42,
                    maxWidth: 575
                }}
                >RUMO, Agenția de marketing online focusată pe creșterea și dezvoltarea afacerilor mici și mijlocii.</h2>
                <p style={{
                    width: 'calc(40% - 20px)',
                    color: 'var(--light-grey)',
                    fontSize: 21,
                    fontFamily: 'Kanit',
                    lineHeight: '28px',
                    maxWidth: 390
                }}
                >Alături de Rumo, vei descoperi cât de plăcut este să îți vezi afacerea crescând.</p>
            </div>
            <div className="cardList">
                <div className="cardBox d-flex" style={{ width: '100%' }}>
                    <div style={{ width: '50%' }}>
                        <h3><span>1.</span> Analiza pieței și a concurenței</h3>
                        <div className="cardTextContent">
                            <p>În această etapă, efectuăm o analiză complexă:</p>
                            <ul>
                                <li>a afacerii tale și a obiectivelor;</li>
                                <li>a pieței și a concurenței pentru a înțelege tendințele;</li>
                                <li>nevoile audienței și cum se poziționează competitorii tăi.</li>
                            </ul>
                            <p>Aceasta este esențială pentru crearea unei strategii 360°.</p>
                        </div>
                    </div>
                    <div style={{ width: '50%', position: 'relative', height: 220 }} ref={imageColumnRef1} className={`imageRevealEffect imageRevealEffectBackwards ${imageColumnInView1 ? "show" : ""}`}>
                        <img src={image1} style={{
                            width: '50dvw',
                            height: 220,
                            objectFit: 'cover',
                            position: 'absolute',
                            top: 0,
                            left: 0
                        }} />
                    </div>
                </div>
                <div className="cardBox">
                    <h3><span>2.</span> Definirea obiectivelor și a strategiei de marketing digital</h3>
                    <div className="cardTextContent">
                        <p>Stabilim obiective clare și realizabile, concentrându-ne pe creșterea traficului organic, generarea de lead-uri și optimizarea conversiilor. Alegem canale potrivite și creăm o strategie personalizată de marketing online, pentru a maximiza rezultatele.</p>
                    </div>
                </div>
                <div className="cardBox">
                    <h3><span>3.</span> Implementarea strategiei</h3>
                    <div className="cardTextContent">
                        <p>În strategia avansată de marketing digital, includem o serie de acțiuni semnificative, până la suport în stabilirea unor parteneriate strategice pentru extinderea audienței și creșterea ROI-ului.</p>
                    </div>
                </div>
                <div className="cardBox d-flex" style={{ width: '100%' }}>
                    <div style={{ width: '50%', position: 'relative', height: 330 }} ref={imageColumnRef2} className={`imageRevealEffect ${imageColumnInView2 ? "show" : ""}`}>
                        <img src={image2} style={{
                            width: '50dvw',
                            height: 330,
                            objectFit: 'cover',
                            position: 'absolute',
                            top: 0,
                            right: 0
                        }} />
                    </div>
                    <div style={{ width: '50%' }}>
                        <h3><span>4.</span> Optimizarea și monitorizarea campaniilor</h3>
                        <div className="cardTextContent">
                            <p>Monitorizăm constant performanța campaniilor și optimizăm în funcție de datele obținute. Folosim analize de date pentru a ajusta tacticile, asigurându-ne că strategia de marketing aduce rezultate optime pe termen lung.</p>
                            <p>Pentru a comunica eficient rezultatele campaniei, oferim rapoarte detaliate bazate pe KPI-uri esențiale (ROAS, CPA, CTR, conversii, engagement). Aceste rapoarte sunt prezentate periodic pentru a explica tendințele, impactul acțiunilor anterioare și oportunitățile viitoare.</p>
                            <p>Prin sesiuni strategice, analizăm împreună cu clientul datele obținute, identificăm punctele forte și zonele de îmbunătățire și definim noile tactici. Astfel, strategia devine un proces colaborativ, bazat pe date concrete, maximizând performanța campaniilor și adaptându-se continuu la schimbările pieței și comportamentul consumatorilor.</p>
                        </div>
                    </div>

                </div>
                <div className="cardBox">
                    <h3><span>5.</span> Evaluarea strategiei</h3>
                    <div className="cardTextContent">
                        <p>Evaluăm și măsurăm eficiența strategiilor de marketing online și impactul asupra obiectivelor stabilite, folosind KPI-uri relevante precum rata de conversie, costul per achiziție (CPA), return on ad spend (ROAS) și engagement-ul utilizatorilor.</p>
                        <p>Pentru o transparență maximă, oferim rapoarte detaliate iar ulterior, pe baza datelor colectate, identificăm ce tactici funcționează cel mai bine și unde sunt oportunități de îmbunătățire.</p>
                        <p>Această abordare ajută clientul să înțeleagă clar progresul campaniei și de ce optimizarea strategiei influențează în mod direct atingerea obiectivului afacerii.</p>
                    </div>
                </div>
                <div className="cardBox">
                    <h3><span>6.</span> Ajustarea strategiei</h3>
                    <div className="cardTextContent">
                        <p>Ajustarea tacticilor specifice strategiei alese nu se rezumă doar la optimizări minore, ci poate implica schimbări fundamentale în funcție de performanță, comportamentul consumatorilor și tendințele pieței. Analizăm datele în timp real pentru a identifica dacă obiectivele inițiale rămân relevante sau necesită recalibrare.</p>
                        <p>Este esențial să ajustăm tacticile sau, uneori, chiar strategia în momente-cheie, cum ar fi:</p>
                        <ul>
                            <li>scăderea ratei de conversie;</li>
                            <li>modificarea bugetului alocat campaniei, care poate fi mult mai mare sau mult mai mic;</li>
                            <li>schimbări în algoritmii platformelor de publicitate;</li>
                            <li>modificări în comportamentul publicului țintă.</li>
                        </ul>
                        <p>În aceste cazuri, putem reorienta bugetele, testa noi campanii, noi servicii sau adopta noi canale de promovare pentru a menține competitivitatea și eficiența campaniilor.</p>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default WorkProcess;