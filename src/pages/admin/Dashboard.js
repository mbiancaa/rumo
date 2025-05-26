import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { contactService } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';
import styles from './Dashboard.module.css';
import { formatDate } from '../../utils/dateUtils';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    articles: 0,
    caseStudies: 0,
    services: 0,
    pages: 0,
    submissions: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const response = await contactService.getDashboard();
        setStats(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Nu s-au putut prelua datele pentru dashboard');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (error) {
    return (
      <div className={styles.dashboard}>
        <div className={styles.errorMessage}>{error}</div>
      </div>
    );
  }

  return (
    <div className={styles.dashboard}>
      {/* Stats Row */}
      <div className={styles.statsRow}>
        <div className={styles.statCard}>
          <div className={styles.statIconBox}>
            <svg width="28" height="28" fill="none" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <rect x="5" y="3" width="14" height="18" rx="2"/>
              <polyline points="15 3 19 7 19 21 5 21 5 3 15 3"/>
              <line x1="7" y1="8" x2="17" y2="8"/>
              <line x1="7" y1="12" x2="15" y2="12"/>
              <line x1="7" y1="16" x2="13" y2="16"/>
            </svg>
          </div>
          <div>
            <div className={styles.statValue}>{stats.pages}</div>
            <div className={styles.statLabel}>Pagini</div>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIconBox}>
            <svg width="28" height="28" fill="none" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <rect x="3" y="5" width="18" height="14" rx="2"/>
              <line x1="7" y1="9" x2="17" y2="9"/>
              <line x1="7" y1="13" x2="13" y2="13"/>
              <rect x="15" y="13" width="4" height="2" rx="1"/>
            </svg>
          </div>
          <div>
            <div className={styles.statValue}>{stats.articles}</div>
            <div className={styles.statLabel}>Articole</div>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIconBox}>
            <svg width="28" height="28" fill="none" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <path d="M3 7a2 2 0 0 1 2-2h5l2 3h7a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z"/>
            </svg>
          </div>
          <div>
            <div className={styles.statValue}>{stats.caseStudies}</div>
            <div className={styles.statLabel}>Studii de caz</div>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIconBox}>
            <svg width="28" height="28" fill="none" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <rect x="3" y="7" width="18" height="13" rx="2"/>
              <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
              <line x1="3" y1="12" x2="21" y2="12"/>
            </svg>
          </div>
          <div>
            <div className={styles.statValue}>{stats.services}</div>
            <div className={styles.statLabel}>Servicii</div>
          </div>
        </div>
      </div>

      {/* Second Row: Quick Actions & Recent Emails */}
      <div className={styles.secondRow}>
        {user?.role === 'admin' && (
          <div className={styles.recentEmailsBox}>
            <div className={styles.recentEmailsHeader}>
              <span>Mesaje Recente</span>
              {stats.submissions && stats.submissions.length > 0 && (
                <span className={styles.unreadBadge}>{stats.submissions.length} new</span>
              )}
            </div>
            <div className={styles.recentEmailsList}>
              {loading ? (
                <div className={styles.noEmails}>Se încarcă...</div>
              ) : !stats.submissions || stats.submissions.length === 0 ? (
                <div className={styles.noEmails}>Nu există mesaje necitite</div>
              ) : (
                stats.submissions.map((email) => (
                  <div key={email.id} className={styles.recentEmailItem}>
                    <div className={styles.emailContent}>
                      <div className={styles.emailSender}>
                        {email.nume} {email.prenume}
                        {!email.read && <span className={styles.emailUnreadDot} />}
                      </div>
                      <div className={styles.emailSubject}>
                        {email.mesaj?.substring(0, 40) || ''}
                        {email.mesaj?.length > 40 ? '...' : ''}
                      </div>
                    </div>
                    <div className={styles.emailDate}>
                      {formatDate(email.created_at)}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
        <div className={styles.quickActionsBox}>
          <div className={styles.quickActionsTitle}>Acțiuni rapide</div>
          <Link to="/internal-admin-portalv1.0.1/pages/new" className={styles.quickActionItem}>
            <span>Creează o nouă pagină</span>
            <span className={styles.quickActionArrow}>&rarr;</span>
          </Link>
          <Link to="/internal-admin-portalv1.0.1/blog/new" className={styles.quickActionItem}>
            <span>Scrie un nou articol</span>
            <span className={styles.quickActionArrow}>&rarr;</span>
          </Link>
          <Link to="/internal-admin-portalv1.0.1/case-studies/new" className={styles.quickActionItem}>
            <span>Publică un studiu de caz</span>
            <span className={styles.quickActionArrow}>&rarr;</span>
          </Link>
          {user?.role === 'admin' && (
            <Link to="/internal-admin-portalv1.0.1/contact-submissions" className={styles.quickActionItem}>
              <span>Vezi toate mesajele</span>
              <span className={styles.quickActionArrow}>&rarr;</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 