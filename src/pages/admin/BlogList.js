import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { blogService } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';
import styles from './BlogList.module.css';
import '../../styles/Pagination.css';
import Pagination from '../../components/Pagination';

const BlogList = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true);
      const data = await blogService.getAll(currentPage, '', false);
      setPosts(data.blogs || []);
      setTotalPages(data.totalPages || 1);
      setError(null);
    } catch (err) {
      setError('Nu s-au putut prelua articolele pe blog');
    } finally {
      setLoading(false);
    }
  }, [currentPage]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleDelete = async (id) => {
    if (window.confirm('Sunteți sigur că doriți să ștergeți acest articol?')) {
      try {
        await blogService.delete(id);
        setPosts(posts.filter(post => post._id !== id));
      } catch (err) {
        setError('Nu s-a putut șterge articolul');
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
        <button className={styles.retryButton} onClick={fetchPosts}>
          Încercați din nou
        </button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Articole de blog</h1>
        {posts.length > 0 && (
          <Link to="/admin/blog/new" className={styles.addButton}>
            Adaugă un articol nou
          </Link>
        )}
      </div>

      {posts.length === 0 ? (
        <div className={styles.emptyState}>
          <p>Nu exista niciun articol pe blog. Creează unul</p>
          <Link to="/admin/blog/new" className={styles.addButton}>
            Crează un articol
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
                {posts.map((post) => (
                  <tr key={post._id}>
                    <td style={{fontWeight: 500, color: 'var(--blue)' }}>{post.title}</td>
                    <td>
                      {post.createdAt 
                          ? new Date(post.createdAt).toLocaleDateString('ro-RO')
                          : '-'
                      }
                    </td>
                    <td>
                      <span className={`${styles.status} ${styles[post.status]}`}>
                        {post.status === 'published' ? 'Publicat' : 'Ciornă'}
                      </span>
                    </td>
                    <td>
                      <div className={styles.actions}>
                        <Link to={`/admin/blog/${post._id}`} className={styles.editButton}>
                          <svg className={styles.editIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                          </svg>
                        </Link>
                        {user?.role === 'admin' && (
                          <button 
                            onClick={() => handleDelete(post._id)} 
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

export default BlogList; 