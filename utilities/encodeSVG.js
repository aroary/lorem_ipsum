const e = { '"': "'", "%": "%25", "#": "%23", "{": "%7B", "}": "%7D", "<": "%3C", ">": "%3E" };

/**
 * @description Encode an SVG image to a data URL.
 * @param {string} svg - The SVG string to encode 
 * @returns {string} - The encoded SVG string
 */
function encodeSvg(svg) {
    return svg
        .replace('<svg', ~svg.indexOf('xmlns') ? '<svg' : '<svg xmlns="http://www.w3.org/2000/svg"')
        .replace(/["%#{}<>]/g, m => e[m])
        .replace(/\s+/g, ' ');
};

module.exports = encodeSvg;