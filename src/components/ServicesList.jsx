import SMMServiceImg from '../assets/services/smm.jpg';
import EmailServiceImg from '../assets/services/e-mail.jpg';
import SEOServiceImg from '../assets/services/seo.jpg';
import PlanningServiceImg from '../assets/services/planning.jpg';
import WebdevServiceImg from '../assets/services/webdev.jpg';
import BrandingServiceImg from '../assets/services/branding.jpg';
import PPCServiceImg from '../assets/services/ppc.jpg';

import { NavLink } from 'react-router-dom';

const ServicesList = () => {
    return (
        <div className="serviceList">
            <div className="serviceCard">
                <span className="serviceNumber">01</span>
                <NavLink to="/servicii/web-development" className="serviceTitle">Creare site web</NavLink>
                <span className="serviceText">Creăm site-uri moderne și personalizate care sunt parte integrantă din succesul afacerii tale</span>
                <img className="serviceImg" src={WebdevServiceImg} />
                <NavLink to="/servicii/web-development" className="arrowCTA"><span className="arrow"></span></NavLink>
            </div>
            <div className="serviceCard">
                <span className="serviceNumber">02</span>
                <NavLink to="/servicii/reclame-ppc" className="serviceTitle">PPC</NavLink>
                <span className="serviceText">Reclamele PPC transformă clickurile în clienți. Crește garantat vizibilitatea și vânzările!</span>
                <img className="serviceImg" src={PPCServiceImg} />
                <NavLink to="/servicii/reclame-ppc" className="arrowCTA"><span className="arrow"></span></NavLink>
            </div>
            <div className="serviceCard">
                <span className="serviceNumber">03</span>
                <NavLink to="/servicii/seo" className="serviceTitle">SEO</NavLink>
                <span className="serviceText">Fii primul în Google. Optimizăm site-ul tău pentru trafic mare și conversii multe!</span>
                <img className="serviceImg" src={SEOServiceImg} />
                <NavLink to="/servicii/seo" className="arrowCTA"><span className="arrow"></span></NavLink>
            </div>
            <div className="serviceCard">
                <span className="serviceNumber">04</span>
                <NavLink to="/servicii/social-media-marketing" className="serviceTitle">Social Media Management</NavLink>
                <span className="serviceText">Social Media Management strategic: transformăm urmăritorii în clienți! Fii mereu în trend!</span>
                <img className="serviceImg" src={SMMServiceImg} />
                <NavLink to="/servicii/social-media-marketing" className="arrowCTA"><span className="arrow"></span></NavLink>
            </div>
            <div className="serviceCard">
                <span className="serviceNumber">05</span>
                <NavLink to="/servicii/plan-strategic-de-marketing" className="serviceTitle">Plan strategic de marketing online</NavLink>
                <span className="serviceText">De la invizibil la de neocolit – Plan strategic de marketing online care îți pune afacerea pe hartă!</span>
                <img className="serviceImg" src={PlanningServiceImg} />
                <NavLink to="/servicii/plan-strategic-de-marketing" className="arrowCTA"><span className="arrow"></span></NavLink>
            </div>
            <div className="serviceCard">
                <span className="serviceNumber">06</span>
                <NavLink to="/servicii/branding" className="serviceTitle">Branding</NavLink>
                <span className="serviceText">Logo unic, identitate vizuală coerentă, poziționare clară – branding care vinde!</span>
                <img className="serviceImg" src={BrandingServiceImg} />
                <NavLink to="/servicii/branding" className="arrowCTA"><span className="arrow"></span></NavLink>
            </div>
            <div className="serviceCard">
                <span className="serviceNumber">07</span>
                <NavLink to="/servicii/email-marketing" className="serviceTitle">E-mail marketing</NavLink>
                <span className="serviceText">Campanii de e-mail marketing optimizate pentru conversii, engagement și retenția clienților!</span>
                <img className="serviceImg" src={EmailServiceImg} />
                <NavLink to="/servicii/email-marketing" className="arrowCTA"><span className="arrow"></span></NavLink>
            </div>
        </div>
    );
}

export default ServicesList;