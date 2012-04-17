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

		it("makes the list of CSS3 properties available on the object.", function() {
		  prefixr.css3Properties.should.exist;
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

		describe("#optimize", function() {
			var css3 = 'div { box-shadow: none; }',
				parsed;

			beforeEach(function() {
				prefixr.init(css3);
		  	parsed = prefixr.optimize();
			});

		  it("should parse the CSS and store the result on the instance.", function() {
		  	prefixr.should.have.property('parsedCSS');
		  });

		  it("should add all CSS3 vendor prefixes in the process.", function() {
		   	parsed.declarations.should.have.property('-webkit-box-shadow');
		   	parsed.declarations.should.have.property('-moz-box-shadow');
		   	parsed.declarations.should.have.property('box-shadow');
		  });

		  it("should exclude certain prefixes, if the user specifies it", function() {
		    var p = prefixr.init(css3);

		    p.setPrefixes(['moz']);
		    prefixr.optimize();

		    prefixr.parsedCSS.declarations.should.have.property('-moz-box-shadow');
		    prefixr.parsedCSS.declarations.should.not.have.property('-webkit-box-shadow');
		  });

		  it("should remove unnecessary or invalid prefixes", function() {
		    var css = 'div { box-shadow: none; -ms-box-shadow: none; }';

		    prefixr.init(css).optimize();
		    prefixr.parsedCSS.declarations.should.not.have.property('-ms-box-shadow');
		  });
		});

	});

});

