/**
 * @description Encode an SVG image to a data URL.
 * @param {string} svg - The SVG string to encode 
 * @returns {string} - The encoded SVG string
 */
function encodeSvg(svg) {
    return svg.replace('<svg', (~svg.indexOf('xmlns') ? '<svg' : '<svg xmlns="http://www.w3.org/2000/svg"')).replace(/"/g, '\'').replace(/%/g, '%25').replace(/#/g, '%23').replace(/{/g, '%7B').replace(/}/g, '%7D').replace(/</g, '%3C').replace(/>/g, '%3E').replace(/\s+/g, ' ');
};

module.exports = encodeSvg;