var gulp	= require( 'gulp' );

var options	= require( '../utils/options' );



gulp.task( 'js', [ 'js-hint' ], function() {
	
	if ( options.task == 'prod' || options.task == 'js' || options.htmlify )
		gulp.start( 'js-min' );
	else
		gulp.start( 'js-concat' );
	
} );