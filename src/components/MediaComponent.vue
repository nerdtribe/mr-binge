<template>
  <v-row no-gutters>
    <v-col v-for="n in 30" :key="n" cols="12" sm="3">
      <MediaCardComponent
        v-if="type === 'movies'"
        image-src="https://cdn.vuetifyjs.com/images/cards/house.jpg"
        title="Movie Title"
        :id="n++"
      />
      <MediaCardComponent
        v-if="type === 'tv'"
        image-src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
        title="TV Title"
        :id="n"
      />
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from "vue";
import MediaCardComponent from "./MediaCardComponent.vue";

export default Vue.extend({
  name: "MediaComponent",
  props: {
    type: String
  },
  components: {
    MediaCardComponent
  }
});
</script>
