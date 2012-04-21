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
				prefixr.parsedCSS.declarations.should.have.property('-webkit-box-shadow');
				prefixr.parsedCSS.declarations.should.have.property('-moz-box-shadow');
				prefixr.parsedCSS.declarations.should.have.property('box-shadow');
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

		  it("should ultimately return a string", function() {
		    var css = 'div { box-shadow: none; -o-transition: all 1s; } #content { box-shadow: none; }';
		    var result = prefixr.init(css).optimize();
		    result.should.be.a('string');
		  });

		  it("should return the properties in the correct order (vendors before official).", function() {
		    var css = 'div { box-shadow: none; -o-transition: all 1s; padding: 0; } #content { box-shadow: 0 0 0 3px red; margin: 10px; } #main { box-shadow: 0 1px 0 black; float: left; display: none; -ms-box-sizing: border-box; }';
		    var result = prefixr.init(css).optimize();

		    result.should.match(/\-box-shadow: none;\s*box-shadow: none;/);
		    result.should.match(/\-ms-transition: all 1s;\s* transition: all 1s;/);
		    result.should.match(/\-box-sizing: border-box;\s* box-sizing: border-box;/);
		  });

		  it("should accept a parameter (defaults to 'default'), that species how the returned CSS should be formatted.", function() {
		    var css = 'div { box-shadow: none; -o-transition: all 1s; padding: 0; } #content { box-shadow: 0 0 0 3px red; margin: 10px; } #main { box-shadow: 0 1px 0 black; float: left; display: none; -ms-box-sizing: border-box; }';
		    var result = prefixr.init(css).optimize();

		    result.should.match(/{\n   /);

		    result = prefixr.init(css).optimize('single');
		    result.should.match(/}\n\n/);
		  });

		});

	it("should properly handle situations when the prefix is not part of the property name, but instead the value - like gradients.", function() {
	  
	});

	});

});

