<template>
  <v-card>
    <v-toolbar color="blue-grey">
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
      <v-btn flat icon color="white" class="mx-2" @click="$emit('requestDeletion', id)" v-if="!isSearchDetail">
        <v-icon>delete</v-icon>
      </v-btn>
    </v-toolbar>

    <v-card-text>
      <v-layout align-center justify-center column fill-height>
        <p>{{ description }}</p>
        <youtube v-if="trailer" :video-id="trailer"></youtube>
      </v-layout>
    </v-card-text>

    <v-card-actions v-if="!isSearchDetail" fill-height class="pa-3">
      <div>
        <v-rating
        v-model="currentRating"
        background-color="white"
        color="yellow accent-4"
        dense
        half-increments
        hover
        size="32"
        ></v-rating>
      </div>
      {{ currentRating }}
      <v-spacer></v-spacer>
      <span class="grey--text text--lighten-2 caption mr-2" fill-height>
        <v-switch
          label="Watched"
          color="success"
          v-model="currentWatched"
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
    'isSearchDetail',
    'isDialogDisplayed'
  ],
  data: () => ({
    dialog: false,
    notifications: false,
    sound: true,
    widgets: false,
    currentRating: null,
    currentWatched: null
  }),
  created () {
    this.currentRating = this.rating
    this.currentWatched = this.isWatched
  },
  watch: {
    isDialogDisplayed: function () {
      if (this.isDialogDisplayed) {
        this.currentRating = this.rating
        this.currentWatched = this.isWatched
      }
    },
    currentRating: function (newValue) {
      if (this.currentRating !== this.rating) {
        this.$emit('requestRatingUpdate', this.id, newValue)
      }
    },
    currentWatched: function (newValue) {
      if (this.currentWatched !== this.isWatched) {
        this.$emit('requestWatchedUpdate', this.id, newValue)
      }
    }
  }
}
</script>

<style lang="sass">

</style>
