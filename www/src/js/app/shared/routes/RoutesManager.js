

APP.RoutesManager = (function(window) {
	
	
	function RoutesManager() {
		APP.EventDispatcher.call(this);
		
		this.prevPage = null;
		this.currentPage = null;
		this.nextPage = null;
		
		this.rootUrlName = null;
		this.altUrl = null;
		this.viewName = null;
		this.pageName = null;
		this.pageUrl = null;
		
		this.isPageChangedByClick = false; // used to avoid to set page infos two times
		
		this.activeUrl = null;
		this.isPageChange = true;
	}
	
	
	RoutesManager.prototype = Object.create(APP.EventDispatcher.prototype);
	RoutesManager.prototype.constructor = RoutesManager;
	
	
	RoutesManager.prototype.init = function() {
		_setRootUrlName.call(this);
		if(APP.Config.MULTI_LG)
			_setAltUrl.call(this);
		
		_bindEvents.call(this);
		
		_initFirstPage.call(this);
	};
	
	
	RoutesManager.prototype.goToPage = function(url) {
		this.isPageChangedByClick = true;
		
		_setPageInfos.call(this, url);
		
		var title = _getTitle.call(this);
		
		History.pushState(null, title, url);
	};
	
	
	RoutesManager.prototype.updateGA = function() {
		var pageUrl = this.pageId !== 0 ? '/'+this.pageUrl : '';
		var gaPageName = APP.Config.LG == APP.Config.ALL_LG[0] && this.pageId === 0 ? '' : APP.Config.LG+pageUrl;
		
		if(!APP.Config.LOCALHOST && APP.Config.PROD)
			ga('send', 'pageview', '/'+gaPageName);
	};
	
	
	var _bindEvents = function() {
		History.Adapter.bind(window, 'statechange', _onStateChange.bind(this));
	};
	
	
	var _initFirstPage = function() {
		_setPageInfos.call(this, null);
		
		this.currentPage = _getPage.call(this);
		
		_updateMenu.call(this);
		
		this.currentPage.buildEvt(this.currentPage.E.SHOWN, _enablePageChange.bind(this, true));
		APP.Views.Static.MainLoader.hidePreloader();
	};
	
	
	var _setRootUrlName = function() {
		for(var url in APP.Model.Global.json.pages) {
			this.rootUrlName = url;
			
			break;
		}
	};
	
	
	var _setAltUrl = function() {
		this.altUrl = {};
		
		for(var pageUrl in APP.Model.Global.json.pages) { // parse pages of the active language
			var file = APP.Model.Global.json.pages[pageUrl].file;
			
			this.altUrl[pageUrl] = this.altUrl[pageUrl] || {};
			
			for(var lgTemp in APP.Model.Global.json.pagesTr) { // parse translations of the others languages
				
				for(var pageTemp in APP.Model.Global.json.pagesTr[lgTemp]) { // parse pages of the translated language
					
					// if the file of the translated language match with the file of the active language
					if(APP.Model.Global.json.pagesTr[lgTemp][pageTemp].file == file) {
						urlPageAlt = pageUrl == this.rootUrlName ? '' : '/'+pageTemp;
						urlAlt = lgTemp == APP.Config.ALL_LG[0] && pageUrl == this.rootUrlName ? 
							APP.Config.WEB_ROOT : APP.Config.WEB_ROOT+lgTemp+urlPageAlt;
						
						this.altUrl[pageUrl][lgTemp] = urlAlt;
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
			
			this.nextPage = _getPage.call(this);
			
			this.currentPage.buildEvt(this.currentPage.E.HIDDEN, _initNextPage.bind(this));
			this.currentPage.hide();
			
			this.nextPage.load(this.pageUrl, this.pageName, this.viewName);
		}
	};
	
	
	var _initNextPage = function() {
		this.currentPage.destroyEvt(this.currentPage.E.HIDDEN, _initNextPage.bind(this));
		
		this.prevPage = this.currentPage;
		this.currentPage = this.nextPage;
		
		_updateMenu.call(this);
		if(APP.Config.MULTI_LG)
			_updateLgLinks.call(this);
		
		this.currentPage.buildEvt(this.currentPage.E.SHOWN, _enablePageChange.bind(this, false));
		this.currentPage.transitionEnded();
	};
	
	
	var _setPageInfos = function(url) {
		if(url === null)
			url = _getUrl();
		
		var endBaseUrl = url.indexOf(APP.Config.WEB_ROOT)+APP.Config.WEB_ROOT.length;
		var endUrl = url.indexOf('?') < 0 ? url.length : url.indexOf('?');
		
		
		/* set page url */
		this.pageUrl = url.substring(endBaseUrl, endUrl);
		var lastCharPos = this.pageUrl.length-1;
		
		if(this.pageUrl[lastCharPos] == '/')
			this.pageUrl = this.pageUrl.substring(0, lastCharPos);
		
		if(this.pageUrl.split('/')[0] == LG) { // remove language if it's in the url
			if(this.pageUrl.split('/')[1] === undefined) // if we are at the root
				this.pageUrl = '';
			else
				this.pageUrl = this.pageUrl.substring(3, this.pageUrl.length);
		}
		
		if(this.pageUrl === '')
			this.pageUrl = this.rootUrlName;
		
		
		/* set page name */
		this.pageName = this.pageUrl.split('/')[0];
		
		
		/* set view name */
		this.viewName = APP.Model.Global.json.pages[this.pageName].file;
	};
	
	
	var _getPage = function() {
		var currentPage = null;
		
		for(var pageView in APP.Views.Page)
			if(this.viewName == APP.Views.Page[pageView].name)
				currentPage = APP.Views.Page[pageView];
		
		return currentPage;
	};
	
	
	var _getTitle = function() {
		title = APP.Model.Global.json.pages[this.pageName].title;
		
		if(this.viewName == 'project') {
			for(var i=0; i<APP.Model.Global.json.projects.length; i++) {
				var project = APP.Model.Global.json.projects[i];
				
				if(project.url == this.pageUrl) {
					title = project.name;
					
					break;
				}
			}
		}
		
		return title;
	};
	
	
	var _getUrl = function() {
		var state = History.getState();
		url = state.url;
		
		return url;
	};
	
	
	var _updateMenu = function() {
		var $menu = APP.Views.Static.Header.$.menu;
		var $footer = APP.Views.Static.Footer.$.footer;
		
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
		var lgTemp, $footerLgLink;
		
		for(var i=0; i<APP.Views.Static.Footer.$.footerLgLink.length; i++) {
			$footerLgLink = APP.Views.Static.Footer.$.footerLgLink[i];
			
			lgTemp = $footerLgLink.getAttribute('data-lg');
			
			$footerLgLink.href = this.altUrl[this.pageUrl][lgTemp];
		}
	};
	
	
	var _disablePageChange = function() {
		APP.Views.Static.MainLoader.show();
		
		this.isPageChange = true;
		this.activeUrl = _getUrl();
	};
	
	
	var _enablePageChange = function(init) {
		this.currentPage.destroyEvt(this.currentPage.E.SHOWN, _enablePageChange.bind(this));
		APP.Views.Static.MainLoader.hide();
		
		this.isPageChange = false;
		
		if(init)
			this.currentPage.init();
		
		APP.Main.resize();
		
		if(!init)
			_checkUrl.call(this);
	};
	
	
	var _checkUrl = function() {
		if(this.activeUrl != _getUrl()) _onStateChange.call(this);
	};
	
	
	return new RoutesManager();
	
	
})(window);

