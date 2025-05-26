import { NavLink } from 'react-router-dom';
import { getImageUrl } from '../utils/imageHelpers';


const BlogBox = ({ post }) => {
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('ro-RO', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    };

    const imageUrl = getImageUrl(post.featuredImage);
    
    // Parse categories if it's a string
    const categories = typeof post.categories === 'string' 
        ? JSON.parse(post.categories) 
        : post.categories;

    return (
        <article className="blogBox">
            <NavLink to={`/blog/${post.slug}`}>
                {imageUrl && <img
                    src={imageUrl}
                    alt={post.title}
                    loading="lazy"
                    decoding="async"
                />}
                <div className="blogContentWrapper">
                    <div className="blogCategories">
                        {categories && categories.length > 0 ? (
                            categories.map((category, index) => (
                                <span key={index} className="blogCategory">{category}</span>
                            ))
                        ) : (
                            <span className="blogCategory">General</span>
                        )}
                    </div>
                    <h3 className="blogTitle">{post.title}</h3>
                    <p className="blogMeta">{post.excerpt}</p>
                    <div className="blogFooter">
                        <span className="blogDate">{formatDate(post.created_at)}</span>
                    </div>
                </div>
            </NavLink>
        </article>
    );
}

export default BlogBox;