import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { servicesService } from '../../services/api';
import RichTextEditor from '../../components/editor/RichTextEditor';
import styles from './BlogForm.module.css';

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
    description: '',
    content: '',
    metaTitle: '',
    metaDescription: '',
    status: 'draft',
    parent_id: null,
    faqs: [],
    image: null,
    heroText: '',
    excerpt: '',
    heading: ''
  });
  const [fieldErrors, setFieldErrors] = useState({});

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
        // Get all top-level services (those without a parent)
        const services = await servicesService.getAll();
        // Filter out the current service if we're editing
        const filteredServices = id 
          ? services.filter(service => service._id !== id)
          : services;
        setParentServices(filteredServices);
      } catch (err) {
        console.error('Error fetching parent services:', err);
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
          console.log('Fetched service data:', service);
          console.log('FAQs in fetched service:', service.faqs);
          
          // Ensure FAQs is properly initialized
          const faqs = Array.isArray(service.faqs) 
            ? service.faqs.map(faq => ({
                question: faq.question || '',
                answer: faq.answer || ''
              }))
            : [];
            
          console.log('Processed FAQs:', faqs);
          
          setFormData({
            title: service.title || '',
            slug: service.slug || '',
            description: service.description || '',
            content: service.content || '',
            metaTitle: service.metaTitle || '',
            metaDescription: service.metaDescription || '',
            status: service.status || 'draft',
            parent_id: service.parent_id || null,
            faqs: faqs,
            image: service.image || null,
            heroText: service.heroText || '',
            excerpt: service.excerpt || '',
            heading: service.heading || ''
          });
        } catch (err) {
          console.error('Error fetching service:', err);
          setError('Failed to load service');
        } finally {
          setLoading(false);
        }
      };
      fetchService();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
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
      
      // Create FormData for upload
      const formData = new FormData();
      formData.append('image', file);

      // Upload the image
      const response = await servicesService.uploadImage(formData);
      
      if (response && response.url) {
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

    // Validate FAQs
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

      const serviceData = {
        title: formData.title,
        slug: formData.slug,
        description: formData.description,
        content: formData.content,
        metaTitle: formData.metaTitle,
        metaDescription: formData.metaDescription,
        status: formData.status,
        parent_id: formData.parent_id || null,
        faqs: formData.faqs || [],
        image: formData.image,
        heroText: formData.heroText,
        excerpt: formData.excerpt,
        heading: formData.heading
      };

      console.log('Sending service data:', serviceData);

      if (id) {
        await servicesService.update(id, serviceData);
      } else {
        await servicesService.create(serviceData);
      }

      navigate('/internal-admin-portalv1.0.1/services');
    } catch (err) {
      console.error('Save service error:', err);
      setError(err.response?.data?.message || 'Nu s-a putut salva serviciul');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className={styles.loading}>Se încarcă...</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{id ? 'Editează serviciul' : 'Adaugă un serviciu nou'}</h1>
      
      {error && <div className={styles.error}>{error}</div>}

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="title">Title *</label>
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
          <label htmlFor="status">Status</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className={fieldErrors.status ? styles.errorInput : ''}
          >
            <option value="draft">Ciornă</option>
            <option value="published">Publicat</option>
          </select>
          {fieldErrors.status && <div className={styles.fieldError}>{fieldErrors.status}</div>}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="parent_service_id">Serviciu principal</label>
          <select
            id="parent_service_id"
            name="parent_service_id"
            value={formData.parent_service_id || ''}
            onChange={handleChange}
            className={fieldErrors.parent_service_id ? styles.errorInput : ''}
          >
            <option value="">Niciunul (Serviciu principal)</option>
            {parentServices.map(service => (
              <option key={service._id} value={service._id}>
                {service.title}
              </option>
            ))}
          </select>
          {fieldErrors.parent_service_id && (
            <div className={styles.fieldError}>{fieldErrors.parent_service_id}</div>
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
                  src={formData.image.startsWith('http') ? formData.image : `${process.env.REACT_APP_URL || 'http://localhost:5002'}${formData.image}`} 
                  alt="Preview" 
                  loading="lazy"
                  decoding="async"
                />
                <button type="button" onClick={handleRemoveImage} className={styles.removeButton}>
                  x
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
          <input
            type="text"
            id="metaTitle"
            name="metaTitle"
            value={formData.metaTitle}
            onChange={handleChange}
            className={fieldErrors.metaTitle ? styles.errorInput : ''}
            placeholder="Introduceți meta titlul"
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
            placeholder="Introduceți meta descrierea"
          />
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