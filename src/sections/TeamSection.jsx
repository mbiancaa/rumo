import TeamSlider from "../components/sliders/TeamSlider";
import { NavLink } from "react-router-dom";

const TeamSection = () => {

    return (
        <section className="whitebg layout" style={{ minHeight: 750 }}>
            <div className="container d-flex team">
                <div className="left">
                    <span className="smTitle">ECHIPA NOASTRĂ</span>
                    <h2>Experții agenției RUMO. <br /> <span style={{ color: 'var(--grey)' }}>Alături de noi, afacerea ta prinde avânt!</span></h2>
                    <p>Strategii digitale de succes! Făcând echipă cu RUMO, te vei convinge de puterea marketingului online!</p>
                    <NavLink to="/echipa" className="linkCTA"><span>Vezi toți specialiștii noștri</span></NavLink>
                </div>
                <div className="right">
                    <TeamSlider />
                </div>
            </div>
        </section>
    );

}

export default TeamSection;