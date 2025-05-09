import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { pageService } from '../services/api';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import '../styles/Home.css';
import '../styles/About.css';
import NotFound from './NotFound';

const Page = () => {
  const location = useLocation();
  const slug = location.pathname.substring(1);
  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPage = async () => {
      try {
        setLoading(true);
        const data = await pageService.getBySlug(slug);
        setPage(data);
      } catch (error) {
        if (error.response?.status === 404) {
          console.log('Page not found');
          setPage(null);
        } else {
          setError('Error loading page');
          console.error('Error fetching page:', error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPage();
  }, [slug]);

  if (loading) {
    return (
      <div className="loading">
        <p>Se încarcă...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error">
        <p>{error}</p>
      </div>
    );
  }

  if (!page) {
    return <NotFound />;
  }

  return (
    <>
      <SEO 
        title={page.metaTitle || page.name}
        description={page.metaDescription}
      />
      <Header />
      <section className="whitebg layout">
        <div className="container text-content-container">
          <h1>{page?.name}</h1>
          {page.upperContent && (
            <div 
              className="text-content-container"
              dangerouslySetInnerHTML={{ __html: page.upperContent }}
            />
          )}

          {page.lowerContent && (
            <div 
              className="text-content-container"
              dangerouslySetInnerHTML={{ __html: page.lowerContent }}
            />
          )}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Page; 