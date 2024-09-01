import axios from 'axios';
import i18n from '../i18n';
let token: any = localStorage.getItem('jwt_access_token');
let parseToken = JSON.parse(token);
axios.defaults.headers.common['Authorization'] = parseToken;
axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

axios.defaults.headers.post['Content-Type'] = 'application/json';
// Add a default language header
axios.defaults.headers.common['Accept-Language'] = i18n.language;
axios.interceptors.response.use(
  (res) => res,
  (err) => {
    if (
      err?.response?.data?.message?.toLowerCase() === 'invalid authorization token'
    ) {
      localStorage.removeItem('jwt_access_token');
      window.location.href = '/admin/login';
    }
    return Promise.reject(err);
  },
);
export default axios;
