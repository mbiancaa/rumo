import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { authService } from '../../services/api';

import styles from './Login.module.css';

import Logo from '../../components/Logo';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/internal-admin-portalv1.0.1/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email) {
      newErrors.email = 'Adresa de e-mail este obligatorie';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Introdu o adresă validă';
    }

    if (!formData.password) {
      newErrors.password = 'Parola este obligatorie';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      const response = await authService.login(formData.email, formData.password);
      
      if (response && response.token && response.user) {
        await login(response.user, response.token);
        const from = location.state?.from?.pathname || '/internal-admin-portalv1.0.1/dashboard';
        navigate(from, { replace: true });
      } else {
        setApiError('Eroare la autentificare. Vă rugăm să încercați din nou.');
      }
    } catch (error) {
      if (error.response?.status === 401) {
        setApiError('Nume de utilizator sau parolă incorecte');
      } else {
        setApiError(error.response?.data?.message || 'A apărut o eroare. Vă rugăm să încercați din nou.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginForm}>
        <div style={{ maxWidth: 500, display: 'flex', flexDirection: 'column' }}>
          <h1 className={styles.heading}>Autentificare</h1>
          <p className={styles.subtext}>
            Bun venit! Intră în cont pentru a continua.
          </p>

          {apiError && (
            <div className={styles.error} style={{ marginBottom: '1rem' }}>
              {apiError}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.label}>
                E-mail
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`${styles.input} ${errors.email ? styles.error : ''}`}
                placeholder="Introdu adresa de e-mail"
              />
              {errors.email && <div style={{ marginTop: 10 }} className={styles.error}>{errors.email}</div>}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="password" className={styles.label}>
                Parola
              </label>
              <div className={styles.passwordContainer}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`${styles.input} ${errors.password ? styles.error : ''}`}
                  placeholder="Introdu parola"
                  aria-label="Parolă"
                />
                <span
                  className={styles.eyeIcon}
                  onClick={togglePasswordVisibility}
                  role="button"
                  tabIndex="0"
                  aria-label={showPassword ? "Ascunde parola" : "Arată parola"}
                >
                  {showPassword ? (
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
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
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
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </span>
              </div>
              {errors.password && <div style={{ marginTop: 10 }} className={styles.error}>{errors.password}</div>}
            </div>

            <button
              type="submit"
              className={styles.loginButton}
              disabled={isLoading}
            >
              {isLoading ? 'Se conectează...' : 'Continuă'}
            </button>
          </form>
        </div>

      </div>

      <div className={styles.brandSection}>
        <Logo />
      </div>
    </div>
  );
};

export default Login; 