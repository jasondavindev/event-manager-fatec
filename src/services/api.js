import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080',
});

export default {
  async findUser(data) {
    return axiosInstance.post(
      '/users',
      { name: data.username, password: data.password },
      { auth: data },
    );
  },

  async createEvent({ name, eventDate }, { user }) {
    return axiosInstance.post('/events', { name, eventDate }, { auth: user });
  },
};
