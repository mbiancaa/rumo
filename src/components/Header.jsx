import BurgerMenu from './BurgerMenu';
import NavMenu from './NavMenu';
import Logo from './Logo';

const Header = ({ type }) => {
    return (
        <header>
            <Logo />
            <BurgerMenu />
            <NavMenu />
        </header>
    );
}

export default Header;