<template>
  <div>
    <v-app-bar prominent :style="bgHeaderStyle">
      <v-toolbar-title class="title">
        <h1>
          {{ detailData.title
          }}<span class="year"> ({{ detailData.year }})</span>
          <div class="ratings">
            <v-progress-circular
              :rotate="360"
              :size="75"
              :width="10"
              :value="detailData.rating"
              class="rating"
            >
              <span class="rate">{{ detailData.rating }}%</span>
            </v-progress-circular>
            <span class="votes">({{ detailData.raters }})</span>
          </div>
        </h1>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-icon class="delete">mdi-delete</v-icon>
    </v-app-bar>
    <v-toolbar flat dense class="detail-bar">
      <v-btn text icon class="back-btn" color="primary" @click="$router.go(-1)"
        ><v-icon>mdi-arrow-left-circle</v-icon></v-btn
      >
      <v-spacer></v-spacer>
      My Rating:
      <v-rating dense half-increments v-model="userRating"></v-rating>
      <v-spacer></v-spacer>
      <v-switch dense hide-details v-model="watched" label="Watched"></v-switch>
    </v-toolbar>
    <v-container>
      <v-row>
        <p>{{ detailData.description }}</p>
        <v-skeleton-loader width="100%" type="image"></v-skeleton-loader>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { MediaDetail } from "@/vuex/types";

interface HeaderStyle {
  background: string;
  "background-size": string;
}

export default Vue.extend({
  name: "MediaDetailComponent",
  data: () => ({
    isLoading: false,
    detailData: {} as MediaDetail,
    userRating: 3,
    watched: false
  }),
  computed: {
    bgHeaderStyle(): HeaderStyle {
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
    fetch() {
      this.isLoading = true;
      this.detailData = {
        title: "Joker",
        year: "2019",
        rating: "85",
        raters: "1483",
        posterImage:
          "https://image.tmdb.org/t/p/w600_and_h900_bestv2/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg",
        description:
          "During the 1980s, a failed stand-up comedian is driven insane and turns to a life of crime and chaos in Gotham City while becoming an infamous psychopathic crime figure.",
        trailer: "https://www.themoviedb.org/video/play?key=t433PEQGErc"
      };
      this.isLoading = false;
    }
  }
});
</script>

<style lang="scss">
.title {
  width: 100%;
  margin: 0 !important;
  .year {
    font-size: 50%;
    color: rgba(white, 0.8);
  }
  .ratings {
    display: flex;
    align-items: center;
    float: right;
    .rating {
      margin-right: 10px;
      .rate {
        font-size: 40%;
      }
    }
    .votes {
      font-size: 50%;
      margin-right: 20px;
    }
  }
}
.delete {
  margin-top: 15px;
  color: rgba(white, 0.5);
  cursor: pointer;
  &:hover {
    color: red;
  }
}
.detail-bar {
  .back-btn {
    border: 0;
  }
}
</style>
