module.exports = {
	
	env: {
		base:	'base/',
		dev:	'dev/',
		prod:	'www/'
	},
	
	emptyFiles:	'**/empty-folder.txt',
	
	htaccess:	'.htaccess',
	indexFile:	'index.php',
	robots:		'robots.txt',
	htmlFiles:	'*.html',
	
	assets: {
		allFiles: 'assets/**/*',
		
		_3d: {
			dir: 'assets/3d/',
			allFiles:	'assets/3d/**/*',
			
			models: {
				dir:		'assets/3d/models/',
				allFiles:	'assets/3d/models/**/*',
			},
			
			shaders: {
				dir:		'assets/3d/shaders/',
				allFiles:	'assets/3d/shaders/**/*',
			},
			
			textures: {
				dir:		'assets/3d/textures/',
				allFiles:	'assets/3d/textures/**/*',
			}
		},
		
		css: {
			dir:			'assets/css/',
			allMinFiles:	'assets/css/*.css',
			
			app: {
				allRootSCSSFiles:	'assets/css/app/*.scss',
				allSCSSFiles:		'assets/css/app/**/*.scss',
				desktopFile:		'assets/css/app/styles-desktop.scss',
				mobileFile:			'assets/css/app/styles-mobile.scss',
				
				desktop: {
					pages:		'assets/css/app/desktop/pages/',
					partials:	'assets/css/app/desktop/partials/',
					statics:	'assets/css/app/desktop/statics/'
				},
				
				mobile: {
					pages:		'assets/css/app/mobile/pages/',
					partials:	'assets/css/app/mobile/partials/',
					statics:	'assets/css/app/mobile/statics/'
				}
			},
			
			fonts: {
				dir:		'assets/css/fonts/',
				allFiles:	'assets/css/fonts/**/*'
			},
			
			maps: {
				dir:		'assets/css/maps/',
				allFiles:	'assets/css/maps/**/*'
			}
		},
		
		favicons:	{
			dir: 		'assets/favicons/',
			allFiles:	'assets/favicons/**/*'
		},
		
		files: {
			dir:		'assets/files/',
			allFiles:	'assets/files/**/*'
		},
		
		img: {
			dir:		'assets/img/',
			allFiles:	'assets/img/**/*',
			allJpg:		'assets/img/**/*.jpg',
			allPng:		'assets/img/**/*.png'
		},
		
		js: {
			dir:			'assets/js/',
			allRootJsFiles:	'assets/js/*.js',
			allJsFiles:		'assets/js/**/*.js',
			
			app: {
				dir:				'assets/js/app/',
				allJsFiles:			'assets/js/app/**/*.js',
				initFile:			'assets/js/app/InitApp.js',
				desktopAllFiles:	'assets/js/app/desktop/**/*.js',
				mobileAllFiles:		'assets/js/app/mobile/**/*.js',
				sharedAllFiles:		'assets/js/app/shared/**/*.js',
				
				desktop: {
					views: {
						pages:		'assets/js/app/desktop/views/pages/',
						partials:	'assets/js/app/desktop/views/partials/',
						statics:	'assets/js/app/desktop/views/statics/'
					}
				},
				
				mobile: {
					views: {
						pages:		'assets/js/app/mobile/views/pages/',
						partials:	'assets/js/app/mobile/views/partials/',
						statics:	'assets/js/app/mobile/views/statics/'
					}
				}
			},
			
			maps: {
				dir:		'assets/js/maps/',
				allFiles:	'assets/js/maps/**/*'
			},
			
			vendor: {
				dir: 'assets/js/vendor/'
			}
		},
		
		json: {
			dir:		'assets/json/',
			allFiles:	'assets/json/**/*.json'
		},
		
		sounds: {
			dir:		'assets/sounds/',
			allFiles:	'assets/sounds/**/*'
		},
		
		svg: {
			dir:		'assets/svg/',
			allFiles:	'assets/svg/*.svg',
			
			sprite: {
				dir:		'assets/svg/_sprite/',
				allFiles:	'assets/svg/_sprite/*.svg'
			}
		},
		
		videos: {
			dir:		'assets/videos/',
			allFiles:	'assets/videos/**/*'
		}
	},
	
	configs: {
		dir:				'configs/',
		allFiles:			'configs/**/*',
		allRootJsonFiles:	'configs/*.json',
		allJsonFiles:		'configs/**/*.json',
		configFile:			'configs/config.json',
		jsFilesFile:		'configs/js-files.json',
		routesFile:			'configs/routes.json',
		uIdFile:			'configs/u-id.json',
		
		favicons: {
			dir:		'configs/favicons/',
			allFiles:	'configs/favicons/*.json',
			configFile:	'configs/favicons/config.json',
			dataFile:	'configs/favicons/faviconData.json',
			srcFile:	'configs/favicons/favicons.twig'
		},
		
		routes: {
			dir:		'configs/routes/',
			allFiles:	'configs/routes/*.json'
		}
	},
	
	server: {
		dir:		'server/',
		allFiles:	'server/**/*',
		
		contents: 'server/contents/',
		
		core: {
			controllers: {
				pages:		'server/core/controllers/pages/',
				partials:	'server/core/controllers/partials/',
				statics:	'server/core/controllers/statics/'
			}
		},
		
		vendor: {
			allFiles: 'server/vendor/**/*',
		},
		
		views: {
			desktop: {
				pages:		'server/views/desktop/pages/',
				partials:	'server/views/desktop/partials/',
				statics:	'server/views/desktop/statics/'
			},
			mobile: {
				pages:		'server/views/mobile/pages/',
				partials:	'server/views/mobile/partials/',
				statics:	'server/views/mobile/statics/'
			},
			shared: {
				dir: 'server/views/shared/'
			}
		}
	}
	
};