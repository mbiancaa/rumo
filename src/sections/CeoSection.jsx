import CEOTestimonialSlider from "../components/sliders/CEOTestimonialSlider";
import TeamMember from '../assets/team_members/team2.png';

const CeoSection = () => {

    return (
        <section className="darkbg layout darkbg-ceo-img imgEffect">
            <div className="container d-flex ceo">
                <div className="ceoTestimonialWrapper">
                    <CEOTestimonialSlider />
                </div>
                <div style={{
                    width: 'calc(100% - 720px)',
                    minWidth: 'calc(100% - 720px)',
                    maxWidth: 'calc(100% - 720px)'
                }}>
                    {/* <img style={{
                        objectFit: 'cover',
                        height: 135,
                        width: 135,
                        borderRadius: '50%',
                        display: 'block',
                        marginBottom: 20,
                        marginTop: 40
                    }} src={TeamMember} /> */}
                    <span className="smTitle">Monica Rusu, CEO & Founder, RUMO Digital Path</span>
                    <h2 style={{
                        fontSize: 60,
                        fontWeight: 'bold',
                        fontFamily: 'Kanit',
                        lineHeight: '66px',
                        margin: '10px 0 25px 0',
                    }}>Ajutăm<br /> <span style={{ color: 'var(--light-grey)' }}>IMM-urile</span><br /> <span style={{ color: '#a9a9a9' }}>să prospere</span></h2>
                    <p style={{
                        fontSize: 16,
                        fontWeight: 400,
                        lineHeight: '25px',
                        letterSpacing: '-1px',
                        color: '#c5c5c5',
                        maxWidth: 200
                    }}>În următorii cinci ani, ne dorim să devenim un partener esențial pentru companiile mici și mijlocii, contribuind semnificativ la creșterea acestora!</p>
                </div>
            </div>
        </section>
    );

}

export default CeoSection;