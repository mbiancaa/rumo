import SMMServiceImg from '../assets/services/smm.jpg';
import EmailServiceImg from '../assets/services/e-mail.jpg';
import SEOServiceImg from '../assets/services/seo.jpg';
import PlanningServiceImg from '../assets/services/planning.jpg';
import WebdevServiceImg from '../assets/services/webdev.jpg';
import BrandingServiceImg from '../assets/services/branding.jpg';
import PPCServiceImg from '../assets/services/ppc.jpg';

const ServicesList = () => {
    return (
        <div className="serviceList">
            <div className="serviceCard">
                <span className="serviceNumber">01</span>
                <a href="" className="serviceTitle">Creare site web</a>
                <span className="serviceText">Creăm site-uri moderne și personalizate care sunt parte integrantă din succesul afacerii tale</span>
                <img className="serviceImg" src={WebdevServiceImg} />
                <a href="" className="arrowCTA"><span className="arrow"></span></a>
            </div>
            <div className="serviceCard">
                <span className="serviceNumber">02</span>
                <a href="" className="serviceTitle">PPC</a>
                <span className="serviceText">Reclamele PPC transformă clickurile în clienți. Crește garantat vizibilitatea și vânzările!</span>
                <img className="serviceImg" src={PPCServiceImg} />
                <a href="" className="arrowCTA"><span className="arrow"></span></a>
            </div>
            <div className="serviceCard">
                <span className="serviceNumber">03</span>
                <a href="" className="serviceTitle">SEO</a>
                <span className="serviceText">Fii primul în Google. Optimizăm site-ul tău pentru trafic mare și conversii multe!</span>
                <img className="serviceImg" src={SEOServiceImg} />
                <a href="" className="arrowCTA"><span className="arrow"></span></a>
            </div>
            <div className="serviceCard">
                <span className="serviceNumber">04</span>
                <a href="" className="serviceTitle">Social Media Management</a>
                <span className="serviceText">Social Media Management strategic: transformăm urmăritorii în clienți! Fii mereu în trend!</span>
                <img className="serviceImg" src={SMMServiceImg} />
                <a href="" className="arrowCTA"><span className="arrow"></span></a>
            </div>
            <div className="serviceCard">
                <span className="serviceNumber">05</span>
                <a href="" className="serviceTitle">Plan strategic de marketing online</a>
                <span className="serviceText">De la invizibil la de neocolit – Plan strategic de marketing online care îți pune afacerea pe hartă!</span>
                <img className="serviceImg" src={PlanningServiceImg} />
                <a href="" className="arrowCTA"><span className="arrow"></span></a>
            </div>
            <div className="serviceCard">
                <span className="serviceNumber">06</span>
                <a href="" className="serviceTitle">Branding</a>
                <span className="serviceText">Logo unic, identitate vizuală coerentă, poziționare clară – branding care vinde!</span>
                <img className="serviceImg" src={BrandingServiceImg} />
                <a href="" className="arrowCTA"><span className="arrow"></span></a>
            </div>
            <div className="serviceCard">
                <span className="serviceNumber">07</span>
                <a href="" className="serviceTitle">E-mail marketing</a>
                <span className="serviceText">Campanii de e-mail marketing optimizate pentru conversii, engagement și retenția clienților!</span>
                <img className="serviceImg" src={EmailServiceImg} />
                <a href="" className="arrowCTA"><span className="arrow"></span></a>
            </div>
        </div>
    );
}

export default ServicesList;