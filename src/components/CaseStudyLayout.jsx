import '../styles/Home.css';
import '../styles/About.css';

import style from '../styles/modules/CaseStudyArticle.module.css';

import Header from '../components/Header';
import Footer from '../components/Footer';


const CaseStudyLayout = ({ children, title, company, date, image, logo, category, services }) => {

    return (
        <>
            <Header />
            <section
                style={{
                    backgroundImage: `url(${image})`,
                }}
                className={`darkbg layout ${style.bgImg} imgEffect`}>
            </section >

            <section className="whitebg layout">
                <div className={`container ${style.articleContent}`} style={{ paddingTop: 20 }}>
                    <div className={style.infoHighlight}>
                        <div className={style.logoContainer}>
                            <img src={logo} />
                        </div>
                        <div className={style.textInfoContainer}>
                            <span className={style.category}>Industrie: {category}</span>
                            <h2 className={style.companyName}>{company}</h2>
                            <div className={style.textInfo}>
                                <span className={style.date}><span className={style.bold}>Perioada:</span> {date}</span>
                                <span className={style.services}><span className={style.bold}>Servicii:</span> {services.join(', ')} </span>
                            </div>

                        </div>

                    </div>
                    <h1 className={style.title}>
                        {title}
                    </h1>

                    {children}
                </div>
            </section>
            <Footer />
        </>
    );
}

export default CaseStudyLayout;