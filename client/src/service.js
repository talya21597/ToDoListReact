import axios from 'axios';

// Config Defaults
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
axios.defaults.baseURL = API_URL;

console.log('🌐 API Service initialized with URL:', API_URL);

// Response Interceptor
axios.interceptors.response.use(
  response => response,
  error => {
    console.error('❌ API Error:', error.response?.status, error.response?.statusText);
    return Promise.reject(error);
  }
);

export default {
  getTasks: async () => {
    try {
      const result = await axios.get('/items');    
      return result.data;
    } catch (error) {
      throw error;
    }
  },

  addTask: async(name) => {
    try {
      const result = await axios.post('/items', {
        name: name,
        iscomplete: false
      });
      return result.data;
    } catch (error) {
      throw error;
    }
  },

  setCompleted: async(id, iscomplete) => {
    try {
      const result = await axios.put(`/items/${id}`, {
        iscomplete: iscomplete
      });
      return result.data;
    } catch (error) {
      throw error;
    }
  },

  deleteTask: async(id) => {
    try {
      await axios.delete(`/items/${id}`);
    } catch (error) {
      throw error;
    }
  }
};

