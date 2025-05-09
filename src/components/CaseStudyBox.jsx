import { Link } from 'react-router-dom';

const CaseStudyBox = ({ post }) => {

    const formattedDate = new Date(post.date).toLocaleDateString('ro-RO', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    });
   
    const imageUrl = post.featuredImage ? (
        post.featuredImage.startsWith('http') || post.featuredImage.startsWith('data:') ?
            post.featuredImage :
            `${process.env.REACT_APP_URL || 'http://localhost:5002'}${post.featuredImage}`
    ) : null;
    

    return (
        <Link to={`/studii-de-caz/${post.slug}`} className="caseStudy-box">
            <article>
                <img 
                    src={imageUrl} 
                    alt={post.title} 
                    loading="lazy"
                    decoding="async"
                />
                <div className="caseStudyContentWrapper">
                    <h3 className="caseStudyTitle">{post.title}</h3>
                    <p className="caseStudyMeta">{post.excerpt}</p>
                    <div className="caseStudyFooter">
                        <span className="caseStudyDate">{formattedDate}</span>
                    </div>
                </div>
            </article>
        </Link>
    );
}

export default CaseStudyBox;