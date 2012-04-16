if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

	
define(['jquery', 'modules/prefixr'], function($, Prefixr) {
	var fullPropList = [],

		css3 = [],

		setProps = function(obj) {
			$.each( obj.props, function(i, prop) {
				fullPropList.push({
					name: prop,
					prefixes: obj.prefixes
				});
			});
		};

		// setPrefixes = function(prefixList, desiredPrefixes) {
		// 	prefixList = $.grep(prefixList, function(propertyPrefix, i) {
		// 		return $.inArray(propertyPrefix, desiredPrefixes) > -1;
		// 	});

		// 	return prefixList;
		// };

	// moz, webkit
	css3.push({
		prefixes: ['-moz-', '-webkit-'],
		props: [
			'box-shadow',
			'resize',
			'user-select',
			'column-width',
			'column-gap',
			'columns',
			'column-count',
			'background-clip',
			'border-image',
			'background-size'
		]
	});

	// moz, webkit, ms, o
	css3.push({
		prefixes: ['-moz-', '-webkit-', '-ms-', '-o-'],
		props: [
			'transition',
			'transition-delay',
			'transition-duration',
			'transition-property',
			'transition-timing-function',
			'transform',
			'transform-origin',
			'transform-style',
			'animation',
			'animation-name',
			'animation-delay',
			'animation-play-state',
			'animation-fill-mode',
			'animation-timing-function',
			'animation-iteration-count'
		]
	});

	// moz, webkit, ms
	css3.push({
		prefixes: ['-moz-', '-webkit-', '-ms-'],
		props: [
			'box-sizing',
			'box-flex',
			'box-orient',
			'box-align',
			'box-pack',
			'box-ordinal-group'
		]
	});

	// CSS3 properties that no longer require vendor-specific prefixes.
	css3.push({
		prefixes: [],
		props: [
			'border-radius'
		]
	});

	// o, ms
	css3.push({
		prefixes: ['-o-', '-ms-'],
		props: [
			'text-overflow'
		]
	});

	$.each(css3, function(i, obj) {
		setProps(obj);
	});

	// Filter through all of the css3 props, and
	// create an array of css3 props
	// $.each( css3, function(i, propList) {
	// 	propList.prefixes = setPrefixes(propList.prefixes, desiredPrefixes); // need this from instance
	// 	setProps(propList);
	// });

	Prefixr.css3Properties = fullPropList;

	return {
		properties: fullPropList,
		list: function() {
			return $.map(css3, function(obj, i) {
				return obj.props;
			});
		}()
	};

});