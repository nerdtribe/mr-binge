/*
*  This module provides the ability to post user ratings
*  of movies or TV shows to the TMDb website
*  Author: Kyle McCain
*  Date: 21 February 2019
*/
const tmdb = require('./tmdb-api-interface')

// Createsa a guest session with TMDb, submits a
// rating and then deletes the guest session
let rate = (id, isTV, rating, callback) => {
  // Define options prior to passing it to the tmdbCall function
  let options = { method: 'POST',
    url: tmdb.getRatingURL(id, isTV),
    qs: {},
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

module.exports = {
  rate
}
