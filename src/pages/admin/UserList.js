import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { userService } from '../../services/api';
import styles from './BlogList.module.css';
import '../../styles/Pagination.css';
import Pagination from '../../components/Pagination';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      const data = await userService.getAll(currentPage);
      setUsers(Array.isArray(data) ? data : []);
      setTotalPages(1); // Since the API returns all users at once
      setError(null);
    } catch (err) {
      setError('Nu s-au putut prelua utilizatorii');
    } finally {
      setLoading(false);
    }
  }, [currentPage]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleDelete = async (id) => {
    if (window.confirm('Sunteți sigur că doriți să ștergeți acest utilizator?')) {
      try {
        await userService.delete(id);
        setUsers(users.filter(user => user._id !== id));
      } catch (err) {
        setError('Nu s-a putut șterge utilizatorul');
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
        <button className={styles.retryButton} onClick={fetchUsers}>
          Încercați din nou
        </button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Utilizatori</h1>
        {users.length > 0 && (
          <Link to="/admin/users/new" className={styles.addButton}>
            Adaugă un utilizator nou
          </Link>
        )}
      </div>

      {users.length === 0 ? (
        <div className={styles.emptyState}>
          <p>Nu exista niciun utilizator. Creează unul</p>
          <Link to="/admin/users/new" className={styles.addButton}>
            Crează un utilizator
          </Link>
        </div>
      ) : (
        <>
          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Nume</th>
                  <th>Email</th>
                  <th>Rol</th>
                  <th style={{ textAlign: 'right', paddingRight: 40 }}>Acțiuni</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user._id}>
                    <td style={{fontWeight: 500, color: 'var(--blue)' }}>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      <span className={`${styles.status} ${styles[user.role]}`}>
                        {user.role === 'admin' ? 'Administrator' : 'Editor'}
                      </span>
                    </td>
                    <td>
                      <div className={styles.actions}>
                        <Link to={`/admin/users/${user._id}`} className={styles.editButton}>
                          <svg className={styles.editIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                          </svg>
                        </Link>
                        <button 
                          onClick={() => handleDelete(user._id)} 
                          className={styles.deleteButton}
                        >
                          <svg className={styles.deleteIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            <line x1="10" y1="11" x2="10" y2="17"></line>
                            <line x1="14" y1="11" x2="14" y2="17"></line>
                          </svg>
                        </button>
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

export default UserList; 