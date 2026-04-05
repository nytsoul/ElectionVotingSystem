import axios from 'axios';

// Get API URL from environment or use default
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth Services
export const authService = {
  register: (data: { name: string; age: number; voter_id: string; password: string }) =>
    api.post('/auth/register', data),
  
  login: (voter_id: string, password: string) =>
    api.post('/auth/login', { voter_id, password }),
  
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
};

// Voting Services
export const votingService = {
  getCandidates: () => api.get('/voting/candidates'),
  
  submitVote: (candidate_id: number) =>
    api.post('/voting/vote', { candidate_id }),
  
  getVoteStatus: (user_id: number) =>
    api.get(`/voting/status/${user_id}`),
};

// Admin Services
export const adminService = {
  addCandidate: (data: { name: string; party: string; symbol?: string }) =>
    api.post('/admin/candidates', data),
  
  deleteCandidate: (candidate_id: number) =>
    api.delete(`/admin/candidates/${candidate_id}`),
  
  startElection: () => api.post('/admin/election/start'),
  
  stopElection: () => api.post('/admin/election/stop'),
};

// Results Services
export const resultsService = {
  getResults: () => api.get('/results'),
};

// Election Services
export const electionService = {
  getStatus: () => api.get('/election/status'),
};

export default api;
