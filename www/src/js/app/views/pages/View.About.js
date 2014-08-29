

APP.Views = APP.Views || {};


APP.Views.About = (function(window){
	
	
	function About() {
		APP.View.call(this);
	}
	
	
	About.prototype = Object.create(APP.View.prototype);
	About.prototype.constructor = About;
	
	
	About.prototype.initElt = function() {
		this.$.page = $(document.getElementById('page-content'));
	};
	
	
	About.prototype.bindEvents = function() {
		this.p.resizeWindow = $.proxy(_resize, this);
		APP.Main.$.window.on('resize', this.p.resizeWindow);
	};
	
	
	About.prototype.unbindEvents = function() {
		APP.Main.$.window.off('resize', this.p.resizeWindow);
		
		this.p = {};
	};
	
	
	var _resize = function() {
		APP.Main.resize();
		
		console.log('resize');
	};
	
	
	return new About();
	
	
})(window);

