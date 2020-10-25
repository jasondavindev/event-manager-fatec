import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080',
});

export default {
  async createUser({ name, email }) {
    return axiosInstance.post('/v1/users', { name, email });
  },

  async findUser({ name }) {
    return axiosInstance.get(`/v1/users/${name}`);
  },
};
