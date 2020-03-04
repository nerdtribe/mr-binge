<template>
  <v-navigation-drawer
    v-model="drawer"
    temporary
    absolute
    right>
    <v-text-field
      flat
      solo-inverted
      hide-details
      clearable
      prepend-inner-icon="mdi-magnify"
      label="Search TMDB"
      class="pa-2" />
    <v-divider />

    <v-container fluid>
      <v-row dense>
        <v-col
          v-for="card in cards"
          :key="card.title"
          :cols="card.flex">
          <v-card>
            <v-img
              :src="card.src"
              class="white--text align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="200px">
              <v-card-title v-text="card.title" />
              <v-card-subtitle v-text="'(' + card.year + ')'" />
            </v-img>
            <v-card-actions>
              <v-btn text
                     small>
                View
              </v-btn>
              <v-spacer />
              <v-btn text
                     small
                     color="primary">
                Add to Library
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-navigation-drawer>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  name: "TheSearchDrawerComponent",
  props: {
    value: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  data: () => ({
    cards: [
      { title: "Frozen II", year: "2019", src: "https://image.tmdb.org/t/p/w300_and_h450_bestv2/pjeMs3yqRmFL3giJy4PMXWZTTPa.jpg" },
      { title: "Avengers: Infinity War", year: "2018", src: "https://image.tmdb.org/t/p/w600_and_h900_bestv2/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg" },
    ],
  }),

  computed: {
    drawer: {
      get() {
        return this.value;
      },
      set(newValue) {
        this.$emit("input", newValue);
      }
    }
  },
});
</script>
