import CEOTestimonialSlider from "../components/sliders/CEOTestimonialSlider";
import CEOImage from '../assets/CEO.jpg';

const CeoSection = () => {

    return (
        <section className="lightgreybg layout imgEffect" style={{
            // backgroundImage: `url(${CEOImage})`,
            // paddingBottom: 0,
            // paddingLeft: 0,
            // backgroundPosition: 'left',
            // backgroundRepeat: 'no-repeat',
            // backgroundSize: 'contain',
            // minHeight: '900px'
        }}>
            <div className="container d-flex ceo">
                <img style={{
                    objectFit: 'cover',
                    height: '100%',
                    width: '50%',
                    display: 'block',
                    marginBottom: 120,
                    marginRight: 40
                }} src={CEOImage} />
                <div className="ceoTestimonialWrapper">
                    <CEOTestimonialSlider />
                </div>
                <div style={{

                }}>
                    <span style={{
                        fontSize: 22,
                        color: 'var(--blue)'
                    }} className="smTitle">Monica Rusu, CEO & Founder, RUMO Digital Path</span>
                    <h2 style={{
                        fontSize: 96,
                        fontWeight: 'bold',
                        fontFamily: 'Kanit',
                        lineHeight: '106px',
                        margin: '30px 0 30px 0',
                    }}>Ajutăm<br /> <span style={{ color: 'var(--light-grey)' }}>IMM-urile</span><br /> <span style={{ color: '#a9a9a9' }}>să prospere</span></h2>
                    <p style={{
                        fontSize: 26,
                        fontWeight: 400,
                        lineHeight: '32px',
                        letterSpacing: '-1px',
                        color: 'var(--green)'
                    }}>În următorii cinci ani, ne dorim să devenim un partener esențial pentru companiile mici și mijlocii, contribuind semnificativ la creșterea acestora!</p>
                </div>
            </div>
        </section >
    );

}

export default CeoSection;