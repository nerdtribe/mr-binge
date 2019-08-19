<template>
  <v-layout
    justify-center
    column
  >
    <v-toolbar
      fixed
      text
      dark
      class="searchbar"
    >
      <v-text-field
        v-model="searchInput"
        text
        solo-inverted
        hide-details
        clearable
        prepend-inner-icon="mdi-magnify"
        :label="'Search Local ' + mediaType"
      />
    </v-toolbar>
    <v-flex>
      <v-container
        grid-list-md
        fluid
        mt-5
      >
        <v-layout
          row
          wrap
        >
          <v-flex
            v-for="entry in filteredList"
            :key="entry.id"
            xs12
            sm6
            md2
            lg1
            d-flex
            class="entry-img"
          >
            <v-card
              text
              tile
            >
              <v-img
                :src="getPosterURL(entry.poster_path)"
                :aspect-ratio="2/3"
                @click="viewDetail(entry.id)"
              />
              <v-card-actions>
                <p class="body-1 mb-0">
                  {{ entry[titleNameFormat] }}
                </p>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-flex>
    <img
      v-if="localMedia.length === 0"
      class="start"
      src="@/assets/start.png"
      width="210"
    >
    <v-btn
      color="primary"
      dark
      absolute
      fixed
      bottom
      right
      fab
      class="mr-4 mb-5"
      @click.stop="drawer = !drawer"
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>
    <div class="text-xs-center">
      <v-dialog
        v-model="welcomeDialog"
        dark
        width="500"
      >
        <v-card>
          <v-card-title
            class="headline alternate"
            primary-title
            color="blue-grey"
          >
            Welcome to tbinge!
          </v-card-title>
          <v-card-text>
            Tbinge is a desktop application that serves as a personal movie and TV show catalog. Easily keep track of movies an tv shows you've watched to include rating them and marking them watched.
            <br>
            <br>
            <span class="font-weight-bold">Offline Limitations:</span> Some functions of tbinge require internet to work such as searching the TMDB library.
          </v-card-text>
          <v-divider />
          <v-card-actions>
            <v-spacer />
            <v-btn
              color="primary"
              @click="welcomeDialog = false"
            >
              Close
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>

    <v-navigation-drawer
      v-model="drawer"
      temporary
      fixed
      right
    >
      <v-list class="pa-1 my-1">
        <v-list-item>
          <v-list-item-content class="pa-1">
            <v-text-field
              v-model="searchInputTmdb"
              text
              solo-inverted
              hide-details
              clearable
              prepend-inner-icon="search"
              :label="'TMDB ' + mediaType"
            />
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-alert
        v-model="isSearchError"
        type="error"
        outlined
      >
        {{ errorMessage }}
      </v-alert>
      <v-flex
        v-for="result in searchResults"
        :key="result.id"
        xs12
      >
        <v-card
          color="secondary lighten-2"
          class="white--text ma-2 pa-1"
        >
          <v-layout>
            <v-flex xs5>
              <v-img
                v-if="!(result.poster_path === null)"
                :src="getPosterURL(result.poster_path)"
                height="125px"
                contain
              />
            </v-flex>
            <v-flex xs7>
              <v-card-title primary-title>
                <div>
                  <div class="headline">
                    {{ result[titleNameFormat] }}
                  </div>
                  <div v-if="getYear(result) !== ''">
                    ({{ getYear(result) }})
                  </div>
                </div>
              </v-card-title>
            </v-flex>
          </v-layout>
          <v-divider light />
          <v-card-actions class="pa-2">
            <v-btn
              text
              small
              @click.prevent="viewTmdbDetail(result.id)"
            >
              Details
            </v-btn>
            <v-spacer />
            <v-btn
              text
              small
              color="primary lighten-2"
              @click.once.prevent="addTmdbEntry(result.id)"
            >
              Add to Library
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-navigation-drawer>

    <v-dialog
      v-model="isDialogDisplayed"
      transition="dialog-bottom-transition"
    >
      <details-dialog
        v-bind="this.selectedDetail"
        @cancel="isDialogDisplayed = false"
        @delete="isDialogDisplayed = false"
        @requestDeletion="deleteEntry"
        @requestRatingUpdate="updateRating"
        @requestWatchedUpdate="updateWatched"
      />
    </v-dialog>
  </v-layout>
</template>

<script>
  import DetailsDialog from '@/components/DetailsDialog'
  import _ from 'lodash'
  import tmdbSearch from '@/tmdb/search'
  import tmdbRating from '@/tmdb/rating'

  export default {
    components: {
      DetailsDialog
    },
    props: {
      mediaType: String,
      titleNameFormat: String,
      releaseDateFormat: String,
      isTV: Boolean
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
      errorMessage: '',
      welcomeDialog: false
    }),
    computed: {
      // Returns the list of TV Shows and Movies. If there is a value in the search bar,
      // the return is a filtered array of all entries that include the input string
      filteredList () {
        try {
          return this.localMedia.filter(entry =>
            entry[this.titleNameFormat]
              .toLowerCase()
              .includes(this.searchInput.toLowerCase())
          )
        } catch (err) {
          return this.localMedia
        }
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
        this.getLocalMedia(localMedia => {
          this.localMedia = localMedia
        })
        this.searchInput = ''
      },
      // Whenever the detailed dialog box is closed, checks to see if local media has changed (deleted)
      isDialogDisplayed: function () {
        if (!this.isDialogDisplayed) {
          this.getLocalMedia(localMedia => {
            this.localMedia = localMedia
          })
        }
        this.selectedDetail.isDialogDisplayed = this.isDialogDisplayed
      }
    },
    created () {
      // Loads the NeDB database for use
      this.$db.loadDatabase(function (error) {
        if (error) {
          console.log(
            'FATAL: Local database could not be loaded. Caused by: ' + error
          )
          throw error
        } else {
          console.log('INFO: local database loaded successfully.')
        }
      })

      // Initialize the local media list
      this.getLocalMedia(localMedia => {
        this.localMedia = localMedia
        // Check if welcome should be shown
        if (this.localMedia.length === 0) this.welcomeDialog = true
      })

      // Set timeout for the tmdb media search
      this.debouncedSearchTMDB = _.debounce(this.searchTMDB, 750)
    },
    methods: {
      // Shows a detailed view of an entry already in the user's database
      viewDetail (givenId) {
        this.selectedDetail = this.buildProps(
          this.localMedia.filter(item => item.id === givenId)[0],
          false
        )

        this.isDialogDisplayed = true
      },
      // Shows a detailed view of an entry in the TMDb search drawer
      viewTmdbDetail (givenId) {
        // Assign entry to a temp value
        let mediaEntry = this.searchResults.filter(
          item => item.id === givenId
        )[0]

        // Search for the trailer to show in the details window if not already found
        if (!mediaEntry.trailer) {
          this.getTrailer(mediaEntry, (trailerKey, component) => {
            mediaEntry.trailer = trailerKey
            component.selectedDetail = component.buildProps(mediaEntry, true)

            component.isDialogDisplayed = true
          })
        // If trailer was already found in previous search, just show the details window
        } else {
          this.selectedDetail = this.buildProps(mediaEntry, true)

          this.isDialogDisplayed = true
        }
      },
      // Searches TMDb website for a matching movie/TV show
      searchTMDB () {
        // Reset error message whenever a new search is ran
        this.errorMessage = ''
        this.isSearchError = false

        tmdbSearch.searchTMDB(
          this.searchInputTmdb,
          this.isTV,
          (errorMessage, searchResults) => {
            if (errorMessage) {
              this.errorMessage = errorMessage
              this.isSearchError = true
            } else {
              this.searchResults = searchResults.results
            }
          }
        )
      },
      // Adds the selected entry into the database
      addTmdbEntry (givenId) {
        // Load entry information into temp variable
        let media = this.searchResults.find(result => result.id === givenId)

        // Check to see if the entry is already stored in the database
        if (this.localMedia.find(duplicate => duplicate.id === media.id)) {
          alert(
            `${
              media[this.titleNameFormat.toLowerCase()]
            } is already stored in your database!`
          )
        } else {
          // Add additional properties to entry for use in local database functions
          media.mediaType = this.mediaType.toLowerCase()
          media.isWatched = false
          media.rating = 0

          // Insert new media entry into database after getting trailer
          this.getTrailer(media, (trailer, component) => {
            media.trailer = trailer
            this.$db.insert(media, function (error, newDoc) {
              if (error) {
                console.log(
                  'ERROR: saving document: ' +
                    { unsavedDoc: newDoc } +
                    '. Caused by: ' +
                    error
                )
                throw error
              } else {
                component.localMedia.push(newDoc)
              }
            })
          })
        }
      },
      // Updates the rating of the media entry
      updateRating (givenId, newRating) {
        // Create variable to access 'this' inside of callback functions
        let self = this
        // Check to see if the user has already opened a guest session id with tmdb
        this.$db.find({ guestSessionID: { $exists: true } }, function (
          error,
          docs
        ) {
          if (error) {
            throw error
          } else {
            // If no guest session is stored, then request a new guest session id
            if (docs.length === 0) {
              tmdbRating.createGuestSession(function (error, newGuestSessionID) {
                if (error) {
                  throw error
                } else {
                  // If no errors in receiving guest session id, store in the database
                  self.addGuestSession(newGuestSessionID, function (
                    error,
                    newDoc
                  ) {
                    if (error) {
                      console.log(
                        'ERROR: storing guest session id: ' +
                          { unsavedGuestSession: newDoc } +
                          '. Caused by: ' +
                          error
                      )
                      throw error
                    } else {
                      // Send rating to TMDb website after generating new guest session id
                      self.postRatingToTMDB(
                        givenId,
                        newRating,
                        newDoc.guestSessionID.guest_session_id
                      )
                    }
                  })
                }
              })
            } else {
              console.log(
                'Found a guest session ID: ' +
                  docs[0].guestSessionID.guest_session_id
              )
              // Send rating to TMDb website
              self.postRatingToTMDB(
                givenId,
                newRating,
                docs[0].guestSessionID.guest_session_id
              )
            }
          }
        })

        // Update the rating in the local database
        this.$db.update(
          { id: givenId },
          { $set: { rating: newRating } },
          {},
          function (error, ratingUpdated) {
            if (error) {
              console.log(
                'ERROR: updating rating for document: ' +
                  { idToUpdate: givenId } +
                  '. Caused by: ' +
                  error
              )
              throw error
            }
          }
        )
      },
      // Adds the guest session id to the database
      addGuestSession (newGuestSessionID, callback) {
        this.$db.insert({ guestSessionID: newGuestSessionID }, function (
          error,
          newDoc
        ) {
          if (error) {
            console.log(
              'ERROR: storing guest session id: ' +
                { unsavedGuestSession: newDoc } +
                '. Caused by: ' +
                error
            )
            callback(error)
          } else callback(undefined, newDoc)
        })
      },
      // Posts the input rating to the TMDB website
      postRatingToTMDB (givenId, newRating, guestSessionID) {
        tmdbRating.rate(
          givenId,
          this.isTV,
          newRating * 2,
          guestSessionID,
          function (error, response) {
            if (error) console.log('ERROR: sending new rating due to: ' + error)
            else {
              console.log(response.status_message)
            }
          }
        )
      },
      // Updates the watched status of the media entry
      updateWatched (givenId, newWatched) {
        this.$db.update(
          { id: givenId },
          { $set: { isWatched: newWatched } },
          {},
          function (error, watchedUpdated) {
            if (error) {
              console.log(
                'ERROR: updating watched status for document: ' +
                  { idToUpdate: givenId } +
                  '. Caused by: ' +
                  error
              )
              throw error
            }
          }
        )
      },
      // Deletes the selected entry from the database
      deleteEntry (givenId) {
        this.$db.remove({ id: givenId }, {}, function (error, numRemoved) {
          if (error) {
            console.log(
              'ERROR: deleting document: ' +
                { idToDelete: givenId } +
                '. Caused by: ' +
                error
            )
            throw error
          }
        })

        this.isDialogDisplayed = false
      },
      // Returns the URL of the poster images
      getPosterURL (posterPath) {
        if (posterPath) {
          return 'https://image.tmdb.org/t/p/w600_and_h900_bestv2' + posterPath
        }
        return require('@/assets/noimg.png')
      },
      // Returns an array of either all movies or all TV shows
      getLocalMedia (callback) {
        this.$db.find({ mediaType: this.mediaType.toLowerCase() }, function (
          error,
          docs
        ) {
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
      // Returns the trailer information for the input entry if found
      getTrailer (entry, callback) {
        tmdbSearch.detailedSearch(
          entry.id,
          this.isTV,
          (errorMessage, searchResults) => {
            if (errorMessage) {
              console.log(`Cannot get trailer: ${errorMessage}`)
              callback(undefined, this)
            } else {
              if (searchResults.videos.results.length > 0) {
                let trailers = searchResults.videos.results.filter(
                  entry => entry.type === 'Trailer'
                )
                if (trailers.length !== 0) {
                  callback(trailers[0].key, this)
                } else {
                  // eslint-disable-next-line
                callback("", this);
                }
              // eslint-disable-next-line
            } else callback("", this);
            }
          }
        )
      },
      // Builds object to pass to DetailsDialog as props
      buildProps (entry, isSearchDetail) {
        let propObject = {
          id: entry.id,
          title: entry[this.titleNameFormat.toLowerCase()],
          year: this.getYear(entry),
          isWatched: entry.isWatched,
          voteAverage: entry.vote_average,
          trailer: entry.trailer ? entry.trailer : '',
          rating: entry.rating,
          voteCount: entry.vote_count,
          description: entry.overview,
          isSearchDetail
        }
        return propObject
      }
    }
  }
</script>

<style lang="sass">
.entry-img
  cursor: pointer
.searchbar
  padding-left: 75px !important

.start
  position: fixed
  bottom: 60px
  right: 100px
</style>
