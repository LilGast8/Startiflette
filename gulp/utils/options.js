var options	= require( 'minimist' )( process.argv.slice(2) );
var paths	= require( '../utils/paths' );



options.imageMin	= true;

options.device		= null;

options.cssSrcPath	= null;
options.jsSrcPath	= null;
options.jsonSrcPath	= null;

options.deletePath	= null;



options.tasks = {
	init : false,
	prod : false
}

if ( options._[0] == '' )
	options.tasks.default = true;
else if ( options._[0] == 'init' )
	options.tasks.init = true;
else if ( options._[0] == 'prod' )
	options.tasks.prod = true;
else
	options.tasks.default = true;
console.log('--------> TASKS:', options.tasks);


module.exports	= options;