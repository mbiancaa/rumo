import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
});

// Add request interceptor
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

// Add response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && !error.config.url.includes('/auth/login')) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/internal-admin-portalv1.0.1/login';
    }
    return Promise.reject(error);
  }
);

export const authService = {
  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },

  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  }
};

export const userService = {
  getAll: async () => {
    const response = await api.get('/users');
    return response.data;
  },
  getById: async (id) => {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },
  update: async (id, userData) => {
    const response = await api.put(`/users/${id}`, userData);
    return response.data;
  },
  updatePassword: async (id, password) => {
    const response = await api.put(`/users/${id}/password`, { password });
    return response.data;
  },
  delete: async (id) => {
    const response = await api.delete(`/users/${id}`);
    return response.data;
  }
};

export const pageService = {
  getAll: () => api.get('/pages').then(res => res.data),
  getPublishedPages: () => api.get('/pages/published').then(res => res.data),
  getById: (id) => api.get(`/pages/id/${id}`).then(res => res.data),
  getBySlug: (slug) => api.get(`/pages/${slug}`).then(res => res.data),
  create: (data) => api.post('/pages', data).then(res => res.data),
  update: (id, data) => api.put(`/pages/${id}`, data).then(res => res.data),
  delete: (id) => api.delete(`/pages/${id}`).then(res => res.data),
};

export const teamMemberService = {
  getAll: async () => {
    const response = await api.get('/team');
    return response.data;
  },
  getById: async (id) => {
    const response = await api.get(`/team/${id}`);
    return response.data;
  },
  create: async (data) => {
    const response = await api.post('/team', data);
    return response.data;
  },
  update: async (id, data) => {
    const response = await api.put(`/team/${id}`, data);
    return response.data;
  },
  delete: async (id) => {
    const response = await api.delete(`/team/${id}`);
    return response.data;
  },
  uploadImage: async (formData) => {
    const response = await api.post('/team/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  }
};

export const blogService = {
  getAll: async (page = 1, category = '', publishedOnly = true) => {
    const params = new URLSearchParams({
      page: page.toString(),
      publishedOnly: publishedOnly.toString()
    });
    if (category) {
      params.append('category', category);
    }
    const response = await api.get(`/blog?${params.toString()}`);
    return response.data;
  },
  getById: async (identifier) => {
    const response = await api.get(`/blog/${identifier}`);
    return response.data;
  },
  create: async (data) => {
    const response = await api.post('/blog', data);
    return response.data;
  },
  update: async (uuid, data) => {
    const response = await api.put(`/blog/${uuid}`, data);
    return response.data;
  },
  delete: async (uuid) => {
    const response = await api.delete(`/blog/${uuid}`);
    return response.data;
  },
  uploadImage: async (formData) => {
    const response = await api.post('/blog/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  }
};

export const caseStudyService = {
  getAll: async (page = 1, industry = '', publishedOnly = true) => {
    const params = new URLSearchParams({
      page: page.toString(),
      publishedOnly: publishedOnly.toString()
    });
    if (industry) {
      params.append('industry', industry);
    }
    const response = await api.get(`/case-studies?${params.toString()}`);
    return response.data;
  },
  getHeaderCaseStudies: () => api.get('/case-studies/header').then(res => res.data),
  getById: async (identifier) => {
    const response = await api.get(`/case-studies/${identifier}`);
    return response.data;
  },
  create: async (data) => {
    const response = await api.post('/case-studies', data);
    return response.data;
  },
  update: async (id, data) => {
    const response = await api.put(`/case-studies/${id}`, data);
    return response.data;
  },
  delete: async (id) => {
    const response = await api.delete(`/case-studies/${id}`);
    return response.data;
  },
  uploadImage: async (formData) => {
    const response = await api.post('/case-studies/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  }
};

export const contactService = {
  getAll: (page = 1) => api.get(`/contact-submissions?page=${page}`),
  getDashboard: () => api.get('/contact-submissions/dashboard'),
  create: async (data) => {
    const response = await api.post('/contact-submissions', data);
    return response.data;
  },
  update: async (id, data) => {
    const response = await api.put(`/contact-submissions/${id}`, data);
    return response.data;
  },
  delete: async (id) => {
    const response = await api.delete(`/contact-submissions/${id}`);
    return response.data;
  }
};

export const servicesService = {
  getAll: () => api.get('/services').then(res => res.data),
  getHierarchy: () => api.get('/services/hierarchy').then(res => res.data),
  getFooterServices: () => api.get('/services/footer').then(res => res.data),
  getById: (id) => api.get(`/services/id/${id}`).then(res => res.data),
  getBySlug: (slug) => api.get(`/services/${slug}`).then(res => res.data),
  create: (data) => api.post('/services', data).then(res => res.data),
  update: (id, data) => api.put(`/services/${id}`, data).then(res => res.data),
  delete: (id) => api.delete(`/services/${id}`).then(res => res.data),
  uploadImage: async (formData) => {
    const response = await api.post('/services/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  },
  getSubServices: (id) => api.get(`/services/${id}/sub-services`).then(res => res.data)
};

export default api; 