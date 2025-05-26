import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { servicesService } from '../../services/api';
import RichTextEditor from '../../components/editor/RichTextEditor';
import styles from './BlogForm.module.css';
import { getImageUrl } from '../../utils/imageHelpers';

const ServiceForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [parentServices, setParentServices] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    heroText: '',
    excerpt: '',
    heading: '',
    content: '',
    metaTitle: '',
    metaDescription: '',
    status: 'draft',
    parent_id: null,
    faqs: [],
    image: null
  });
  const [fieldErrors, setFieldErrors] = useState({});
  const [metaTitleLength, setMetaTitleLength] = useState(0);
  const [metaDescriptionLength, setMetaDescriptionLength] = useState(0);

  // Check for parent_id in URL query parameters
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const parentId = searchParams.get('parent_id');
    if (parentId) {
      setFormData(prev => ({
        ...prev,
        parent_id: parentId
      }));
    }
  }, [location]);

  // Fetch parent services for the dropdown
  useEffect(() => {
    const fetchParentServices = async () => {
      try {
        const response = await servicesService.getAll();
        // Filter out the current service and any services that are already children
        const filteredServices = response.filter(service => {
          // Don't show the current service as a potential parent
          if (id && service.id === id) return false;
          // Don't show services that are already children
          if (service.parent_id) return false;
          return true;
        });
        setParentServices(filteredServices);
      } catch (err) {
        console.error('Error fetching parent services:', err);
        setError('Nu s-au putut încărca serviciile părinte');
        setParentServices([]);
      }
    };
    
    fetchParentServices();
  }, [id]);

  useEffect(() => {
    if (id) {
      const fetchService = async () => {
        try {
          setLoading(true);
          const service = await servicesService.getById(id);
          
          if (!service) {
            throw new Error('Serviciul nu a fost găsit');
          }
          
          const faqs = Array.isArray(service.faqs) 
            ? service.faqs.map(faq => ({
                question: faq.question || '',
                answer: faq.answer || ''
              }))
            : [];
          
          setFormData({
            title: service.title || '',
            slug: service.slug || '',
            heroText: service.heroText || '',
            excerpt: service.excerpt || '',
            heading: service.heading || '',
            content: service.content || '',
            metaTitle: service.metaTitle || '',
            metaDescription: service.metaDescription || '',
            status: service.status || 'draft',
            parent_id: service.parent_id || null,
            faqs: faqs,
            image: service.image || null
          });
        } catch (err) {
          console.error('Error fetching service:', err);
          setError('Nu s-a putut încărca serviciul');
        } finally {
          setLoading(false);
        }
      };
      fetchService();
    }
  }, [id]);

  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // Remove diacritics
      .replace(/[^a-z0-9]+/g, "-") // Replace non-alphanumeric chars with hyphens
      .replace(/(^-|-$)+/g, ""); // Remove leading/trailing hyphens
  };

  // Update handleChange to remove slug generation
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const newData = {
        ...prev,
        [name]: value
      };
      
      // Update meta counters
      if (name === 'metaTitle') setMetaTitleLength(value.length);
      if (name === 'metaDescription') setMetaDescriptionLength(value.length);
      
      return newData;
    });
  };

  const handleContentChange = (content) => {
    setFormData(prev => ({
      ...prev,
      content
    }));
  };

  const handleHeroTextChange = (content) => {
    setFormData(prev => ({
      ...prev,
      heroText: content
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

    const maxSize = 2 * 1024 * 1024;
    if (file.size > maxSize) {
      setError('Dimensiunea fișierului este prea mare. Dimensiunea maximă este de 2MB.');
      return;
    }

    try {
      setLoading(true);
      setError('');
      
      const formData = new FormData();
      formData.append('image', file);

      const response = await servicesService.uploadImage(formData);
      
      if (response && response.url) {
        setFormData(prev => ({
          ...prev,
          image: response.url
        }));
      } else {
        throw new Error('Răspuns invalid de la server');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Nu s-a putut încărca imaginea. Vă rugăm să încercați din nou.');
      console.error('Eroare la încărcarea imaginii:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveImage = () => {
    setFormData(prev => ({
      ...prev,
      image: null
    }));
  };

  const handleFAQChange = (index, field, value) => {
    setFormData(prev => {
      const newFaqs = [...prev.faqs];
      newFaqs[index] = {
        ...newFaqs[index],
        [field]: value
      };
      return {
        ...prev,
        faqs: newFaqs
      };
    });
  };

  const addFAQ = () => {
    setFormData(prev => ({
      ...prev,
      faqs: [...prev.faqs, { question: '', answer: '' }]
    }));
  };

  const removeFAQ = (index) => {
    setFormData(prev => ({
      ...prev,
      faqs: prev.faqs.filter((_, i) => i !== index)
    }));
  };

  const validateForm = () => {
    const errors = {};
    const requiredFields = ['title', 'heroText', 'excerpt', 'heading', 'content', 'metaTitle', 'metaDescription'];
    
    requiredFields.forEach(field => {
      if (!formData[field] || formData[field].trim() === '') {
        errors[field] = 'Acest câmp este obligatoriu';
      }
    });

    if (!formData.image) {
      errors.image = 'Imaginea este obligatorie';
    }

    formData.faqs.forEach((faq, index) => {
      if (!faq.question.trim()) {
        errors[`faq_question_${index}`] = 'Întrebarea este obligatorie';
      }
      if (!faq.answer.trim()) {
        errors[`faq_answer_${index}`] = 'Răspunsul este obligatoriu';
      }
    });

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError('');
      setFieldErrors({});

      if (!formData.slug && formData.title) {
        setFormData(prev => ({
          ...prev,
          slug: generateSlug(formData.title)
        }));
      }

      if (!validateForm()) {
        setLoading(false);
        return;
      }

      const serviceData = {
        ...formData,
        parent_id: formData.parent_id || null
      };

      // Generate slug if empty and title exists
      if (!serviceData.slug && serviceData.title) {
        serviceData.slug = generateSlug(serviceData.title);
      }

      if (id) {
        await servicesService.update(id, serviceData);
      } else {
        await servicesService.create(serviceData);
      }

      navigate('/internal-admin-portalv1.0.1/services');
    } catch (err) {
      console.error('Error saving service:', err);
      setError(err.response?.data?.message || 'Nu s-a putut salva serviciul. Vă rugăm să încercați din nou.');
    } finally {
      setLoading(false);
    }
  };

  // Set initial meta counters when editing
  useEffect(() => {
    setMetaTitleLength(formData.metaTitle.length);
    setMetaDescriptionLength(formData.metaDescription.length);
  }, [formData.metaTitle, formData.metaDescription]);

  if (loading) {
    return <div className={styles.loading}>Se încarcă...</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{id ? 'Editează serviciul' : 'Adaugă un serviciu nou'}</h1>
      
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
          <label htmlFor="slug">Slug</label>
          <input
            type="text"
            id="slug"
            name="slug"
            value={formData.slug}
            onChange={handleChange}
            placeholder="Se va genera automat din titlu dacă este lăsat gol"
            className={fieldErrors.slug ? styles.errorInput : ''}
          />
          {fieldErrors.slug && <div className={styles.fieldError}>{fieldErrors.slug}</div>}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="status">Status</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className={fieldErrors.status ? styles.errorInput : ''}
          >
            <option value="draft">Draft</option>
            <option value="published">Publicat</option>
          </select>
          {fieldErrors.status && <div className={styles.fieldError}>{fieldErrors.status}</div>}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="parent_id">Serviciu principal</label>
          <select
            id="parent_id"
            name="parent_id"
            value={formData.parent_id || ''}
            onChange={handleChange}
            className={fieldErrors.parent_id ? styles.errorInput : ''}
          >
            <option value="">Niciunul (Serviciu principal)</option>
            {Array.isArray(parentServices) && parentServices.map(service => (
              <option key={service.id} value={service.id}>
                {service.title}
              </option>
            ))}
          </select>
          {fieldErrors.parent_id && (
            <div className={styles.fieldError}>{fieldErrors.parent_id}</div>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="heroText">Hero Text *</label>
          <RichTextEditor
            value={formData.heroText}
            onChange={handleHeroTextChange}
            placeholder="Introduceți textul hero"
          />
          {fieldErrors.heroText && <div className={styles.fieldError}>{fieldErrors.heroText}</div>}
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
          <label htmlFor="heading">Heading *</label>
          <input
            type="text"
            id="heading"
            name="heading"
            value={formData.heading}
            onChange={handleChange}
            className={fieldErrors.heading ? styles.errorInput : ''}
          />
          {fieldErrors.heading && <div className={styles.fieldError}>{fieldErrors.heading}</div>}
        </div>

        <div className={styles.formGroup}>
          <label>Imagine *</label>
          <div className={styles.imageUpload}>
            {formData.image ? (
              <div className={styles.imagePreview}>
                <img 
                  src={getImageUrl(formData.image)} 
                  alt="Preview" 
                  loading="lazy"
                  decoding="async"
                />
                <button type="button" onClick={handleRemoveImage} className={styles.removeButton}>
                  ✕
                </button>
              </div>
            ) : (
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className={fieldErrors.image ? styles.errorInput : ''}
              />
            )}
            {fieldErrors.image && <div className={styles.fieldError}>{fieldErrors.image}</div>}
          </div>
        </div>

        <div className={styles.formGroup}>
          <label>Conținut *</label>
          <RichTextEditor
            value={formData.content}
            onChange={handleContentChange}
            placeholder="Introduceți conținutul"
          />
          {fieldErrors.content && <div className={styles.fieldError}>{fieldErrors.content}</div>}
        </div>

        <div className={styles.formGroup}>
          <label>Întrebări frecvente (FAQ)</label>
          <div className={styles.faqsContainer}>
            {formData.faqs.map((faq, index) => (
              <div key={index} className={styles.faqItem}>
                <div className={styles.faqHeader}>
                  <h4>FAQ #{index + 1}</h4>
                  <button
                    type="button"
                    onClick={() => removeFAQ(index)}
                    className={styles.deleteFaqButton}
                    aria-label={`Șterge întrebarea frecventă numărul ${index + 1}`}
                  >
                    Șterge FAQ
                  </button>
                </div>
                <div className={styles.faqContent}>
                  <div className={styles.formGroup}>
                    <label>Întrebare *</label>
                    <input
                      type="text"
                      value={faq.question}
                      onChange={(e) => handleFAQChange(index, 'question', e.target.value)}
                      className={fieldErrors[`faq_question_${index}`] ? styles.errorInput : ''}
                    />
                    {fieldErrors[`faq_question_${index}`] && (
                      <div className={styles.fieldError}>{fieldErrors[`faq_question_${index}`]}</div>
                    )}
                  </div>
                  <div className={styles.formGroup}>
                    <label>Răspuns *</label>
                    <RichTextEditor
                      value={faq.answer}
                      onChange={(content) => handleFAQChange(index, 'answer', content)}
                      placeholder="Introduceți răspunsul"
                    />
                    {fieldErrors[`faq_answer_${index}`] && (
                      <div className={styles.fieldError}>{fieldErrors[`faq_answer_${index}`]}</div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={addFAQ}
              className={styles.addButton}
              aria-label="Adaugă o nouă întrebare frecventă"
            >
              + Adaugă FAQ
            </button>
          </div>
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
              placeholder="Introduceți meta titlul"
              maxLength={60}
            />
            <span className={styles.charCounter}>{metaTitleLength}/60</span>
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
              rows="3"
              className={fieldErrors.metaDescription ? styles.errorInput : ''}
              placeholder="Introduceți meta descrierea"
              maxLength={150}
            />
            <span className={styles.charCounter}>{metaDescriptionLength}/150</span>
          </div>
          {fieldErrors.metaDescription && <div className={styles.fieldError}>{fieldErrors.metaDescription}</div>}
        </div>

        <div className={styles.formActions}>
          <button 
            type="button" 
            onClick={() => navigate('/internal-admin-portalv1.0.1/services')}
            className={styles.cancelButton}
            aria-label="Anulează și întoarce-te la lista de servicii"
          >
            Anulează
          </button>
          <button 
            type="submit" 
            className={styles.submitButton} 
            disabled={loading}
            aria-label={loading ? 'Se salvează...' : (id ? 'Salvează modificările serviciului' : 'Adaugă serviciu nou')}
          >
            {loading ? 'Se salvează...' : (id ? 'Salvează modificările' : 'Adaugă serviciul')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ServiceForm; 