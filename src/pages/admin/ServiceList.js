import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { servicesService } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';
import styles from './BlogList.module.css';
import { getImageUrl } from '../../utils/imageHelpers';

const ServiceList = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const response = await servicesService.getHierarchy();
      setServices(response || []);
    } catch (err) {
      console.error('Error fetching services:', err);
      setError('Nu s-au putut încărca serviciile. Vă rugăm să încercați din nou.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Sigur doriți să ștergeți acest serviciu?')) {
      return;
    }

    try {
      setLoading(true);
      await servicesService.delete(id);
      await fetchServices();
    } catch (err) {
      console.error('Error deleting service:', err);
      setError('Nu s-a putut șterge serviciul. Vă rugăm să încercați din nou.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddSubService = (parentId) => {
    navigate(`/internal-admin-portalv1.0.1/services/new?parent_id=${parentId}`);
  };

  const renderServiceRow = (service, level = 0) => {
    const indentStyle = {
      paddingLeft: `${level * 20}px`
    };

    return (
      <React.Fragment key={service.id}>
        <tr className={level > 0 ? styles.subServiceRow : ''}>
          <td style={indentStyle}>
            {service.image && (
              <div className={styles.imagePreview}>
                <img 
                  src={getImageUrl(service.image)} 
                  alt={service.title} 
                />
              </div>
            )}
          </td>
          <td style={{fontWeight: 500, color: 'var(--black)' }}>
            <div style={indentStyle}>
              {level > 0 && <span className={styles.subServiceIndicator}>↳ </span>}
              {service.title}
            </div>
          </td>
          <td>
            <span className={`${styles.status} ${styles[service.status]}`}>
              {service.status === 'published' ? 'Publicat' : 'Draft'}
            </span>
          </td>
          <td>
            <div className={styles.actions}>
              {level === 0 && (
                <button 
                  onClick={() => handleAddSubService(service.id)} 
                  className={styles.addSubServiceButton}
                  title="Adaugă sub-serviciu"
                >
                  <svg className={styles.addSubServiceIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 5v14M5 12h14"></path>
                  </svg>
                </button>
              )}
              <Link to={`/internal-admin-portalv1.0.1/services/${service.id}`} className={styles.editButton}>
                <svg className={styles.editIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                </svg>
              </Link>
              {user?.role === 'admin' && (
                <button 
                  onClick={() => handleDelete(service.id)} 
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
        {service.sub_services && service.sub_services.length > 0 && 
          service.sub_services.map(subService => renderServiceRow(subService, level + 1))
        }
      </React.Fragment>
    );
  };

  if (loading) {
    return <div className={styles.loading}>Se încarcă...</div>;
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <p>{error}</p>
        <button className={styles.retryButton} onClick={fetchServices}>
          Încercați din nou
        </button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Servicii</h1>
        {services.length > 0 && (
          <Link to="/internal-admin-portalv1.0.1/services/new" className={styles.addButton}>
            Adaugă un serviciu nou
          </Link>
        )}
      </div>

      {services.length === 0 ? (
        <div className={styles.emptyState}>
          <p>Nu există niciun serviciu. Creează unul</p>
          <Link to="/internal-admin-portalv1.0.1/services/new" className={styles.addButton}>
            Crează un serviciu
          </Link>
        </div>
      ) : (
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Imagine</th>
                <th>Titlu</th>
                <th>Status</th>
                <th style={{ textAlign: 'right', paddingRight: 40 }}>Acțiuni</th>
              </tr>
            </thead>
            <tbody>
              {services.map(service => renderServiceRow(service))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ServiceList; 