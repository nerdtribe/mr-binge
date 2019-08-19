<template>
  <v-card>
    <v-toolbar color="blue-grey">
      <v-toolbar-title>{{ title }}<span class="caption"> ({{ year }})</span></v-toolbar-title>
      <v-spacer />
      <v-progress-circular
        :rotate="360"
        :size="50"
        :width="8"
        :value="Math.round(voteAverage*10)"
        color="white"
      >
        {{ Math.round(voteAverage*10) }}%
      </v-progress-circular>
      <v-toolbar-title
        class="subheading"
        extended
      >
        ({{ voteCount }})
      </v-toolbar-title>
      <v-btn
        v-if="!isSearchDetail"
        text
        icon
        color="white"
        class="mx-2"
        @click="$emit('requestDeletion', id)"
      >
        <v-icon>delete</v-icon>
      </v-btn>
    </v-toolbar>

    <v-card-text>
      <v-layout
        align-center
        justify-center
        column
        fill-height
      >
        <p>{{ description }}</p>
        <youtube
          v-if="trailer"
          :video-id="trailer"
        />
      </v-layout>
    </v-card-text>

    <v-card-actions
      v-if="!isSearchDetail"
      fill-height
      class="pa-3"
    >
      <div>
        <v-rating
          v-model="currentRating"
          background-color="white"
          color="yellow accent-4"
          dense
          half-increments
          hover
          size="32"
        />
      </div>
      {{ currentRating }}
      <v-spacer />
      <span
        class="grey--text text--lighten-2 caption mr-2"
        fill-height
      >
        <v-switch
          v-model="currentWatched"
          label="Watched"
          color="success"
          hide-details
          align-center
        />
      </span>
    </v-card-actions>
  </v-card>
</template>

<script>
  export default {
    props: {
      id: Number,
      title: String,
      year: String,
      isWatched: Boolean,
      voteAverage: Number,
      trailer: String,
      rating: Number,
      voteCount: Number,
      description: String,
      isSearchDetail: Boolean,
      isDialogDisplayed: Boolean
    },
    data: () => ({
      dialog: false,
      notifications: false,
      sound: true,
      widgets: false,
      currentRating: null,
      currentWatched: null
    }),
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
    },
    created () {
      this.currentRating = this.rating
      this.currentWatched = this.isWatched
    }
  }
</script>

<style lang="sass">

</style>
