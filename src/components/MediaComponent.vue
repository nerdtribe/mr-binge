<template>
  <v-row no-gutters>
    <h1 class="headline pa-2">
      Settings
    </h1>
    <v-divider />
    <v-row no-gutters>
      <v-col v-for="n in 30"
             :key="n"
             cols="12"
             sm="3">
        <MediaCardComponent
          v-if="type === 'movies'"
          :id="n++"
          image-src="https://cdn.vuetifyjs.com/images/cards/house.jpg"
          title="Movie Title" />
        <MediaCardComponent
          v-if="type === 'tv'"
          :id="n"
          image-src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
          title="TV Title" />
      </v-col>
    </v-row>
  </v-row>
</template>

<script>
import Vue from "vue";
import MediaCardComponent from "./MediaCardComponent.vue";

export default Vue.extend({
  name: "MediaComponent",
  components: {
    MediaCardComponent
  },
  props: {
    type: {
      type: String,
      default: "",
    },
  }
});
</script>
