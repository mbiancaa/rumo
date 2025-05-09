import { useState, useEffect } from "react";
import { useParams, Navigate, useNavigate } from "react-router-dom";
import ArticleLayout from "../components/ArticleLayout";
import { caseStudyService } from "../services/api";
import Header from '../components/Header';
import Footer from '../components/Footer';
import SEO from '../components/SEO';

const CaseStudy = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [caseStudy, setCaseStudy] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCaseStudy = async () => {
            try {
                setLoading(true);
                const data = await caseStudyService.getBySlug(slug);
                if (!data) {
                    navigate('/404');
                    return;
                }
                setCaseStudy(data);
            } catch (err) {
                console.error("Error fetching case study:", err);
                navigate('/404');
            } finally {
                setLoading(false);
            }
        };

        if (slug) {
            fetchCaseStudy();
        }
    }, [slug, navigate]);

    if (!caseStudy) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <SEO 
                title={caseStudy.metaTitle || caseStudy.title}
                description={caseStudy.metaDescription || caseStudy.excerpt}
            />
            <Header />
            {loading ? (
                <section className="whitebg layout">
                    <div className={`container`} style={{ paddingTop: 20 }}>
                        Studiul de caz se încarcă...
                    </div>
                </section>
            ) : (
                <ArticleLayout
                    title={caseStudy.title}
                    category={caseStudy.industry}
                    type="caseStudy"
                    date={caseStudy.perioada}
                    services={caseStudy.services}
                    image={caseStudy.featuredImage}
                >
                    <div className={`text-content-container`}>
                        <div dangerouslySetInnerHTML={{ __html: caseStudy.content }} />
                    </div>
                </ArticleLayout>
            )}
            <Footer />
        </>
    );

    // Parse services from string to array if needed
    const servicesArray = typeof caseStudy.services === 'string' 
        ? caseStudy.services.split(',').map(service => service.trim()) 
        : caseStudy.services || [];

    return (
        <ArticleLayout
            title={caseStudy.title}
            category={caseStudy.industry}
            type="caseStudy"
            date={caseStudy.perioada}
            services={servicesArray}
            image={caseStudy.featuredImage}
            company={caseStudy.client || ""}
        >
            <div className="text-content-container" dangerouslySetInnerHTML={{ __html: caseStudy.content }} />
        </ArticleLayout>
    );
}

export default CaseStudy;