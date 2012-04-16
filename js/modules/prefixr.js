if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(function() {
	var prefixr = {

		init: function(css) {
			this.css = css;
		},

		allPrefixes: ['-webkit-', 'moz-', '-o-', '-ms-'],

		setPrefixes: function(prefixes) {
			this.allPrefixes = prefixes;
		}

	};

	return prefixr;
});