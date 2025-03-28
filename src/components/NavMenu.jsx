import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

const NavMenu = () => {
    const [hoveredItem, setHoveredItem] = useState(null);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 991);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 991);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const handleMouseEnter = (item) => {
        setHoveredItem(item);
    };

    const handleMouseLeave = () => {
        setHoveredItem(null);
    };

    const resetHoverState = () => {
        setHoveredItem(null);
    };

    const addBackButton = () => {
        // if (isMobile && hoveredItem && hoveredItem.classList.contains("menu-item-has-children")) {
        //     return (
        //         <li>
        //             <button className="btn-back" onClick={resetHoverState}>
        //                 <i className="icon-arrow"></i>
        //                 <span className="simpleLink">{hoveredItem.querySelector("a").textContent}</span>
        //             </button>
        //         </li>
        //     );
        // }
        return null;
    };

    return (
        <nav className={`c-menu ${hoveredItem ? "open--" : ""}`}>
            <ul className="c-menu__list hasHover--">
                <li
                    className={`menu-item ${hoveredItem === "Despre noi" ? "hover--" : ""} menu-item-has-children`}
                    onMouseEnter={() => handleMouseEnter("Despre noi")}
                    onMouseLeave={handleMouseLeave}
                >
                    <NavLink to="/despre-noi"><span className="menu-item-txt">Despre noi</span> <span className="arrow"></span></NavLink>
                </li>
                <li
                    className={`menu-item ${hoveredItem === "Servicii" ? "hover--" : ""} menu-item-has-children`}
                    onMouseEnter={() => handleMouseEnter("Servicii")}
                    onMouseLeave={handleMouseLeave}
                >
                    <NavLink to="/servicii"><span className="menu-item-txt">Servicii</span> <span className="arrow"></span></NavLink>
                    <ul className="sub-menu">
                        <li><NavLink to="/servicii/web-development"><span className="menu-item-txt">Web Development</span> </NavLink></li>
                        <li><NavLink to="/servicii/reclame-ppc"><span className="menu-item-txt">PPC</span> </NavLink></li>
                        <li><NavLink to="/servicii/seo"><span className="menu-item-txt">SEO</span> </NavLink></li>
                        <li><NavLink to="/servicii/social-media-management"><span className="menu-item-txt">Social Media Management</span> </NavLink></li>
                        <li><NavLink to="/servicii/plan-strategic-de-marketing-online"><span className="menu-item-txt">Plan Strategic de Marketing Online</span> </NavLink></li>
                        <li><NavLink to="/servicii/branding"><span className="menu-item-txt">Branding</span> </NavLink></li>
                        <li><NavLink to="/servicii/email-marketing"><span className="menu-item-txt">E-mail Marketing</span> </NavLink></li>
                    </ul>
                </li>
                <li
                    className={`menu-item ${hoveredItem === "Studii de caz" ? "hover--" : ""} menu-item-has-children`}
                    onMouseEnter={() => handleMouseEnter("Studii de caz")}
                    onMouseLeave={handleMouseLeave}
                >
                    <NavLink to="/studii-de-caz"><span className="menu-item-txt">Studii de caz</span> <span className="arrow"></span></NavLink>
                    <ul className="sub-menu">
                        <li><a href="https://www.havas.com/who-we-are/our-mission/"><span className="menu-item-txt">Studiul 1</span></a></li>
                        <li><a href="https://www.havas.com/who-we-are/our-strategy/"><span className="menu-item-txt">Studiul 2</span></a></li>
                        <li><a href="https://www.havas.com/who-we-are/governance/"><span className="menu-item-txt">Studiul 3</span></a></li>
                        <li><a href="https://www.havas.com/who-we-are/our-villages/"><span className="menu-item-txt">Studiul 4</span></a></li>
                        <li><a href="https://www.havas.com/who-we-are/our-careers/"><span className="menu-item-txt">Studiul 5</span></a></li>
                    </ul>
                </li>
                <li
                    className={`menu-item ${hoveredItem === "Blog" ? "hover--" : ""} menu-item-has-children`}
                    onMouseEnter={() => handleMouseEnter("Blog")}
                    onMouseLeave={handleMouseLeave}
                >
                    <NavLink to="/blog"><span className="menu-item-txt">Blog</span>  <span className="arrow"></span></NavLink>
                </li>
                <li
                    className={`menu-item ${hoveredItem === "Contact" ? "hover--" : ""} menu-item-has-children`}
                    onMouseEnter={() => handleMouseEnter("Contact")}
                    onMouseLeave={handleMouseLeave}
                >
                    <NavLink to="/contact"><span className="menu-item-txt">Contact</span>  <span className="arrow"></span></NavLink>
                </li>
                {addBackButton()}
            </ul>
        </nav>
    );
};

export default NavMenu;
