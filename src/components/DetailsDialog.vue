<template>
  <v-card>
    <v-toolbar color="blue-grey darken-1">
      <v-toolbar-title>{{title}}</v-toolbar-title>
      <v-spacer></v-spacer>
        <v-progress-circular
        :rotate="360"
        :size="50"
        :width="8"
        :value="rating"
        color="white"
      >
      {{ rating }}%
      </v-progress-circular>
      <v-toolbar-title class="subheading" extended>({{ voteCount }})</v-toolbar-title>
      <v-btn flat icon color="white" class="mx-2">
        <v-icon>delete</v-icon>
      </v-btn>
    </v-toolbar>

    <v-card-text>
      <v-layout align-center justify-center column fill-height>
        <p>{{ description }}</p>
        <youtube :video-id="trailer"></youtube>
      </v-layout>
    </v-card-text>

    <v-card-actions fill-height class="pa-3">
      <v-rating
        v-model="rating"
        background-color="white"
        color="yellow accent-4"
        dense
        half-increments
        hover
        size="32"
      ></v-rating>
      <v-spacer></v-spacer>
      <span class="grey--text text--lighten-2 caption mr-2" fill-height>
        <v-switch
          label="Watched"
          color="success"
          :value="isWatched"
          hide-details
          align-center
        ></v-switch>
      </span>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: [
    'title',
    'isWatched',
    'trailer',
    'rating',
    'voteCount',
    'description'
  ],
  data: () => ({
    dialog: false,
    notifications: false,
    sound: true,
    widgets: false
  }),
  methods: {

  }
}
</script>

<style lang="sass">

</style>
