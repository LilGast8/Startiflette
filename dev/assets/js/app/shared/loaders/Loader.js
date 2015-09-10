

APP.Loader = ( function( window ) {
	
	
	function Loader( isOnProgress ) {
		APP.EventDispatcher.call( this );
		
		this.isOnProgress = isOnProgress;
		
		this.E = {
			STARTED:	'started',
			FILE_LOAD:	'fileload',
			COMPLETE:	'complete',
			ERROR:		'error'
		};
		
		this.data	= [];
		this.queue	= null;
		
		this.init();
	}
	
	
	Loader.prototype				= Object.create( APP.EventDispatcher.prototype );
	Loader.prototype.constructor	= Loader;
	
	
	Loader.prototype.init = function() {
		this.queue = new createjs.LoadQueue( true );
		
		this.bindEvents();
	};
	
	
	Loader.prototype.bindEvents = function() {
		this.queue.addEventListener( 'loadstart', $.proxy( _onLoadStart, this ) );
		this.queue.addEventListener( 'progress', $.proxy(_onProgress, this) );
		this.queue.addEventListener( 'fileload', $.proxy(_onFileLoad, this) );
		this.queue.addEventListener( 'complete', $.proxy(_onComplete, this) );
		this.queue.addEventListener( 'error', $.proxy(_onError, this) );
	};
	
	
	Loader.prototype.unbindEvents = function() {
		this.queue.removeAllEventListeners();
	};
	
	
	Loader.prototype.startLoad = function( items ) {
		this.queue.loadManifest( items );
	};
	
	
	Loader.prototype.destroy = function() {
		this.unbindEvents();
		
		this.queue.removeAll();
	};
	
	
	var _onLoadStart = function( e ) {
		// console.log('Loader._loadStart()');
		// this.dispatch( this.E.STARTED, e );
	};
	
	
	var _onProgress = function( e ) {
		if ( this.isOnProgress )
			this.dispatch( this.E.PROGRESS, e );
	};
	
	
	var _onFileLoad = function( e ) {
		// this.dispatch( this.E.FILE_LOAD, e );
		this.data[ e.item.id ] = e.result;
	};
	
	
	var _onComplete = function( e ) {
		this.dispatch( this.E.COMPLETE, this.data );
	};
	
	
	var _onError = function( e ) {
		// console.log(e);
		// this.dispatch( this.E.ERROR, e );
	};
	
	
	return Loader;
	
	
} ) ( window );
