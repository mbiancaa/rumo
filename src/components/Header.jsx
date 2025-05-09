import BurgerMenu from './BurgerMenu';
import NavMenu from './NavMenu';
import Logo from './Logo';

const Header = ({ type }) => {
    return (
        <header>
            <div className="headerLogo">
                <Logo />
            </div>
            <BurgerMenu />
            <NavMenu />
        </header>
    );
}

export default Header;