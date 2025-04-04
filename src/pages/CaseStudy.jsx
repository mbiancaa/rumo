import ArticleLayout from "../components/ArticleLayout";
import BusinessImage from '../assets/1.1._DCS.jpeg';

const CaseStudy = () => {
    const services = [
        'Social Media Marketing',
        'Creare website',
        'SEO',
        'Branding',
        'Strategie de marketing online'
    ];

    return (
        <ArticleLayout
            title="De la cabinet stomatologic mic la clinică de top - stomatologie"
            category="Medicala"
            type="caseStudy"
            date="2020 - 2024"
            services={services}
            image={BusinessImage}
            company="DentalCare Sîrbu"
        >
            <div>
                <p>La RUMO Digital Path ne mândrim cu rezultatele pe care le obținem pentru clienții noștri, iar colaborarea cu <strong>DentalCare Sîrbu</strong> este unul dintre cele mai reprezentative exemple din portofoliul nostru.</p>

                <h2>De la un cabinet mic la o clinică de renume</h2>
                <p>Când am întâlnit echipa DentalCare Sîrbu într-un cabinet micuț situat în centrul Clujului, aveau doar câțiva pacienți pe săptămână...</p>

                <h2>Dezvoltarea afacerii prin strategie de marketing online</h2>
                <p>În lumea digitală de astăzi, este absolut esențial să îți dezvolți afacerea pe baza unei strategii profesionale de marketing online...</p>

                <h3>Primii pași:</h3>
                <ul>
                    <li><strong>Social media marketing</strong></li>
                    <li><strong>Crearea unui website profesional</strong></li>
                    <li><strong>SEO: De la vizibilitate scăzută la notorietate</strong></li>
                    <li><strong>Managementul website-ului și articolele de blog</strong></li>
                    <li><strong>Graphic design pentru un branding memorabil</strong></li>
                </ul>

                <h2>Rezultate remarcabile</h2>
                <p>După doar doi ani de colaborare, rezultatele au fost evidente. DentalCare Sîrbu a trecut de la un cabinet mic la o clinică modernă...</p>

                <h2>Ce am învățat: Marketing în domeniul medical</h2>
                <p>Prin această colaborare, am început să ne dezvoltăm competențe solide în marketingul medical...</p>

                <h3>Pilonii succesului nostru</h3>
                <ul>
                    <li><strong>Analiza și implementare strategică</strong> – Am investit timp pentru a analiza afacerea...</li>
                    <li><strong>Implicarea clientului</strong> – Comunicarea constantă și colaborarea strânsă...</li>
                </ul>


            </div>
        </ArticleLayout>
    );

}

export default CaseStudy;