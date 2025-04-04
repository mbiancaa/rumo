import '../styles/Home.css';
import '../styles/About.css';
import '../styles/NotFound.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { NavLink } from 'react-router-dom';

const NotFound = () => {
    return (
        <>
            <Header />
            <section className="whitebg layout" style={{ minHeight: 'auto', height: 'auto' }}>
                <div className="container" style={{ paddingBottom: 70 }}>
                    <div class="wave-container">
                        <h1 class="wave-text">
                            <span>4</span><span>0</span><span>4</span>
                        </h1>
                    </div>
                    <div className="text-content-container" style={{ textAlign: 'center' }}>
                        <h2 style={{ fontSize: 30, fontFamily: 'Kanit', color: 'var(--green)' }}>Oops! Se pare că te-ai rătăcit... 😕</h2>
                        <p>Pagina pe care o cauți nu există sau a fost mutată. Dar nu-ți face griji, te putem ajuta să revii pe drumul cel bun!<br /> Încearcă să mergi la <NavLink to="/">pagina principală</NavLink> sau folosește meniul pentru a găsi ce ai nevoie.</p>
                    </div>

                </div>
            </section>
            <Footer />
        </>
    );
}

export default NotFound;