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

  data() {
    return {
      name: '',
      eventDate: '',
    };
  },

  methods: {
    async createEvent() {
      if (!this.isValidateForm()) return;

      const { name: username, password } = this.user;

      try {
        const { data } = await BlogApi.createEvent(
          {
            name: this.name,
            eventDate: this.eventDate,
          },
          {
            user: {
              username,
              password,
            },
          },
        );

        this.resetFields();
        this.emitCreateEvent(data);
      } catch (error) {
        alert('Ocorreu algum erro');
      }
    },

    isValidateForm() {
      return this.name && this.eventDate;
    },

    emitCreateEvent(data) {
      this.$emit('createEvent', data);
    },

    resetFields() {
      this.name = '';
      this.eventDate = '';
    },
  },
};
</script>

<style>
</style>
