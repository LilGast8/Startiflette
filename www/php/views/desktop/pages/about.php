<?php

if(isset($_POST['ajax'])) {
	include_once('../../../../init.php');
	include_once(SITE_ROOT.'php/contents/'.LG.'/texts.php');
	include_once(SITE_ROOT.'php/functions/load-pages-infos.php');
}

?>

<!-- About -->
<section id="page-content" class="about">
	
	<br><br><br>
	- Desktop page content / <?php echo $main->contents->global->menu->about; ?> / <?php echo Config::$LANG; ?> -
	<br><br><br><br>
	
</section>
