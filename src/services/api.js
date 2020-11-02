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

  async findEvent({ id, user }) {
    return axiosInstance.get(`/events?id=${id}`, { auth: user });
  },

  async deleteEvent({ id, user }) {
    return axiosInstance.delete(`/events?id=${id}`, { auth: user });
  },

  async getEvents({ user }) {
    return axiosInstance.get('/events', { auth: user });
  },

  async updateEvent({ id, event, user }) {
    return axiosInstance.put(`/events?id=${id}`, event, { auth: user });
  },
};
