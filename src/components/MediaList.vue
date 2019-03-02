<template>
  <v-layout justify-center column>
    <v-flex class="pa-2">
      <v-text-field
        flat
        solo-inverted
        hide-details
        prepend-inner-icon="search"
        v-bind:label="'Search Local ' + mediaType"
        v-model="searchInput"
      ></v-text-field>
    </v-flex>
    <v-flex>
      <v-container grid-list-md fluid>
        <v-layout row wrap>
          <v-flex v-for="entry in filteredList" :key="entry.id" xs4 md2 lg1 d-flex class="entry-img">
            <v-card flat tile color="transparent">
              <v-img :src="getPosterURL(entry.poster_path)" :aspect-ratio="2/3" @click.prevent="viewDetail(entry.id)"></v-img>
              <v-card-actions>
                <p class="body-1 mb-0">{{ entry.title }}</p>
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

    <v-navigation-drawer v-model="drawer" absolute temporary right>
      <v-list class="pa-1 my-1">
        <v-list-tile>
          <v-list-tile-content class="pa-1">
            <v-text-field
              flat
              solo-inverted
              hide-details
              prepend-inner-icon="search"
              v-bind:label="'TMDB ' + mediaType"
              v-model="searchInputTmdb"
            ></v-text-field>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      <v-alert v-model="isSearchError" type="error" outline>{{ errorMessage }}</v-alert>
      <v-flex xs12 v-for="result in searchResults" :key="result.id">
        <v-card color="secondary lighten-2" class="white--text ma-2 pa-1">
          <v-layout>
            <v-flex xs5>
              <v-img v-if="!(result.poster_path === null)"
                :src="getPosterURL(result.poster_path)"
                height="125px"
                contain
              ></v-img>
            </v-flex>
            <v-flex xs7>
              <v-card-title primary-title>
                <div>
                  <div class="headline">{{result[titleNameFormat]}}</div>
                  <div v-if="getYear(result) !== ''">({{ getYear(result) }})</div>
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
            <v-btn flat small color="primary lighten-2" @click.prevent="addTmdbEntry(result.id)">
              Add to Library
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-navigation-drawer>

    <v-dialog v-model="isDialogDisplayed" transition="dialog-bottom-transition" lazy>
      <DetailsDialog @cancel="isDialogDisplayed = false" @delete="isDialogDisplayed = false" v-bind="this.selectedDetail"/>
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
    selectedDetail: null,
    localMedia: [],
    searchResults: [],
    drawer: null,
    searchInput: '',
    searchInputTmdb: '',
    errorMessage: ''
  }),
  props: ['mediaType', 'titleNameFormat', 'releaseDateFormat', 'isTV'],
  created () {
    // Loads the NeDB database for use
    this.$db.loadDatabase(function (error) {
      if (error) {
        console.log('FATAL: Local database could not be loaded. Caused by: ' + error)
        throw error
      } else {
        console.log('INFO: local database loaded successfully.')
      }
    })

    // Initialize the local media list
    this.getLocalMedia((localMedia) => {
      this.localMedia = localMedia
    })

    // Set timeout for the tmdb media search
    this.debouncedSearchTMDB = _.debounce(this.searchTMDB, 1500)
  },
  computed: {
    // Returns the list of TV Shows and Movies. If there is a value in the search bar,
    // the return is a filtered array of all entries that include the input string
    filteredList () {
      try {
        return this.localMedia.filter(entry =>
          entry[this.titleNameFormat].toLowerCase().includes(this.searchInput.toLowerCase()))
      } catch (err) { return this.localMedia }
    }
  },
  watch: {
    // When a user inputs a string to search TMDB, there is a 1.5 second
    // delay after user stops typing to initiate the search
    searchInputTmdb: function (searchInput) {
      if (searchInput !== '') {
        this.debouncedSearchTMDB()
      }
    },
    // When the search drawer closes, reset all data applicable data to default
    drawer: function () {
      if (!this.drawer) {
        this.searchResults = []
        this.searchInputTmdb = ''
        this.isSearchError = false
        this.errorMessage = ''
      }
    },
    // The change in value for 'isTV' triggers the shift in view between Movies and TV Shows
    isTV: function () {
      this.getLocalMedia((localMedia) => {
        this.localMedia = localMedia
      })
      this.searchInput = ''
    }
  },
  methods: {
    viewDetail (givenId) {
      this.selectedDetail = this.buildProps(this.localMedia.filter(item => item.id === givenId)[0])
      console.log(this.selectedDetail);
      
      this.isDialogDisplayed = true
    },
    viewTmdbDetail (givenId) {
      this.selectedDetail = this.searchResults.find(result => result.id === givenId)
      this.isDialogDisplayed = true
    },
    searchTMDB () {
      // Reset error message whenever a new search is ran
      this.errorMessage = ''
      this.isSearchError = false

      tmdbSearch.searchTMDB(this.searchInputTmdb, this.isTV, (errorMessage, searchResults) => {
        if (errorMessage) {
          this.errorMessage = errorMessage
          this.isSearchError = true
        } else {
          this.searchResults = searchResults.results
        }
      })
    },
    addTmdbEntry (givenId) {
      // Load entry information into temp variable
      let media = this.searchResults.find(result => result.id === givenId)

      // Check to see if the entry is already stored in the database
      if (this.localMedia.find(duplicate => duplicate.id === media.id)) {
        alert(`${media[this.titleNameFormat.toLowerCase()]} is already stored in your database!`)
      } else {
        // Add additional properties to entry for use in local database functions
        media.mediaType = this.mediaType.toLowerCase()
        media.isWatched = false
        media.rating = 0

        // Insert new media entry into database
        this.$db.insert(media, function (error, newDoc) {
          if (error) {
            console.log('ERROR: saving document: ' + { unsavedDoc: newDoc } + '. Caused by: ' + error)
            throw error
          }
          this.localMedia.push(newDoc)
        })
      }
    },
    // Returns the URL of the poster images
    getPosterURL (posterPath) {
      return 'https://image.tmdb.org/t/p/w600_and_h900_bestv2' + posterPath
    },
    // Returns an array of either all movies or all TV shows
    getLocalMedia (callback) {
      this.$db.find({ mediaType: this.mediaType.toLowerCase() }, function (error, docs) {
        if (error) {
          throw error
        }
        callback(docs)
      })
    },
    // Returns the applicable year in the correct format
    getYear (entry) {
      let releaseDate = entry[this.releaseDateFormat]
      if (releaseDate === '') {
        return ''
      } else {
        return releaseDate.substring(0, 4)
      }
    },
    // Builds object to pass to DetailsDialog as props
    buildProps (entry) {
      console.log({tentry: entry});
      
      // TODO: Add trailer information into prop object
      let propObject = {
        id: entry.id,
        title: entry[this.titleNameFormat.toLowerCase()],
        year: this.getYear(entry),
        isWatched: entry.isWatched,
        voteAverage: entry.vote_average,
        rating: entry.rating ? entry.rating : 0,
        voteCount: entry. vote_count,
        description: entry.overview
      }
      return propObject
    }
  }
}
</script>

<style lang="sass">
.entry-img
 cursor: pointer
</style>
