module.exports = {
	
	env: {
		dev:	'dev/',
		prod:	'dist/'
	},
	
	emptyFiles: '**/empty-folder.txt',
	
	server: {
		indexFile:	'index.php',
		dir:		'server/',
		allFiles:	'server/**/*'
	},
	
	assets: {
		allFiles: 'assets/**/*',
		
		css: {
			dir:			'assets/css/',
			minAllFiles:	'assets/css/*.css',
			
			app: {
				desktopFile:	'assets/css/app/styles-desktop.scss',
				mobileFile:		'assets/css/app/styles-mobile.scss'
			},
			
			fonts: {
				dir:		'assets/css/fonts/',
				allFiles:	'assets/css/fonts/**/*'
			}
		},
		
		img: {
			dir:		'assets/img/',
			allFiles:	'assets/img/**/*'
		},
		
		js: {
			dir:			'assets/js/',
			allFiles:		'assets/js/**/*.js',
			
			app: {
				allFiles:			'assets/js/app/**/*.js',
				desktopAllFiles:	'assets/js/app/desktop/**/*.js',
				mobileAllFiles:		'assets/js/app/mobile/**/*.js',
				sharedAllFiles:		'assets/js/app/shared/**/*.js'
			},
			
			vendors: {
				dir:			'assets/js/vendors/',
				HTML5ShivFile:	'assets/js/vendors/html5shiv.min.js',
			}
		},
		
		json: {
			dir:		'assets/json/',
			allFiles:	'assets/json/**/*.json',
			
			config: {
				dir:			'assets/json/config/',
				allFiles:		'assets/json/config/*.json',
				configFile:		'assets/json/config/config.json',
				jsFilesFile:	'assets/json/config/js-files.json'
			},
			
			routes: {
				dir:			'assets/json/routes/',
				allFiles:		'assets/json/routes/**/*.json',
				concatAllFiles:	'assets/json/routes/*.json'
			}
		}
	}
	
};