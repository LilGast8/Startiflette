<?php



/* -------- Init -------- */
include_once('init.php');



/* -------- Texts -------- */
include_once(SITE_ROOT.'includes/contents/texts-'.LG.'.php');



/* -------- Load JSON -------- */
include_once(SITE_ROOT.'includes/func/load-json.php');



/* -------- Get page name -------- */
$page = '';
$subPage = '';
$part = '';
$subPart = '';

if(isset($_GET['page'])) $page = $_GET['page'];
if(isset($_GET['subPage'])) $subPage = $_GET['subPage'];
if(isset($_GET['part'])) $part = $_GET['part'];
if(isset($_GET['subPart'])) $subPart = $_GET['subPart'];

if(!$page) {
	if(LG == 'fr') $page = 'accueil';
	else if(LG == 'en') $page = 'home';
}



/* -------- Infos titles/metas of the page -------- */
$titlePage = '';
$descPage = '';

$titlePage = $infosPages[$page]['title'];
$descPage = $infosPages[$page]['desc'];
$file = $infosPages[$page]['file'];

if($file == 'project') {
	$url = $page.'/'.$subPage.'/'.$part;
	
	for($i=0; $i<count($projects); $i++) {
		$project = $projects[$i];
		
		if($project['url'] == $url) {
			$titlePage = $project['name'].' - '.$infosPages[$page]['title'];
			$descPage = $project['name'].' - '.$infosPages[$page]['title'];
			
			break;
		}
	}
}



/* -------- Show page -------- */
if(MOBILE && !TABLET) { // mobile
	include_once(SITE_ROOT.'includes/partials/header-mobile.php');
	include_once(SITE_ROOT.'pages/mobile/'.$file.'.php');
	include_once(SITE_ROOT.'includes/partials/footer-mobile.php');
} else { // desktop & tablette
	include_once(SITE_ROOT.'includes/partials/header.php');
	include_once(SITE_ROOT.'pages/desktop/'.$file.'.php');
	include_once(SITE_ROOT.'includes/partials/footer.php');
}



?>