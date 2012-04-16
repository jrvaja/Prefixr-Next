var tests = [
	'../test/prefixr_test',
	'../test/css3_test'
];

require(tests, function() {
	mocha.run();
});
