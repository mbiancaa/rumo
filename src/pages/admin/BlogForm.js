import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { blogService } from '../../services/api';
import RichTextEditor from '../../components/editor/RichTextEditor';
import { useAuth } from '../../contexts/AuthContext';
import CategorySelector from '../../components/CategorySelector';
import styles from './BlogForm.module.css';

const BlogForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useAuth();
  const editorRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: '',
    excerpt: '',
    featuredImage: '',
    status: 'draft',
    metaTitle: '',
    metaDescription: '',
    author: user?._id,
    categories: []
  });
  const [fieldErrors, setFieldErrors] = useState({});

  useEffect(() => {
    if (id) {
      const fetchPost = async () => {
        try {
          setLoading(true);
          const post = await blogService.getById(id);
          setFormData({
            title: post.title || '',
            slug: post.slug || '',
            content: post.content || '',
            excerpt: post.excerpt || '',
            featuredImage: post.featuredImage || '',
            status: post.status || 'draft',
            metaTitle: post.metaTitle || '',
            metaDescription: post.metaDescription || '',
            author: post.author || user?._id,
            categories: post.categories || []
          });
        } catch (err) {
          setError('Failed to load post');
        } finally {
          setLoading(false);
        }
      };
      fetchPost();
    }
  }, [id, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleContentChange = (content) => {
    setFormData(prev => ({
      ...prev,
      content
    }));
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
      const response = await blogService.uploadImage(formData);
      
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

  const handleRemoveImage = () => {
    setFormData(prev => ({
      ...prev,
      featuredImage: ''
    }));
  };

  const handleCategoriesChange = (categories) => {
    setFormData(prev => ({
      ...prev,
      categories
    }));
  };

  const validateForm = () => {
    const errors = {};
    const requiredFields = ['title', 'slug', 'content', 'excerpt', 'metaTitle', 'metaDescription'];
    
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
      setError('');
      setFieldErrors({});

      // Validate all required fields
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

      if (id) {
        await blogService.update(id, formData);
      } else {
        await blogService.create(formData);
      }

      navigate('/internal-admin-portalv1.0.1/blog');
    } catch (err) {
      if (err.response?.data?.message?.includes('duplicate slug')) {
        setError('Acest slug este deja folosit. Vă rugăm să alegeți altul.');
      } else {
        setError(err.response?.data?.message || 'Failed to save post');
      }
      console.error('Save post error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className={styles.loading}>Se încarcă...</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{id ? 'Editează articolul' : 'Creează un articol nou'}</h1>
      
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
          <label htmlFor="excerpt">Rezumat *</label>
          <textarea
            id="excerpt"
            name="excerpt"
            value={formData.excerpt}
            onChange={handleChange}
            rows="3"
            className={fieldErrors.excerpt ? styles.errorInput : ''}
          />
          {fieldErrors.excerpt && <div className={styles.fieldError}>{fieldErrors.excerpt}</div>}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="content">Conținut *</label>
          <RichTextEditor
            ref={editorRef}
            value={formData.content}
            onChange={handleContentChange}
            className={fieldErrors.content ? styles.errorInput : ''}
          />
          {fieldErrors.content && <div className={styles.fieldError}>{fieldErrors.content}</div>}
        </div>

        <div className={styles.formGroup}>
          <label>Categorii</label>
          <CategorySelector
            selectedCategories={formData.categories}
            onChange={handleCategoriesChange}
          />
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
          {formData.featuredImage ? (
            <div className={styles.imagePreview}>
              <img 
                src={formData.featuredImage} 
                alt="Previzualizare imagine articol blog" 
                loading="lazy"
                decoding="async"
              />
              <button
                type="button"
                onClick={handleRemoveImage}
                className={styles.removeImage}
              >
                Șterge imaginea
              </button>
            </div>
          ) : (
            <input
              type="file"
              id="featuredImage"
              accept="image/*"
              onChange={handleImageUpload}
            />
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
            onClick={() => navigate('/internal-admin-portalv1.0.1/blog')}
            className={styles.cancelButton}
            aria-label="Anulează și întoarce-te la lista de articole"
          >
            Anulează
          </button>
          <button 
            type="submit" 
            disabled={loading}
            className={styles.submitButton}
            aria-label={loading ? 'Se salvează...' : (id ? 'Salvează modificările articolului' : 'Creează articol nou')}
          >
            {loading ? 'Se salvează...' : (id ? 'Salvează modificările' : 'Creează articolul')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BlogForm; 