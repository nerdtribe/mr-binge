<template>
  <v-layout justify-center column>
    <v-flex class="pa-2">
      <v-text-field
        flat
        solo-inverted
        hide-details
        prepend-inner-icon="search"
        label="Search Local TV"
        v-model="searchInput"
      ></v-text-field>
    </v-flex>
    <v-flex>
      <v-container grid-list-md fluid>
        <v-layout row wrap>
          <v-flex v-for="tv in filteredList" :key="tv.id" xs4 md2 lg1 d-flex class="tv-img">
            <v-card flat tile color="transparent">
              <v-img :src="tv.poster" :aspect-ratio="2/3" @click.prevent="selectTv(tv.id)"></v-img>
              <v-card-actions>
                <p class="body-1 mb-0">{{ tv.title }}</p>
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
              label="TMDB TV"
              v-model="searchInputTmdb"
            ></v-text-field>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>

      <v-alert
        v-model="isSearchError"
        type="error"
        outline
        >
          {{ errorMessage }}
      </v-alert>

      <v-flex xs12 v-for="result in searchResults" :key="result.id">
        <v-card color="secondary lighten-2" class="white--text ma-2 pa-1">
          <v-layout>
            <v-flex xs5>
              <v-img v-if="!(result.poster_path===null)"
                :src=getPosterURL(result.poster_path)
                height="125px"
                contain
              ></v-img>
            </v-flex>
            <v-flex xs7>
              <v-card-title primary-title>
                <div>
                  <div class="headline">{{result.name}}</div>
                  <div v-if="!(result.first_air_date==='')">({{ result.first_air_date.substring(0, 4) }})</div>
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
            <v-btn flat small color="primary lighten-2" @click.prevent="addTmdbTv(result.id)">
              Add to Library
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
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
    isSearchError: false,
    localTv: [],
    searchResults: [],
    drawer: null,
    searchInput: '',
    searchInputTmdb: '',
    errorMessage: ''
  }),
  created () {
    // Retrieve list of local tv from the store
    this.localTv = this.$store.state.localData.tv
    // Set timeout for the tmdb TV search
    this.debouncedSearchTMDB = _.debounce(this.searchTMDB, 1500)
  },
  computed: {
    filteredList () {
      return this.localTv.filter(show => {
        return show.title.toLowerCase().includes(this.searchInput.toLowerCase())
      })
    }
  },
  watch: {
    searchInputTmdb: function (searchInput) {
      this.debouncedSearchTMDB()
    }
  },
  methods: {
    selectTv (id) {
      // Filter local tv array and set the selected details to store
      this.$store.state.selectedDetail = this.localTv.filter(show => show.id === id)[0]
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
      // Reset error message whenever a new search is ran
      this.errorMessage = ''
      this.isSearchError = false

      tmdbSearch.searchTMDB(this.searchInputTmdb, true, (errorMessage, searchResults) => {
        if (errorMessage) {
          this.errorMessage = errorMessage
          this.isSearchError = true
        } else {
          this.searchResults = searchResults.results
        }
      })
    },
    addTmdbTv (id) {
      // TODO: Tie in API call to get full details
      // Set API return values to local tv DB
      let newTvShow = this.$store.state.localData.tmdbApiDetail
      this.localTv.push(newTvShow)
    },
    getPosterURL (posterPath) {
      return 'https://image.tmdb.org/t/p/w600_and_h900_bestv2' + posterPath
    }
  }
}
</script>

<style lang="sass">
.tv-img
 cursor: pointer
</style>
