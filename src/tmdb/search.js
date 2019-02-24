/* 
*  This module provides the ability to search TMDb for 
*  movie and TV shows based on their name or id
*  Author: Kyle McCain
*  Date: 19 February 2019
*/
const tmdb = require('./tmdb-api-interface');

// Returns a list of movies or TV Shows based on the input title and isTV value
let searchTMDB = (title, isTV, callback) => {
    // Define options prior to passing it to the tmdbCall function
    let options = { method: 'GET',
        url: tmdb.getSearchURL(isTV),
        qs: 
        {   include_adult: 'false',
            page: '1',
            language: 'en-US',
            query: title
        },
        body: '{}' 
    };
    
    // Call tmdb API and return object to callback function with the 
    // 'errorMessage' as the indicator of whether a search was succesfful
    tmdb.tmbdCall(options, (errorMessage, body) => {
        if (errorMessage) {
            callback(errorMessage);
        } else {
            callback(undefined, body);
        }
    })
};

// Returns a detailed description of a movie or TV show based on the input TMDb id
let detailedSearch = (id, isTV, callback) => {
    // Define options prior to passing it to the tmdbCall function
    let options = { method: 'GET',
        url: tmdb.getDetailedSearchURL(isTV) + id,
        qs: { language: 'en-US' },
        body: '{}' 
    };
    
    // Call tmdb API and return object to callback function with the 
    // 'errorMessage' as the indicator of whether a search was succesfful
    tmdb.tmbdCall(options, (errorMessage, body) => {
        if (errorMessage) {
            callback(errorMessage);
        } else {
            callback(undefined, body);
        }
    })
};

// Export functions for use outside of module
module.exports = {
    searchTMDB,
    detailedSearch
};