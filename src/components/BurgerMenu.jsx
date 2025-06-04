import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

let externalCloseMenu = () => { }; // Exported function reference

const BurgerMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
        closeMenu();
    }, [location.pathname]);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
        updateBodyStyles(!isOpen);
    };

    const closeMenu = () => {
        setIsOpen(false);
        updateBodyStyles(false);
    };

    // Set external function to allow NavMenu to close the menu
    useEffect(() => {
        externalCloseMenu = closeMenu;
    }, []);

    const updateBodyStyles = (menuState) => {
        const appElement = document.querySelector(".app");
        if (menuState) {
            appElement?.classList.add("open--");
            document.body.style.overflow = "hidden";
            document.documentElement.style.overflow = "hidden";
        } else {
            appElement?.classList.remove("open--");
            document.body.style.overflow = "auto";
            document.documentElement.style.overflow = "auto";
        }
    };

    return (
        <button
            className={`burger-menu ${isOpen ? "open--" : ""}`}
            title="Menu"
            onClick={toggleMenu}
            aria-label={isOpen ? "Închide meniul" : "Deschide meniul"}
            aria-expanded={isOpen}
        >
            <span></span>
            <span className="close"></span>
        </button>
    );
};

// Export the closeMenu function for use in NavMenu
export const closeBurgerMenu = () => {
    externalCloseMenu();
};

export default BurgerMenu;
