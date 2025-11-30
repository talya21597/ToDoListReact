import axios from 'axios';

// Config Defaults - הגדרת כתובת ברירת מחדל
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
axios.defaults.baseURL = API_URL;

// Response Interceptor - תפיסת שגיאות ורישום ללוג
axios.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default {
  getTasks: async () => {
    const result = await axios.get('/items');    
    return result.data;
  },

  addTask: async(name) => {
    console.log('addTask called with:', name);
    try {
      const result = await axios.post('/items', {
        name: name,
        iscomplete: false
      });
      console.log('✅ addTask response:', result.data);
      return result.data;
    } catch (error) {
      console.error('❌ addTask error:', error.response?.data || error.message);
      throw error;
    }
  },

  setCompleted: async(id, iscomplete) => {
    console.log('setCompleted', {id, iscomplete});
    const result = await axios.put(`/items/${id}`, {
      iscomplete: iscomplete
    });
    return result.data;
  },

  deleteTask: async(id) => {
    console.log('deleteTask', id);
    await axios.delete(`/items/${id}`);
  }
};

