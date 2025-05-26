import { Link } from 'react-router-dom';
import { getImageUrl } from '../utils/imageHelpers';

const CaseStudyBox = ({ post }) => {

    const formattedDate = new Date(post.created_at).toLocaleDateString('ro-RO', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    });
    

    return (
        <Link to={`/studii-de-caz/${post.slug}`} className="caseStudy-box">
            <article>
                <img 
                    src={getImageUrl(post.featuredImage)} 
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