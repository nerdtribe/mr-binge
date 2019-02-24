/* 
*  This module tests the "/src/tmdb/search.js" module for proper functionality
*  using the Mocha testing framework and the 'expect' functionality from Chai 
*  Author: Kyle McCain
*  Date: 20 February 2019
*/
const expect = require('chai').expect;
const tmdbSearch = require("../src/tmdb/search");

// Conducts tests for the searchTMDB() function
describe('Search Subsystem', () => {
    describe('broad search', () => {
        it('searching for a movie', (done) => {
            tmdbSearch.searchTMDB("The Green Mile", false, (errorMessage, searchResults) => {
                if (errorMessage) {
                    done(new Error(errorMessage));
                } else {
                    expect(searchResults.results[0].original_title).to.equal("The Green Mile");
                    done();
                }
            });
        });

        it('searching for a TV Show', (done) => {
            tmdbSearch.searchTMDB("Quantico", true, (errorMessage, searchResults) => {
                if (errorMessage) {
                    done(new Error(errorMessage));
                } else {
                    expect(searchResults.results[0].original_name).to.equal("Quantico");
                    done();
                }
            });
        });
    });

    // Conducts tests for the detailedSearch() function
    describe('detailed search', () => {
        it('searching for a movie', (done) => {
            tmdbSearch.detailedSearch(105, false, (errorMessage, searchResults) => {
                if (errorMessage) {
                    done(new Error(errorMessage));
                } else {
                    expect(searchResults.original_title).to.equal("Back to the Future");
                    done();
                }
            });
        });

        it('searching for a TV Show', (done) => {
            tmdbSearch.detailedSearch(1396, true, (errorMessage, searchResults) => {
                if (errorMessage) {
                    done(new Error(errorMessage));
                } else {
                    expect(searchResults.name).to.equal("Breaking Bad");
                    done();
                }
            });
        });
    });
});