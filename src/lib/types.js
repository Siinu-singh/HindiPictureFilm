// This file previously contained TypeScript interfaces.
// In JavaScript, these type definitions are not used directly in the runtime code.
// JSDoc comments can be used for documentation if desired.

/**
 * @typedef {object} Genre
 * @property {string} id
 * @property {string} name
 */

/**
 * @typedef {object} Movie
 * @property {string} id
 * @property {string} title
 * @property {string} description
 * @property {string} posterUrl
 * @property {string} [bannerUrl]
 * @property {number} releaseYear
 * @property {string[]} genres - Array of genre names
 * @property {number} rating
 * @property {string} duration
 * @property {string} [director]
 * @property {string[]} [cast]
 * @property {string} [trailerUrl]
 */

/**
 * @typedef {object} Banner
 * @property {string} id
 * @property {string} title
 * @property {string} imageUrl
 * @property {string} [movieId] - Optional: link banner to a movie
 * @property {string} [description]
 */
