import React, { useState, useEffect, useCallback } from 'react';
import { contactService } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';
import styles from './ContactSubmissions.module.css';
import '../../styles/Pagination.css';
import Pagination from '../../components/Pagination';

const ContactSubmissions = () => {
  const { user } = useAuth();
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [expandedId, setExpandedId] = useState(null);
  const [unreadCount, setUnreadCount] = useState(0);

  const fetchSubmissions = useCallback(async () => {
    try {
      setLoading(true);
      const data = await contactService.getAll(currentPage);
      setSubmissions(data.submissions || []);
      setTotalPages(data.totalPages || 1);
      setUnreadCount(data.submissions?.filter(s => !s.read).length || 0);
      setError(null);
    } catch (err) {
      setError('Nu s-au putut prelua mesajele de contact');
    } finally {
      setLoading(false);
    }
  }, [currentPage]);

  useEffect(() => {
    fetchSubmissions();
  }, [fetchSubmissions]);

  const handleDelete = async (id) => {
    if (window.confirm('Sunteți sigur că doriți să ștergeți acest mesaj?')) {
      try {
        await contactService.delete(id);
        setSubmissions(submissions.filter(submission => submission._id !== id));
        if (expandedId === id) {
          setExpandedId(null);
        }
      } catch (err) {
        setError('Nu s-a putut șterge mesajul');
      }
    }
  };

  const handleMarkAsRead = async (id, isRead) => {
    try {
      await contactService.update(id, { read: !isRead });
      setSubmissions(submissions.map(submission => 
        submission._id === id 
          ? { ...submission, read: !isRead }
          : submission
      ));
      setUnreadCount(prev => isRead ? prev + 1 : prev - 1);
    } catch (err) {
      setError('Nu s-a putut actualiza starea mesajului');
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      const unreadSubmissions = submissions.filter(s => !s.read);
      await Promise.all(unreadSubmissions.map(s => 
        contactService.update(s._id, { read: true })
      ));
      setSubmissions(submissions.map(s => ({ ...s, read: true })));
      setUnreadCount(0);
    } catch (err) {
      setError('Nu s-au putut marca toate mesajele ca citite');
    }
  };

  const handleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleReply = (email) => {
    window.location.href = `mailto:${email}`;
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setExpandedId(null);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
  
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  
    if (diffMinutes < 2) return 'Acum un minut';
    if (diffMinutes < 60) return `Acum ${diffMinutes} minute`;
    if (diffHours < 2) return 'Acum o oră';
    if (diffHours < 24) return `${diffHours} ore în urmă`;
    if (diffDays === 1) return 'ieri';
    if (diffDays < 7) return `${diffDays} zile în urmă`;
    return date.toLocaleDateString('ro-RO');
  };
  
  

  if (loading) {
    return <div className={styles.loading}>Se încarcă...</div>;
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <p>{error}</p>
        <button className={styles.retryButton} onClick={fetchSubmissions}>
          Încercați din nou
        </button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>
          Inbox
          {unreadCount > 0 && (
            <span className={styles.unreadBadge}>
              {unreadCount}
            </span>
          )}
        </h1>
        {unreadCount > 0 && (
          <button className={styles.markAllRead} onClick={handleMarkAllAsRead}>
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
              <path d="M9 16.17L6.83 12l-2.42 2.41L9 19 21 7l-1.41-1.41L9 16.17z" transform="translate(7, 0)"/>
            </svg>
            Marchează toate ca citite
          </button>
        )}
      </div>

      {submissions.length === 0 ? (
        <div className={styles.emptyState}>
          <p>Nu există mesaje de contact</p>
        </div>
      ) : (
        <>
          <div className={styles.submissionList}>
            {submissions.map(submission => (
              
                <div key={submission._id}
                  className={`${styles.submissionItem} ${!submission.read ? styles.unread : ''} ${expandedId === submission._id ? styles.selected : ''}`}
                  onClick={() => handleExpand(submission._id)}
                >
                  <div className={styles.submissionPreview}>
                    <div className={styles.senderInfo}>
                      {submission.nume} {submission.prenume}
                      {!submission.read && <span className={styles.newLabel}>Nou</span>}
                    </div>
                    <div className={styles.messagePreview}>
                      {submission.mesaj.substring(0, 100)}...
                    </div>
                  </div>
                  <div className={styles.date}>
                    {formatDate(submission.createdAt)}
                  </div>
                  <div className={styles.actions}>
                    <button 
                      className={styles.actionButton}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMarkAsRead(submission._id, submission.read);
                      }}
                      title={submission.read ? 'Marchează ca necitit' : 'Marchează ca citit'}
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        {submission.read ? (
                          <>
                            <path d="M3 8l9 6 9-6" />
                            <path d="M3 8v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8" />
                            <path d="M3 8l9-4 9 4" />
                          </>
                        ) : (
                          <>
                            <path d="M3 8l9 6 9-6" />
                            <path d="M3 8v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8" />
                            <path d="M3 7h18" />
                          </>
                        )}
                      </svg>
                    </button>
                    <button 
                      className={styles.actionButton}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleReply(submission.email);
                      }}
                      title="Răspunde"
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M10 9V5l-7 7 7 7v-4.1c5 0 8.5 1.6 11 5.1-1-5-4-10-11-11z"/>
                      </svg>
                    </button>
                    {user?.role === 'admin' && (
                      <button 
                        className={styles.actionButton}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(submission._id);
                        }}
                        title="Șterge"
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="3 6 5 6 21 6"></polyline>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                          <line x1="10" y1="11" x2="10" y2="17"></line>
                          <line x1="14" y1="11" x2="14" y2="17"></line>
                        </svg>
                      </button>
                    )}
                  </div>
                
                {expandedId === submission._id && (
                  <div className={styles.modalOverlay} onClick={() => setExpandedId(null)}>
                    <div className={styles.expandedCard} onClick={e => e.stopPropagation()}>
                      <button className={styles.closeButton} onClick={() => setExpandedId(null)} title="Închide">&times;</button>
                      <div className={styles.expandedHeader}>
                        <div className={styles.expandedSender}>{submission.nume} {submission.prenume}</div>
                        <div className={styles.expandedEmail}>{submission.email}</div>
                        <div className={styles.expandedDate}>{new Date(submission.createdAt).toLocaleString('ro-RO', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</div>
                      </div>
                      <div className={styles.expandedBody}>
                        <div className={styles.expandedField}>
                          <strong>Telefon</strong>
                          {submission.telefon}
                        </div>
                        <div className={styles.expandedField}>
                          <strong>Website/Companie</strong>
                          {submission.website}
                        </div>
                        <div className={styles.expandedField}>
                          <strong>Mesaj</strong>
                          <div className={styles.expandedMessage}>{submission.mesaj}</div>
                        </div>
                      </div>
                      <div className={styles.expandedActions}>
                        <button className={styles.actionButton} onClick={() => handleReply(submission.email)} title="Răspunde">
                          <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M10 9V5l-7 7 7 7v-4.1c5 0 8.5 1.6 11 5.1-1-5-4-10-11-11z"/>
                          </svg>
                          Răspunde
                        </button>
                        {user?.role === 'admin' && (
                          <button className={styles.actionButton} onClick={() => handleDelete(submission._id)} title="Șterge">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="3 6 5 6 21 6"></polyline>
                              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                              <line x1="10" y1="11" x2="10" y2="17"></line>
                              <line x1="14" y1="11" x2="14" y2="17"></line>
                            </svg>
                            Șterge
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <Pagination 
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </div>
  );
};

export default ContactSubmissions; 