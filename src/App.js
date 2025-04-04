import { HashRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css';

import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import CaseStudies from './pages/CaseStudies';
import Article from './pages/Article';
import CaseStudy from './pages/CaseStudy';
import Terms from './pages/Terms';
import CookiesPolitics from './pages/CookiesPolitics';
import GDPR from './pages/GDPR';
import NotFound from './pages/NotFound';
import Service from './pages/Service';
import Team from './pages/Team';

import BackToTop from './components/BackToTop';
import Cursor from './components/Cursor';

import useLenis from './hooks/useLenis';



function App() {
  useLenis();
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/despre-noi" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/echipa" element={<Team />} />
          <Route path="/studii-de-caz" element={<CaseStudies />} />
          <Route path="/termeni-si-conditii" element={<Terms />} />
          <Route path="/politica-de-utilizare-cookies" element={<CookiesPolitics />} />
          <Route path="/politica-de-confidentialitate" element={<GDPR />} />

          <Route path="/articol" element={<Article />} />
          <Route path="/studiu" element={<CaseStudy />} />
          <Route path="/servicii/web-development" element={<Service />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
        <Cursor />
        <BackToTop />
      </div>
    </Router>
  );
}

export default App;
