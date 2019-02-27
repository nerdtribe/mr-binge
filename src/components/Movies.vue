<template>
  <v-layout justify-center column>
    <v-flex class="pa-2">
      <v-text-field
        flat
        solo-inverted
        hide-details
        prepend-inner-icon="search"
        label="Search Local Movies"
        v-model="searchInput"
      ></v-text-field>
    </v-flex>
    <v-flex>
      <v-container grid-list-md fluid>
        <v-layout row wrap>
          <v-flex v-for="movie in filteredList" :key="movie.id" xs4 md2 lg1 d-flex class="movie-img">
            <v-card flat tile color="transparent">
              <v-img :src="movie.poster" :aspect-ratio="2/3" @click.prevent="selectMovie(movie.id)"></v-img>
              <v-card-actions>
                <p class="body-1 mb-0">{{ movie.title }}</p>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-flex>
    <v-btn
      color="primary"
      dark
      absolute
      bottom
      right
      fab
      class="mr-4 mb-5"
      @click.stop="drawer = !drawer"
    >
      <v-icon>add</v-icon>
    </v-btn>

    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
      right
    >
      <v-list class="pa-1 my-1">
        <v-list-tile>
          <v-list-tile-content class="pa-1">
            <v-text-field
              flat
              solo-inverted
              hide-details
              prepend-inner-icon="search"
              label="TMDB Movies"
              v-model="searchInputTmdb"
            ></v-text-field>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>

      <!-- <v-flex xs12 v-for="result in filterTmdbList" :key="result.id">
        <v-card color="secondary lighten-2" class="white--text ma-2 pa-1">
          <v-layout>
            <v-flex xs5>
              <v-img
                :src="result.poster"
                height="125px"
                contain
              ></v-img>
            </v-flex>
            <v-flex xs7>
              <v-card-title primary-title>
                <div>
                  <div class="headline">{{ result.title }}</div>
                  <div>({{ result.year }})</div>
                </div>
              </v-card-title>
            </v-flex>
          </v-layout>
          <v-divider light></v-divider>
          <v-card-actions class="pa-2">
            <v-btn flat small @click.prevent="viewTmdbDetail(result.id)">
              Details
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn flat small color="primary lighten-2" @click.prevent="addTmdbMovie(result.id)">
              Add to Library
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex> -->
    </v-navigation-drawer>

    <v-dialog v-model="isDialogDisplayed" transition="dialog-bottom-transition" lazy>
      <DetailsDialog @cancel="isDialogDisplayed = false" @delete="isDialogDisplayed = false" v-bind="this.$store.state.selectedDetail"/>
    </v-dialog>
  </v-layout>
</template>

<script>
import DetailsDialog from '@/components/DetailsDialog'
import _ from 'lodash'
import tmdbSearch from '@/tmdb/search'

export default {
  components: {
    DetailsDialog
  },
  data: () => ({
    isDialogDisplayed: false,
    localMovies: [],
    searchMovies: [],
    drawer: null,
    searchInput: '',
    searchInputTmdb: ''
  }),
  created () {
    // Retrieve list of local movies from the store
    this.localMovies = this.$store.state.localData.movies
    // Set timeout for the tmdb movie search
    this.debouncedSearchTMDB = _.debounce(this.searchTMDB, 1500)
  },
  computed: {
    filteredList () {
      return this.localMovies.filter(movie => {
        return movie.title.toLowerCase().includes(this.searchInput.toLowerCase())
      })
    }
  },
  watch: {
    searchInputTmdb: function (searchInput) {
      this.debouncedSearchTMDB()
    }
  },
  methods: {
    selectMovie (id) {
      // Filter local movies array and set the selected details to store
      this.$store.state.selectedDetail = this.localMovies.filter(movie => movie.id === id)[0]
      // Open dialog display
      this.isDialogDisplayed = true
    },
    viewTmdbDetail (id) {
      // TODO: Tie in API call
      // Set the selected details to store
      this.$store.state.selectedDetail = this.$store.state.localData.tmdbApiDetail
      // Open dialog display
      this.isDialogDisplayed = true
    },
    searchTMDB () {
      tmdbSearch.searchTMDB(this.searchInputTmdb, false, (errorMessage, searchResults) => {
        console.log(searchResults);
      })
    },
    addTmdbMovie (id) {
      // TODO: Tie in API call to get full details
      // Set API return values to local movies DB
      let newMovie = this.$store.state.localData.tmdbApiDetail
      this.localMovies.push(newMovie)
    }
  }
}
</script>

<style lang="sass">
.movie-img
 cursor: pointer
</style>
