'use strict';


// var AbstractView	= require( 'shared/abstracts/views/AbstractView' );
var CustomEvent		= require( 'shared/events/CustomEvent' );
var Path			= require( 'shared/configs/Path' );

// var MainLoader		= require( 'desktop/views/statics/MainLoader' );
// var Header			= require( 'desktop/views/statics/Header' );
// var PagesController	= require( 'desktop/controllers/PagesController' );

var DOMUtil		= require( 'shared/utils/DOM' );
var MathUtil	= require( 'shared/utils/Math' );

var Config		= require( 'shared/configs/Config' );
var Debug		= require( 'shared/utils/Debug' );



function AbstractMainView() {
	// AbstractView.call( this );
	CustomEvent.call( this );
	
	this.E = {
		RESIZE:			'resize',
		RAF:			'raf',
		MOUSE_MOVE:		'mousemove',
		MOUSE_DOWN:		'mousedown',
		MOUSE_UP:		'mouseup',
		TOUCH_MOVE:		'touchmove',
		TOUCH_START:	'touchstart',
		TOUCH_END:		'touchend',
		WINDOW_OUT:		'windowout',
		WINDOW_IN:		'windowin'
	};
	
	this.bW		= null; // body width
	this.bH		= null; // body height
	this.wW		= null; // window width
	this.wH		= null; // window height
	this.cX		= null; // center X
	this.cY		= null; // center Y
	this.sY		= null; // scroll Y
	this.siY	= null; // scroll inertia Y
	this.mX		= null; // mouse X
	this.mY		= null; // mouse Y
	this.miX	= null; // mouse inertia X
	this.miY	= null; // mouse inertia Y
	this.tX		= null; // touch X
	this.tY		= null; // touch Y
	
	this.SCROLL_INERTIA		= 0.07;
	this.MOUSE_INERTIA		= 0.03;
	
	this.isWindowFocused	= true;
}


// AbstractMainView.prototype				= Object.create( AbstractView.prototype );
// AbstractMainView.prototype.constructor	= AbstractMainView;
AbstractMainView.prototype				= Object.create( CustomEvent.prototype );
AbstractMainView.prototype.constructor	= AbstractMainView;


AbstractMainView.prototype.init = function() {
	this.initDOM();
	this.initEl();
	this.bindEvents();
	
	DOMUtil.removeClass( this.$mainCont[0], 'preload' );
	
	this.resize();
};


AbstractMainView.prototype.initDOM = function() {
	this.$window	= $( window );
	this.$body		= $( document.body );
	this.$mainCont	= $( document.getElementById( 'main-container' ) );
	this.$pageCont	= $( document.getElementById( 'page-container' ) );
};


AbstractMainView.prototype.initEl = function() {
	Path.overwriteSpecialPaths( this.$mainCont[0].getAttribute( 'data-assets-base-url' ) );
};


AbstractMainView.prototype.bindEvents = function() {
	this.$window.on( 'resize', $.proxy( this.resize, this ) );
	// TweenLite.ticker.addEventListener( 'tick', this.raf, this );
	// this.$window.on( 'mousemove', $.proxy( this.mouseMove, this ) );
	// this.$window.on( 'mousedown', $.proxy( this.mouseDown, this ) );
	// this.$window.on( 'mouseup', $.proxy( this.mouseUp, this ) );
	// this.$window.on( 'touchmove', $.proxy( this.touchMove, this ) );
	// this.$window.on( 'touchstart', $.proxy( this.touchStart, this ) );
	// this.$window.on( 'touchend', $.proxy( this.touchEnd, this ) );
	// this.$window.on( 'blur', $.proxy( this.windowOut, this ) );
	// this.$window.on( 'focus', $.proxy( this.windowIn, this ) );
};


AbstractMainView.prototype.disableScrollRestoration = function() {
	if ( 'scrollRestoration' in history )
		history.scrollRestoration = 'manual';
};


AbstractMainView.prototype.resize = function() {
	_setResizeProps.call( this );
	
	this.dispatch( this.E.RESIZE );
};


var _setResizeProps = function() {
	this.bW = this.$body.width();
	this.bH = this.$body.height();
	this.wW = this.$window.width();
	this.wH = this.$window.height();
	this.cX = Math.round( this.bW / 2 );
	this.cY = Math.round( this.wH / 2 );
	
	if ( this.mX === null && this.mY === null ) {
		this.mX = this.cX;
		this.mY = this.cY;
	}
};


AbstractMainView.prototype.raf = function() {
	if ( Config.HAS_FPS_STATS && ( Config.IS_DEV || Config.IS_PREPROD_LOCAL ) )
		Debug.fpsStats.begin();
	
	
	_setRafProps.call( this );
	
	this.dispatch( this.E.RAF );
	
	
	if ( Config.HAS_FPS_STATS && ( Config.IS_DEV || Config.IS_PREPROD_LOCAL ) )
		Debug.fpsStats.end();
	
	if ( Config.HAS_MEMORY_STATS && ( Config.IS_DEV || Config.IS_PREPROD_LOCAL ) )
		Debug.memoryStats.update();
};


var _setRafProps = function() {
	this.sY		= this.$window[0].scrollY || this.$window[0].pageYOffset;
	this.siY	= MathUtil.getInertia( this.sY, this.siY, this.SCROLL_INERTIA );
	
	this.miX	= MathUtil.getInertia( this.mX, this.miX, this.MOUSE_INERTIA );
	this.miY	= MathUtil.getInertia( this.mY, this.miY, this.MOUSE_INERTIA );
};


AbstractMainView.prototype.mouseMove = function( e ) {
	this.mX = e.clientX;
	this.mY = e.clientY;
	
	// console.log( 'AbstractMainView _mouseMove()', this.mX, this.mY );
	
	this.dispatch( this.E.MOUSE_MOVE );
};


AbstractMainView.prototype.mouseDown = function() {
	this.dispatch( this.E.MOUSE_DOWN );
};


AbstractMainView.prototype.mouseUp = function() {
	this.dispatch( this.E.MOUSE_UP );
};


AbstractMainView.prototype.touchMove = function( e ) {
	e.preventDefault();
	
	// Zepto
	this.tX = e.touches[0].pageX;
	this.tY = e.touches[0].pageY;
	// jQuery
	// this.tX = e.originalEvent.touches[0].pageX;
	// this.tY = e.originalEvent.touches[0].pageY;
	
	this.dispatch( this.E.TOUCH_MOVE );
};


AbstractMainView.prototype.touchStart = function() {
	this.dispatch( this.E.TOUCH_START );
};


AbstractMainView.prototype.touchEnd = function() {
	this.dispatch( this.E.TOUCH_END );
};


AbstractMainView.prototype.windowOut = function() {
	this.isWindowFocused = false;
	
	this.dispatch( this.E.WINDOW_OUT );
};


AbstractMainView.prototype.windowIn = function() {
	this.isWindowFocused = true;
	
	this.dispatch( this.E.WINDOW_IN );
};


AbstractMainView.prototype.setScrollY = function( scrollY ) {
	this.sY		= scrollY;
	this.siY	= scrollY;
	
	this.$window[0].scrollTo( 0, scrollY );
};


AbstractMainView.prototype.setBodyHeight = function( bodyH ) {
	if ( bodyH === null )
		bodyH = this.$pageCont.height();
	
	this.$body[0].style.height = bodyH + 'px';
};


AbstractMainView.prototype.initAfterAssetsLoaded = function() {
	
};


module.exports = AbstractMainView;

