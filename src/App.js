import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/admin/Layout';
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import BlogList from './pages/admin/BlogList';
import BlogForm from './pages/admin/BlogForm';
import UserList from './pages/admin/UserList';
import UserForm from './pages/admin/UserForm';
import CaseStudyList from './pages/admin/CaseStudyList';
import CaseStudyForm from './pages/admin/CaseStudyForm';
import TeamMembersList from './pages/admin/TeamMembersList';
import TeamMemberForm from './pages/admin/TeamMemberForm';
import ServiceList from './pages/admin/ServiceList';
import ServiceForm from './pages/admin/ServiceForm';
import PageForm from './pages/admin/PageForm';
import ContactSubmissions from './pages/admin/ContactSubmissions';
import { pageService } from './services/api';

import './App.css';

import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import CaseStudies from './pages/CaseStudies';
import Article from './pages/Article';
import CaseStudy from './pages/CaseStudy';
import Page from './pages/Page';
import NotFound from './pages/NotFound';
import Service from './pages/Service';
import Team from './pages/Team';

import BackToTop from './components/BackToTop';
import Cursor from './components/Cursor';

import useHasMouse from './hooks/useHasMouse';

function App() {
  const hasMouse = useHasMouse();
  const [pages, setPages] = useState([]);

  useEffect(() => {
    fetchPages();
    
    const handlePageCreated = (event) => {
      const { slug, name } = event.detail;
      setPages(prev => [...prev, { slug, name }]);
    };

    window.addEventListener('pageCreated', handlePageCreated);
    return () => {
      window.removeEventListener('pageCreated', handlePageCreated);
    };
  }, []);

  const fetchPages = async () => {
    try {
      const data = await pageService.getAll();
      setPages(data);
    } catch (error) {
      console.error('Error fetching pages:', error);
    }
  };

  return (
    <HelmetProvider>
      <AuthProvider>
        <Router>
          <div className="app">
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/case-studies" element={<CaseStudies />} />
              <Route path="/blog/:slug" element={<Article />} />
              <Route path="/case-studies/:slug" element={<CaseStudy />} />
              <Route path="/services/:slug" element={<Service />} />
              <Route path="/team" element={<Team />} />
              <Route path="/:slug" element={<Page />} />
              <Route path="*" element={<NotFound />} />

              {/* Dynamic page routes */}
              {pages.map((page) => (
                page.slug && (
                  <Route
                    key={page.slug}
                    path={`/${page.slug}`}
                    element={<Page />}
                  />
                )
              ))}

              {/* Admin routes */}
              <Route path="/internal-admin-portalv1.0.1/login" element={<Login />} />
              <Route path="/internal-admin-portalv1.0.1" element={<Navigate to="/internal-admin-portalv1.0.1/dashboard" replace />} />
              <Route
                path="/internal-admin-portalv1.0.1/dashboard"
                element={
                  <ProtectedRoute roles={['admin', 'editor']}>
                    <Layout>
                      <Dashboard />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              
              <Route
                path="/internal-admin-portalv1.0.1/blog"
                element={
                  <ProtectedRoute roles={['admin', 'editor']}>
                    <Layout>
                      <BlogList />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              
              <Route
                path="/internal-admin-portalv1.0.1/blog/new"
                element={
                  <ProtectedRoute roles={['admin', 'editor']}>
                    <Layout>
                      <BlogForm />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              
              <Route
                path="/internal-admin-portalv1.0.1/blog/:id"
                element={
                  <ProtectedRoute roles={['admin', 'editor']}>
                    <Layout>
                      <BlogForm />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              
              <Route
                path="/internal-admin-portalv1.0.1/users"
                element={
                  <ProtectedRoute roles={['admin']}>
                    <Layout>
                      <UserList />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              
              <Route
                path="/internal-admin-portalv1.0.1/users/new"
                element={
                  <ProtectedRoute roles={['admin']}>
                    <Layout>
                      <UserForm />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              
              <Route
                path="/internal-admin-portalv1.0.1/users/:id"
                element={
                  <ProtectedRoute roles={['admin']}>
                    <Layout>
                      <UserForm />
                    </Layout>
                  </ProtectedRoute>
                }
              />

              <Route
                path="/internal-admin-portalv1.0.1/case-studies"
                element={
                  <ProtectedRoute roles={['admin', 'editor']}>
                    <Layout>
                      <CaseStudyList />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              
              <Route
                path="/internal-admin-portalv1.0.1/case-studies/new"
                element={
                  <ProtectedRoute roles={['admin', 'editor']}>
                    <Layout>
                      <CaseStudyForm />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              
              <Route
                path="/internal-admin-portalv1.0.1/case-studies/:id"
                element={
                  <ProtectedRoute roles={['admin', 'editor']}>
                    <Layout>
                      <CaseStudyForm />
                    </Layout>
                  </ProtectedRoute>
                }
              />

              <Route
                path="/internal-admin-portalv1.0.1/team"
                element={
                  <ProtectedRoute roles={['admin']}>
                    <Layout>
                      <TeamMembersList />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              
              <Route
                path="/internal-admin-portalv1.0.1/team/new"
                element={
                  <ProtectedRoute roles={['admin']}>
                    <Layout>
                      <TeamMemberForm />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              
              <Route
                path="/internal-admin-portalv1.0.1/team/:id"
                element={
                  <ProtectedRoute roles={['admin']}>
                    <Layout>
                      <TeamMemberForm />
                    </Layout>
                  </ProtectedRoute>
                }
              />

              <Route
                path="/internal-admin-portalv1.0.1/services"
                element={
                  <ProtectedRoute roles={['admin']}>
                    <Layout>
                      <ServiceList />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              
              <Route
                path="/internal-admin-portalv1.0.1/services/new"
                element={
                  <ProtectedRoute roles={['admin']}>
                    <Layout>
                      <ServiceForm />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              
              <Route
                path="/internal-admin-portalv1.0.1/services/:id"
                element={
                  <ProtectedRoute roles={['admin']}>
                    <Layout>
                      <ServiceForm />
                    </Layout>
                  </ProtectedRoute>
                }
              />

              <Route
                path="/internal-admin-portalv1.0.1/pages/:id"
                element={
                  <ProtectedRoute roles={['admin']}>
                    <Layout>
                      <PageForm />
                    </Layout>
                  </ProtectedRoute>
                }
              />

              <Route
                path="/internal-admin-portalv1.0.1/pages/new"
                element={
                  <ProtectedRoute roles={['admin']}>
                    <Layout>
                      <PageForm />
                    </Layout>
                  </ProtectedRoute>
                }
              />

              <Route
                path="/internal-admin-portalv1.0.1/contact-submissions"
                element={
                  <ProtectedRoute roles={['admin']}>
                    <Layout>
                      <ContactSubmissions />
                    </Layout>
                  </ProtectedRoute>
                }
              />
            </Routes>
            {hasMouse && <Cursor />}
            <BackToTop />
          </div>
        </Router>
      </AuthProvider>
    </HelmetProvider>
  );
}

export default App;
