import axios from 'axios';

console.log('Environment variables:', {
  REACT_APP_API_URL: process.env.REACT_APP_API_URL,
  NODE_ENV: process.env.NODE_ENV
});

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5002/api';
console.log('API URL:', API_URL);

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to add the auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle 401 errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/internal-admin-portalv1.0.1/login';
    }
    return Promise.reject(error);
  }
);

export const authService = {
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },
};

export const blogService = {
  getAll: async (page = 1, category = '', publishedOnly = true) => {
    try {
      const response = await api.get(`/blog?page=${page}${category ? `&category=${encodeURIComponent(category)}` : ''}${publishedOnly ? '&publishedOnly=true' : ''}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching blogs:', error);
      throw error;
    }
  },
  getById: async (identifier) => {
    const response = await api.get(`/blog/${identifier}`);
    return response.data;
  },
  create: async (postData) => {
    const response = await api.post('/blog', postData);
    return response.data;
  },
  update: async (id, postData) => {
    const response = await api.put(`/blog/${id}`, postData);
    return response.data;
  },
  delete: async (id) => {
    const response = await api.delete(`/blog/${id}`);
    return response.data;
  },
  uploadImage: async (formData) => {
    const response = await api.post('/blog/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
};

export const userService = {
  getAll: async () => {
    try {
      const response = await api.get('/users');
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getById: async (id) => {
    try {
      const response = await api.get(`/users/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  create: async (userData) => {
    try {
      const response = await api.post('/users', userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  update: async (id, userData) => {
    try {
      const response = await api.put(`/users/${id}`, userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  updatePassword: async (id, password) => {
    try {
      const response = await api.put(`/users/${id}/password`, { password });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  delete: async (id) => {
    try {
      const response = await api.delete(`/users/${id}`);
      return response.data;
    } catch (error) {
      if (error.response?.status === 400) {
        throw new Error('Nu puteți șterge ultimul administrator');
      }
      throw error;
    }
  },
};

export const caseStudyService = {
  getAll: async (page = 1, publishedOnly = false) => {
    const response = await api.get(`/case-studies?page=${page}&limit=6${publishedOnly ? '&publishedOnly=true' : ''}`);
    return response.data;
  },
  getById: async (id) => {
    const response = await api.get(`/case-studies/id/${id}`);
    return response.data;
  },
  getBySlug: async (slug) => {
    const response = await api.get(`/case-studies/${slug}`);
    return response.data;
  },
  create: async (caseStudyData) => {
    const response = await api.post('/case-studies', caseStudyData);
    return response.data;
  },
  update: async (id, caseStudyData) => {
    const response = await api.put(`/case-studies/${id}`, caseStudyData);
    return response.data;
  },
  delete: async (id) => {
    const response = await api.delete(`/case-studies/${id}`);
    return response.data;
  },
  uploadImage: async (formData) => {
    const response = await api.post('/case-studies/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
};

export const teamMemberService = {
  getAll: async () => {
    try {
      const response = await api.get('/team');
      return response.data;
    } catch (error) {
      console.error('Error fetching team members:', error);
      throw error;
    }
  },
  getById: async (id) => {
    const response = await api.get(`/team/${id}`);
    return response.data;
  },
  create: async (memberData) => {
    const response = await api.post('/team', memberData);
    return response.data;
  },
  update: async (id, memberData) => {
    const response = await api.put(`/team/${id}`, memberData);
    return response.data;
  },
  delete: async (id) => {
    const response = await api.delete(`/team/${id}`);
    return response.data;
  },
  uploadImage: async (formData) => {
    const response = await api.post('/team/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
};

export const servicesService = {
  getAll: async () => {
    try {
      const response = await api.get('/services');
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getHierarchy: async () => {
    try {
      const response = await api.get('/services/hierarchy');
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getById: async (id) => {
    try {
      const response = await api.get(`/services/id/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getSubServices: async (id) => {
    try {
      const response = await api.get(`/services/${id}/sub-services`);
      return response.data;
    } catch (error) {
      console.error('Error fetching sub-services:', error);
      throw error;
    }
  },
  getBySlug: async (slug) => {
    try {
      console.log('Making API call to fetch service by slug:', slug);
      const fullUrl = `${API_URL}/services/${slug}`;
      console.log('Full API URL:', fullUrl);
      console.log('API instance baseURL:', api.defaults.baseURL);
      console.log('API instance headers:', api.defaults.headers);
      console.log('API instance:', api);
      console.log('API instance methods:', Object.keys(api));
      console.log('API instance get method:', api.get);
      console.log('API instance get method type:', typeof api.get);
      console.log('API instance get method toString:', api.get.toString());
      console.log('API instance get method toString length:', api.get.toString().length);
      console.log('API instance get method toString substring:', api.get.toString().substring(0, 100));
      const response = await api.get(`/services/${slug}`);
      console.log('API response:', response);
      return response.data;
    } catch (error) {
      console.error('Error fetching service by slug:', error);
      throw error;
    }
  },
  create: async (serviceData) => {
    try {
      // Ensure all required fields are present
      const dataToSend = {
        title: serviceData.title,
        slug: serviceData.slug,
        description: serviceData.description || '',
        content: serviceData.content || '',
        metaTitle: serviceData.metaTitle || '',
        metaDescription: serviceData.metaDescription || '',
        status: serviceData.status || 'draft',
        parent_id: serviceData.parent_id || null,
        faqs: Array.isArray(serviceData.faqs) ? serviceData.faqs : [],
        image: serviceData.image || null,
        heroText: serviceData.heroText || '',
        excerpt: serviceData.excerpt || '',
        heading: serviceData.heading || ''
      };

      const response = await api.post('/services', dataToSend);
      return response.data;
    } catch (error) {
      if (error.response?.status === 400) {
        throw new Error(error.response.data.message || 'Date invalide pentru serviciu');
      }
      throw error;
    }
  },
  update: async (id, serviceData) => {
    try {
      const dataToSend = {
        title: serviceData.title,
        slug: serviceData.slug,
        description: serviceData.description || '',
        content: serviceData.content || '',
        metaTitle: serviceData.metaTitle || '',
        metaDescription: serviceData.metaDescription || '',
        status: serviceData.status || 'draft',
        parent_id: serviceData.parent_id || null,
        faqs: Array.isArray(serviceData.faqs) ? serviceData.faqs : [],
        image: serviceData.image || null,
        heroText: serviceData.heroText || '',
        excerpt: serviceData.excerpt || '',
        heading: serviceData.heading || ''
      };

      const response = await api.put(`/services/${id}`, dataToSend);
      return response.data;
    } catch (error) {
      if (error.response?.status === 400) {
        throw new Error(error.response.data.message || 'Date invalide pentru serviciu');
      }
      throw error;
    }
  },
  delete: async (id) => {
    try {
      const response = await api.delete(`/services/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  uploadImage: async (formData) => {
    try {
      const response = await api.post('/services/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export const pageService = {
  getAll: async () => {
    try {
      const response = await api.get('/pages');
      return response.data;
    } catch (error) {
      console.error('Error fetching pages:', error);
      throw error;
    }
  },
  getBySlug: async (slug) => {
    try {
      const response = await api.get(`/pages/${slug}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching page:', error);
      throw error;
    }
  },
  getById: async (id) => {
    try {
      const response = await api.get(`/pages/id/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching page:', error);
      throw error;
    }
  },
  create: async (pageData) => {
    try {
      const response = await api.post('/pages', pageData);
      return response.data;
    } catch (error) {
      console.error('Error creating page:', error);
      throw error;
    }
  },
  update: async (id, pageData) => {
    try {
      const response = await api.put(`/pages/${id}`, pageData);
      return response.data;
    } catch (error) {
      console.error('Error updating page:', error);
      throw error;
    }
  },
  delete: async (id) => {
    try {
      const response = await api.delete(`/pages/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting page:', error);
      throw error;
    }
  }
};

// Contact Service
export const contactService = {
  getAll: async (page = 1) => {
    try {
      const response = await api.get(`/contact-submissions?page=${page}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  create: async (submissionData) => {
    try {
      const response = await api.post('/contact-submissions', submissionData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  update: async (id, data) => {
    try {
      const response = await api.put(`/contact-submissions/${id}`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  delete: async (id) => {
    try {
      const response = await api.delete(`/contact-submissions/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getDashboardEmails: () => {
    return api.get('/contact-submissions/dashboard');
  }
}; 