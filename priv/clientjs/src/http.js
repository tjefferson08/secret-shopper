import axios from 'axios';
import cookie from 'js-cookie';

const http = {};

http.delete = (...rest) => getDefaultInstance().delete(...rest);
http.get = (...rest) => getDefaultInstance().get(...rest);
http.post = (...rest) => getDefaultInstance().post(...rest);

const getDefaultInstance = () => {
  const defaultHeaders = {};
  const token = cookie.get('token');
  if (token) {
    defaultHeaders['Authorization'] = `Bearer: ${token}`;
  }

  return axios.create({
    headers: defaultHeaders
  });
};

export default http;



