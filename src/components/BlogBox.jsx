import { NavLink } from 'react-router-dom';


const BlogBox = ({ post }) => {
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('ro-RO', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    };

    const imageUrl = post.featuredImage ? (
        post.featuredImage.startsWith('http') || post.featuredImage.startsWith('data:') ?
            post.featuredImage :
            `${process.env.REACT_APP_URL || 'http://localhost:5002'}${post.featuredImage}`
    ) : null;

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
                        {post.categories && post.categories.length > 0 ? (
                            post.categories.map((category, index) => (
                                <span key={index} className="blogCategory">{category}</span>
                            ))
                        ) : (
                            <span className="blogCategory">General</span>
                        )}
                    </div>
                    <h3 className="blogTitle">{post.title}</h3>
                    <p className="blogMeta">{post.excerpt}</p>
                    <div className="blogFooter">
                        <span className="blogDate">{formatDate(post.createdAt)}</span>
                    </div>

                </div>
            </NavLink>
        </article>
    );
}

export default BlogBox;