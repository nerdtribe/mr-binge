<template>
  <div v-if="!itemDetailVisible">
    <v-row no-gutters>
      <v-col cols="12">
        <v-toolbar>
          <v-text-field
            flat
            solo-inverted
            hide-details
            clearable
            prepend-inner-icon="mdi-magnify"
            @click:clear="clearSearch"
            :label="'Search Local ' + type"
            @change="search" />
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
      <v-col
        v-for="item in filteredItems ? filteredItems : type === 'movies' ? movies : tvSeries"
        :key="item.id"
        cols="12"
        sm="2"
        xl="1">
        <v-card flat
                tile
                @click="viewDetail(item.id)">
          <v-img :src="item.poster_path || require('@/static/noimg.png')" />
          <v-card-actions>
            <p class="mb-0">
              {{ item.title ? item.title : item.name }}
            </p>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-layout v-if="filteredItems && !filteredItems.length"
                align-center
                justify-center
                column
                fill-height>
        <h3 class="ml-4">No results found, please revise your search.</h3>
      </v-layout>
      <TheSearchDrawerComponent v-model="showTmdbSearchDrawer"
                                :type="type" />
    </v-row>
  </div>
  <MediaDetailComponent v-else
                        :id="selectedItemId"
                        :type="type" />
</template>

<script>
import Vue from "vue";
import _ from "lodash";
import TheSearchDrawerComponent from "./TheSearchDrawerComponent.vue";
import MediaDetailComponent from "./MediaDetailComponent";

export default Vue.extend({
  name: "MediaComponent",
  components: {
    TheSearchDrawerComponent,
    MediaDetailComponent,
  },
  props: {
    type: {
      type: String,
      default: ""
    }
  },
  data: () => ({
    showTmdbSearchDrawer: false,
    showItemDetail: false,
    selectedItemId: 0,
    filteredItems: null,
  }),
  computed: {
    itemDetailVisible() {
      return this.$store.getters.itemDetailShow;
    },
    movies() {
      return this.$store.getters.getMovies;
    },
    tvSeries() {
      return this.$store.getters.getTvSeries;
    },
  },
  methods: {
    viewDetail(givenId) {
      if (this.type === "movies") {
        this.$store.dispatch("fetchMovieDetails", givenId);
      } else {
        this.$store.dispatch("fetchTvSeriesDetails", givenId);
      }
      this.selectedItemId = givenId;
      this.$store.dispatch("toggleItemDetail");
    },
    search: _.debounce(function search(query) {
      if (this.type === "tv") {
        this.filteredItems = this.tvSeries.filter(series => series.name.toLowerCase().includes(query.toLowerCase()));
      }
      this.filteredItems = this.movies.filter(movie => movie.title.toLowerCase().includes(query.toLowerCase()));
    }),
    clearSearch() {
      this.filteredItems = null;
    }
  }
});
</script>
