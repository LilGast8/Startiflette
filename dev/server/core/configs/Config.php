<?php



class Config
{
	
	protected static $instance;
	
	const CONFIG_FILE_PATH		= 'configs/config.json';
	
	static $ENV					= null;
	static $ENVS				= null;
	static $ALL_LANG			= null;
	static $GENERATE_JS_VIEW_ID	= null;
	static $HAS_MOBILE_VERSION	= null;
	static $TABLET_VERSION		= null;
	static $FORCE_DEVICE		= null;
	static $GA_ID				= null;
	static $CREDITS				= null;
	
	static $NEED_PAGE_ID		= null;
	
	private $jsFiles			= null;
	
	private $params				= null;
	
	
	protected function __construct()
	{
		$this->setConfig();
	}
	
	
	public static function getInstance()
	{
		if ( !isset( self::$instance ) )
			self::$instance = new self;
		
		return self::$instance;
	}
	
	
	private function setConfig()
	{
		$config = $this->getConfigFile();
		
		foreach ( $config as $varName => $value )
			self::${ $varName } = $value;
	}
	
	
	private function getConfigFile()
	{
		if ( !file_exists( self::CONFIG_FILE_PATH ) )
			throw new ErrorException( 'Config file is missing!' );
		
		$config = file_get_contents( self::CONFIG_FILE_PATH );
		$config = json_decode( $config );
		
		
		return $config;
	}
	
	
	public function init()
	{
		$this->setComplexTransition();
		$this->setParams();
	}
	
	
	private function setComplexTransition()
	{
		if ( in_array( Device::$DEVICE, self::$GENERATE_JS_VIEW_ID ) )
			self::$NEED_PAGE_ID = true;
		else
			self::$NEED_PAGE_ID = false;
	}
	
	
	public function getJsFilesFile()
	{
		if ( !$this->jsFiles ) { // load file if it wasn't already done
			
			if ( !file_exists( Path::$FILE->jsFilesFile ) )
				throw new ErrorException( 'JsFilesFile is missing!' );
			
			$this->jsFiles	= file_get_contents( Path::$FILE->jsFilesFile );
			$this->jsFiles	= json_decode( $this->jsFiles );
		}
		
		
		return $this->jsFiles;
	}
	
	
	private function setParams()
	{
		$this->params = new stdClass();
		
		$this->params->ENV			= self::$ENV;
		$this->params->ENVS			= self::$ENVS->{ $this->params->ENV };
		$this->params->ALL_LANG		= self::$ALL_LANG;
		$this->params->FORCE_DEVICE	= self::$FORCE_DEVICE;
		$this->params->GA_ID		= self::$GA_ID;
		$this->params->CREDITS		= self::$CREDITS;
		$this->params->NEED_PAGE_ID	= self::$NEED_PAGE_ID;
	}
	
	
	public function getParams()
	{
		return $this->params;
	}
	
}



?>