import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from './contexts/AuthContext';
import { ServicesProvider } from './contexts/ServicesContext';
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
      const data = await pageService.getPublishedPages();
      setPages(data);
    } catch (error) {
      console.error('Error fetching pages:', error);
    }
  };

  return (
    <Router>
      <HelmetProvider>
        <div className="app">
          <Routes>
            {/* Public routes with ServicesProvider */}
            <Route
              path="/*"
              element={
                <ServicesProvider>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/despre-noi" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/studii-de-caz" element={<CaseStudies />} />
                    <Route path="/blog/:slug" element={<Article />} />
                    <Route path="/servicii/:slug" element={<Service />} />
                    <Route path="/echipa" element={<Team />} />
                    <Route path="/studii-de-caz/:slug" element={<CaseStudy />} />
                    {pages.map((page) => (
                      page.slug && (
                        <Route
                          key={page.slug}
                          path={`/${page.slug}`}
                          element={<Page />}
                        />
                      )
                    ))}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </ServicesProvider>
              }
            />

            {/* Admin routes with AuthProvider */}
            <Route
              path="/internal-admin-portalv1.0.1/*"
              element={
                <AuthProvider>
                  <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/" element={<Navigate to="/internal-admin-portalv1.0.1/dashboard" replace />} />
                    <Route
                      path="/dashboard"
                      element={
                        <ProtectedRoute roles={['admin', 'editor']}>
                          <Layout>
                            <Dashboard />
                          </Layout>
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/blog"
                      element={
                        <ProtectedRoute roles={['admin', 'editor']}>
                          <Layout>
                            <BlogList />
                          </Layout>
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/blog/new"
                      element={
                        <ProtectedRoute roles={['admin', 'editor']}>
                          <Layout>
                            <BlogForm />
                          </Layout>
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/blog/:id"
                      element={
                        <ProtectedRoute roles={['admin', 'editor']}>
                          <Layout>
                            <BlogForm />
                          </Layout>
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/users"
                      element={
                        <ProtectedRoute roles={['admin']}>
                          <Layout>
                            <UserList />
                          </Layout>
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/users/new"
                      element={
                        <ProtectedRoute roles={['admin']}>
                          <Layout>
                            <UserForm />
                          </Layout>
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/users/:id"
                      element={
                        <ProtectedRoute roles={['admin']}>
                          <Layout>
                            <UserForm />
                          </Layout>
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/case-studies"
                      element={
                        <ProtectedRoute roles={['admin', 'editor']}>
                          <Layout>
                            <CaseStudyList />
                          </Layout>
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/case-studies/new"
                      element={
                        <ProtectedRoute roles={['admin', 'editor']}>
                          <Layout>
                            <CaseStudyForm />
                          </Layout>
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/case-studies/:id"
                      element={
                        <ProtectedRoute roles={['admin', 'editor']}>
                          <Layout>
                            <CaseStudyForm />
                          </Layout>
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/team"
                      element={
                        <ProtectedRoute roles={['admin', 'editor']}>
                          <Layout>
                            <TeamMembersList />
                          </Layout>
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/team/new"
                      element={
                        <ProtectedRoute roles={['admin', 'editor']}>
                          <Layout>
                            <TeamMemberForm />
                          </Layout>
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/team/:id"
                      element={
                        <ProtectedRoute roles={['admin']}>
                          <Layout>
                            <TeamMemberForm />
                          </Layout>
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/services"
                      element={
                        <ProtectedRoute roles={['admin', 'editor']}>
                          <Layout>
                            <ServiceList />
                          </Layout>
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/services/new"
                      element={
                        <ProtectedRoute roles={['admin', 'editor']}>
                          <Layout>
                            <ServiceForm />
                          </Layout>
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/services/:id"
                      element={
                        <ProtectedRoute roles={['admin']}>
                          <Layout>
                            <ServiceForm />
                          </Layout>
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/pages/:id"
                      element={
                        <ProtectedRoute roles={['admin', 'editor']}>
                          <Layout>
                            <PageForm />
                          </Layout>
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/pages/new"
                      element={
                        <ProtectedRoute roles={['admin', 'editor']}>
                          <Layout>
                            <PageForm isNew={true} />
                          </Layout>
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/contact-submissions"
                      element={
                        <ProtectedRoute roles={['admin']}>
                          <Layout>
                            <ContactSubmissions />
                          </Layout>
                        </ProtectedRoute>
                      }
                    />
                  </Routes>
                </AuthProvider>
              }
            />
          </Routes>
          {hasMouse && <Cursor />}
          <BackToTop />
        </div>
      </HelmetProvider>
    </Router>
  );
}

export default App;
