import '../styles/Home.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SEO from '../components/SEO';

const Terms = () => {

    return (
        <>
            <SEO 
                title="Termeni și Condiții - RUMO"
                description="Termeni și condiții de utilizare pentru site-ul RUMO. Citește regulile și politicile noastre privind utilizarea serviciilor și conținutului nostru."
            />
            <Header />

            <section className="whitebg layout">
                <div className="container text-content-container">
                    <h1>Termeni și condiții</h1>
                    <p>Site-ul <a className={`link`} href="https://rumodigitalpath.com/">rumodigitalpath.com</a>, este proprietatea <b>RMM OFFICIAL SRL.</b>, persoană juridică înregistrată în Cluj-Napoca, Str. Orastie 10 E, cu datele de identificare la Registrul Comerțului J12/1931/2019 CUI/CIF: 41072560, numită în continuare RUMO. Produsele care se regăsesc pe acest site nu sunt destinate revânzării.</p>
                    <p>Folosirea acestui site implică acceptarea termenilor și condițiilor de mai jos. Recomandăm citirea cu atenție a acestora. RMM OFFICIAL SRL își asumă dreptul de a modifică aceste prevederi fără o altă notificare. Cea mai recentă versiune poate fi accesată în această pagină.</p>
                    <p>RMM OFFICIAL SRL garantează utilizatorului acces limitat, în interes personal, pe site-ul <a className={`link`} href="https://rumodigitalpath.com/">rumodigitalpath.com</a> și nu îi conferă dreptul de a descarcă sau de a modifică parțial sau integral site-ul, de a reproduce parțial sau integral site-ul, de a copia, de a vinde/revinde sau de a exploata site-ul în orice altă manieră, în scopuri comerciale sau contrare intereselor companiei RMM OFFICIAL SRL fără acordul prealabil scris al acesteia.</p>
                    <p>Dreptul de a crea o legătură web – link – către <a className={`link`} href="https://rumodigitalpath.com/">rumodigitalpath.com</a> este limitat, neexclusiv și revocabil, și este acordat atât timp cât nu aduce neajunsuri de orice fel pentru RMM OFFICIAL SRL sau oricăruia dintre partenerii noștri, numai după obținerea în scris sau prin e-mail a acordului nostru.</p>

                    <h2>1. Dreptul de autor al RMM OFFICIAL SRL asupra informațiilor publicate pe site</h2>
                    <p>Întregul conținut al site-ului <a className={`link`} href="https://rumodigitalpath.com/">rumodigitalpath.com</a> imagini, texte, grafice, simboluri, elemente de grafică web, e-mail-uri, scripturi, programe și alte date – este proprietatea RMM OFFICIAL SRL și a furnizorilor săi și este apărat de Legea pentru protecția drepturilor de autor (legea nr. 8/1996) și de legile privind proprietatea intelectuală și industrială. Folosirea fără acordul RMM OFFICIAL SRL a oricăror elemente enumerate mai sus se pedepsește conform legislației în vigoare. Se permite folosirea site-ului <a className={`link`} href="https://rumodigitalpath.com/">rumodigitalpath.com</a> numai în limitele metionate în prezentul document.</p>
                    <p >Pentru raportarea încălcării legii drepturilor de autor, vă rugăm să ne contactați pe adresa de e-mail <a className={`link`} href="mailto:office@rumodigitalpath.com">office@rumodigitalpath.com</a> sau să sunați la numărul de telefon <a className={`link`} href="tel:+40722999104">+40 722 999 104</a>.</p>

                    <h2>2. Calitatea serviciilor de hosting, link-urile către alte site-uri, erori de funcționare</h2>
                    <p>Site-ul <a className={`link`} href="https://rumodigitalpath.com/">rumodigitalpath.com</a> este găzduit de serverele unei terțe firme. RMM OFFICIAL SRL nu va putea fi făcută responsabilă pentru eventualele erori apărute pe site indiferent de motivele apariției lor, acestea incluzând modificări ale site-ului, setări sau actualizări ale scripturilor programate. RMM OFFICIAL SRL nu va putea fi făcută răspunzătoare pentru erorile apărute din cauza folosirii anumitor browsere pentru vizitarea site-ului <a className={`link`} href="https://rumodigitalpath.com/">rumodigitalpath.com</a>. RMM OFFICIAL SRL nu răspunde de conținutul, calitatea sau natură site-urilor la care se ajunge prin legături de pe site-ul <a className={`link`} href="https://rumodigitalpath.com/">rumodigitalpath.com</a>. Pentru respectivele site-uri, răspunderea integrală o poartă proprietarii site-urilor în cauza.</p>

                    <h2>3. Politică de confidențialitate</h2>
                    <p>Vă rugăm să citiți aici <a className={`link`} href="https://rumodigitalpath.com/">rumodigitalpath.com</a> Politica de confidențialitate cu atenție și să vă asigurați că o înțelegeți. Acceptarea acestei Politici de confidențialitate este prezumată odată cu prima dumneavoastră vizită pe site-ul <a className={`link`} href="https://rumodigitalpath.com/">rumodigitalpath.com</a>. Dacă nu sunteți de acord cu această Politică de confidențialitate, trebuie să încetați imediat folosirea Site-ului.</p>

                    <h2>4. Dispoziții finale</h2>
                    <p>Orice altă problemă cauzată de produsele și serviciile prezentate pe <a className={`link`} href="https://rumodigitalpath.com/">rumodigitalpath.com</a> și care nu este deja tratată de nici un articol din prezentul document, se va soluționa pe cale amiabilă, în termen de 30 de zile lucrătoare de la dată sesizării în scris a problemelor, de către utilizator. Dacă apar probleme care nu par a putea fi rezolvate cu persoana cu care discutați, puteți lua legătură pentru o conciliere gratuită cu RMM OFFICIAL SRL la adresa de e-mail <a className={`link`} href="mailto:office@rumodigitalpath.com">office@rumodigitalpath.com</a>.</p>
                    <p>În cazul în care nu s-a reușit stingerea conflictului pe cale amiabilă, competență revine instanțelor de judecată române sau unui organism de rezolvare a disputelor alternativ, agreat de ambele părți. Fiind de acord cu acești Termeni și Condiții de Utilizare a site-ului <a className={`link`} href="https://rumodigitalpath.com/">rumodigitalpath.com</a>, clientul își asumă în totalitate consecințele ce decurg din folosirea în aceste condiții a site-ului.</p>
                </div>
            </section>

            <Footer />
        </>
    );
}

export default Terms;