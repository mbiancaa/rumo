import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { userService, authService } from '../../services/api';
import styles from './BlogForm.module.css';

const UserForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'editor'
  });
  const [fieldErrors, setFieldErrors] = useState({});

  useEffect(() => {
    if (id) {
      const fetchUser = async () => {
        try {
          setLoading(true);
          const user = await userService.getById(id);
          setFormData({
            name: user.name || '',
            email: user.email || '',
            password: '', // Don't pre-fill password
            role: user.role || 'editor'
          });
        } catch (err) {
          setError('Nu s-a putut încărca utilizatorul');
        } finally {
          setLoading(false);
        }
      };
      fetchUser();
    }
  }, [id]);

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

  const validateForm = () => {
    const errors = {};
    const requiredFields = ['name', 'email', 'role'];
    
    requiredFields.forEach(field => {
      if (!formData[field] || formData[field].trim() === '') {
        errors[field] = 'Acest câmp este obligatoriu';
      }
    });

    // Validate email format
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Adresa de email nu este validă';
    }

    // Validate password for new users
    if (!id && (!formData.password || formData.password.length < 6)) {
      errors.password = 'Parola trebuie să aibă cel puțin 6 caractere';
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

      if (!validateForm()) {
        setLoading(false);
        return;
      }

      // Prepare the data to send
      const dataToSend = { ...formData };
      
      // Only include password if it's not empty
      if (!dataToSend.password) {
        delete dataToSend.password;
      }

      if (id) {
        // For existing user, update all data including password if provided
        await userService.update(id, dataToSend);
      } else {
        // For new user, use auth/register endpoint
        await authService.register(dataToSend);
      }

      navigate('/internal-admin-portalv1.0.1/users');
    } catch (err) {
      if (err.response?.data?.message?.includes('duplicate email')) {
        setError('Această adresă de email este deja folosită');
      } else {
        setError(err.response?.data?.message || 'Nu s-a putut salva utilizatorul');
      }
      console.error('Save user error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className={styles.loading}>Se încarcă...</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{id ? 'Editează utilizatorul' : 'Creează un utilizator nou'}</h1>
      
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
            aria-label="Nume utilizator"
          />
          {fieldErrors.name && <div className={styles.fieldError}>{fieldErrors.name}</div>}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="email">Email *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={fieldErrors.email ? styles.errorInput : ''}
            aria-label="Adresă de email"
          />
          {fieldErrors.email && <div className={styles.fieldError}>{fieldErrors.email}</div>}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="password">
            {id ? 'Parolă nouă (lăsați gol pentru a păstra parola existentă)' : 'Parolă *'}
          </label>
          <div className={styles.passwordInputContainer}>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={fieldErrors.password ? styles.errorInput : ''}
              aria-label="Parolă"
            />
            <button
              type="button"
              className={styles.passwordToggle}
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Ascunde parola" : "Arată parola"}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {showPassword ? (
                  <>
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </>
                ) : (
                  <>
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </>
                )}
              </svg>
            </button>
          </div>
          {fieldErrors.password && <div className={styles.fieldError}>{fieldErrors.password}</div>}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="role">Rol *</label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            className={fieldErrors.role ? styles.errorInput : ''}
            aria-label="Rol utilizator"
          >
            <option value="editor">Editor</option>
            <option value="admin">Administrator</option>
          </select>
          {fieldErrors.role && <div className={styles.fieldError}>{fieldErrors.role}</div>}
        </div>

        <div className={styles.formActions}>
          <button 
            type="button" 
            onClick={() => navigate('/internal-admin-portalv1.0.1/users')}
            className={styles.cancelButton}
            aria-label="Anulează și întoarce-te la lista de utilizatori"
          >
            Anulează
          </button>
          <button 
            type="submit" 
            disabled={loading}
            className={styles.submitButton}
            aria-label={loading ? 'Se salvează...' : (id ? 'Salvează modificările utilizatorului' : 'Creează utilizator nou')}
          >
            {loading ? 'Se salvează...' : (id ? 'Salvează modificările' : 'Creează utilizatorul')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserForm; 