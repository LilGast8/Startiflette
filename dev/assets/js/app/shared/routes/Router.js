

APP.Router = ( function( window ) {
	
	
	function Router() {
		APP.EventDispatcher.call( this );
		
		this.E = {
			INIT: 'init'
		};
		
		// this.prevView				= null;
		// this.currentView			= null;
		// this.nextView				= null;
		
		// this.rootPageName			= null;
		// this.urlParts				= null;
		// this.pageUrl				= null;
		// this.pageName				= null;
		// this.viewName				= null;
		// this.altUrl					= null;
		
		// this.isPageChangedByClick	= false; // used to avoid to set page infos two times
		
		// this.activeUrl				= null;
		// this.isPageChange			= true;
		
		this.ROUTES				= {};
		this.PAGE_URL			= {};
		this.ALT_LANG_URL		= {};
		this.LINK				= {};
		
		this.is404				= null;
		this.isHomepage			= null;
		
		this.navigateByClick	= null; // used to avoid to set page infos two times
	}
	
	
	Router.prototype				= Object.create( APP.EventDispatcher.prototype );
	Router.prototype.constructor	= Router;
	
	
	Router.prototype.init = function() {
		_loadRoutesFile.call( this );
	};
	
	
	var _loadRoutesFile = function() {
		this.jsonLoader	= new APP.Loader( false );
		
		this.jsonLoader.buildEvt( this.jsonLoader.E.COMPLETE, _onComplete.bind( this ) );
		
		var aJsonFiles	= [];
		var fileName, filePath;
		
		for ( var key in APP.Config.ROUTES_FILES ) {
			fileName = APP.Config.ROUTES_FILES[ key ];
			filePath = APP.Path.URL.routes + fileName + '.json';
			
			aJsonFiles.push( {
				id:		fileName,
				src:	filePath
			} );
		}
		
		this.jsonLoader.startLoad( aJsonFiles );
	};
	
	
	var _onComplete = function( data ) {
		_destroyJsonLoader.call( this );
		_setRoutes.call( this, data );
		
		this.dispatch( this.E.INIT );
	};
	
	
	var _destroyJsonLoader = function() {
		this.jsonLoader.destroyEvt( this.jsonLoader.E.COMPLETE, _onComplete.bind( this ) );
		
		this.jsonLoader.destroy();
		this.jsonLoader = null;
	};
	
	
	var _setRoutes = function( data ) {
		for ( var routesName in data )
			this.ROUTES[ routesName ] = data[ routesName ];
	};
	
	
	Router.prototype.setPageUrl = function( isInit, url )
	{
		this.PAGE_URL.full		= _getFullPageUrl.call( this, url );
		this.PAGE_URL.params	= _getParamsPageUrl.call( this );
		this.PAGE_URL.aParams	= this.PAGE_URL.params.split( '/' );
		
		if ( isInit ) { // init
			this.PAGE_URL.current	= null;
			this.PAGE_URL.aCurrent	= null;
		}
		else // page change
			this.setCurrentPageUrl();
		
		// console.log('PAGE_URL:', this.PAGE_URL);
	};
	
	
	var _getFullPageUrl = function( url ) {
		var fullPageUrl;
		
		if ( url === null ) // init
			fullPageUrl = History.getState().url;
		else // page change
			fullPageUrl = url;
		
		
		return fullPageUrl;
	};
	
	
	var _getParamsPageUrl = function() {
		var paramsPageUrl = this.PAGE_URL.full.replace( APP.Path.URL.base, '' );
		
		if ( paramsPageUrl.substr( 0, 1 ) == '/' ) // if slash is first character, remove it
			paramsPageUrl = paramsPageUrl.substr( 1 );
		
		if ( paramsPageUrl.substr( paramsPageUrl.length-1, 1 ) == '/' ) // if slash is last character, remove it
			paramsPageUrl = paramsPageUrl.substr( 0, paramsPageUrl.length-1 );
		
		paramsPageUrl = paramsPageUrl.split( '?' )[0]; // remove ?params
		
		
		return paramsPageUrl;
	};
	
	
	Router.prototype.setCurrentPageUrl = function() {
		this.PAGE_URL.current	= _getCurrentPageUrl.call( this );
		this.PAGE_URL.aCurrent	= this.PAGE_URL.current.split( '/' );
	};
	
	
	var _getCurrentPageUrl = function()
	{
		var currentPageUrl = this.PAGE_URL.params.replace( APP.Lang.LANG, '' );
		
		if ( currentPageUrl.substr( 0, 1 ) == '/' ) // if slash is first character, remove it
			currentPageUrl = currentPageUrl.substr( 1 );
		
		
		return currentPageUrl;
	};
	
	
	Router.prototype.initRouting = function() {
		_bindEvents.call( this );
		
		_setPageInfos.call( this );
		
		APP.PagesController.loadAssets();
	};
	
	
	var _bindEvents = function() {
		History.Adapter.bind( window, 'statechange', _onStateChange.bind( this ) );
	};
	
	
	var _setPageInfos = function() {
		var langExist	= _getLangExistence.call( this );
		var page		= _getPageInfos.call( this );
		
		if ( langExist && page.exist ) { // page exist
			_setIsHomepage.call( this, page.id );
			_setAltLangUrl.call( this, page.params );
		}
		else { // 404
			page.id		= 'error404';
			page.params	= APP.Router.ROUTES.static.error404;
		}
		
		APP.PagesController.setPageInfos( page.id, page.params.jsView, page.params[ APP.Lang.LANG ].title, page.params[ APP.Lang.LANG ].desc );
		console.log(APP.PagesController.page);
	};
	
	
	var _getLangExistence = function() {
		var langExist = true;
		
		if ( APP.Lang.ALL_LANG.indexOf( APP.Lang.LANG ) == -1 ) {
			APP.Lang.LANG = APP.Lang.DEFAULT_LANG;
			
			langExist = false;
		}
		
		
		return langExist;
	};
	
	
	var _getPageInfos = function() {
		var routesGroupName, routesGroup, pageId, pageParams;
		var page = {
			exist:	false,
			id:		null,
			params:	null
		};
		
		for ( routesGroupName in this.ROUTES ) { // parse all routes group
			routesGroup = this.ROUTES[ routesGroupName ];
			
			for ( pageId in routesGroup ) { // parse all pages
				pageParams = routesGroup[ pageId ];
				
				if ( pageParams[ APP.Lang.LANG ].url == this.PAGE_URL.current ) { // if url exist
					page.exist	= true;
					page.id		= pageId;
					page.params	= pageParams;
					
					break; // break second for
				}
			}
			
			if ( page.exist )
				break; // break first for
			
		}
		
		
		return page;
	};
	
	
	var _setIsHomepage = function( pageId )
	{
		this.isHomepage = pageId == 'home' ? true : false;
	};
	
	
	var _setAltLangUrl = function( pageParams )
	{
		var currentUrl, urlPart, altLangUrl;
		
		for ( var i in APP.Lang.ALL_LANG ) {
			var lang = APP.Lang.ALL_LANG[i];
			
			if ( lang !== APP.Lang.LANG ) {
				currentUrl = pageParams[ lang ].url;
				
				if ( this.isHomepage && lang == APP.Lang.DEFAULT_LANG )
					urlPart = '';
				else if ( this.isHomepage )
					urlPart = lang;
				else
					urlPart = lang + '/' + pageParams[ lang ].url;
				
				altLangUrl = APP.Path.URL.base + urlPart;
				
				this.ALT_LANG_URL[ lang ] = altLangUrl;
			}
			
		}
	};
	
	
	Router.prototype.checkUrlCorrespondence = function() {
		console.log( 'Router.checkUrlCorrespondence():', this.PAGE_URL.full, _getFullPageUrl.call( this, null ) );
		
		if ( this.PAGE_URL.full != _getFullPageUrl.call( this, null ) ) {
			console.log( 'force _onStateChange()' );
			_onStateChange.call( this );
		}
	};
	
	
	Router.prototype.navigateTo = function( url ) {
		if ( APP.PagesController.isPageChange )
			return;
		
		if ( _isSameUrl.call( this, url ) )
			return;
		
		this.navigateByClick = true;
		
		console.log('———————— Router.navigateTo():', url, '————————');
		
		_setInfos.call( this, url );
		
		// console.log( 'navTo:', APP.PagesController.page.title, url );
		History.pushState( null, APP.PagesController.page.title, url );
	};
	
	
	var _onStateChange = function() {
		if ( APP.PagesController.isPageChange )
			return;
		
		if ( this.navigateByClick ) // if navigate by click
			this.navigateByClick = false; // reset it
		else // if navigate by prev/next browser
			_setInfos.call( this, null );
		
		console.log( '_onStateChange():', APP.PagesController.page );
		
		APP.PagesController.changePage();
	};
	
	
	var _isSameUrl = function( url ) {
		var fullPageUrl = this.PAGE_URL.full;
		
		if ( fullPageUrl.substr( fullPageUrl.length-1, 1 ) == '/' ) // if slash is last character, remove it
			fullPageUrl = fullPageUrl.substr( 0, fullPageUrl.length-1 );
		
		if ( url.substr( url.length-1, 1 ) == '/' ) // if slash is last character, remove it
			url = url.substr( 0, url.length-1 );
		
		
		return url == fullPageUrl;
	};
	
	
	var _setInfos = function( url ) {
		this.setPageUrl( false, url );
		
		_setPageInfos.call( this );
	};
	
	
	
	
	
	
	
	
	/*
	RoutesController.prototype.init = function() {
		History.options.disableSuid = true;
		
		_setRootPageName.call(this);
		
		if(APP.Config.MULTI_LANG)
			_manageAltUrl.call(this);
		
		_bindEvents.call(this);
		
		_initFirstView.call(this);
	};
	
	
	RoutesController.prototype.goToPage = function(url) {
		this.isPageChangedByClick = true;
		
		_setPageInfos.call(this, url);
		
		var title = _getTitle.call(this);
		
		History.pushState(null, title, url);
	};
	
	
	RoutesController.prototype.updateGA = function() {
		var pageUrl = this.pageId !== 0 ? '/'+this.pageUrl : '';
		var gaPageName = APP.Config.LANG == APP.Config.DEFAULT_LANG && this.pageId === 0 ? '' : APP.Config.LANG+pageUrl;
		
		if(!APP.Config.LOCALHOST && APP.Config.PROD)
			ga('send', 'pageview', '/'+gaPageName);
	};
	
	
	var _bindEvents = function() {
		History.Adapter.bind(window, 'statechange', _onStateChange.bind(this));
	};
	
	
	var _initFirstView = function() {
		_setPageInfos.call(this, null);
		
		this.currentView = _getView.call(this);
		
		_updateMenu.call(this);
		
		this.currentView.buildEvt(this.currentView.E.SHOWN, _enablePageChange.bind(this, true));
		APP.Views.Static.MainLoader.hidePreloader();
	};
	
	
	var _setRootPageName = function() {
		for(var url in APP.Models.Json.data.pages[APP.Config.LANG]) {
			this.rootPageName = url;
			
			break;
		}
	};
	
	
	var _manageAltUrl = function() {
		this.altUrl = {};
		
		_setAltUrl.call(this, APP.Models.Json.data.pages);
		
		for(var subPagesName in APP.Models.Json.data.subPages) // parse subpages
			_setAltUrl.call(this, APP.Models.Json.data.subPages[subPagesName]);
	};
	
	
	var _setAltUrl = function(infosToParse) {
		var activePage;
		var translatedPages = [];
		
		for(var lang in infosToParse) { // parse pages
			if(lang == APP.Config.LANG)
				activePage = infosToParse[lang];
			else
				translatedPages[lang] = infosToParse[lang];
		}
		
		for(var pageName in activePage) { // parse pages of the active language
			var viewName = activePage[pageName].name;
			
			this.altUrl[pageName] = this.altUrl[pageName] || {};
			
			for(lang in translatedPages) { // parse translations of the others languages
				
				for(var page in translatedPages[lang]) { // parse pages of the translated language
					
					// if the name of the translated language match with the viewName of the active language
					if(translatedPages[lang][page].name == viewName) {
						urlPageAlt = pageName == this.rootPageName ? '' : '/' + page;
						urlAlt = lang == 	APP.Config.DEFAULT_LANG && pageName == this.rootPageName ? 
											APP.Config.WEB_ROOT : APP.Config.WEB_ROOT + lang + urlPageAlt;
						
						this.altUrl[pageName][lang] = urlAlt;
					}
				}
			}
		}
	};
	
	
	var _onStateChange = function() {
		if(!this.isPageChange) {
			_disablePageChange.call(this);
			
			if(this.isPageChangedByClick) // if page is changed by a click
				this.isPageChangedByClick = false;
			else // if page is changed by a prev/next
				_setPageInfos.call(this, null);
			
			this.nextView = _getView.call(this);
			
			this.currentView.buildEvt(this.currentView.E.HIDDEN, _initNextView.bind(this));
			this.currentView.hide();
			
			this.nextView.load(this.pageUrl);
		}
	};
	
	
	var _initNextView = function() {
		this.currentView.destroyEvt(this.currentView.E.HIDDEN, _initNextView.bind(this));
		
		this.prevView		= this.currentView;
		this.currentView	= this.nextView;
		
		_updateMenu.call(this);
		if(APP.Config.MULTI_LANG)
			_updateLgLinks.call(this);
		
		this.currentView.buildEvt(this.currentView.E.SHOWN, _enablePageChange.bind(this, false));
		this.currentView.transitionEnded();
	};
	
	
	var _setPageInfos = function(currentUrl) {
		if(currentUrl === null)
			currentUrl = _getUrl();
		
		var urlBaseEnd, urlEnd, pageUrl, urlParts, pageName;
		
		// remove base & parameters if there is one
		urlBaseEnd	= currentUrl.indexOf(APP.Config.WEB_ROOT) + APP.Config.WEB_ROOT.length;
		urlEnd		= currentUrl.indexOf('?') < 0 ? currentUrl.length : currentUrl.indexOf('?');
		pageUrl		= currentUrl.substring(urlBaseEnd, urlEnd);
		
		// remove language if exist
		if(APP.Config.MULTI_LANG && pageUrl.substr(0, 2) == APP.Config.LANG)
			pageUrl = pageUrl.replace(APP.Config.LANG, '');
		
		// remove first slash if exist
		if(pageUrl.substr(0, 1) == '/')
			pageUrl = pageUrl.replace('/', '');
		
		// remove last slash if there is one
		if(pageUrl.substr(pageUrl.length-1, 1) == '/')
			pageUrl = pageUrl.substr(0, pageUrl.length-1);
		
		// get the url parts
		urlParts = pageUrl.split('/');
		
		// set page name
		if(urlParts[0] === '')
			pageName = this.rootPageName;
		else
			pageName = urlParts[0];
		
		// set page url
		if(pageUrl === '')
			pageUrl = this.rootPageName;
		
		
		this.urlParts	= urlParts;
		this.pageUrl	= pageUrl;
		this.pageName	= pageName;
		this.viewName	= APP.Models.Json.data.pages[ APP.Config.LANG ][this.pageName].name;
	};
	
	
	var _getView = function() {
		var currentView = null;
		
		for(var pageView in APP.Views.Page) {
			if(this.viewName == APP.Views.Page[pageView].name) {
				currentView = APP.Views.Page[pageView];
				
				break;
			}
		}
		
		return currentView;
	};
	
	
	var _getTitle = function() {
		var title = APP.Models.Json.data.pages[APP.Config.LANG][this.pageName].title;
		
		if(title === '') {
			
			for(var subPagesName in APP.Models.Json.data.subPages) { // parse subpages
				var subPagesInfos = APP.Models.Json.data.subPages[ subPagesName ][ APP.Config.LANG ];
				
				for(var pageUrl in subPagesInfos) { // parse subpages infos
					
					if(pageUrl == this.pageUrl) { // if page url match
						title = subPagesInfos[ pageUrl ].title;
						
						break;
					}
				}
			}
		}
		
		return title;
	};
	
	
	var _getUrl = function() {
		var state = History.getState();
		
		url = state.url;
		// url = state.hash;
		
		return url;
	};
	
	
	var _updateMenu = function() {
		var $menu	= APP.Views.Static.Header.$.menu;
		var $footer	= APP.Views.Static.Footer.$.footer;
		
		var $menuToDisable = $menu.find('.active');
		if(!$menuToDisable.length)
			$menuToDisable = $footer.find('.active');
		var $menuToEnable = $menu.find('[data-url*="'+this.pageUrl+'"]');
		if(!$menuToEnable.length)
			$menuToEnable = $footer.find('[data-url*="'+this.pageUrl+'"]');
		
		if($menuToDisable.length)
			removeClass($menuToDisable[0], 'active');
		if($menuToEnable.length)
			addClass($menuToEnable[0], 'active');
	};
	
	
	var _updateLgLinks = function() {
		var lang, $footerLgLink;
		
		for(var i=0; i<APP.Views.Static.Footer.$.footerLgLink.length; i++) {
			$footerLgLink = APP.Views.Static.Footer.$.footerLgLink[i];
			
			lang = $footerLgLink.getAttribute('data-lg');
			
			$footerLgLink.href = this.altUrl[this.pageUrl][lang];
		}
	};
	
	
	var _disablePageChange = function() {
		APP.Views.Static.MainLoader.show();
		
		this.isPageChange = true;
		this.activeUrl = _getUrl();
	};
	
	
	var _enablePageChange = function(init) {
		this.currentView.destroyEvt(this.currentView.E.SHOWN, _enablePageChange.bind(this));
		APP.Views.Static.MainLoader.hide();
		
		this.isPageChange = false;
		
		if(init)
			this.currentView.init();
		
		APP.Main.resize();
		
		if(!init)
			_checkUrl.call(this);
	};
	
	
	var _checkUrl = function() {
		if(this.activeUrl != _getUrl()) _onStateChange.call(this);
	};
	*/
	
	
	return new Router();
	
	
} ) ( window );

