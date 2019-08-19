/*
*  This module provides the ability to post user ratings
*  of movies or TV shows to the TMDb website
*  Author: Kyle McCain
*  Date: 21 February 2019
*/
const tmdb = require('./tmdb-api-interface')
const baseURL = 'https://api.themoviedb.org/3/'

// Createsa a guest session with TMDb, submits a
// rating and then deletes the guest session
const rate = (id, isTV, rating, guestSessionID, callback) => {
  // Define options prior to passing it to the tmdbCall function
  const options = { method: 'POST',
    url: tmdb.getRatingURL(id, isTV),
    qs: { guest_session_id: guestSessionID },
    headers: { 'content-type': 'application/json;charset=utf-8' },
    body: { value: rating },
    json: true
  }

  // Call tmdb API and return object to callback function with the 'errorMessage'
  // as the indicator of whether the rating post was succesfful
  tmdb.tmbdCall(options, (errorMessage, response) => {
    if (errorMessage) {
      callback(errorMessage)
    } else {
      callback(undefined, response)
    }
  })
}

// Creates a guest session with TMDb
const createGuestSession = (callback) => {
  // Define options prior to passing it to the tmdbCall function
  const options = { method: 'GET',
    url: `${baseURL}authentication/guest_session/new`,
    qs: {},
    body: '{}'
  }

  // Call tmdb API and return object to callback function with the
  // 'errorMessage' as the indicator of whether a search was succesfful
  tmdb.tmbdCall(options, (errorMessage, body) => {
    if (errorMessage) {
      callback(errorMessage)
    } else {
      callback(undefined, body)
    }
  })
}

module.exports = {
  rate,
  createGuestSession
}
