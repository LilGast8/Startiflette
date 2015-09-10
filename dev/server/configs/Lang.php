<?php



class Lang
{
	
	protected static $instance;
	
	static $ALL_LANG		= null;
	static $MULTI_LANG		= null;
	static $DEFAULT_LANG	= null;
	static $LANG			= null;
	
	static $LANG_LINK_ROOT	= null;
	static $LANG_LINK		= null;
	
	
	protected function __construct()
	{
		$this->routes = RoutesController::getInstance();
		
		$this->setGlobalInfos();
		$this->routes->setPageUrl();
		$this->setCurrentLang();
		$this->routes->setCurrentPageUrl();
		$this->setLangLinks();
	}
	
	
	protected function __clone()
	{
		
	}
	
	
	public static function getInstance()
	{
		if ( !isset( self::$instance ) )
			self::$instance = new self;
		
		return self::$instance;
	}
	
	
	private function setGlobalInfos()
	{
		// all lang
		self::$ALL_LANG = Config::$ALL_LANG;
		
		// default lang
		self::$DEFAULT_LANG = self::$ALL_LANG[0];
		
		// multi-lang
		if ( count( self::$ALL_LANG ) == 1 )
			self::$MULTI_LANG = false;
		else
			self::$MULTI_LANG = true;
	}
	
	
	private function setCurrentLang()
	{
		if ( !self::$MULTI_LANG || strlen( RoutesController::$PAGE_URL->params ) == 0 )
			self::$LANG = self::$DEFAULT_LANG;
		else
			self::$LANG = RoutesController::$PAGE_URL->aParams[0];
	}
	
	
	private function setLangLinks()
	{
		self::$LANG_LINK_ROOT	= self::$LANG == self::$DEFAULT_LANG ? '' : self::$LANG;
		self::$LANG_LINK		= self::$MULTI_LANG ? self::$LANG . '/' : '';
	}
	
}



?>