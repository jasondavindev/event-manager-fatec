<template>
  <div class="m-4 text-left">
    <b-card title="Criar evento">
      <b-form @submit.prevent="createEvent">
        <div>
          <b-form-input v-model="name" placeholder="Nome"></b-form-input>
        </div>
        <div class="mt-2">
          <b-form-input v-model="eventDate" placeholder="Data"></b-form-input>
        </div>
        <div class="mt-3">
          <b-button type="submit" variant="outline-primary"
            >Criar evento</b-button
          >
        </div>
      </b-form>
    </b-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import BlogApi from '@/services/api';

export default {
  name: 'CreateEvent',
  computed: {
    ...mapGetters(['user']),
  },
  mounted() {
    if (!this.isLogged()) {
      this.$router.push({ name: 'Home' });
    }
  },
  data() {
    return {
      name: '',
      eventDate: '',
    };
  },
  methods: {
    async createEvent() {
      if (!this.isValidateForm()) return;

      try {
        const { data } = await BlogApi.createEvent(
          {
            name: this.name,
            eventDate: this.eventDate,
          },
          {
            username: this.user.name,
            password: this.user.password,
          },
        );

        console.log(data);
      } catch (error) {
        alert('Ocorreu algum erro');
      }
    },
    isValidateForm() {
      return this.name && this.eventDate;
    },
    isLogged() {
      return this.user.id !== null;
    },
  },
};
</script>

<style>
</style>
