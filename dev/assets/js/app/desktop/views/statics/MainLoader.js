

APP.Views			= APP.Views || {};
APP.Views.Statics	= APP.Views.Statics || {};


APP.Views.Statics.MainLoaderView = ( function( window ) {
	
	
	function MainLoaderView() {
		APP.AbstractView.call( this );
		
		this.E = {
			PROGRESS:	'progress',
			COMPLETE:	'complete',
			SHOWN:		'shown',
			HIDDEN:		'hidden'
		};
	}
	
	
	MainLoaderView.prototype				= Object.create( APP.AbstractView.prototype );
	MainLoaderView.prototype.constructor	= MainLoaderView;
	
	
	MainLoaderView.prototype.init = function() {
		APP.AbstractView.prototype.init.call( this );
		
		_instanceAssetsLoader.call( this );
	};
	
	
	MainLoaderView.prototype.initDOM = function() {
		this.$loader		= $( document.getElementById( 'main-loader' ) );
		this.$loaderCont	= this.$loader.find( '.main-loader-container' );
		this.$percentage	= this.$loader.find( '.main-loader-percentage' );
		this.$progress		= this.$loader.find( '.main-loader-progress' );
		this.$loading		= this.$loader.find( '.main-loader-loading' );
	};
	
	
	MainLoaderView.prototype.initTl = function() {
		/* Hide init */
		this.tl.hideInit = new TimelineLite( { paused:true, onComplete:_onHideInitComplete.bind( this ) } );
		
		this.tl.hideInit.to( this.$loader, 1.5, { xPercent:100, ease:Quart.easeInOut }, 0 );
		this.tl.hideInit.to( this.$loaderCont, 1.5, { xPercent:-100, ease:Quart.easeInOut }, 0 );
		
		
		/* Show */
		this.tl.show = new TimelineLite( { paused:true, onComplete:_onShowComplete.bind( this ) } );
		
		this.tl.show.set( this.$loader, { xPercent:-100 }, 0 );
		this.tl.show.set( this.$loaderCont, { xPercent:100 }, 0 );
		this.tl.show.to( this.$loader, 1, { xPercent:0, ease:Quart.easeInOut }, 0 );
		this.tl.show.to( this.$loaderCont, 1, { xPercent:0, ease:Quart.easeInOut }, 0 );
		
		
		/* Hide */
		this.tl.hide = new TimelineLite( { paused:true, onComplete:_onHideComplete.bind( this ) } );
		
		this.tl.hide.to( this.$loader, 1, { xPercent:100, ease:Quart.easeInOut }, 0 );
		this.tl.hide.to( this.$loaderCont, 1, { xPercent:-100, ease:Quart.easeInOut }, 0 );
	};
	
	
	var _instanceAssetsLoader = function() {
		this.assetsLoader = new APP.Loader( true );
		this.assetsLoader.init();
		
		this.assetsLoader.buildEvt( this.assetsLoader.E.PROGRESS, _onProgress.bind( this ) );
		this.assetsLoader.buildEvt( this.assetsLoader.E.COMPLETE, _onComplete.bind( this ) );
	};
	
	
	MainLoaderView.prototype.loadAssets = function( aImgsToLoad ) {
		// console.log( aImgsToLoad );
		
		this.assetsLoader.startLoad( aImgsToLoad );
	};
	
	
	var _onProgress = function( percentage ) {
		var posX = percentage - 100;
		
		this.$percentage[0].innerHTML					= parseInt( percentage ) + ' %';
		this.$progress[0].style[ APP.Config.TRANSFORM ]	= 'translate(' + posX + '%, 0% )';
	};
	
	
	var _onComplete = function() {
		// _destroyAssetsLoader.call( this );
		
		this.dispatch( this.E.COMPLETE, this.data );
	};
	
	
	/*var _destroyAssetsLoader = function() {
		this.assetsLoader.destroyEvt( this.assetsLoader.E.PROGRESS, _onProgress.bind( this ) );
		this.assetsLoader.destroyEvt( this.assetsLoader.E.COMPLETE, _onComplete.bind( this ) );
		
		this.assetsLoader.destroy();
		this.assetsLoader = null;
	};*/
	
	
	MainLoaderView.prototype.hideInit = function() {
		this.tl.hideInit.play();
		
		
		// this.$loader[0].style.display = 'none';
		// this.dispatch( this.E.HIDDEN );
	};
	
	
	MainLoaderView.prototype.show = function() {
		this.$loader[0].style.display = 'block';
		this.$loader.offsetHeight; // jshint ignore:line
		
		this.tl.show.play(0);
	};
	
	
	MainLoaderView.prototype.hide = function() {
		this.tl.hide.play(0);
	};
	
	
	var _onHideInitComplete = function() {
		this.killTimeline( 'hideInit' );
		
		removeClass( this.$loader[0], 'init' );
		this.$loader[0].style.display = 'none';
		
		this.dispatch( this.E.HIDDEN );
	};
	
	
	var _onShowComplete = function() {
		this.dispatch( this.E.SHOWN );
	};
	
	
	var _onHideComplete = function() {
		// LOADING_MODE == 'byPageStatic' && LOADING_MODE == 'byPageDynamic'
		this.$percentage[0].innerHTML					= '0 %';
		this.$progress[0].style[ APP.Config.TRANSFORM ]	= 'translate( -100%, 0% )';
		
		
		this.dispatch( this.E.HIDDEN );
	};
	
	
	return MainLoaderView;
	
	
} ) ( window );
