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
        <v-btn icon
               @click.stop="showTmdbSearchDrawer = !showTmdbSearchDrawer">
          <v-icon>mdi-search-web</v-icon>
        </v-btn>
      </v-toolbar>
    </v-col>
    <template v-if="type === 'movies' && !movies.length">
      <p>Search for a movie</p>
    </template>
    <template v-if="type === 'tv' && !tvSeries.length">
      <p>Search for a TV series</p>
    </template>
    <v-col v-for="item in type === 'movies' ? movies : tvSeries"
           :key="item.id"
           cols="12"
           sm="3">
      <MediaCardComponent
        v-if="type === 'movies'"
        :id="item.id"
        :image-src="item.poster_path"
        :title="item.title ? item.title : item.name" />
      <MediaCardComponent
        v-if="type === 'tv'"
        :id="item.id"
        :image-src="item.poster_path"
        :title="item.title ? item.title : item.name" />
    </v-col>
    <TheSearchDrawerComponent v-model="showTmdbSearchDrawer"
                              :type="type" />
  </v-row>
</template>

<script>
import Vue from "vue";
import MediaCardComponent from "./MediaCardComponent.vue";
import TheSearchDrawerComponent from "./TheSearchDrawerComponent.vue";

export default Vue.extend({
  name: "MediaComponent",
  components: {
    MediaCardComponent,
    TheSearchDrawerComponent,
  },
  props: {
    type: {
      type: String,
      default: "",
    },
  },
  data: () => ({
    showTmdbSearchDrawer: false,
  }),
  computed: {
    movies() {
      return this.$store.getters.getMovies;
    },
    tvSeries() {
      return this.$store.getters.getTvSeries;
    },
  },
});
</script>
