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
        <v-card
          flat
          tile
          @click="viewDetail(item.id)">
          <v-img :src="item.poster_path" />
          <v-card-actions>
            <p>{{ item.title ? item.title : item.name }}</p>
          </v-card-actions>
        </v-card>
      </v-col>
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
    }
  },
  methods: {
    viewDetail(givenId) {
      this.selectedItemId = givenId;
      this.$store.dispatch("toggleItemDetail");
    }
  }
});
</script>
