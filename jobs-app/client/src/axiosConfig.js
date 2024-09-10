import axios from 'axios';

if (typeof window !== 'undefined') {
  const token = localStorage.getItem('token');
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
}

console.log('Axios default headers:', axios.defaults.headers.common); // Log headers to check if token is included
export default axios;
