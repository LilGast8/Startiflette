

APP.Views = APP.Views || {};
APP.Views.Partial = APP.Views.Partial || {};


APP.Views.Partial.Example = (function(window) {
	
	
	function Example() {
		APP.View.call(this);
	}
	
	
	Example.prototype = Object.create(APP.View.prototype);
	Example.prototype.constructor = Example;
	
	
	Example.prototype.initEl = function() {
		
	};
	
	
	Example.prototype.bindEvents = function() {
		
	};
	
	
	Example.prototype.unbindEvents = function() {
		
	};
	
	
	Example.prototype.resize = function() {
		
	};
	
	
	Example.prototype.killTweens = function() {
		
	};
	
	
	Example.prototype.destroy = function() {
		this.unbindEvents();
		
		this.killTweens();
		
		this.$ = {};
		this.v = {};
	};
	
	
	return Example;
	
	
})(window);

