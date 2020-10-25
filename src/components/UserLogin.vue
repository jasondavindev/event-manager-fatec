<template>
  <div class="user-register-form m-4 text-left">
    <b-card title="Entrar">
      <b-form @submit.prevent="onSubmit">
        <div>
          <b-form-input v-model="name" placeholder="Usuário"></b-form-input>
        </div>
        <div class="mt-2">
          <b-form-input
            v-model="password"
            placeholder="Senha"
            type="password"
          ></b-form-input>
        </div>
        <div class="mt-3">
          <b-button type="submit" variant="outline-primary">Entrar</b-button>
        </div>
      </b-form>
    </b-card>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import BlogApi from '@/services/api';

export default {
  data() {
    return {
      name: '',
      password: '',
    };
  },
  methods: {
    ...mapActions(['setUser']),

    async onSubmit() {
      if (!this.validateForm()) return;

      await this.findUser();
    },

    validateForm() {
      return this.name && this.password;
    },

    invalidUser() {
      alert('Usuário ou senha incorretos!');
    },

    async findUser() {
      try {
        const { data } = await BlogApi.findUser({
          username: this.name,
          password: this.password,
        });

        this.setUser(data);
        this.$router.push({ name: 'Event' });
      } catch (error) {
        if (error.response.status === 401) this.invalidUser();
        else alert('Erro interno');
      }
    },
  },
};
</script>

<style>
</style>
