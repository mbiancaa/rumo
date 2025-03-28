import { ReactComponent as LogoImage } from '../assets/logo.svg';
import { NavLink } from 'react-router-dom';
const Logo = () => {
    return (
        <NavLink to="/">
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
