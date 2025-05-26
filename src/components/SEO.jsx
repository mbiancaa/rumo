import { Helmet } from 'react-helmet-async';

const SEO = ({ title = '', description = ''}) => {
  return (
    <Helmet>
      <title>{title || 'RUMO - Your Digital Path'}</title>
      <meta name="description" content={description || 'Agenție de marketing digital dedicată creșterii afacerilor mici și mijlocii. Oferim servicii de SEO, PPC, branding, social media și creare website-uri.'} />
      <meta property="og:title" content={title || 'RUMO - Your Digital Path'} />
      <meta property="og:description" content={description || 'Agenție de marketing digital dedicată creșterii afacerilor mici și mijlocii. Oferim servicii de SEO, PPC, branding, social media și creare website-uri.'} />
    </Helmet>
  );
};

export default SEO; 