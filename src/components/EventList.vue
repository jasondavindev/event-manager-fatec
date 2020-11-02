<template>
  <b-card title="Eventos criados" class="m-4">
    <div class="event-list">
      <div class="event-card" v-for="(event, key) in events" :key="key">
        <EventView
          :name="event.name"
          :eventDate="event.eventDate"
          :id="event.id"
          v-on:deleteEvent="onDeleteEvent"
        ></EventView>
      </div>
    </div>
  </b-card>
</template>

<script>
import { mapGetters } from 'vuex';
import BlogApi from '../services/api';
import EventView from './EventView';

export default {
  components: {
    EventView,
  },

  computed: {
    ...mapGetters(['user']),
  },

  data() {
    return {
      events: [],
    };
  },

  methods: {
    async getEvents() {
      try {
        const { name: username, password } = this.user;

        const { data } = await BlogApi.getEvents({
          user: { username, password },
        });

        this.events = data;
      } catch (error) {
        alert('Ocorreu algum erro ao tentar carregar os eventos');
      }
    },

    onDeleteEvent(event) {
      this.events = this.events.filter((e) => e.id !== event.id);
    },

    addEventToList(event) {
      this.events.push(event);
    },
  },

  async mounted() {
    await this.getEvents();
  },

  created() {
    this.$parent.$on('createEvent', this.addEventToList);
  },
};
</script>

<style>
</style>
