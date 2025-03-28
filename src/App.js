import './App.css';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import CaseStudies from './pages/CaseStudies';
import Services from './pages/Services';
import Terms from './pages/Terms';
import CookiesPolitics from './pages/CookiesPolitics';
import GDPR from './pages/GDPR';


function App() {
  return (
    <Router basename="/rumo">
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/despre-noi" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/studii-de-caz" element={<CaseStudies />} />
          <Route path="/servicii" element={<Services />} />
          <Route path="/termeni-si-conditii" element={<Terms />} />
          <Route path="/politica-de-utilizare-cookies" element={<CookiesPolitics />} />
          <Route path="/politica-de-confidentialitate" element={<GDPR />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
