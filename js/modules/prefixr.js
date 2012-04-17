if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(['modules/parser', 'modules/css3'], function(parser, css3Props) {
	var prefixr = {

		init: function(css) {
			this.css = css;
			this.css3Properties = css3Props;

			return this;
		},

		allPrefixes: ['-webkit-', '-moz-', '-o-', '-ms-'],

		setPrefixes: function(prefixes) {
			this.allPrefixes = $.map(prefixes, function(prefix) {
				return '-' + prefix + '-';
			});
		},

		optimize: function() {
			this.parsedCSS = parser.parse(this.css);
			this.applyCSS3();
			this.parsedCSS = this.arrayToObject(this.parsedCSS);

			return this.parsedCSS;
		},

		applyCSS3: function() {
			var self = this;

			self.parsedCSS = $.map( [].concat(self.parsedCSS), function(block) {
				self._detectProperties(block.declarations || block);
				return block;
			});
		},

		_detectProperties: function(block) {
			var self = this;

			$.each(self.css3Properties.properties, function(i, property) {
				var name = property.name,
					propertyPrefixes = property.prefixes;

				// is there an official version of the CSS3 property?
				if ( block.hasOwnProperty(name) ) {
					block = self._updatePrefixes(block, name, propertyPrefixes);
				} else {
					// then are there vendor versions of this property?
					$.each(self.allPrefixes, function(i, vendor) {
						if ( block.hasOwnProperty(vendor + name) ) {
							// Yes? Then there should be an official version too
							block[name] = block[vendor + name];

							block = self._updatePrefixes(block, name, propertyPrefixes);

							return false; // break
						}
					});
				}
			});

			return block;
		},

		_updatePrefixes: function(block, propertyName, propertyPrefixes) {
			var self = this;

			$.each( this.allPrefixes, function(i, vendor) {
				// Make sure that if there's a prefixed property that is unnecessary now, delete it.
				if ( $.inArray(vendor, propertyPrefixes) === -1 ) {
					block = self._modifyPrefix('delete', block, vendor, propertyName);
				} else {
					// if a prefixed version should be there, but is not, then add it
					if ( !block.hasOwnProperty(vendor + propertyName) ) {
						block = self._modifyPrefix('add', block, vendor, propertyName);
						}
				}
			});

			return block;
		},

		_modifyPrefix: function(action, block, vendor, propertyName) {
			var lookup = {
				'delete': function() {
					delete block[vendor + propertyName];
				},
				'add': function() {
					block[vendor + propertyName] = block[propertyName];
				}
			}[action]();

			return block;
		},

		arrayToObject: function(arr) {
			if ( arr.length === 1 ) {
				return arr[0];
			}

			return arr;
		}

	};

	return prefixr;
});