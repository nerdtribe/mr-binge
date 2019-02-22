<template>
  <div class="movies">
    <v-layout justify-center>
      <v-flex xs12 md6 lg6>
        <v-text-field
          flat
          solo-inverted
          hide-details
          prepend-inner-icon="search"
          label="Search Local Movies"
        ></v-text-field>
      </v-flex>
    </v-layout>
    <v-container grid-list-md fluid>
      <v-layout row wrap>
        <v-flex v-for="movie in localMovies" :key="movie.id" xs4 md2 lg1 d-flex class="movie-img">
          <v-card flat tile color="transparent">
            <v-img :src="movie.poster" :aspect-ratio="2/3">

            </v-img>
            <v-card-actions>
              <p class="body-1 mb-0">{{ movie.title }}</p>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  data: () => ({
    localMovies: [
      { movieId: 1, title: 'The Green Mile', voteAverage: 7, voteCount: 111, rating: 3, isWatched: true, poster: 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/sOHqdY1RnSn6kcfAHKu28jvTebE.jpg' },
      { movieId: 2, title: 'Creed II', voteAverage: 5.4, voteCount: 111, rating: null, isWatched: false, poster: 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/v3QyboWRoA4O9RbcsqH8tJMe8EB.jpg' },
      { movieId: 3, title: 'Mary Queen of Scots', voteAverage: 2, voteCount: 111, rating: 4, isWatched: true, poster: 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/b5RMzLAyq5QW6GtN9sIeAEMLlBI.jpg' },
      { movieId: 4, title: 'Alita Battle Angel', voteAverage: 6.2, voteCount: 111, rating: null, isWatched: false, poster: 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/xRWht48C2V8XNfzvPehyClOvDni.jpg' },
      { movieId: 5, title: 'Glass', voteAverage: 6.7, voteCount: 111, rating: 6, isWatched: true, poster: 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/svIDTNUoajS8dLEo7EosxvyAsgJ.jpg' },
      { movieId: 6, title: 'Bohemian Rhapsody', voteAverage: 8.1, voteCount: 111, rating: null, isWatched: false, poster: 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/lHu1wtNaczFPGFDTrjCSzeLPTKN.jpg' },
      { movieId: 7, title: 'Green Book', voteAverage: 2, voteCount: 111, rating: 7.2, isWatched: true, poster: 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/7BsvSuDQuoqhWmU2fL7W2GOcZHU.jpg' },
      { movieId: 8, title: 'Venom', voteAverage: 6.6, voteCount: 111, rating: null, isWatched: false, poster: 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/2uNW4WbgBXL25BAbXGLnLqX71Sw.jpg' }
    ]
  })
}
</script>

<style lang="sass">
.movie-img
 cursor: pointer
</style>
