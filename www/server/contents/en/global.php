<?php



class GlobalContent extends AbstractContent
{
	
	protected function setData()
	{
		$d = new stdClass();
		
		
		$d->menu				= new stdClass();
		
		$d->menu->home			= "Home";
		$d->menu->about			= "About";
		$d->menu->projects		= "Projects";
		$d->menu->legalNotices	= "Legal notices";
		
		
		
		$this->data = $d;
	}
	
}



?>