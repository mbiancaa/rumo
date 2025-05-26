import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { caseStudyService } from '../../services/api';
import RichTextEditor from '../../components/editor/RichTextEditor';
import styles from './BlogForm.module.css';
import { getImageUrl } from '../../utils/imageHelpers';

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
      setError('Nu s-au putut încărca studiul de caz');
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
    if (fieldErrors.content) {
      setFieldErrors(prev => ({
        ...prev,
        content: ''
      }));
    }
  };

  const handleRemoveImage = () => {
    setFormData(prev => ({
      ...prev,
      featuredImage: ''
    }));
  };
  
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      setError('Tipul fișierului este invalid. Doar JPEG, PNG și GIF sunt permise.');
      return;
    }

    const maxSize = 2 * 1024 * 1024; // 2MB
    if (file.size > maxSize) {
      setError('Dimensiunea fișierului este prea mare. Dimensiunea maximă este de 5MB.');
      return;
    }

    try {
      setLoading(true);
      setError('');
      
      const previewUrl = URL.createObjectURL(file);
      
      setFormData(prev => ({
        ...prev,
        featuredImage: previewUrl
      }));
      
      const formData = new FormData();
      formData.append('image', file);

      const response = await caseStudyService.uploadImage(formData);
      
      if (response && response.filename) {
        URL.revokeObjectURL(previewUrl);
        
        setFormData(prev => ({
          ...prev,
          featuredImage: response.filename
        }));
      } else {
        throw new Error('Raspuns invalid de la server');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Nu s-a putut încărca imaginea. Vă rugăm să încercați din nou.');
      console.error('Eroare la încărcarea imaginii:', err);
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
    const requiredFields = ['title', 'content', 'excerpt', 'industry', 'services', 'perioada', 'metaTitle', 'metaDescription'];
    
    requiredFields.forEach(field => {
      if (!formData[field] || formData[field].trim() === '') {
        errors[field] = 'Acest câmp este obligatoriu';
      }
    });

    // Validate metaTitle length
    if (formData.metaTitle && formData.metaTitle.length > 60) {
      errors.metaTitle = 'Meta titlul nu poate depăși 60 de caractere';
    }

    // Validate metaDescription length
    if (formData.metaDescription && formData.metaDescription.length > 150) {
      errors.metaDescription = 'Meta descrierea nu poate depăși 150 de caractere';
    }

    // Validate slug format if provided
    if (formData.slug) {
      // Only allow lowercase English letters, numbers, and hyphens
      // Must start and end with a letter or number
      // No consecutive hyphens allowed
      const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
      if (!slugRegex.test(formData.slug)) {
        errors.slug = 'Slug-ul trebuie să conțină doar litere mici (a-z), cifre și cratime. Nu sunt permise spații, caractere speciale sau litere cu diacritice.';
      }
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // Remove diacritics
      .replace(/[^a-z0-9]+/g, "-") // Replace non-alphanumeric chars with hyphens
      .replace(/(^-|-$)+/g, ""); // Remove leading/trailing hyphens
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError(null);
      setFieldErrors({});

      // Generate slug from title if empty
    if (!formData.slug && formData.title) {
      setFormData(prev => ({
        ...prev,
        slug: generateSlug(formData.title)
      }));
    }
    
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
        metaDescription: formData.metaDescription || formData.excerpt,
        date: new Date().toISOString()
      };

       // Generate slug if empty and title exists
      if (!submissionData.slug && submissionData.title) {
        submissionData.slug = generateSlug(submissionData.title);
      }

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
            placeholder="Lăsați gol pentru generare automată"
          />
          {fieldErrors.slug && <div className={styles.fieldError}>{fieldErrors.slug}</div>}
          <small className={styles.helpText}>
            Slug-ul trebuie să conțină doar litere mici, cifre și cratime. Ex: exemplu-de-slug
          </small>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="excerpt">Rezumat *</label>
          <textarea
            id="excerpt"
            name="excerpt"
            value={formData.excerpt}
            onChange={handleChange}
            className={fieldErrors.excerpt ? styles.errorInput : ''}
            rows="3"
          />
          {fieldErrors.excerpt && <div className={styles.fieldError}>{fieldErrors.excerpt}</div>}
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
          <label htmlFor="status">Status *</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="draft">Draft</option>
            <option value="published">Publicat</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="featuredImage">Imagine principală</label>
          {formData.featuredImage ? (
            <div className={styles.imagePreview}>
              <img 
                src={getImageUrl(formData.featuredImage)} 
                alt="Previzualizare imagine studiu de caz" 
                loading="lazy"
                decoding="async"
              />
              <button
                type="button"
                className={styles.removeButton}
                onClick={handleRemoveImage}
              >✕</button>
            </div>
          ) : (
          <input
            type="file"
            id="featuredImage"
            name="featuredImage"
            onChange={handleImageUpload}
            accept="image/*"
          />
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="metaTitle">Meta Titlu *</label>
          <div className={styles.inputWithCounter}>
            <input
              type="text"
              id="metaTitle"
              name="metaTitle"
              value={formData.metaTitle}
              onChange={handleChange}
              className={fieldErrors.metaTitle ? styles.errorInput : ''}
              maxLength={60}
            />
            <span className={styles.charCounter}>
              {formData.metaTitle.length}/60
            </span>
          </div>
          {fieldErrors.metaTitle && <div className={styles.fieldError}>{fieldErrors.metaTitle}</div>}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="metaDescription">Meta Descriere *</label>
          <div className={styles.inputWithCounter}>
            <textarea
              id="metaDescription"
              name="metaDescription"
              value={formData.metaDescription}
              onChange={handleChange}
              className={fieldErrors.metaDescription ? styles.errorInput : ''}
              rows="3"
              maxLength={150}
            />
            <span className={styles.charCounter}>
              {formData.metaDescription.length}/150
            </span>
          </div>
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