

STF.Core.Router = new class Router extends STF.Events.CustomEvent {
	
	
	constructor() {
		super();
		
		this.URL					= {};
		this.ALT_LANG_URL			= {};
		
		this.isHomepage				= null;
		this.isPageChange			= null;
		this.isPageChangeByClick	= null;
		this.isSearchChange			= null;
		this.isHashChange			= null;
	}
	
	
	setUrl( isInit, url ) {
		this.URL.full			= this._getFullUrl( url );
		this.URL.path			= STF_str_getPath( this.URL.full );
		this.URL.pathParams		= this.URL.path.split( '/' );
		this.URL.search			= STF_str_getSearch( this.URL.full );
		this.URL.searchParams	= STF_str_getParams( this.URL.full, 'search' );
		this.URL.hash			= STF_str_getHash( this.URL.full );
		this.URL.hashParams		= STF_str_getParams( this.URL.full, 'hash' );
		this.URL.fullGA			= this._getFullGaUrl();
	}
	
	
	_getFullUrl( url ) {
		let fullUrl;
		
		if ( url === null )
			fullUrl = window.location.href;
		else
			fullUrl = url;
		
		
		return fullUrl;
	}
	
	
	_getFullGaUrl() {
		const fullGaUrl = this.URL.full.replace( STF.Configs.Path.URL.base, '' );
		
		
		return fullGaUrl;
	}
	
	
	init() {
		this._bindEvents();
		
		STF.Core.PagesController.initFirstPage();
	}
	
	
	_bindEvents() {
		STF.Core.Main.$window.on( 'popstate', $.proxy( this._onPopState, this ) );
		STF.Core.Main.$window.on( 'hashchange', $.proxy( this._onHashChange, this ) );
	}
	
	
	_getLangExistence() {
		let langExist = true;
		
		if ( STF.Configs.Lang.ALL_LANG.indexOf( STF.Configs.Lang.LANG ) == -1 ) {
			STF.Configs.Lang.LANG = STF.Configs.Lang.DEFAULT_LANG;
			
			langExist = false;
		}
		
		
		return langExist;
	}
	
	
	_setIsHomepage( pageId ) {
		this.isHomepage = pageId == 'home' ? true : false;
	}
	
	
	checkUrlCorrespondence() {
		if ( this.URL.full != this._getFullUrl( null ) )
			this._onPopState();
	}
	
	
	updateUrl( url ) {
		if ( STF.Core.PagesController.isPageChange )
			return;
		
		this.isPageChangeByClick = true;
		
		this._setUrlPartChange( url );
		this.setUrl( false, url );
		
		
		const data = {
			'isPageChange':		this.isPageChange,
			'isSearchChange':	this.isSearchChange,
			'isHashChange':		this.isHashChange
		};
		
		history.pushState( data, '', url );
		
		
		if ( this.isPageChange )
			STF.Core.PagesController.changePage( this.URL.full );
		else if ( this.isSearchChange )
			STF.Core.PagesController.changeSearch();
		else if ( this.isHashChange )
			STF.Core.PagesController.changeHash();
	}
	
	
	_onPopState( e ) {
		if ( STF.Core.PagesController.isPageChange )
			return;
		
		this.isPageChangeByClick = false;
		
		this._setUrlPartChange( window.location.href );
		
		
		if ( this.isPageChange || this.isSearchChange )
			this.setUrl( false, null );
		
		if ( this.isPageChange )
			STF.Core.PagesController.changePage( this.URL.full );
		else if ( this.isSearchChange )
			STF.Core.PagesController.changeSearch();
	}
	
	
	_onHashChange( e ) {
		if ( STF.Core.PagesController.isPageChange )
			return;
		
		this._setUrlPartChange( window.location.href );
		this.setUrl( false, null );
		
		
		if ( this.isHashChange && !this.isPageChange && !this.isSearchChange )
			STF.Core.PagesController.changeHash();
	}
	
	
	_setUrlPartChange( url ) {
		this._isPageChanged( url );
		this._isSearchChanged( url );
		this._isHashChanged( url );
	}
	
	
	_isPageChanged( url ) {
		const nextPath		= STF_str_getPath( url );
		this.isPageChange	= this.URL.path != nextPath;
	}
	
	
	_isSearchChanged( url ) {
		const nextSearch	= STF_str_getSearch( url );
		this.isSearchChange	= this.URL.search != nextSearch;
	}
	
	
	_isHashChanged( url ) {
		const nextHash		= STF_str_getHash( url );
		this.isHashChange	= this.URL.hash != nextHash;
	}
	
	
	setAltLangUrl( $page ) {
		let lang;
		
		for ( let i = 0; i < STF.Configs.Lang.ALL_LANG.length; i++ ) {
			lang = STF.Configs.Lang.ALL_LANG[ i ];
			
			if ( lang != STF.Configs.Lang.LANG )
				this.ALT_LANG_URL[ lang ] = $page[0].getAttribute( 'data-lang-' + lang );
		}
	}
	
	
	updateGA() {
		if ( STF.Configs.Config.IS_PROD && Object.keys( STF.Configs.Config.GA_ID ).length > 0 ) {
			for ( const gaName in STF.Configs.Config.GA_ID ) {
				if ( gaName == 'default' )
					ga( 'send', 'pageview', '/' + this.URL.fullGA );
				else
					ga( gaName + '.send', 'pageview', '/' + this.URL.fullGA );
			}
		}
	}
	
	
}();

