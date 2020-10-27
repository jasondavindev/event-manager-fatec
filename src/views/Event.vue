<template>
  <div>
    <CreateEvent></CreateEvent>
    <EventView :id="1"></EventView>
  </div>
</template>

<script>
import CreateEvent from '@/components/CreateEvent';
import EventView from '@/components/EventView';

export default {
  name: 'Event',
  components: {
    CreateEvent,
    EventView,
  },
};
</script>

<style>
</style>
