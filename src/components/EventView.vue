<template>
  <div class="m-4 text-left">
    <b-card :title="name">
      <div>
        <p>
          <span>Data:</span> <span>{{ eventDate }}</span>
        </p>
      </div>
    </b-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import BlogApi from '@/services/api';

export default {
  name: 'EventView',
  computed: {
    ...mapGetters(['user']),
  },
  props: ['id'],
  data() {
    return {
      name: '',
      eventDate: '',
    };
  },
  methods: {
    async findEvent() {
      const { name: username, password } = this.user;

      try {
        const { data } = await BlogApi.findEvent({
          id: this.id,
          user: {
            username,
            password,
          },
        });

        return data;
      } catch (error) {
        alert('Ocorreu algum erro');
      }
    },
  },
  async mounted() {
    const { id, name, eventDate } = await this.findEvent();
    this.name = name;
    this.eventDate = new Date(eventDate).toLocaleString();
  },
};
</script>

<style>
</style>
