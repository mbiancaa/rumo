import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { useAuth } from '../../contexts/AuthContext';
import { pageService } from '../../services/api';

import logo from '../../assets/logo_white.png';

import styles from './Layout.module.css';

const Layout = ({ children }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isPagesExpanded, setIsPagesExpanded] = useState(false);
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    fetchPages();
    
    const handlePagesUpdated = () => {
      fetchPages();
    };

    window.addEventListener('pagesUpdated', handlePagesUpdated);
    return () => {
      window.removeEventListener('pagesUpdated', handlePagesUpdated);
    };
  }, []);

  // Add effect to close pages menu when sidebar is collapsed
  useEffect(() => {
    if (isSidebarCollapsed) {
      setIsPagesExpanded(false);
    }
  }, [isSidebarCollapsed]);

  const fetchPages = async () => {
    try {
      const data = await pageService.getAll();
      setPages(data);
    } catch (error) {
      console.error('Error fetching pages:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/internal-admin-portalv1.0.1/login');
  };

  // Sidebar menu items for new design
  const menuItems = [
    {
      path: '/internal-admin-portalv1.0.1/dashboard',
      label: 'Dashboard',
      icon: (
        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="2"/><rect x="14" y="3" width="7" height="7" rx="2"/><rect x="14" y="14" width="7" height="7" rx="2"/><rect x="3" y="14" width="7" height="7" rx="2"/></svg>
      )
    },
    {
      path: '/internal-admin-portalv1.0.1/blog',
      label: 'Articole de Blog',
      icon: (
        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <rect x="3" y="5" width="18" height="14" rx="2"/>
          <line x1="7" y1="9" x2="17" y2="9"/>
          <line x1="7" y1="13" x2="13" y2="13"/>
          <rect x="15" y="13" width="4" height="2" rx="1"/>
        </svg>
      )
    },
    {
      path: '/internal-admin-portalv1.0.1/case-studies',
      label: 'Studii de Caz',
      icon: (
        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <path d="M3 7a2 2 0 0 1 2-2h5l2 3h7a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z"/>
        </svg>
      )
    },
    ...(user?.role === 'admin' ? [
      {
        path: '/internal-admin-portalv1.0.1/contact-submissions',
        label: 'Inbox',
        icon: (
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <rect x="3" y="12" width="18" height="7" rx="2"/>
            <polyline points="3 12 7 7 17 7 21 12"/>
            <line x1="12" y1="17" x2="12" y2="14"/>
          </svg>
        )
      },
    ] : []),
    {
      path: '/internal-admin-portalv1.0.1/team',
      label: 'Echipa',
      icon: (
        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
      )
    },
    {
      path: '/internal-admin-portalv1.0.1/services',
      label: 'Servicii',
      icon: (
        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <rect x="3" y="7" width="18" height="13" rx="2"/>
          <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
          <line x1="3" y1="12" x2="21" y2="12"/>
        </svg>
      )
    },
    ...(user?.role === 'admin' ? [
      {
        path: '/internal-admin-portalv1.0.1/users',
        label: 'Utilizatori',
        icon: (
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
          </svg>
        )
      }
    ] : [])
  ];

  return (
    <div className={styles.adminLayout}>
      <aside className={`${styles.sidebar} ${isSidebarCollapsed ? styles.sidebarCollapsed : ''}`}>
          <div className={styles.sidebarFullContainer}>
          <div className={styles.logoContainer}>
            {isSidebarCollapsed ? (
              <button 
                className={styles.toggleButton}
                onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                aria-label="Expand sidebar"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={styles.menuIcon}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            ) : (
              <>
                <Link to="/internal-admin-portalv1.0.1/dashboard">
                  <img src={logo} alt="RUMO Digital Path - Panou de administrare" className={styles.logo} />
                </Link>
                <button 
                  className={styles.toggleButton}
                  onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                  aria-label="Collapse sidebar"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={styles.toggleIcon}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
              </>
            )}
          </div>

          <nav className={styles.navMenuContainer}>
            <ul className={styles.navMenu}>
              {menuItems.map((item) => (
                <li key={item.path} className={styles.navItem}>
                  <Link
                    to={item.path}
                    className={`${styles.navLink} ${location.pathname === item.path ? styles.navLinkActive : ''}`}
                  >
                    <span className={styles.navIcon}>{item.icon}</span>
                    <span className={styles.navText}>{item.label}</span>
                  </Link>
                </li>
              ))}

              {/* Pages Administration Section */}
              <li className={styles.navItem}>
                <div
                  className={`${styles.navLink} ${styles.expandable}`}
                  onClick={() => {
                    if (isSidebarCollapsed) {
                      setIsSidebarCollapsed(false);
                      setIsPagesExpanded(true);
                    } else {
                      setIsPagesExpanded(!isPagesExpanded);
                    }
                  }}
                >
                  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <rect x="5" y="3" width="14" height="18" rx="2"/>
                    <polyline points="15 3 19 7 19 21 5 21 5 3 15 3"/>
                    <line x1="7" y1="8" x2="17" y2="8"/>
                    <line x1="7" y1="12" x2="15" y2="12"/>
                    <line x1="7" y1="16" x2="13" y2="16"/>
                  </svg>
                  <span className={styles.navText}>Administrare Pagini</span>
                  {!isSidebarCollapsed && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      style={{ marginRight: 0 }}
                      className={`${styles.navIcon} ${styles.arrowIcon} ${isPagesExpanded ? styles.arrowIconRotated : ''}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  )}
                </div>
                {isPagesExpanded && (
                  <div className={styles.subMenu}>
                    {loading ? (
                      <li className={styles.subMenuItem}>
                        <span className={styles.subMenuLink}>Se încarcă...</span>
                      </li>
                    ) : (
                      <>
                        {pages.map((page) => (
                          <li key={page.id} className={styles.subMenuItem}>
                            <Link
                              to={`/internal-admin-portalv1.0.1/pages/${page.id}`}
                              className={`${styles.subMenuLink} ${location.pathname === `/internal-admin-portalv1.0.1/pages/${page.id}` ? styles.subMenuLinkActive : ''}`}
                            >
                              {page.name}
                            </Link>
                          </li>
                        ))}
                        <li className={styles.subMenuItem}>
                          <Link
                            to="/internal-admin-portalv1.0.1/pages/new"
                            className={`${styles.subMenuLink} ${location.pathname === '/internal-admin-portalv1.0.1/pages/new' ? styles.subMenuLinkActive : ''}`}
                          >
                            + Creează pagină nouă
                          </Link>
                        </li>
                      </>
                    )}
                  </div>
                )}
              </li>
            </ul>
          </nav>

          <div className={styles.userInfoContainer}>
            <div className={styles.userAvatar}>{user?.name ? user.name.split(' ').map(n => n[0]).join('').toUpperCase() : ''}</div>
            <div className={styles.userDetails}>
              <div className={styles.userName}>{user?.name}</div>
              <div className={styles.userRole}>{user?.role === 'admin' ? 'Admin' : 'Editor'}</div>
            </div>
            <button className={styles.logoutIconButton} onClick={handleLogout} title="Log out">
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <path d="M5 4v16" />
                <path d="M9 12h8" />
                <path d="M15 8l4 4-4 4" />
              </svg>
            </button>
          </div>
        </div>
      </aside>

      <main className={`${styles.mainContent} ${isSidebarCollapsed ? styles.mainContentExpanded : ''}`}>
        {children}
      </main>
    </div>
  );
};

export default Layout;