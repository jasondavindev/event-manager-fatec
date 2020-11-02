<template>
  <div class="m-4 text-left">
    <b-card :title="name">
      <div>
        <p>
          <span>Data:</span> <span>{{ eventDate | toDate }}</span>
        </p>
        <b-button @click="editEvent">Editar</b-button>
        <b-button @click="deleteEvent">Apagar</b-button>
      </div>
    </b-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import BlogApi from '../services/api';

export default {
  name: 'EventView',

  computed: {
    ...mapGetters(['user']),
  },

  props: ['id', 'name', 'eventDate'],

  methods: {
    async deleteEvent() {
      const { name: username, password } = this.user;
      const id = this.id;

      try {
        const { data } = await BlogApi.deleteEvent({
          id,
          user: { username, password },
        });

        this.emitDeleteEvent();
      } catch (error) {
        if (error.response && error.response.status === 401)
          return alert('Você não tem permissão para apagar eventos');

        alert('Ocorreu algum erro ao tentar apagar o evento');
      }
    },

    emitDeleteEvent() {
      this.$emit('deleteEvent', { id: this.id });
    },

    editEvent() {
      this.$router.push(`/event/${this.id}`);
    },
  },

  filters: {
    toDate(date) {
      return new Date(date).toLocaleString();
    },
  },
};
</script>

<style>
</style>
