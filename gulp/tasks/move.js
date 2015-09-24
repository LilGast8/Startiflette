var gulp	= require( 'gulp' );

var options	= require( '../utils/options' );
var paths	= require( '../utils/paths' );

var plumber	= require( 'gulp-plumber' );



gulp.task( 'move', function() {
	
	/* Prod */
	if ( options.movePath === null && options.task == 'prod' )
		options.movePath = {
			from: [
				[ paths.env.dev + paths.assets.css.minAllFiles ],
				[
					paths.env.dev + paths.assets.css.fonts.allFiles,
					'!' + paths.env.dev + paths.emptyFiles
				],
				[ paths.env.dev + paths.assets.js.vendors.HTML5ShivFile ],
				[ paths.env.dev + paths.assets.svg.sprite.spriteFile ],
				[ paths.env.dev + paths.server.indexFile ],
				[
					paths.env.dev + paths.server.allFiles,
					'!' + paths.env.dev + paths.emptyFiles
				]
			],
			to: [
				paths.env.prod + paths.assets.css.dir,
				paths.env.prod + paths.assets.css.fonts.dir,
				paths.env.prod + paths.assets.js.vendors.dir,
				paths.env.prod + paths.assets.svg.sprite.dir,
				paths.env.prod,
				paths.env.prod + paths.server.dir
			]
		};
	
	
	/* SASS */
	else if ( options.movePath === null && options.task == 'sass' )
		options.movePath = {
			from: [
				[ paths.env.dev + paths.assets.css.minAllFiles ],
				[
					paths.env.dev + paths.assets.css.fonts.allFiles,
					'!' + paths.env.dev + paths.emptyFiles
				]
			],
			to: [
				paths.env.prod + paths.assets.css.dir,
				paths.env.prod + paths.assets.css.fonts.dir
			]
		};
	
	
	/* JS & JS-min */
	else if ( options.movePath === null && ( options.task == 'js' || options.task == 'js-min' ) )
		options.movePath = {
			from: [ paths.env.dev + paths.assets.js.vendors.HTML5ShivFile ],
			to: [ paths.env.prod + paths.assets.js.vendors.dir ]
		};
	
	
	/* SVG */
	else if ( options.movePath === null && ( options.task == 'svg' ) )
		options.movePath = {
			from: [ paths.env.dev + paths.assets.svg.sprite.allFiles ],
			to: [ paths.env.prod + paths.assets.svg.sprite.dir ]
		};
	
	
	/* Image */
	else if ( options.movePath === null && ( options.task == 'image' || options.task == 'image-min' || options.task == 'image-move' ) )
		options.movePath = {
			from: [
				[
					paths.env.dev + paths.assets.img.allFiles,
					'!' + paths.env.dev + paths.emptyFiles
				]
			],
			to: [ paths.env.prod + paths.assets.img.dir ]
		};
	
	
	/* Server */
	else if ( options.movePath === null && options.task == 'server' )
		options.movePath = {
			from: [
				[
					paths.env.dev + paths.server.allFiles,
					'!' + paths.env.dev + paths.emptyFiles
				]
			],
			to: [ paths.env.prod + paths.server.dir ]
		};
	
	
	
	if ( options.movePath !== null ) {
		for ( var i = 0; i < options.movePath.from.length; i++ ) {
			
			gulp.src( options.movePath.from[i] )
				.pipe( plumber() )
				.pipe( gulp.dest( options.movePath.to[i] ) );
			
		}
	}
	
} );