/**
 * Module for logging
 */
module.exports = {
	log: function() {
		console.log.apply(console, [...arguments]);
	}
};