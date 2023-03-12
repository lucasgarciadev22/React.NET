import axios from 'axios';

const api = axios.create({
  baseURL: 'https://azfunctempconverter.azurewebsites.net/api/'
});

export default api;
