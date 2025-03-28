import { NavLink } from "react-router-dom";
import "../styles/Footer.css";
import Logo from "./Logo";
import ContactForm from "./ContactForm";

import ANPC from '../assets/anpc-sal.png';
import SOL from '../assets/anpc-2.png';

import InstagramImg from '../assets/social/instagram.png';
import FacebookImg from '../assets/social/facebook.png';
import LinkedInImg from '../assets/social/linkedin.png';
// import YoutubeImg from '../assets/social/youtube.png';
// import TikTokImg from '../assets/social/tiktok.png';

const Footer = () => {
    return (
        <section className="layout whitebg">
            <footer className="footer">
                <div className="container">
                    <ContactForm />
                    <div className="social-icons">
                        <a href="#">
                            <img src={FacebookImg}
                                alt=""
                                width="46"
                                aria-label=""
                            />
                        </a>
                        <a href="#">
                            <img src={InstagramImg}
                                alt=""
                                width="46"
                                aria-label=""
                            />
                        </a>
                        <a href="#">
                            <img src={LinkedInImg}
                                alt=""
                                width="46"
                                aria-label=""
                            />
                        </a>
                        {/* <a href="#">
                            <img src={YoutubeImg}
                                alt=""
                                width="55"
                                aria-label=""
                            />
                        </a>
                        <a href="#">
                            <img src={TikTokImg}
                                alt=""
                                width="60"
                                aria-label=""
                            />
                        </a> */}
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
                    <div className="d-flex" style={{ marginTop: 40, gap: 10 }}>
                        <a rel="nofollow" target="_blank" href="https://anpc.ro/ce-este-sal/">
                            <img height="35" style={{ marginTop: 3 }} src={ANPC} />
                        </a>
                        <a rel="nofollow" target="_blank" href="https://ec.europa.eu/consumers/odr">
                            <img height="40" src={SOL} />
                        </a>
                    </div>
                </div>
            </footer>
        </section>

    );
};

export default Footer;