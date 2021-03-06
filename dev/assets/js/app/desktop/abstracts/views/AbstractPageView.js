

STF.Abstracts.AbstractPageView = class AbstractPageView extends STF.Abstracts.AbstractView {
	
	
	constructor() {
		super();
		
		this.imgToLazyloadClassName	= 'img-lazyload'; // class name of images to lazyload
		this.lazyloadParentEl		= null; // selector of parent of images to lazyload
	}
	
	
	initDOM() {
		// console.log( 'AbstractPageView.initDOM() — ', this.constructor.name );
		
		this.$page = $( document.getElementById( 'page' ) );
	}
	
	
	initEl() {
		// console.log( 'AbstractPageView.initEl() — ', this.constructor.name );
		
		this.lazyLoader = new STF.Loaders.LazyLoader( this.$page, this.imgToLazyloadClassName, this.lazyloadParentEl, 1, true );
	}
	
	
	initTl() {
		/* Show page */
		this.tl.showPage = new TimelineLite( {
			paused:			true,
			onComplete:		this.onPageShown,
			callbackScope:	this
		} );
		
		this.tl.showPage.to( this.$page, 0.8, { opacity:1, ease:Quad.easeOut } );
		
		
		/* Hide page */
		this.tl.hidePage = new TimelineLite( {
			paused:			true,
			onComplete:		this.onPageHidden,
			callbackScope:	this
		} );
		
		this.tl.hidePage.to( this.$page, 0.8, { opacity:0, ease:Quad.easeOut } );
	}
	
	
	show() {
		// if ( STF.Controllers.PagesController.isFirstLoad )
		// 	this.tl.showPage.progress(1);
			
		// else
			this.tl.showPage.play(0);
	}
	
	
	hide() {
		this.tl.hidePage.play(0);
	}
	
	
	destroy() {
		super.destroy();
		
		if ( this.lazyLoader !== undefined )
			this.lazyLoader.destroy();
	}
	
	
	onPageShown() {
		this.dispatch( this.E.SHOWN );
	}
	
	
	onPageHidden() {
		this.initView = false;
		
		this.dispatch( this.E.HIDDEN );
	}
	
	
};

