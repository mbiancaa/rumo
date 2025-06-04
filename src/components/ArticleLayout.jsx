import '../styles/Home.css';
import '../styles/About.css';
import { getImageUrl } from '../utils/imageHelpers';
import style from '../styles/modules/BlogArticle.module.css';

const ArticleLayout = ({ children, title, date, type, image, category, services }) => {
    // For blog posts, category is an array of categories
    // For case studies, category is a single string
    const articleCategory = type === 'blog'
        ? Array.isArray(category)
            ? category
            : category
        : `Industrie: ${category}`;

    const imageUrl = getImageUrl(image);

    return (
        <>
            <section
                style={{
                    backgroundImage: imageUrl ? `url(${imageUrl})` : 'none',
                    // backgroundSize: 'cover',
                    backgroundPosition: 'top',
                }}
                className={`darkbg layout ${style.bgImg} imgEffect`}
                aria-label={`Imagine de fundal pentru ${title}`}>
                <div className={`container ${style.textContainer}`}>
                    <div className={style.categoryContainer}>
                        {type === 'blog' && Array.isArray(articleCategory) ? (
                            articleCategory.map((cat, index) => (
                                <span key={index} className={style.category}>{cat}</span>
                            ))
                        ) : (
                            <span className={style.category}>{articleCategory}</span>
                        )}
                    </div>
                    <h1 className={style.title}>
                        {title}
                    </h1>
                    <div className={style.infoText}>
                        {type === 'blog' ? (
                            <span className={style.date}>Postat la {date}</span>
                        ) : (
                            <span className={style.date}><span className={style.bold}>Perioada:</span> {date}</span>
                        )}
                        {services && <span className={style.services}><span className={style.bold}>Servicii:</span> {services} </span>}
                    </div>

                    <div className={style.downPosition}>
                        <span className={style.readMore}>Afla mai multe</span>
                        <span className={style.arrowDown}></span>
                    </div>
                </div>
            </section>

            <section className="whitebg layout">
                <div className={`container`} style={{ paddingTop: 20 }}>
                    {children}
                </div>
            </section>
        </>
    );
}

export default ArticleLayout;