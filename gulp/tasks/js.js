var gulp	= require( 'gulp' );

var options	= require( '../utils/options' );
var paths	= require( '../utils/paths' );



gulp.task( 'js', ['js-hint'], function() {
	
	if ( options.cleanPath === null )
		options.cleanPath = [ paths.assets.jsFiles, '!' + paths.assets.jsHTML5Shiv ];
	
	gulp.start( 'js-min' );
	
});