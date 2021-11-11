/**
 * @param {[]} arr - array of items
 * @returns {number} random item from array
 */
const randomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

module.exports = randomItem;