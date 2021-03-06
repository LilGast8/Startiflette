

STF.Abstracts.AbstractView = class AbstractView extends STF.Events.CustomEvent {
	
	
	constructor() {
		super();
		
		this.E		= {
			INIT:	'init',
			SHOW:	'show',
			SHOWN:	'shown',
			HIDE:	'hide',
			HIDDEN:	'hidden'
		};
		
		this.tw		= {};
		this.tl		= {};
		this.sto	= {};
		this.si		= {};
		
		this.isInit	= false;
	}
	
	
	init() {
		this.initDOM();
		this.initEl();
		this.initTl();
		this.bindEvents();
		
		this.resize();
	}
	
	
	initDOM() {
		// console.log( 'AbstractView.initDOM() — ', this.constructor.name );
	}
	
	
	initEl() {
		// console.log( 'AbstractView.initEl() — ', this.constructor.name );
	}
	
	
	initTl() {
		// console.log( 'AbstractView.initTl() — ', this.constructor.name );
	}
	
	
	bindEvents() {
		// console.log( 'AbstractView.bindEvents() — ', this.constructor.name );
		
		STF.Controllers.Screen.bind( STF.Controllers.Screen.E.RESIZE, this.resize, this );
	}
	
	
	unbindEvents() {
		// console.log( 'AbstractView.unbindEvents() — ', this.constructor.name );
		
		STF.Controllers.Screen.unbind( STF.Controllers.Screen.E.RESIZE, this.resize, this );
	}
	
	
	get initView() {
		return this.isInit;
	}
	
	
	set initView( value ) {
		this.isInit = value;
	}
	
	
	show() {
		// console.log( 'AbstractView.show() — ', this.constructor.name );
	}
	
	
	hide() {
		// console.log( 'AbstractView.hide() — ', this.constructor.name );
	}
	
	
	resize() {
		// console.log( 'AbstractView.resize() — ', this.constructor.name );
	}
	
	
	raf() {
		// console.log( 'AbstractView.raf() — ', this.constructor.name );
	}
	
	
	destroy() {
		this.unbindEvents();
		
		this.destroyGSAP();
		this.destroyTimer();
	}
	
	
	destroyGSAP() {
		/* tween */
		for ( const tween in this.tw )
			this.killTween( tween );
		
		/* timeline */
		for ( const timeline in this.tl )
			this.killTimeline( timeline );
		
		this.tl = {};
		this.tw = {};
	}
	
	
	killTween( twName ) {
		if ( !this.tw[ twName ] ) {
			if ( !STF.Configs.Config.IS_PROD )
				console.warn( `You're trying to kill a tween named "${ twName }" that doesn't exist.` );
			
			return;
		}
		
		this.tw[ twName ].kill();
		
		this.tw[ twName ] = null;
	}
	
	
	killTimeline( tlName ) {
		if ( !this.tl[ tlName ] ) {
			if ( !STF.Configs.Config.IS_PROD )
				console.warn( `You're trying to kill a timeline named "${ tlName }" that doesn't exist.` );
			
			return;
		}
		
		this.tl[ tlName ].stop();
		this.tl[ tlName ].clear();
		this.tl[ tlName ].kill();
		
		this.tl[ tlName ] = null;
	}
	
	
	
	destroyTimer() {
		/* setTimeout */
		for ( const sto in this.sto )
			clearTimeout( this.sto[ sto ] );
		
		/* setInterval */
		for ( const si in this.si )
			clearInterval( this.si[ si ] );
	}
	
	
	/**
	 * Change the url
	 * @params {object or string} e: most of time is an object when it come from a click on a link,
	 *								 but if you need to force a specific url you can directly pass a string
	 */
	changeUrl( e ) {
		if ( STF.Configs.Props.HAS_PUSHSTATE ) { // if pushstate supported
			let url;
			
			if ( typeof e == 'object' ) {
				e.preventDefault();
				
				url = e.currentTarget.href;
			}
			else if ( typeof e == 'string' )
				url = e;
			
			STF.Controllers.Router.updateUrl( url );
		}
	}
	
	
	updateSearch() {
		if ( !STF.Configs.Config.IS_PROD )
			console.warn( 'You need to override the updateSearch() method from AbstractView in the current page view.' );
	}
	
	
	updateHash() {
		if ( !STF.Configs.Config.IS_PROD )
			console.warn( 'You need to override the updateHash() method from AbstractView in the current page view.' );
	}
	
	
};

