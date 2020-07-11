<template>
  <v-navigation-drawer v-model="drawer"
                       temporary
                       absolute
                       right>
    <v-text-field
      v-slot:prepend
      flat
      solo-inverted
      hide-details
      clearable
      prepend-inner-icon="mdi-magnify"
      label="Search TMDB"
      @change="search" />
    <v-container fluid>
      <v-row dense>
        <template v-if="isLoading">
          <v-row
            class="fill-height ma-0"
            align="center"
            justify="center">
            <v-progress-circular indeterminate
                                 color="grey lighten-5" />
          </v-row>
        </template>
        <template v-if="!isLoading && searchErrorMessage">
          <v-row
            class="fill-height ma-0"
            align="center"
            justify="center">
            <p>{{ searchErrorMessage }}</p>
          </v-row>
        </template>
        <template v-if="!isLoading && !searchErrorMessage">
          <v-col v-for="item in searchResults"
                 :key="item.id"
                 :hidden="isLoading"
                 :cols="item.flex">
            <v-card>
              <v-img
                :src="item.poster_path ? `https://image.tmdb.org/t/p/w342${item.poster_path}` : noImageSource"
                :lazy-src="noImageSource"
                class="white--text align-end"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                height="200px">
                <v-card-title v-text="type === 'tv' ? item.name : item.title" />
                <v-card-subtitle v-text="`(${getFullYear(type === 'tv' ? item.first_air_date : item.release_date)})`" />
              </v-img>
              <v-card-actions>
                <v-btn text
                       small
                       @click.once.prevent="view(item.id)">
                  View
                </v-btn>
                <v-spacer />
                <v-btn text
                       small
                       color="primary"
                       @click.once.prevent="add(item.id)">
                  Add to Library
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </template>
      </v-row>
    </v-container>
    <TheSearchPreviewDialogComponent v-model="showTmdbSearchDialog" />
  </v-navigation-drawer>
</template>

<script>
import Vue from "vue";
import _ from "lodash";
import TheSearchPreviewDialogComponent from "./TheSearchPreviewDialogComponent";

export default Vue.extend({
  name: "TheSearchDrawerComponent",
  components: {
    TheSearchPreviewDialogComponent
  },
  props: {
    value: {
      type: Boolean,
      required: false,
      default: true
    },
    type: {
      type: String,
      required: true,
      default: "movie"
    },
  },
  data: () => ({
    noImageSource: "../static/noimg.png",
    showTmdbSearchDialog: false,
  }),
  computed: {
    drawer: {
      get() {
        return this.value;
      },
      set(newValue) {
        this.$emit("input", newValue);
      }
    },
    searchResults() {
      return this.$store.getters.searchResults;
    },
    searchErrorMessage() {
      return this.$store.getters.searchErrorMessage;
    },
    isLoading() {
      return this.$store.getters.loadng;
    }
  },
  methods: {
    add(id) {
      console.log(`TODO: Add function ${id}`);
      this.dialog = false;
    },
    view(id) {
      console.log(`TODO: View function ${id}`);
    },
    search: _.debounce(function search(query) {
      if (this.type === "tv") {
        this.$store.dispatch("searchTv", { query });
      } else {
        this.$store.dispatch("searchMovies", { query });
      }
    }, 200),
    getFullYear(dateString) {
      return new Date(dateString).getFullYear();
    },
  }
});
</script>
