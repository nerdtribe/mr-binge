<template>
  <v-card>
    <v-toolbar color="blue-grey darken-1">
      <v-toolbar-title>{{title}}<span class="caption"> ({{ year }})</span></v-toolbar-title>
      <v-spacer></v-spacer>
        <v-progress-circular
        :rotate="360"
        :size="50"
        :width="8"
        :value=Math.round(voteAverage*10)
        color="white"
      >
      {{ Math.round(voteAverage*10) }}%
      </v-progress-circular>
      <v-toolbar-title class="subheading" extended>({{ voteCount }})</v-toolbar-title>
      <v-btn flat icon color="white" class="mx-2" v-on:click="$emit('requestDeletion', id)" v-if="!isSearchDetail">
        <v-icon>delete</v-icon>
      </v-btn>
    </v-toolbar>

    <v-card-text>
      <v-layout align-center justify-center column fill-height>
        <p>{{ description }}</p>
        <youtube v-if="trailer" :video-id="trailer"></youtube>
      </v-layout>
    </v-card-text>

    <v-card-actions fill-height class="pa-3" v-if="rating">
      <v-rating
        v-model="rating"
        background-color="white"
        color="yellow accent-4"
        dense
        half-increments
        hover
        size="32"
      ></v-rating>
      {{ rating }}
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
    'id',
    'title',
    'year',
    'isWatched',
    'voteAverage',
    'trailer',
    'rating',
    'voteCount',
    'description',
    'isSearchDetail'
  ],
  data: () => ({
    dialog: false,
    notifications: false,
    sound: true,
    widgets: false,
    currentRating: null

  }),
  methods: {
    // TODO: Set New Rating

    // TODO: Set Watched Status
  }
}
</script>

<style lang="sass">

</style>
