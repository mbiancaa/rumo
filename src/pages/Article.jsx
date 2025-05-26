import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BarLoader } from 'react-spinners';
import { blogService } from '../services/api';
import ArticleLayout from "../components/ArticleLayout";
import Header from '../components/Header';
import Footer from '../components/Footer';
import SEO from '../components/SEO';

const Article = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                setLoading(true);
                const data = await blogService.getById(slug);
                if (!data) {
                    navigate('/404');
                    return;
                }
                setPost(data);
            } catch (err) {
                console.error('Error fetching post:', err);
                navigate('/404');
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [slug, navigate]);

    return (
        <>
            <SEO 
                title={post?.metaTitle || post?.title || 'RUMO - Your Digital Path'}
                description={post?.metaDescription || post?.excerpt || 'Articol de blog'}
            />
            {loading && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    zIndex: 9999
                }}>
                    <BarLoader
                        color="#26b3ff"
                        width="100%"
                        height={4}
                        loading={loading}
                    />
                </div>
            )}
            <Header />
            {loading ? (
                <section className="whitebg layout">
                    <div className={`container`} style={{ paddingTop: 20 }}>
                        Articolul se încarcă...
                    </div>
                </section>
            ) : (
                <ArticleLayout
                    title={post.title}
                    category={post.categories}
                    type="blog"
                    date={new Date(post.created_at).toLocaleDateString('ro-RO', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    })}
                    image={post.featuredImage}
                >
                    <div className={`text-content-container`}>
                        <div dangerouslySetInnerHTML={{ __html: post.content }} />
                    </div>
                </ArticleLayout>
            )}
            <Footer />
        </>
    );
};

export default Article;