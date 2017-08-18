'use strict';


var CustomEvent	= require( 'shared/events/CustomEvent' );
var MainView	= require( 'desktop/views/MainView' );
var Props		= require( 'shared/configs/Props' );
var Config		= require( 'shared/configs/Config' );
var Router		= require( 'shared/routes/Router' );



function AbstractView() {
	CustomEvent.call( this );
	
	this.E		= {
		SHOW:	'show',
		SHOWN:	'shown',
		HIDE:	'hide',
		HIDDEN:	'hidden'
	};
	
	this.tw		= {};
	this.tl		= {};
	
	this.isInit	= false;
}


AbstractView.prototype				= Object.create( CustomEvent.prototype );
AbstractView.prototype.constructor	= AbstractView;


AbstractView.prototype.init = function() {
	this.initDOM();
	this.initEl();
	this.initTl();
	this.bindEvents();
	
	this.resize();
};


AbstractView.prototype.initDOM = function() {
	// console.log( 'AbstractView.initDOM() — ', this.constructor.name );
};


AbstractView.prototype.initEl = function() {
	// console.log( 'AbstractView.initEl() — ', this.constructor.name );
};


AbstractView.prototype.initTl = function() {
	// console.log( 'AbstractView.initTl() — ', this.constructor.name );
};


AbstractView.prototype.bindEvents = function() {
	// console.log( 'AbstractView.bindEvents() — ', this.constructor.name );
	
	MainView.bind( MainView.E.RESIZE, this.resize, this );
};


AbstractView.prototype.unbindEvents = function() {
	// console.log( 'AbstractView.unbindEvents() — ', this.constructor.name );
	
	MainView.unbind( MainView.E.RESIZE, this.resize, this );
};


AbstractView.prototype.initView = function() {
	// console.log( 'AbstractView.initView() — ', this.constructor.name );
	
	this.isInit = true;
};


AbstractView.prototype.show = function() {
	// console.log( 'AbstractView.show() — ', this.constructor.name );
};


AbstractView.prototype.hide = function() {
	// console.log( 'AbstractView.hide() — ', this.constructor.name );
};


AbstractView.prototype.resize = function() {
	// console.log( 'AbstractView.resize() — ', this.constructor.name );
};


AbstractView.prototype.raf = function() {
	// console.log( 'AbstractView.raf() — ', this.constructor.name );
};


AbstractView.prototype.destroy = function() {
	this.isInit = false;
	
	this.unbindEvents();
	
	this.destroyGSAP();
};


AbstractView.prototype.destroyGSAP = function() {
	/* tween */
	for ( var tween in this.tw )
		this.killTween( tween );
	
	/* timeline */
	for ( var timeline in this.tl )
		this.killTimeline( timeline );
	
	this.tl = {};
	this.tw = {};
};


AbstractView.prototype.killTween = function( twName ) {
	if ( !this.tw[ twName ] )
		return;
	
	this.tw[ twName ].kill();
	
	this.tw[ twName ] = null;
};


AbstractView.prototype.killTimeline = function( tlName ) {
	if ( !this.tl[ tlName ] )
		return;
	
	this.tl[ tlName ].stop();
	this.tl[ tlName ].clear();
	this.tl[ tlName ].kill();
	
	this.tl[ tlName ] = null;
};


/**
 * Change the url
 * @params {object or string} e: most of time is an object when it come from a click on a link,
 *								 but if you need to force a specific url you can directly pass a string
 */
AbstractView.prototype.changeUrl = function( e ) {
	if ( Props.HAS_PUSHSTATE ) { // if pushstate supported
		var url;
		
		if ( typeof e == 'object' ) {
			e.preventDefault();
			
			url = e.currentTarget.href;
		}
		else if ( typeof e == 'string' )
			url = e;
		
		Router.updateUrl( url );
	}
};


AbstractView.prototype.updateSearch = function() {
	if ( !Config.IS_PROD )
		console.warn( 'You need to override the updateSearch() method from AbstractView in the current page view.' );
};


AbstractView.prototype.updateHash = function() {
	if ( !Config.IS_PROD )
		console.warn( 'You need to override the updateHash() method from AbstractView in the current page view.' );
};


module.exports = AbstractView;

