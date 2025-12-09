import axios from 'axios';

const API_BASE = 'https://retail-system-ea4f.onrender.com/api';

const api = axios.create({
  baseURL: API_BASE,
  timeout: 10000
});

export const transactionAPI = {
  getTransactions: (params) => api.get('/transactions', { params }),
  getFilterOptions: () => api.get('/transactions/filter-options')
};

export default api;

