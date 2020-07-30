<template>
  <v-card v-model="visible"
          class="ma-0"
          height="100%">
    <v-toolbar
      color="blue-grey darken-2">
      <v-btn icon
             class="ml-1"
             @click="close()">
        <v-icon>mdi-backburger</v-icon>
      </v-btn>
      <v-divider
        class="mx-4"
        vertical />
      <v-toolbar-title class="display-1">
        {{ item.title ? item.title : item.name }}
        <span class="caption"> ({{ getFullYear(item.release_date || item.first_air_date) }})</span>
      </v-toolbar-title>
    </v-toolbar>
    <v-toolbar>
      <v-switch
        :true-value="item.watched"
        label="Watched"
        color="success"
        hide-details />
      <v-divider
        class="mx-4"
        vertical />
      <v-rating
        :value="item.rating"
        background-color="white"
        color="yellow accent-4"
        dense
        half-increments
        hover
        size="24" />
      <v-spacer />
      <span class="caption mt-2 mr-2">({{ item.vote_count }} votes)</span>
      <v-progress-circular :value="item.vote_average / 0.1"
                           :size="60"
                           :width="3">
        {{ item.vote_average /0.1 }}%
      </v-progress-circular>
    </v-toolbar>
    <v-card-text>
      <v-layout align-center
                justify-center
                column
                fill-height>
        <p class="body-1">
          {{ item.overview }}
        </p>
        <youtube v-if="item.videos.results.length"
                 :video-id="item.videos.results[0].key" />
      </v-layout>
    </v-card-text>
    <v-speed-dial
      absolute
      bottom
      right
      open-on-hover>
      <template v-slot:activator>
        <v-btn
          color="blue darken-2"
          dark
          fab>
          <v-icon>
            mdi-menu
          </v-icon>
        </v-btn>
      </template>
      <v-btn
        fab
        small
        color="red"
        @click="deleteItem(item.uuid)">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
      <v-btn
        fab
        color="pink">
        <v-icon>mdi-heart</v-icon>
      </v-btn>
    </v-speed-dial>
  </v-card>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  name: "MediaDetailComponent",
  props: {
    id: {
      type: Number,
      default: 0,
      required: true,
    },
    type: {
      type: String,
      default: "",
      required: true,
    }
  },
  computed: {
    visible() {
      return this.$store.getters.itemDetailShow;
    },
    item() {
      if (this.type === "movies") {
        return this.$store.getters.getMovieById(this.id);
      }
      return this.$store.getters.getTvSeriesById(this.id);
    }
  },
  methods: {
    getFullYear(dateString) {
      return new Date(dateString).getFullYear();
    },
    close() {
      this.$store.dispatch("toggleItemDetail");
    },
    deleteItem(givenUuid) {
      if (this.type === "movies") {
        this.$store.dispatch("deleteMovie", givenUuid);
        this.close();
      }
      this.$store.dispatch("deleteTvSeries", givenUuid);
      this.close();
    },
  },
});
</script>
