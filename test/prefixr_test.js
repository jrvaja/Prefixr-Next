if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(['modules/prefixr'], function(Prefixr) {
	describe("Prefixr", function() {
		var prefixr,
			simpleCSS = "div { margin: 0; }";

		beforeEach(function() {
			prefixr = Object.create(Prefixr);
			prefixr.init(simpleCSS);
		});

		it("should be defined", function() {
			prefixr.should.exist;
		});

		it("stores the CSS on the instance", function() {
			prefixr.css.should.equal(simpleCSS);
		});

		it("should store all of the prefixes", function() {
			prefixr.allPrefixes.should.be.an.instanceOf(Array);
			prefixr.allPrefixes.should.have.lengthOf(4);
		});

		describe("#setPrefixes", function() {
			beforeEach(function() {
				prefixr.setPrefixes(['webkit', 'moz']);
			});

			it("should allow the user to specify which prefixes they want to support", function() {
				prefixr.setPrefixes(['moz', 'webkit']);
				prefixr.allPrefixes.should.have.lengthOf(2);
			});
		});

	});

});

