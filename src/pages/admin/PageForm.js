import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { pageService } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';
import RichTextEditor from '../../components/editor/RichTextEditor';
import styles from './BlogForm.module.css';

const PageForm = ({ isNew = false }) => {
  const { user } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    metaTitle: '',
    metaDescription: '',
    upperContent: '',
    lowerContent: '',
    status: 'draft'
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [apiError, setApiError] = useState('');

  useEffect(() => {
    const fetchPage = async () => {
      if (!isNew && id) {
        try {
          setIsLoading(true);
          const data = await pageService.getById(id);
          setFormData({
            name: data.name || '',
            slug: data.slug || '',
            metaTitle: data.metaTitle || '',
            metaDescription: data.metaDescription || '',
            upperContent: data.upperContent || '',
            lowerContent: data.lowerContent || '',
            status: data.status || 'draft'
          });
        } catch (error) {
          console.error('Error fetching page:', error);
          setApiError('Failed to load page data');
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchPage();
  }, [isNew, id]);

  // Reset form data when isNew changes to true
  useEffect(() => {
    if (isNew) {
      setFormData({
        name: '',
        slug: '',
        metaTitle: '',
        metaDescription: '',
        upperContent: '',
        lowerContent: '',
        status: 'draft'
      });
      setErrors({});
      setApiError('');
    }
  }, [isNew]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleUpperContentChange = (content) => {
    setFormData(prev => ({
      ...prev,
      upperContent: content
    }));
  };

  const handleLowerContentChange = (content) => {
    setFormData(prev => ({
      ...prev,
      lowerContent: content
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Numele paginii este obligatoriu';
    if (!formData.metaTitle) newErrors.metaTitle = 'Meta titlul este obligatoriu';
    if (!formData.metaDescription) newErrors.metaDescription = 'Meta descrierea este obligatorie';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      setApiError('');
      setErrors({});

      // Validate all required fields
      if (!validateForm()) {
        setIsLoading(false);
        // Find the first field with an error
        const firstErrorField = Object.keys(errors)[0];
        if (firstErrorField) {
          // Get the input element
          const inputElement = document.getElementById(firstErrorField);
          if (inputElement) {
            // Scroll to the input
            inputElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            // Focus the input
            inputElement.focus();
          }
        }
        return;
      }

      if (id) {
        await pageService.update(id, formData);
      } else {
        await pageService.create(formData);
      }

      navigate('/internal-admin-portalv1.0.1/dashboard');
    } catch (err) {
      setApiError(err.response?.data?.message || 'Failed to save page');
      console.error('Save page error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Sigur doriți să ștergeți această pagină?')) {
      setIsDeleting(true);
      try {
        await pageService.delete(id);
        // Dispatch event to update the pages list in the Layout component
        window.dispatchEvent(new CustomEvent('pagesUpdated'));
        navigate('/internal-admin-portalv1.0.1/dashboard');
      } catch (error) {
        setApiError(error.response?.data?.message || 'Failed to delete page');
        console.error('Error deleting page:', error);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        {isNew ? 'Creează o pagină nouă' : `Editează pagina "${formData.name}"`}
      </h1>

      {apiError && (
        <div className={styles.error}>
          {apiError}
        </div>
      )}

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="name">Nume Pagină *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={errors.name ? styles.errorInput : ''}
          />
          {errors.name && <span className={styles.fieldError}>{errors.name}</span>}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="slug">Slug/URL (opțional)</label>
          <input
            type="text"
            id="slug"
            name="slug"
            value={formData.slug}
            onChange={handleChange}
            placeholder="Lăsați gol pentru pagina principală"
          />
          <small className={styles.helpText}>
            Dacă lăsați gol, pagina va fi pagina principală (homepage).
          </small>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="metaTitle">Meta Titlu *</label>
          <input
            type="text"
            id="metaTitle"
            name="metaTitle"
            value={formData.metaTitle}
            onChange={handleChange}
            className={errors.metaTitle ? styles.errorInput : ''}
          />
          {errors.metaTitle && <span className={styles.fieldError}>{errors.metaTitle}</span>}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="metaDescription">Meta Descriere *</label>
          <textarea
            id="metaDescription"
            name="metaDescription"
            value={formData.metaDescription}
            onChange={handleChange}
            className={errors.metaDescription ? styles.errorInput : ''}
          />
          {errors.metaDescription && <span className={styles.fieldError}>{errors.metaDescription}</span>}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="upperContent">Conținut Superior</label>
          <RichTextEditor
            value={formData.upperContent}
            onChange={handleUpperContentChange}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="lowerContent">Conținut Inferior</label>
          <RichTextEditor
            value={formData.lowerContent}
            onChange={handleLowerContentChange}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="status">Status</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            aria-label="Status pagină"
          >
            <option value="draft">Draft</option>
            <option value="published">Publicat</option>
          </select>
        </div>

        <div className={styles.formActions}>
          {id && user?.role === 'admin' && (
            <button
              type="button"
              className={styles.deleteButton}
              onClick={handleDelete}
              disabled={isDeleting}
              aria-label={isDeleting ? 'Se șterge pagina...' : 'Șterge pagina'}
            >
              {isDeleting ? 'Se șterge...' : 'Șterge pagina'}
            </button>
          )}
          {!isNew && (
          <button
            type="submit"
            className={styles.submitButton}
            disabled={isLoading}
            aria-label={isLoading ? 'Se salvează pagina...' : 'Salvează modificările paginii'}
          >
            {isLoading ? 'Se salvează...' : 'Salvează modificările'}
          </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default PageForm; 