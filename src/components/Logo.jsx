import { NavLink } from 'react-router-dom';
import { ReactComponent as LogoImage } from '../assets/logo.svg';
import { closeBurgerMenu } from './BurgerMenu';

const Logo = () => {
    const handleClick = () => {
        closeBurgerMenu();
    };

    return (
        <NavLink to="/" onClick={handleClick}>
            <LogoImage
                alt="Rumo - Your Digital Path Logo"
                width="140"
                loading="lazy"
                aria-label="Rumo Logo"
            />
        </NavLink>
    );
};

export default Logo;
