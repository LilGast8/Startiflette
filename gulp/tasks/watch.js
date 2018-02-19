var gulp		= require( 'gulp' );
var path		= require( 'path' );

var options		= require( '../utils/options' );
var paths		= require( '../utils/paths' );

var livereload	= require( 'gulp-livereload' );



gulp.task( 'watch', function() {
	
	livereload.listen();
	
	
	/* Tasks management */
	gulp.watch( [
		
		/* htaccess */
		paths.env.base + paths.htaccess,
		
		/* Assets */
		paths.env.dev + paths.assets.css.app.allSCSSFiles,
		paths.env.dev + paths.assets.js.allJsFiles,
		'!' + paths.env.dev + paths.assets.js.allRootJsFiles,
		paths.env.dev + paths.assets.json.allFiles,
		paths.env.dev + paths.assets.svg.allFiles,
		
		/* Config */
		paths.env.dev + paths.configs.allFiles,
		'!' + paths.env.dev + paths.configs.favicons.dataFile,
		
	], function( e ) {
		
		var ext, desktop, mobile, shared, favicons, configs;
		var taskname = null;
		
		options.filePath	= e.path;
		ext					= path.extname( options.filePath );
		options.fileName	= path.basename( options.filePath );
		// console.log( '🛤', options.filePath );
		
		desktop		= options.filePath.indexOf( '/desktop/' ) > -1 ? true : false;
		mobile		= options.filePath.indexOf( '/mobile/' ) > -1 ? true : false;
		shared		= options.filePath.indexOf( '/shared/' ) > -1 ? true : false;
		favicons	= options.filePath.indexOf( '/configs/favicons/' ) > -1 ? true : false;
		configs		= options.filePath.indexOf( '/configs/' ) > -1 ? true : false;
		
		
		/* htaccess */
		if ( options.fileName == '.htaccess' ) {
			taskname = 'htaccess';
		}
		
		/* SASS */
		else if ( ext == '.scss' ) {
			taskname = 'sass';
			
			if ( desktop )
				options.cssSrcPath = [ paths.env.dev + paths.assets.css.app.desktopFile ];
			else if ( mobile )
				options.cssSrcPath = [ paths.env.dev + paths.assets.css.app.mobileFile ];
			else if ( shared )
				options.cssSrcPath = [
					paths.env.dev + paths.assets.css.app.desktopFile,
					paths.env.dev + paths.assets.css.app.mobileFile
				];
			
			// options.devicePath: used for SASS error notification
			if ( desktop )
				options.devicePath = 'desktop';
			else if ( mobile )
				options.devicePath = 'mobile';
			else if ( shared )
				options.devicePath = 'shared';
		}
		
		/* Favicons */
		if ( favicons ) {
			taskname		= 'favicons';
			options.subtask	= 'default-favicons';
		}
		
		/* JS */
		else if ( ext == '.js' ) {
			taskname		= 'js';
			options.subtask	= 'default-js';
			
			// if ( desktop )
			// 	options.jsSrcPath = paths.env.dev + paths.assets.js.app.desktopAllFiles;
			// else if ( mobile )
			// 	options.jsSrcPath = paths.env.dev + paths.assets.js.app.mobileAllFiles;
			// else if ( shared )
			// 	options.jsSrcPath = paths.env.dev + paths.assets.js.app.sharedAllFiles;
			
			// console.log( '🐯', options.jsSrcPath );
		}
		
		/* JSON */
		else if ( ext == '.json' ) {
			taskname = 'json';
			
			if ( configs )
				options.jsonSrcPath = paths.env.dev + paths.configs.allRootJsonFiles;
			else
				options.jsonSrcPath = paths.env.dev + paths.assets.json.allFiles;
		}
		
		/* SVG */
		else if ( ext == '.svg' ) {
			taskname = 'svg';
			
			options.svgSrcPath = [ paths.env.dev + paths.assets.svg.allFiles ];
		}
		
		
		if ( taskname )
			gulp.start( taskname );
		
	} );
	
	
	/* Livereload */
	gulp.watch( [
		
		/* htaccess */
		paths.env.dev + paths.htaccess,
		
		/* CSS */
		paths.env.dev + paths.assets.css.allMinFiles,
		
		/* JS */
		// paths.env.dev + paths.assets.js.allJsFiles,
		// paths.env.dev + paths.assets.js.allRootJsFiles,
		
		/* JSON */
		paths.env.dev + paths.assets.json.allFiles,
		
		/* SVG */
		paths.env.dev + paths.assets.svg.sprite.allFiles,
		
		/* Config */
		paths.env.dev + paths.configs.allFiles,
		'!' + paths.env.dev + paths.configs.favicons.dataFile,
		
		/* Server */
		paths.env.dev + paths.indexFile,
		paths.env.dev + paths.server.allFiles,
		'!' + paths.env.dev + paths.server.vendor.allFiles
		
	] ).on( 'change', livereload.changed );
	
} );