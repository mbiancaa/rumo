import BlogSlider from '../components/sliders/BlogSlider';
import { NavLink } from 'react-router-dom';

const BlogSection = () => {

    return (
        <section className="whitebg layout blog">
            <div className="container">
                <span className="smTitle">BLOG</span>
                <div className="d-flex" style={{ gap: 60, marginTop: 20, marginBottom: 80 }}>
                    <div style={{
                        flex: 1,
                        width: 'calc(60% - 20px)',
                        maxWidth: 575
                    }}>
                        <h2 style={{ fontSize: 45 }}>Subiecte de mare interes <span style={{ color: 'var(--light-grey)' }}>pentru antreprenori</span></h2>
                    </div>
                    <div style={{
                        width: 'calc(40% - 20px)',
                        color: 'var(--light-grey)',
                        fontSize: 16,
                        fontFamily: 'Kanit',
                        lineHeight: '28px',
                        maxWidth: 390
                    }}>
                        <p style={{ marginBottom: 20 }}>Poți într-adevăr să-ți resetezi afacerea sau s-o duci la următorul nivel prin serviciile de marketing online? <br />Vei găsi toate răspunsurile în articolele noastre de blog. Dacă nu citești, n-ai cum să înțelegi! 😃</p>
                        <NavLink to="/blog" className="linkCTA"><span>Citește articolele aici!</span></NavLink>
                    </div>
                </div>
                <BlogSlider />
            </div>
        </section>
    );

}

export default BlogSection;