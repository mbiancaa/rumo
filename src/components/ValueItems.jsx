import style from '../styles/modules/Values.module.css';


const ValueItems = () => {
    return (
        <div className={style.values}>
            <div className={style.valueItem} style={{ marginTop: 200 }}>
                <div className={style.arrowContainer}>
                    <span className={`arrow ${style.arrow}`}></span>
                    <span className={style.valueNr}>01</span>
                </div>
                <h3>Integritate și loialitate</h3>
                <p>Ne place la nebunie să ne asumăm angajamente pe termen lung cu clienții noștri şi să contribuim la dezvoltarea durabilă a IMM-urilor. Astfel facem parte din promotorii dezvoltării societății românești si totodată avem un sentiment uriaș de împlinire. </p>
            </div>
            <div className={style.valueItem} style={{ marginTop: 100 }}>
                <div className={style.arrowContainer}>
                    <span className={`arrow ${style.arrow}`}></span>
                    <span className={style.valueNr}>02</span>
                </div>
                <h3>Pasiune</h3>
                <p>Marketingul online este, pentru noi, mai mult decât un serviciu – este vocație. Ne implicăm cu pasiune și profesionalism în fiecare proiect. Fie că dezvoltăm strategii digitale, optimizăm campanii PPC sau construim branduri în mediul online, pasiunea noastră se traduce în rezultate concrete pentru clienți și, pe termen lung, într-o economie locală mai sănătoasă și mai competitivă.</p>
            </div>
            <div className={style.valueItem}>
                <div className={style.arrowContainer}>
                    <span className={`arrow ${style.arrow}`}></span>
                    <span className={style.valueNr}>03</span>
                </div>
                <h3>Evolutie</h3>
                <p>Suntem într-o continuă căutare de soluții mai bune, mai eficiente și mai aliniate cu realitățile pieței digitale. Ne perfecționăm constant, testăm noi tehnologii și rafinăm strategiile pentru a livra servicii de marketing online care accelerează creșterea IMM-urilor. Prin acest efort susținut de dezvoltare, contribuim activ la digitalizarea și profesionalizarea mediului antreprenorial din România.</p>
            </div>
        </div>
    )
}

export default ValueItems;