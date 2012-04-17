define(['jquery'], function($) {
	var parser = {

		parse: function(css, instance) {
			css = this.compress(css);
			css = this._prep(css);

			var blocks = css.match(/^([^@\{\}%]+) ?\{(.+?(?=\}))/gm);
			var ret = [];

			if ( instance ) {
				this.saveToInstance(blocks, instance);
			}

			$.each(blocks, function(i, fragment ) {
				var selector = /^[^{]+/.exec(fragment)[0].slice(0, -1),
					declarations = /\{[^\}]+/.exec(fragment)[0].replace(/\{ ?/, ''),
					lines = declarations.split(';'),
					obj = {};

				// For each line (or prop: value)
				$.each(lines, function(index, declaration) {
					var result = parser._splitForEachLine(declaration);

					if ( result ) {
						obj[result[0]] = result[1];
					}
				});

				ret.push({
					selector: selector,
					declarations: obj
				});
			});

			// If only one item is in the array, just return an object
			if ( ret.length === 1 ) {
				ret = ret[0];
			}

			return ret;
		},

		_prep: function(css) {
			// Makes it easier for me. Will probably remove it.
			return css.replace(/((?:@import[^;]+;)|(?:\} ?))/g, "$1\n");
		},

		compress: function(css) {
			return css.replace(/([\{\};])\s*/g, "$1");
		},

		_splitForEachLine: function(declaration) {
			var split = declaration.split(':'),
				property = $.trim(split[0]),
				val = $.trim(split[1]);

			if ( property && val ) {
				return [property, val];
			}

			return false;
		},

		saveToInstance: function(code, instance) {
			instance.blocks = code;
		}
	};

	return parser;
});