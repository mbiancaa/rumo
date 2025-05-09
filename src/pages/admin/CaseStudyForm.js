import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { caseStudyService } from '../../services/api';
import RichTextEditor from '../../components/editor/RichTextEditor';
import styles from './BlogForm.module.css';

const CaseStudyForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: '',
    excerpt: '',
    perioada: '',
    industry: '',
    services: '',
    status: 'draft',
    featuredImage: '',
    metaTitle: '',
    metaDescription: ''
  });

  const fetchCaseStudy = useCallback(async () => {
    try {
      setLoading(true);
      const data = await caseStudyService.getById(id);
      setFormData({
        title: data.title || '',
        slug: data.slug || '',
        content: data.content || '',
        excerpt: data.excerpt || '',
        perioada: data.perioada || '',
        industry: data.industry || '',
        services: data.services || '',
        status: data.status || 'draft',
        featuredImage: data.featuredImage || '',
        metaTitle: data.metaTitle || '',
        metaDescription: data.metaDescription || ''
      });
    } catch (err) {
      setError('Nu s-a putut încărca studiul de caz');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchCaseStudy();
    }
  }, [id, fetchCaseStudy]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when field is modified
    if (fieldErrors[name]) {
      setFieldErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleContentChange = (content) => {
    setFormData(prev => ({
      ...prev,
      content
    }));
    // Clear content error when modified
    if (fieldErrors.content) {
      setFieldErrors(prev => ({
        ...prev,
        content: ''
      }));
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      setError('Tipul fișierului este invalid. Doar JPEG, PNG și GIF sunt permise.');
      return;
    }

    // Validate file size (5MB max)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      setError('Dimensiunea fișierului este prea mare. Dimensiunea maximă este de 5MB.');
      return;
    }

    try {
      setLoading(true);
      setError('');
      
      // Create a temporary URL for the image preview
      const previewUrl = URL.createObjectURL(file);
      
      // Set the preview URL immediately
      setFormData(prev => ({
        ...prev,
        featuredImage: previewUrl
      }));
      
      // Create FormData for upload
      const formData = new FormData();
      formData.append('image', file);

      // Upload the image
      const response = await caseStudyService.uploadImage(formData);
      
      if (response && response.url) {
        // Clean up the temporary URL
        URL.revokeObjectURL(previewUrl);
        
        // Set the actual image URL from the server
        setFormData(prev => ({
          ...prev,
          featuredImage: response.url
        }));
      } else {
        throw new Error('Raspuns invalid de la server');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Nu s-a putut încărca imaginea. Vă rugăm să încercați din nou.');
      console.error('Eroare la încărcarea imaginii:', err);
      // Remove the temporary preview if upload failed
      setFormData(prev => ({
        ...prev,
        featuredImage: ''
      }));
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    const errors = {};
    const requiredFields = ['title', 'slug', 'content', 'excerpt', 'industry', 'services', 'perioada', 'metaTitle', 'metaDescription'];
    
    requiredFields.forEach(field => {
      if (!formData[field] || formData[field].trim() === '') {
        errors[field] = 'Acest câmp este obligatoriu';
      }
    });

    // Validate slug format
    if (formData.slug && !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(formData.slug)) {
      errors.slug = 'Slug-ul trebuie să conțină doar litere mici, cifre și cratime.';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      setFieldErrors({});

      // Validate form
      if (!validateForm()) {
        setLoading(false);
        // Find the first field with an error
        const firstErrorField = Object.keys(fieldErrors)[0];
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

      // Ensure all required fields are included in the submission
      const submissionData = {
        ...formData,
        perioada: formData.perioada || '',
        featuredImage: formData.featuredImage || '',
        metaTitle: formData.metaTitle || formData.title,
        metaDescription: formData.metaDescription || formData.excerpt
      };

      if (id) {
        await caseStudyService.update(id, submissionData);
      } else {
        await caseStudyService.create(submissionData);
      }

      navigate('/internal-admin-portalv1.0.1/case-studies');
    } catch (err) {
      setError(err.response?.data?.message || 'Nu s-a putut salva studiul de caz');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className={styles.loading}>Se încarcă...</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        {id ? 'Editează studiul de caz' : 'Creează un studiu de caz nou'}
      </h1>

      {error && <div className={styles.error}>{error}</div>}

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="title">Titlu *</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={fieldErrors.title ? styles.errorInput : ''}
          />
          {fieldErrors.title && <div className={styles.fieldError}>{fieldErrors.title}</div>}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="slug">Slug/URL *</label>
          <input
            type="text"
            id="slug"
            name="slug"
            value={formData.slug}
            onChange={handleChange}
            className={fieldErrors.slug ? styles.errorInput : ''}
            placeholder="exemplu-de-slug"
          />
          {fieldErrors.slug && <div className={styles.fieldError}>{fieldErrors.slug}</div>}
          <small className={styles.helpText}>
            Slug-ul trebuie să conțină doar litere mici, cifre și cratime. Ex: exemplu-de-slug
          </small>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="content">Conținut *</label>
          <RichTextEditor
            value={formData.content}
            onChange={handleContentChange}
            className={fieldErrors.content ? styles.errorInput : ''}
          />
          {fieldErrors.content && <div className={styles.fieldError}>{fieldErrors.content}</div>}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="excerpt">Rezumat *</label>
          <textarea
            id="excerpt"
            name="excerpt"
            value={formData.excerpt}
            onChange={handleChange}
            rows="4"
            className={fieldErrors.excerpt ? styles.errorInput : ''}
          />
          {fieldErrors.excerpt && <div className={styles.fieldError}>{fieldErrors.excerpt}</div>}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="perioada">Perioada *</label>
          <input
            type="text"
            id="perioada"
            name="perioada"
            value={formData.perioada}
            onChange={handleChange}
            className={fieldErrors.perioada ? styles.errorInput : ''}
          />
          {fieldErrors.perioada && <div className={styles.fieldError}>{fieldErrors.perioada}</div>}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="industry">Industrie *</label>
          <input
            type="text"
            id="industry"
            name="industry"
            value={formData.industry}
            onChange={handleChange}
            className={fieldErrors.industry ? styles.errorInput : ''}
          />
          {fieldErrors.industry && <div className={styles.fieldError}>{fieldErrors.industry}</div>}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="services">Servicii *</label>
          <input
            type="text"
            id="services"
            name="services"
            value={formData.services}
            onChange={handleChange}
            className={fieldErrors.services ? styles.errorInput : ''}
          />
          {fieldErrors.services && <div className={styles.fieldError}>{fieldErrors.services}</div>}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="status">Status</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="draft">Ciornă</option>
            <option value="published">Publicat</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="featuredImage">Imagine principală</label>
          <input
            type="file"
            id="featuredImage"
            accept="image/*"
            onChange={handleImageUpload}
          />
          {formData.featuredImage && (
            <div className={styles.imagePreview}>
              <img 
                src={formData.featuredImage} 
                alt="Previzualizare imagine studiu de caz" 
                loading="lazy"
                decoding="async"
              />
              <button
                type="button"
                className={styles.removeButton}
                onClick={() => setFormData(prev => ({ ...prev, featuredImage: '' }))}
              >
                ×
              </button>
            </div>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="metaTitle">Meta Titlu *</label>
          <input
            type="text"
            id="metaTitle"
            name="metaTitle"
            value={formData.metaTitle}
            onChange={handleChange}
            className={fieldErrors.metaTitle ? styles.errorInput : ''}
          />
          {fieldErrors.metaTitle && <div className={styles.fieldError}>{fieldErrors.metaTitle}</div>}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="metaDescription">Meta Descriere *</label>
          <textarea
            id="metaDescription"
            name="metaDescription"
            value={formData.metaDescription}
            onChange={handleChange}
            rows="3"
            className={fieldErrors.metaDescription ? styles.errorInput : ''}
          />
          {fieldErrors.metaDescription && <div className={styles.fieldError}>{fieldErrors.metaDescription}</div>}
        </div>

        <div className={styles.formActions}>
          <button 
            type="button" 
            onClick={() => navigate('/internal-admin-portalv1.0.1/case-studies')}
            className={styles.cancelButton}
            aria-label="Anulează și întoarce-te la lista de studii de caz"
          >
            Anulează
          </button>
          <button 
            type="submit" 
            disabled={loading}
            className={styles.submitButton}
            aria-label={loading ? 'Se salvează...' : (id ? 'Salvează modificările studiului de caz' : 'Creează studiu de caz nou')}
          >
            {loading ? 'Se salvează...' : (id ? 'Salvează modificările' : 'Creează studiul de caz')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CaseStudyForm; 