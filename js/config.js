require.config({
	deps: ['js/main'],
	baseUrl: '/',
	paths: {
		'jquery': 'https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min',
		'modules': 'js/modules'
	}
});

chai.should();
