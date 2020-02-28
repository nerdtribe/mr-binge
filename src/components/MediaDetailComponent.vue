<template>
  <v-card class="ma-0"
          height="100%">
    <v-toolbar
      color="blue-grey darken-2">
      <v-btn icon
             class="ml-1"
             @click="$router.go(-1)">
        <v-icon>mdi-backburger</v-icon>
      </v-btn>
      <v-divider
        class="mx-4"
        vertical />
      <v-toolbar-title class="display-1">
        Frozen II <span class="caption"> (2019)</span>
      </v-toolbar-title>
    </v-toolbar>
    <v-toolbar>
      <v-switch
        label="Watched"
        color="success"
        hide-details />
      <v-divider
        class="mx-4"
        vertical />
      <v-rating
        :value="3"
        background-color="white"
        color="yellow accent-4"
        dense
        half-increments
        hover
        size="24" />
      <v-spacer />
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-progress-circular :value="70"
                               :size="55"
                               :width="8"
                               v-on="on">
            70%
          </v-progress-circular>
        </template>
        <span>Rating via 188 votes.</span>
      </v-tooltip>
    </v-toolbar>
    <v-card-text>
      <v-layout align-center
                justify-center
                column
                fill-height>
        <p>Route ID: {{ $route.params.id }}</p>
        <p class="body-1">
          Elsa, Anna, Kristoff and Olaf head far into the forest to learn the truth about an ancient mystery of their kingdom.
        </p>
        <youtube video-id="Zi4LMpSDccc" />
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
        color="red">
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
  name: "MediaDetailComponent"
});
</script>
