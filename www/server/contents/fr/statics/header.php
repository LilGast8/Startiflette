<?php



class HeaderContent extends AbstractContent
{
	
	public function setDatas()
	{
		$d = new stdClass();
		
		
		$d->metas				= new stdClass();
		
		$d->metas->fb			= new stdClass();
		
		$d->metas->fb->title	= "Titre Facebook";
		$d->metas->fb->desc		= "Desc Facebook";
		
		
		$d->metas->gp			= new stdClass();
		
		$d->metas->gp->title	= "Titre Google+";
		$d->metas->gp->desc		= "Desc Google+";
		
		
		$d->metas->tw			= new stdClass();
		
		$d->metas->tw->title	= "Titre Twitter";
		$d->metas->tw->desc		= "Desc Twitter";
		
		
		
		$this->datas = $d;
	}
	
}



?>