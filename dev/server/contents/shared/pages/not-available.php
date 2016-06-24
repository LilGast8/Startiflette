<?php



class NotAvailableContent extends AbstractContent
{
	
	public function setDatas()
	{
		$d = new stdClass();
		
		
		$d->metas			= new stdClass();
		$d->metas->title	= "Not available disponible — Title";
		$d->metas->desc		= "Not available — Description";
		
		
		$d->title	= "This page is not available on mobile.";
		$d->txt		= "The content you attempt to reach is not available on the mobile version. <br>
		You can attempt this content on your desktop and tablet or go back to the <a href=\"" . Router::$LINK->statics->home . "\">homepage</a> and continue your browsing.";
		
		
		
		$this->datas = $d;
	}
	
}



?>