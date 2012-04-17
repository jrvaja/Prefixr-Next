define(['modules/parser'], function(parser) {

	describe("Parser", function() {
		var css = 'div { box-shadow: none; }';

		it("should parse the provided CSS into an object, which contains the selector, and declarations", function() {
			var result = parser.parse(css);

			result.should.be.a('Object');
			result.declarations['box-shadow'].should.exist;
			result.selector.should.equal('div');
		});

		it("should return an array of objects, if more than one block is passed", function() {
		 	var result = parser.parse('div { margin: 0; } a { padding: 10px; }');
		 	result.should.be.an.instanceOf(Array);
		 	result[1].declarations.padding.should.equal('10px');
		});
	});

});