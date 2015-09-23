var gulp		= require( 'gulp' );

var options		= require( '../utils/options' );
var paths		= require( '../utils/paths' );

var inquirer	= require( 'inquirer' );
var recursive	= require( 'recursive-readdir' );
var fs			= require( 'fs' );

// var config		= require( '../../' + paths.env.dev + paths.configs.config.configFile );



gulp.task( 'rename-js-app', function() {
	
	var currentJsAppName = getJsAppName();
	
	inquirer.prompt(
		[
			{
				type:		'input',
				name:		'jsAppName',
				message:	'Named the JS app:',
				default:	'current name is: ' + currentJsAppName
			}/*,
			{
				type:		'confirm',
				name:		'namedJsApp',
				message:	'Set JS app name?'
			}*/
		], function( answers ) {
			
			// if ( !answers.namedJsApp )
			// 	return;
			
			var newJsAppName = answers.jsAppName.toUpperCase();
			
			// console.log( answers.jsAppName );
			// console.log( paths.env.dev + paths.assets.js.app.allFiles );
			
			// var jsFilesList = fs.readdirSync( paths.env.dev + paths.assets.js.app.dir );
			
			// console.log( jsFilesList );
			
			
			// console.log( paths.env.dev + paths.assets.js.app.dir );
			
			recursive( paths.env.dev + paths.assets.js.app.dir, [ '.*' ], function ( err, filesList ) {
				// Files is an array of filename 
				// console.log( filesList );
				
				var isInitFile;
				for ( var i = 0; i < filesList.length; i++ ) {
					// console.log( filesList[i] );
					
					isInitFile = filesList[i] == paths.env.dev + paths.assets.js.app.initFile ? true : false;
					
					renameApp( filesList[i], currentJsAppName, newJsAppName, isInitFile );
				}
				
			});
			
		}
	);
	
} );



function getJsAppName() {
	var data		= fs.readFileSync( paths.env.dev + paths.assets.js.app.initFile, 'utf8' );
	var startPos	= data.indexOf( 'var ' ) + 4;
	var endPos		= data.indexOf( ' = ' );
	var jsAppName	= data.substring( startPos, endPos );
	
	return jsAppName;
}


function renameApp( filePath, currentJsAppName, newJsAppName, isInitFile ) {
	var stringToReplace	= isInitFile ? currentJsAppName : currentJsAppName + '.';
	var newString		= isInitFile ? newJsAppName : newJsAppName + '.';
	
	// console.log( stringToReplace, newString );
	
	var data	= fs.readFileSync( filePath, 'utf8' );
	// data		= data.replace( '/\\' + stringToReplace + '/g', newString + '.' );
	data		= data.replace( new RegExp( '\\' + stringToReplace, 'g' ), newString );
	// var regex = new RegExp( '\\' + stringToReplace, 'g' )
	// console.log( regex );
	fs.writeFileSync( filePath, data, 'utf8' );
}



/*function titleCase( string ) {
	return string.replace( /\w\S* /g, function( txt ) {
		return txt[0].toUpperCase() + txt.substr(1).toLowerCase();
	});
}


function upperCaseFirstLetter( string ) {
	return string[0].toUpperCase() + string.slice(1);
}


function lowerCaseFirstLetter( string ) {
	return string[0].toLowerCase() + string.slice(1);
}


function createFile( file, destFilePath, aStringToReplace, aNewString ) {
	var data    = fs.readFileSync( paths.env.base + file, 'utf8' );
	var stringToReplace, newString;
	
	for ( var i = 0; i < aStringToReplace.length; i++ ) {
		stringToReplace	= aStringToReplace[i];
		newString		= aNewString[i];
		
		data			= data.replace( new RegExp( '\\' + stringToReplace, 'g' ), newString );
	}
	
	
	if ( file == 'page-name-content.php' ) { // necessary to create a file for each language
		var lang, destFilePathTemp, dataTemp;
		
		for ( var i = 0; i < config.ALL_LANG.length; i++ ) {
			lang = config.ALL_LANG[i];
			
			destFilePathTemp	= destFilePath.replace( 'LANG', lang );
			dataTemp			= data.replace( new RegExp( '\\' + aNewString[2], 'g' ), aNewString[2] + ' / ' + lang );
			
			fs.writeFileSync( destFilePathTemp, dataTemp, 'utf8' );
		}
	}
	else
		fs.writeFileSync( destFilePath, data, 'utf8' );
	
}*/