import '../styles/Home.css';
import '../styles/About.css';

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { servicesService } from '../services/api';

import Header from '../components/Header';
import Footer from '../components/Footer';
import HeroSection from '../sections/HeroSection';
import FAQItem from '../components/FAQItem';
import SEO from '../components/SEO';

import useInView from '../hooks/useInView';

const Service = () => {
    const [textRef, textInView] = useInView(100);
    const [subtitleRef, subtitleInView] = useInView(500);
    const [descriptionRef, descriptionInView] = useInView(1050);
    const [separatorRef, separatorInView] = useInView(350);

    const { serviceSlug, subServiceSlug } = useParams();
    const navigate = useNavigate();
    const [service, setService] = useState(null);
    const [loading, setLoading] = useState(true);
    const [openFaqIndex, setOpenFaqIndex] = useState(0);

    useEffect(() => {
        const fetchService = async () => {
            try {
                setLoading(true);
                let data;
                
                if (subServiceSlug) {
                    // First get the parent service
                    const parentService = await servicesService.getBySlug(serviceSlug);
                    if (!parentService) {
                        navigate('/404');
                        return;
                    }
                    
                    // Get sub-services for the parent service
                    const subServices = await servicesService.getSubServices(parentService._id);
                    const subService = subServices.find(sub => sub.slug === subServiceSlug);
                    
                    if (!subService) {
                        navigate('/404');
                        return;
                    }
                    
                    data = subService;
                } else {
                    // Fetch main service
                    data = await servicesService.getBySlug(serviceSlug);
                    if (!data) {
                        navigate('/404');
                        return;
                    }
                }
                
                setService(data);
            } catch (err) {
                console.error('Error fetching service:', err);
                navigate('/404');
            } finally {
                setLoading(false);
            }
        };

        if (serviceSlug) {
            fetchService();
        } else {
            navigate('/404');
        }
    }, [serviceSlug, subServiceSlug, navigate]);

    const imageUrl = service?.image ? (
        service.image.startsWith('http') || service.image.startsWith('data:') ?
            service.image :
            `${process.env.REACT_APP_URL || 'http://localhost:5002'}${service.image}`
    ) : null;

    return (
        <>
        {loading ? (
            <div className="loading">Se încarcă...</div>
        ) : !service ? (
            <div className="error">Nu există serviciu</div>
        ) : (
            <>
            <SEO 
                title={service.metaTitle || service.title}
                description={service.metaDescription || service.excerpt}
            />
            <Header />
            <HeroSection>
                <div className="layout eq-columns">
                    <div className={`eq-column`}>
                        <div ref={textRef} className={`slideInTextAnimation ${textInView ? "show" : ""}`}>
                            <h1 className="hero-title">{service.title}</h1>
                        </div>
                        <div ref={subtitleRef} className={`slideInTextAnimation ${subtitleInView ? "show" : ""}`}>
                            <h2 className="hero-subtitle">Cu RUMO, afacerea ta prinde avânt!</h2>
                        </div>
                    </div>
                    <div ref={separatorRef} className={`eq-column separator ${separatorInView ? "show" : ""}`}>
                        <div ref={descriptionRef} className={`slideInTextAnimation ${descriptionInView ? "show" : ""}`}>
                            <div dangerouslySetInnerHTML={{ __html: service.heroText }} />
                        </div>
                    </div>
                </div>
            </HeroSection>
            <section 
                style={{ 
                    padding: '50px 0',
                    minHeight: 400,
                    backgroundImage: imageUrl ? `url(${imageUrl})` : 'none',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }} 
                className="darkbg layout darkbg-sm-img imgEffect"
            >
                <h2 style={{ margin: 'auto', textAlign: 'center' }}>{service.heading}</h2>
            </section>
            <section className="whitebg layout">
                <div className="container text-content-container" style={{ paddingTop: 20 }}>
                    <div dangerouslySetInnerHTML={{ __html: service.content }} />
                    {service.faqs && service.faqs.length > 0 && (
                        <>
                            <h2 className="faqHeadline" style={{ marginBottom: -10, marginTop: 80 }}>Întrebări frecvente despre {service.title}</h2>
                            {service.faqs.map((faq, index) => (
                                <FAQItem
                                    key={index}
                                    question={faq.question}
                                    answer={faq.answer}
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
        )}
        </>
    );
}

export default Service;