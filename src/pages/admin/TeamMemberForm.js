import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { teamMemberService } from '../../services/api';
import RichTextEditor from '../../components/editor/RichTextEditor';
import { useAuth } from '../../contexts/AuthContext';
import { getImageUrl } from '../../utils/imageHelpers';
import styles from './BlogForm.module.css';

const TeamMemberForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useAuth();
  const editorRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    keyword: '',
    image: '',
    description: ''
  });
  const [fieldErrors, setFieldErrors] = useState({});

  useEffect(() => {
    if (id) {
      const fetchMember = async () => {
        try {
          setLoading(true);
          const member = await teamMemberService.getById(id);
          setFormData({
            name: member.name || '',
            title: member.title || '',
            keyword: member.keyword || '',
            image: member.image || '',
            description: member.description || ''
          });
        } catch (err) {
          setError('Failed to load team member');
        } finally {
          setLoading(false);
        }
      };
      fetchMember();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDescriptionChange = (content) => {
    setFormData(prev => ({
      ...prev,
      description: content
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
      setError('Dimensiunea fișierului este prea mare. Dimensiunea maximă este de 2MB.');
      return;
    }

    try {
      setLoading(true);
      setError('');
      
      const previewUrl = URL.createObjectURL(file);
      
      setFormData(prev => ({
        ...prev,
        image: previewUrl
      }));
      
      const formData = new FormData();
      formData.append('image', file);

      const response = await teamMemberService.uploadImage(formData);
      
      if (response && response.url) {
        URL.revokeObjectURL(previewUrl);
        
        setFormData(prev => ({
          ...prev,
          image: response.url
        }));
      } else {
        throw new Error('Raspuns invalid de la server');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Nu s-a putut încărca imaginea. Vă rugăm să încercați din nou.');
      console.error('Eroare la încărcarea imaginii:', err);
      setFormData(prev => ({
        ...prev,
        image: ''
      }));
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveImage = () => {
    setFormData(prev => ({
      ...prev,
      image: ''
    }));
  };

  const validateForm = () => {
    const errors = {};
    const requiredFields = ['name', 'title', 'keyword', 'description'];
    
    requiredFields.forEach(field => {
      if (!formData[field] || formData[field].trim() === '') {
        errors[field] = 'Acest câmp este obligatoriu';
      }
    });

    if (!formData.image) {
      errors.image = 'Imaginea este obligatorie';
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
        await teamMemberService.update(id, formData);
      } else {
        await teamMemberService.create(formData);
      }

      navigate('/internal-admin-portalv1.0.1/team');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save team member');
      console.error('Save team member error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className={styles.loading}>Se încarcă...</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{id ? 'Editează membru echipă' : 'Adaugă membru echipă nou'}</h1>
      
      {error && <div className={styles.error}>{error}</div>}

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="name">Nume *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={fieldErrors.name ? styles.errorInput : ''}
          />
          {fieldErrors.name && <div className={styles.fieldError}>{fieldErrors.name}</div>}
        </div>

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
          <label htmlFor="keyword">Cuvânt cheie *</label>
          <input
            type="text"
            id="keyword"
            name="keyword"
            value={formData.keyword}
            onChange={handleChange}
            className={fieldErrors.keyword ? styles.errorInput : ''}
          />
          {fieldErrors.keyword && <div className={styles.fieldError}>{fieldErrors.keyword}</div>}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="description">Descriere *</label>
          <RichTextEditor
            ref={editorRef}
            value={formData.description}
            onChange={handleDescriptionChange}
            className={fieldErrors.description ? styles.errorInput : ''}
          />
          {fieldErrors.description && <div className={styles.fieldError}>{fieldErrors.description}</div>}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="image">Imagine *</label>
          {formData.image ? (
            <div className={styles.imagePreview}>
              <img 
                src={getImageUrl(formData.image)} 
                alt="Previzualizare imagine membru echipă" 
                loading="lazy"
                decoding="async"
              />
              <button
                type="button"
                onClick={handleRemoveImage}
                className={styles.removeButton}
                aria-label="Șterge imaginea"
              >
                ✕
              </button>
            </div>
          ) : (
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleImageUpload}
              className={fieldErrors.image ? styles.errorInput : ''}
              aria-label="Încarcă imagine"
            />
          )}
          {fieldErrors.image && <div className={styles.fieldError}>{fieldErrors.image}</div>}
        </div>

        <div className={styles.formActions}>
          <button 
            type="button" 
            onClick={() => navigate('/internal-admin-portalv1.0.1/team')}
            className={styles.cancelButton}
            aria-label="Anulează și întoarce-te la lista membrilor echipei"
          >
            Anulează
          </button>
          <button 
            type="submit" 
            disabled={loading}
            className={styles.submitButton}
            aria-label={loading ? 'Se salvează...' : (id ? 'Salvează modificările membrului' : 'Adaugă membru nou')}
          >
            {loading ? 'Se salvează...' : (id ? 'Salvează modificările' : 'Adaugă membru')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TeamMemberForm; 