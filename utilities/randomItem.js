/**
 * @param {[]} arr - array of items
 * @returns {*} random item from array
 */
module.exports = (arr) => arr[Math.floor(Math.random() * arr.length)];