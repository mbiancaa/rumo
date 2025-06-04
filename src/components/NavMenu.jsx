import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { caseStudyService } from "../services/api";
import { useServices } from "../contexts/ServicesContext";
import { closeBurgerMenu } from "./BurgerMenu"; // Import closeBurgerMenu

const NavMenu = () => {
    const [hoveredItem, setHoveredItem] = useState(null);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 991);
    const [caseStudies, setCaseStudies] = useState([]);
    const { services } = useServices();
    const location = useLocation();

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 991);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        const fetchCaseStudies = async () => {
            try {
                const response = await caseStudyService.getHeaderCaseStudies();
                setCaseStudies(response);
            } catch (error) {
                console.error('Error fetching case studies:', error);
                setCaseStudies([]);
            }
        };
        fetchCaseStudies();
    }, []);

    const handleMouseEnter = (item) => setHoveredItem(item);
    const handleMouseLeave = () => setHoveredItem(null);

    const isPageActive = (path) => location.pathname === path;

    const handleClick = (path) => {
        if (isPageActive(path)) {
            closeBurgerMenu();
        }
    };

    return (
        <nav className={`c-menu ${hoveredItem ? "open--" : ""}`}>
            <ul className="c-menu__list hasHover--">
                <li
                    className={`menu-item ${hoveredItem === "Despre noi" ? "hover--" : ""} menu-item-has-children`}
                    onMouseEnter={() => handleMouseEnter("Despre noi")}
                    onMouseLeave={handleMouseLeave}
                >
                    <NavLink to="/despre-noi" onClick={() => handleClick("/despre-noi")}>
                        <span className="menu-item-txt">Despre noi</span>
                        {!isPageActive("/despre-noi") && <span className="arrow"></span>}
                    </NavLink>
                </li>
                <li
                    className={`menu-item ${hoveredItem === "Servicii" ? "hover--" : ""} menu-item-has-children`}
                    onMouseEnter={() => handleMouseEnter("Servicii")}
                    onMouseLeave={handleMouseLeave}
                >
                    <a>
                        <span className="menu-item-txt">Servicii</span>
                        <span className="arrow"></span>
                    </a>
                    <ul className="sub-menu">
                        {services.map(service => (
                            <li key={service.slug}>
                                <NavLink to={`/servicii/${service.slug}`} onClick={() => handleClick(`/servicii/${service.slug}`)}>
                                    <span className="menu-item-txt">{service.title}</span>
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </li>
                <li
                    className={`menu-item ${hoveredItem === "Studii de caz" ? "hover--" : ""} menu-item-has-children`}
                    onMouseEnter={() => handleMouseEnter("Studii de caz")}
                    onMouseLeave={handleMouseLeave}
                >
                    <NavLink to="/studii-de-caz" onClick={() => handleClick("/studii-de-caz")}>
                        <span className="menu-item-txt">Studii de caz</span>
                        <span className="arrow"></span>
                    </NavLink>
                    <ul className="sub-menu">
                        {caseStudies.map(caseStudy => (
                            <li key={caseStudy.slug}>
                                <NavLink to={`/studii-de-caz/${caseStudy.slug}`} onClick={() => handleClick(`/studii-de-caz/${caseStudy.slug}`)}>
                                    <span className="menu-item-txt">{caseStudy.title}</span>
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </li>
                <li className={`menu-item ${hoveredItem === "Blog" ? "hover--" : ""}`}>
                    <NavLink to="/blog" onClick={() => handleClick("/blog")}>
                        <span className="menu-item-txt">Blog</span>
                        {!isPageActive("/blog") && <span className="arrow"></span>}
                    </NavLink>
                </li>
                <li className={`menu-item ${hoveredItem === "Contact" ? "hover--" : ""}`}>
                    <NavLink to="/contact" onClick={() => handleClick("/contact")}>
                        <span className="menu-item-txt">Contact</span>
                        {!isPageActive("/contact") && <span className="arrow"></span>}
                    </NavLink>
                </li>
                <li className={`menu-item ${hoveredItem === "Echipa" ? "hover--" : ""}`}>
                    <NavLink to="/echipa" onClick={() => handleClick("/echipa")}>
                        <span className="menu-item-txt">Echipa</span>
                        {!isPageActive("/echipa") && <span className="arrow"></span>}
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default NavMenu;
