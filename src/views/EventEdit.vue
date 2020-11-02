<template>
  <div class="m-4 text-left">
    <b-card title="Criar evento">
      <b-form @submit.prevent="saveEvent">
        <div>
          <b-form-input v-model="name" placeholder="Nome"></b-form-input>
        </div>
        <div class="mt-2">
          <b-form-input v-model="eventDate" placeholder="Data"></b-form-input>
        </div>
        <div class="mt-3">
          <b-button type="submit" variant="outline-primary">Salvar</b-button>
        </div>
      </b-form>
    </b-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import BlogApi from '../services/api';

export default {
  computed: {
    ...mapGetters(['user']),
  },

  data() {
    return {
      id: null,
      name: null,
      eventDate: null,
    };
  },

  methods: {
    async saveEvent() {
      try {
        const { name: username, password } = this.user;
        const user = { username, password };
        const { id } = this.user;
        const event = { name: this.name, eventDate: this.eventDate };

        await BlogApi.updateEvent({ id, event, user });

        this.$router.push('/event');
      } catch (error) {
        if (error.response && error.response.status === 401) {
          return alert('Você não tem permissão para alterar um evento');
        }

        alert('Ocorreu algum erro ao tentar atualizar o evento');
      }
    },

    async loadEvent(id) {
      try {
        const { name: username, password } = this.user;

        const { data: event } = await BlogApi.findEvent({
          id,
          user: { username, password },
        });

        this.id = event.id;
        this.name = event.name;
        this.eventDate = new Date(event.eventDate)
          .toLocaleDateString()
          .split('/')
          .reverse()
          .join('-');
      } catch (error) {
        this.$router.push('/event');
      }
    },
  },

  async mounted() {
    if (!this.user.id) {
      this.$router.push('/');
      return;
    }

    const { id } = this.$route.params;

    if (!id) {
      this.$router.push('/event');
      return;
    }

    await this.loadEvent(id);
  },
};
</script>

<style>
</style>
