import React from "react";
import { NavLink } from "react-router-dom";
import { useServices } from "../contexts/ServicesContext";

import "../styles/Footer.css";

import Logo from "./Logo";
import ContactForm from "./ContactForm";

import ANPC from '../assets/anpc-sal.png';
import SOL from '../assets/anpc-2.png';

import InstagramImg from '../assets/social/instagram.png';
import FacebookImg from '../assets/social/facebook.png';
import LinkedInImg from '../assets/social/linkedin.png';

const Footer = () => {
    const { services } = useServices();

    return (
        <section className="layout whitebg" id="contact">
            <footer className="footer">
                <div className="container">
                    <ContactForm />
                    <div className="site-links">
                        <div className="links-container services-links" aria-labelledby="Link-uri către serviciile noastre">
                            <span className="links-title">Servicii</span>
                            <ul>
                                {services?.length === 0 ? (
                                    <li>Nu există servicii</li>
                                ) : (
                                    services.map(service => (
                                        <React.Fragment key={service.slug}>
                                            <li className="main-service">
                                                <NavLink to={`/servicii/${service.slug}`}>
                                                    {service.title}
                                                </NavLink>
                                            </li>
                                            {service.sub_services && service.sub_services.map(subService => (
                                                <li key={subService.slug} className="sub-service">
                                                    <NavLink to={`/servicii/${subService.slug}`}>
                                                        {subService.title}
                                                    </NavLink>
                                                </li>
                                            ))}
                                        </React.Fragment>
                                    ))
                                )}
                            </ul>
                        </div>
                        <div className="links-container" aria-labelledby="Link-uri utile">
                            <span className="links-title">Utile</span>
                            <ul>
                                <li><NavLink to="/studii-de-caz">Studii de Caz</NavLink></li>
                                <li><NavLink to="/blog">Blog</NavLink></li>
                                <li><NavLink to="/despre-noi">Despre Noi</NavLink></li>
                                <li><NavLink to="/contact">Contact</NavLink></li>
                                <li><NavLink to="/echipa">Echipă</NavLink></li>
                            </ul>
                        </div>
                        <div className="links-container" aria-labelledby="Informații de contact">
                            <ul>
                                <li>
                                    <span className="links-contact-text">Sună-ne:</span>
                                    <a className="links-contact-call" href="tel:+40740344156">+40 740 344 156</a>
                                </li>
                                <li>
                                    <span className="links-contact-text">Solicitări informații generale:</span>
                                    <a className="links-contact-call" href="mailto:monicarusu@rumodigitalpath.com">contact@rumodigitalpath.com</a>
                                </li>
                                <li>
                                    <span className="links-contact-text">Solicitări oferte de preț:</span>
                                    <a className="links-contact-call" href="mailto:monicarusu@rumodigitalpath.com">monicarusu@rumodigitalpath.com</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="social-icons">
                        <a
                            href="https://www.facebook.com/RUMO.digitalpath"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Vizitează RUMO Digital Path pe Facebook"
                        >
                            <img
                                src={FacebookImg}
                                alt="Facebook logo către pagina RUMO Digital Path"
                                width="46"
                                height="46"
                                loading="lazy"
                            />
                        </a>
                        <a
                            href="https://www.instagram.com/rumo.digitalpath/"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Vizitează RUMO Digital Path pe Instagram"
                        >
                            <img
                                src={InstagramImg}
                                alt="Siglă Instagram - RUMO Digital Path"
                                width="46"
                                height="46"
                                loading="lazy"
                            />
                        </a>
                        <a
                            href="https://www.linkedin.com/company/rumo-digital/"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Vizitează RUMO Digital pe LinkedIn"
                        >
                            <img
                                src={LinkedInImg}
                                alt="Siglă LinkedIn - RUMO Digital"
                                width="46"
                                height="46"
                                loading="lazy"
                            />
                        </a>
                    </div>
                    <div className="logo">
                        <Logo />
                    </div>
                    <p className="copyright">Copyright © 2025 RUMO Digital</p>
                    <div className="bottom-links">
                        <NavLink to="/politica-de-confidentialitate">Politica de confidențialitate</NavLink>
                        <NavLink to="/termeni-si-conditii">Termeni și condiții</NavLink>
                        <NavLink to="/politica-de-utilizare-cookies">Politica de utilizare cookies</NavLink>
                    </div>
                    <div className="d-flex anpc-links">
                        <a
                            href="https://anpc.ro/ce-este-sal/"
                            target="_blank"
                            rel="nofollow noopener noreferrer"
                            aria-label="Află mai multe despre soluționarea alternativă a litigiilor (SAL) pe site-ul ANPC"
                        >
                            <img
                                src={ANPC}
                                alt="ANPC - Soluționare Alternativă a Litigiilor (SAL)"
                                width="auto"
                                height="35"
                                loading="lazy"
                                style={{ marginTop: 3 }}
                            />
                        </a>
                        <a
                            href="https://ec.europa.eu/consumers/odr"
                            target="_blank"
                            rel="nofollow noopener noreferrer"
                            aria-label="Accesează platforma de soluționare online a litigiilor (ODR) a Comisiei Europene"
                        >
                            <img
                                src={SOL}
                                alt="Platforma ODR - Soluționare online a litigiilor Comisia Europeană"
                                width="auto"
                                height="40"
                                loading="lazy"
                            />
                        </a>
                    </div>
                </div>
            </footer>
        </section>
    );
};

export default Footer;