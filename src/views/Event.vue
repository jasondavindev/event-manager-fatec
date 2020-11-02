<template>
  <div>
    <CreateEvent v-on:createEvent="onCreateEvent"></CreateEvent>
    <EventList v-if="hasUser()" v-on:deleteEvent="onDeleteEvent"></EventList>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import CreateEvent from '@/components/CreateEvent';
import EventList from '@/components/EventList';

export default {
  name: 'Event',

  computed: {
    ...mapGetters(['user']),
  },

  components: {
    CreateEvent,
    EventList,
  },

  methods: {
    hasUser() {
      return this.user.id;
    },

    onCreateEvent(data) {
      console.log('[EVENT] Created', data);
      this.$emit('createEvent', data);
    },

    onDeleteEvent(data) {
      console.log('[EVENT] Deleted', data);
      this.$emit('deleteEvent', data);
    },
  },

  mounted() {
    if (!this.hasUser()) {
      this.$router.push('/');
    }
  },
};
</script>

<style>
</style>
