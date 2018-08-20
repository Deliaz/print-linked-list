const log = require('./logger').log;

// Colors
const CL = {
	reset: '\x1b[0m',
	blue: '\x1b[34m',
	red: '\x1b[31m',
	yellow: '\x1b[33m'
};

/**
 * Pretty print for Singly Linked List with loops detection
 * @param list {Object} Linked List
 * @param nextName {String} Key name for next node prop. Default = 'next'
 * @param valueName {String} Key name for value prop. Default = 'value'
 * @param output {String} Result output method. Default = 'console'
 * @param colors {Boolean} Use colors in console output. Default = true
 */
module.exports = function (list, {
	nextName = 'next',
	valueName = 'value',
	output = 'console',
	colors = true
} = {}) {

	function cl(colorName) {
		if (colors) {
			if(typeof colorName === 'undefined') {
				return CL['reset'];
			}
			return CL[colorName];
		}
		return '';
	}

	let node = list;
	/*
	 * We can use Map as a storage of seen elements, because it iterates its elements in insertion order.
	 * See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
	 */
	const seen = new Map();

	while (node) {
		if (seen.size) {
			seen.set(node, `${cl('blue')} → ${cl()}${node[valueName]}`);
		} else {
			seen.set(node, `${node[valueName]}`);
		}

		if (seen.has(node[nextName])) {
			if (node !== node[nextName]) { // check for self-loop
				seen.set(node, `${cl('blue')} → ${cl()}${node[valueName]}${cl('red')} ⤇ [loop]`);
				seen.set(node[nextName], `${cl('red')} ⤇ ${cl()}${node[nextName][valueName]}`);
			} else {
				seen.set(node, `${cl('red')} → ${cl()}${node[valueName]}${cl('red')} → [loop]`);
			}

			break;
		}

		node = node[nextName];

		if (node === null) {
			seen.set(node, `${cl('yellow')} → [null]`);
		}
	}

	let str = '';
	seen.forEach((val) => {
		str += val;
	});
	str += cl();

	switch (output) {
		case 'return':
			return str;
		case 'console':
		default:
			log(str);
	}
};