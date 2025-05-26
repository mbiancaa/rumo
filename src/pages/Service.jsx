import '../styles/Home.css';
import '../styles/About.css';

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { servicesService } from '../services/api';
import { getImageUrl } from '../utils/imageHelpers';

import Header from '../components/Header';
import Footer from '../components/Footer';
import HeroSection from '../sections/HeroSection';
import FAQItem from '../components/FAQItem';
import SEO from '../components/SEO';

import { BarLoader } from 'react-spinners';

import useInView from '../hooks/useInView';

const Service = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [service, setService] = useState(null);
    const [loading, setLoading] = useState(true);
    const [openFaqIndex, setOpenFaqIndex] = useState(0);
    const [textRef, textInView] = useInView(100);
    const [subtitleRef, subtitleInView] = useInView(500);
    const [descriptionRef, descriptionInView] = useInView(1050);
    const [separatorRef, separatorInView] = useInView(350);

    useEffect(() => {
        const fetchService = async () => {
            try {
                setLoading(true);
                const response = await servicesService.getBySlug(slug);
                if (!response) {
                    navigate('/404');
                    return;
                }
                setService(response);
            } catch (err) {
                console.error('Error fetching service:', err);
                navigate('/404');
            } finally {
                setLoading(false);
            }
        };

        if (slug) {
            fetchService();
        } else {
            navigate('/404');
        }
    }, [slug, navigate]);

    return (
        <>
            <SEO 
                title={service?.metaTitle || service?.title || 'RUMO - Your Digital Path'}
                description={service?.metaDescription || service?.excerpt || 'Serviciu'}
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
            <HeroSection>
                <div className="layout eq-columns">
                    <div className={`eq-column`}>
                        <div ref={textRef} className={`slideInTextAnimation ${textInView ? "show" : ""}`}>
                            <h1 className="hero-title">{service?.title}</h1>
                        </div>
                        <div ref={subtitleRef} className={`slideInTextAnimation ${subtitleInView ? "show" : ""}`}>
                            <h2 className="hero-subtitle">Cu RUMO, afacerea ta prinde avânt!</h2>
                        </div>
                    </div>
                    <div ref={separatorRef} className={`eq-column separator ${separatorInView ? "show" : ""}`}>
                        <div ref={descriptionRef} className={`slideInTextAnimation ${descriptionInView ? "show" : ""}`}>
                            <div dangerouslySetInnerHTML={{ __html: service?.heroText }} />
                        </div>
                    </div>
                </div>
            </HeroSection>
            <section 
                style={{ 
                    padding: '50px 0',
                    minHeight: 400,
                    backgroundImage: service?.image ? `url(${getImageUrl(service?.image)})` : 'none',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }} 
                className="darkbg layout darkbg-sm-img imgEffect"
            >
                <h2 style={{ margin: 'auto', textAlign: 'center' }}>{service?.heading}</h2>
            </section>
            <section className="whitebg layout">
                <div className="container text-content-container" style={{ paddingTop: 20 }}>
                    <div dangerouslySetInnerHTML={{ __html: service?.content }} />
                    {service?.faqs && service?.faqs.length > 0 && (
                        <>
                            <h2 className="faqHeadline" style={{ marginBottom: -10, marginTop: 80 }}>Întrebări frecvente despre {service.title}</h2>
                            {service?.faqs.map((faq, index) => (
                                <FAQItem
                                    key={index}
                                    question={faq?.question}
                                    answer={faq?.answer}
                                    isOpen={openFaqIndex === index}
                                    onClick={() => setOpenFaqIndex(openFaqIndex === index ? -1 : index)}
                                />
                            ))}
                        </>
                    )}
                </div>
            </section>
            <Footer />
        </>
    );
}

export default Service;