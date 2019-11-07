<template>
  <div>
    <v-app-bar prominent :style="bgHeaderStyle">
      <v-toolbar-title class="title">
        <h1>
          {{ detailData.title
          }}<span class="year"> ({{ detailData.year }})</span>
          <span class="ratings"
            >{{ detailData.rating }}% ({{ detailData.raters }})</span
          >
        </h1>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-icon class="delete">mdi-delete</v-icon>
    </v-app-bar>
    <p class="mt-3">Route ID: {{ $route.params.id }}</p>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { MediaDetail } from "@/vuex/types";

export default Vue.extend({
  name: "MediaDetailComponent",
  data: () => ({
    isLoading: false,
    detailData: {} as MediaDetail
  }),
  computed: {
    bgHeaderStyle() {
      return {
        background:
          "linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)),url(" +
          this.detailData.posterImage +
          ") center center",
        "background-size": "cover"
      };
    }
  },
  created() {
    this.fetch();
  },
  methods: {
    async fetch() {
      this.isLoading = true;
      this.detailData = {
        title: "Joker",
        year: "2019",
        rating: "85",
        raters: "1483",
        posterImage:
          "https://image.tmdb.org/t/p/w600_and_h900_bestv2/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg"
      };
      this.isLoading = false;
    }
  }
});
</script>

<style lang="scss">
.title {
  width: 100%;
  .year {
    font-size: 50%;
    color: rgba(white, 0.8);
  }
  .ratings {
    float: right;
    justify-self: flex-end;
    font-size: 50%;
    color: rgba(white, 0.8);
  }
}
.toolbar-items {
  width: 100%;
  justify-content: flex-end;
  .ratings {
    justify-self: end;
    color: rgba(white, 0.8);
  }
}
.delete {
  margin: 25px;
}
</style>
