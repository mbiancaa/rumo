import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { caseStudyService } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';
import styles from './BlogList.module.css';
import '../../styles/Pagination.css';
import Pagination from '../../components/Pagination';

const CaseStudyList = () => {
  const { user } = useAuth();
  const [caseStudies, setCaseStudies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchCaseStudies = useCallback(async () => {
    try {
      setLoading(true);
      const data = await caseStudyService.getAll(currentPage, '', false);
      setCaseStudies(data.caseStudies || []);
      setTotalPages(data.totalPages || 1);
      setError(null);
    } catch (err) {
      setError('Nu s-au putut prelua studiile de caz');
    } finally {
      setLoading(false);
    }
  }, [currentPage]);

  useEffect(() => {
    fetchCaseStudies();
  }, [fetchCaseStudies]);

  const handleDelete = async (id) => {
    if (window.confirm('Sunteți sigur că doriți să ștergeți acest studiu de caz?')) {
      try {
        await caseStudyService.delete(id);
        setCaseStudies(caseStudies.filter(study => study.id !== id));
      } catch (err) {
        setError('Nu s-a putut șterge studiul de caz');
      }
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (loading) {
    return <div className={styles.loading}>Se încarcă...</div>;
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <p>{error}</p>
        <button className={styles.retryButton} onClick={fetchCaseStudies}>
          Încercați din nou
        </button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Studii de caz</h1>
        {caseStudies.length > 0 &&
          (<Link to="/internal-admin-portalv1.0.1/case-studies/new" className={styles.addButton}>
            Adaugă un studiu de caz nou
          </Link>)
        }
      </div>

      {caseStudies.length === 0 ? (
        <div className={styles.emptyState}>
          <p>Nu exista niciun studiu de caz. Creează unul</p>
          <Link to="/internal-admin-portalv1.0.1/case-studies/new" className={styles.addButton}>
            Crează un studiu de caz
          </Link>
        </div>
      ) : (
        <>
          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Titlu</th>
                  <th>Postat la</th>
                  <th>Status</th>
                  <th style={{ textAlign: 'right', paddingRight: 40 }}>Acțiuni</th>
                </tr>
              </thead>
              <tbody>
                {caseStudies.map(study => (
                  <tr key={study.id}>
                    <td style={{fontWeight: 500, color: 'var(--blue)' }}>{study.title}</td>
                    <td> {study.created_at 
                          ? new Date(study.created_at).toLocaleDateString('ro-RO')
                          : '-'}
                    </td>
                    <td>
                      <span className={`${styles.status} ${styles[study.status]}`}>
                        {study.status === 'draft' ? 'Draft' : 'Publicat'}
                      </span>
                    </td>
                    <td>
                      <div className={styles.actions}>
                        <Link to={`/internal-admin-portalv1.0.1/case-studies/${study.id}`} className={styles.editButton}>
                          <svg className={styles.editIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                          </svg>
                        </Link>
                        {user?.role === 'admin' && (
                          <button 
                            onClick={() => handleDelete(study.id)} 
                            className={styles.deleteButton}
                          >
                            <svg className={styles.deleteIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="3 6 5 6 21 6"></polyline>
                              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                              <line x1="10" y1="11" x2="10" y2="17"></line>
                              <line x1="14" y1="11" x2="14" y2="17"></line>
                            </svg>
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <Pagination 
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              className={styles.pagination}
            />
          )}
        </>
      )}
    </div>
  );
};

export default CaseStudyList; 