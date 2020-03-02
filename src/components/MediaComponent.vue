<template>
  <v-row no-gutters>
    <v-col cols="12">
      <v-toolbar>
        <v-text-field
          flat
          solo-inverted
          hide-details
          clearable
          prepend-inner-icon="mdi-magnify"
          :label="'Search Local ' + type" />
        <v-btn icon>
          <v-icon>mdi-search-web</v-icon>
        </v-btn>
      </v-toolbar>
    </v-col>
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
