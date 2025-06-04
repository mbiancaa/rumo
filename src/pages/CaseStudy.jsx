import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BarLoader } from 'react-spinners';
import ArticleLayout from "../components/ArticleLayout";
import { caseStudyService } from "../services/api";
import Header from '../components/Header';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { getImageUrl } from '../utils/imageHelpers';

const CaseStudy = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [caseStudy, setCaseStudy] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCaseStudy = async () => {
            try {
                setLoading(true);
                const data = await caseStudyService.getById(slug);
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

    const getServices = (services) => {
        const servicesArray = typeof services === 'string'
            ? services.split(',').map(service => service.trim())
            : services || [];
        return servicesArray;
    }

    return (
        <>
            <SEO
                title={caseStudy?.metaTitle || caseStudy?.title || 'RUMO - Your Digital Path'}
                description={caseStudy?.metaDescription || caseStudy?.excerpt || 'Studiu de caz'}
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
                        Studiul de caz se încarcă...
                    </div>
                </section>
            ) : (
                <ArticleLayout
                    title={caseStudy.title}
                    category={caseStudy.industry}
                    type="caseStudy"
                    date={caseStudy.perioada}
                    services={getServices(caseStudy.services)}
                    image={getImageUrl(caseStudy.featuredImage)}
                    company={caseStudy.client || ""}
                >
                    <div className="text-content-container patternImgSection" dangerouslySetInnerHTML={{ __html: caseStudy.content }} />
                </ArticleLayout>
            )}
            <Footer />
        </>
    );
}

export default CaseStudy;