/* 
*  This module tests the "/src/tmdb/rating.js" module for proper functionality
*  using the Mocha testing framework and the 'expect' functionality from Chai 
*  Author: Kyle McCain
*  Date: 22 February 2019
*/
const expect = require('chai').expect;
const tmdbSearch = require("../src/tmdb/rating");

// Conducts tests for the rate() function
describe('Rating Subsystem', () => {
    describe('rate function', () => {
        it('rating a movie', (done) => {
            tmdbSearch.rate(27205, false, 10, (errorMessage, ratingSuccess) => {
                if (errorMessage) {
                    done(new Error(errorMessage));
                } else {
                    expect(ratingSuccess.status_message).to.be.oneOf(["Success.", "The item/record was updated successfully."]);
                    done();
                }
            });
        });

        it('rating a TV show', (done) => {
            tmdbSearch.rate(46648, true, 10, (errorMessage, ratingSuccess) => {
                if (errorMessage) {
                    done(new Error(errorMessage));
                } else {
                    expect(ratingSuccess.status_message).to.be.oneOf(["Success.", "The item/record was updated successfully."]);
                    done();
                }
            });
        });
    });
});