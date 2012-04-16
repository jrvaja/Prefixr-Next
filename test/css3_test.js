var requirejs = require('requirejs');
requirejs.config({ nodeRequire: require });

requirejs(['../js/modules/css3', 'jquery'], function(css3, $) {

	describe("css3Props", function() {
		it("should be defined", function() {
			css3.should.exist;
		});

		it("should store a list of all the CSS3 properties", function() {
			css3.list.should.include('box-sizing').and.include('transition');
		});

		it("should store the necessary prefixes for every single property", function() {
			css3.properties.should.exist;
			css3.properties.should.be.an.instanceOf(Array);
			css3.properties[0].name.should.equal('box-shadow');
		});
	});

});
