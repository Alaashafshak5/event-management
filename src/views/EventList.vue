<template>
  <div class="about">
    <h1>Events for {{ user.user.name }}</h1>
    <EventCard v-for="event in event.events" :key="event.id" :event="event" />
    <template v-if="page != 1">
    <router-link :to="{ name: 'event-list', query: { page: page - 1 } }" rel="prev"> Prev page </router-link> 
    <template v-if="hasNextPage"> | </template>
    </template>
     <router-link v-if="hasNextPage" :to="{ name: 'event-list', query: { page: page + 1 } }" rel="next"> Next page </router-link>
  </div>
</template>

<script>
import EventCard from "@/components/EventCard.vue";
// import EventService from "@/services/EventService.js";
import { mapState } from "vuex";
export default {
  components: {
    EventCard,
  },

  created() {
    this.$store.dispatch("event/fetchEvents", {
      perPage: 3,
      page: this.page
    });
  },
  computed: {
    page() {
      return parseInt(this.$route.query.page) || 1
    },
    hasNextPage(){
      return this.event.eventsTotal > this.page * 3
    },
    ...mapState(['event', 'user']),
  },
};
</script>
