import axios from 'axios';
// config
import { API } from '../confg';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({
  baseURL: API,
});

export default axiosInstance;