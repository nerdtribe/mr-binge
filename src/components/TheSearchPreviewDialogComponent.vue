<template>
  <v-dialog v-model="visible"
            persistent
            max-width="75%">
    <v-card class="ma-0">
      <v-img
        cover
        :src="item.backdrop_path ? `${item.backdrop_path}` : noImageSource"
        :lazy-src="noImageSource"
        class="white--text align-end"
        gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
        height="200px">
        <v-card-title class="headline">
          {{ item.title ? item.title : item.name }}
          <span class="caption mt-2 ml-2"> ({{ getFullYear(item.release_date || item.first_air_date) }})</span>
          <v-spacer />
          <span class="caption mt-2 mr-2">({{ item.vote_count }} votes)</span>
          <v-progress-circular :value="item.vote_average / 0.1"
                               :size="60"
                               :width="3">
            {{ item.vote_average /0.1 }}%
          </v-progress-circular>
        </v-card-title>
      </v-img>
      <v-card-text class="d-flex align-center flex-column pa-4">
        {{ item.overview }}
        <div v-if="item.videos"
             class="pa-4">
          <youtube :video-id="item.videos.results[0]" />
        </div>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn text
               @click="close()">
          Close
        </v-btn>
        <v-btn text
               @click.once.prevent="add(item)">
          Add to Library
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  name: "TheSearchPreviewDialogComponent",
  props: {
    item: {
      type: Object,
      required: true,
      default: null,
    },
    type: {
      type: String,
      required: true,
      default: ""
    },
  },
  data: () => ({
    noImageSource: "../static/noimg.png",
    dialog: false,
  }),
  computed: {
    visible() {
      return this.$store.getters.searchPreviewDialogShow;
    },
  },
  methods: {
    add(item) {
      if (this.type === "tv") {
        this.$store.dispatch("addTvSeries", item).then(() => this.close());
      } else {
        this.$store.dispatch("addMovie", item).then(() => this.close());
      }
    },
    getFullYear(dateString) {
      return new Date(dateString).getFullYear();
    },
    close() {
      this.$store.dispatch("toggleSearchPreviewDialog");
    }
  },
});
</script>
