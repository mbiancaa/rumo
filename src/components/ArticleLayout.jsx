import '../styles/Home.css';
import '../styles/About.css';

import style from '../styles/modules/BlogArticle.module.css';

import Header from '../components/Header';
import Footer from '../components/Footer';


const ArticleLayout = ({ children, title, date, type, image, category, services }) => {
    const articleCategory = type === 'blog' ? category : `Industrie: ${category}`;

    return (
        <>
            <Header />
            <section
                style={{
                    backgroundImage: `url(${image})`,
                }}
                className={`darkbg layout ${style.bgImg} imgEffect`}>
                <div className={`container ${style.textContainer}`}>
                    <span className={style.category}>{articleCategory}</span>
                    <h1 className={style.title}>
                        {title}
                    </h1>
                    <div className={style.infoText}>
                        {type === 'blog' ? (
                            <span className={style.date}>Postat la {date}</span>
                        ) : (
                            <span className={style.date}><span className={style.bold}>Perioada:</span> {date}</span>
                        )}
                        {services && <span className={style.services}><span className={style.bold}>Servicii:</span> {services.join(', ')} </span>}
                    </div>


                    <div className={style.downPosition}>
                        <span className={style.readMore}>Afla mai multe</span>
                        <span className={style.arrowDown}></span>
                    </div>

                </div>

            </section >

            <section className="whitebg layout">
                <div className={`container ${style.articleContent}`} style={{ paddingTop: 20 }}>
                    {children}
                </div>
            </section>
            <Footer />
        </>
    );
}

export default ArticleLayout;