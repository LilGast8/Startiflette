var gulp	= require( 'gulp' );
var path	= require( 'path' );

var options	= require( '../utils/options' );
var paths	= require( '../utils/paths' );

var plumber	= require( 'gulp-plumber' );
var notify	= require( 'gulp-notify' );
var sass	= require( 'gulp-ruby-sass' );
var rename	= require( 'gulp-rename' );



gulp.task( 'sass', ['delete'], function() {
	
	if ( options.cssSrcPath === null )
		options.cssSrcPath = [
			paths.env.dev + paths.assets.css.app.desktopFile,
			paths.env.dev + paths.assets.css.app.mobileFile
		];
	
	
	// parse cssSrcPath
	// for ( var i = 0; i < options.cssSrcPath.length; i++ ) {
		
		return gulp.src( options.cssSrcPath )
			.pipe( plumber() )
			.pipe( sass({
				style: 'compressed',
				// style: 'expanded',
				compass: true,
				'sourcemap=none': true
			}) )
			.on( 'error', function(error) {
				console.log( error.message );
				return notify().write( options.device + ': ' + path.basename( error.message ) );
			} )
			.pipe( rename( {suffix : '.min'} ) )
			.pipe( gulp.dest( paths.env.dev + paths.assets.css.dir ) );
		
	// }
	
});


gulp.task( 'sass:dev', ['delete'], function() {
	gulp.start( 'move' );
});


gulp.task( 'sass:prod', ['sass'], function() {
	gulp.start( 'move' );
});


