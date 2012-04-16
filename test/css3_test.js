if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(['modules/css3', 'jquery', 'modules/prefixr'], function(css3, $, prefixr) {

	describe("css3Props", function() {
		it("should be defined", function() {
			css3.should.exist;
		});

		it("should store a list of all the CSS3 properties", function() {
			css3.list.should.include('box-sizing').and.include('transition');
			console.log('css3');
		});

		it("should store the necessary prefixes for every single property", function() {
			css3.properties.should.be.an.instanceOf(Array);
			css3.properties[0].name.should.equal('box-shadow');
		});

		it("should add the CSS3 properties list to the Prefixr namespace", function() {
			prefixr.css3Properties.should.exist;
			prefixr.css3Properties[0].should.have.property('prefixes');
		});
	});

});
