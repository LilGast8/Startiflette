<?php

if(isset($_POST['ajax'])) {
	include_once('../../../../init.php');
	include_once(SITE_ROOT.'php/contents/'.LG.'/texts.php');
	include_once(SITE_ROOT.'php/functions/load-pages-infos.php');
}

?>

<!-- Home -->
<section id="page-content" class="home">
	
	<br><br><br>
	- Desktop page content / <?php echo $main->contents->global->menu->home; ?> / <?php echo Config::$LANG; ?> -
	<br><br><br><br>
	
</section>
