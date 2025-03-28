import ServicesList from "./ServicesList";
const Services = () => {

    return (
        <div className="container services">
            <span className="smTitle">Servicii</span>
            <h2 style={{
                fontSize: 50,
                maxWidth: 'calc(100% - 265px)',
                fontWeight: 'bold',
                fontFamily: 'Kanit',
                letterSpacing: -1,
                lineHeight: '55px',
                minWidth: 764
            }}>Experții din echipa RUMO transformă visele brandului tău cu ajutorul strategiei de marketing online 360°</h2>
            <p style={{
                color: 'var(--light-grey)',
                fontWeight: 400,
                marginLeft: 'auto',
                maxWidth: 400,
                minWidth: 400,
                fontFamily: 'Kanit',
                fontSize: 18,
                lineHeight: '18px',
                letterSpacing: '-1px'
            }}
            >Îți oferim o abordare completă și integrată care acoperă toate canalele și tacticile necesare pentru a crește vizibilitatea, atrage clienți și genera conversii.</p>
            <ServicesList />
        </div>
    );

}

export default Services;