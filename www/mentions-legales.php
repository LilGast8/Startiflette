<!DOCTYPE html>
<html lang="fr">
<head>
	<title>Mentions légales | [TITRE]</title>
	<meta charset="utf-8" />
	<meta name="author" content="Gaston Bouchayer" />
	<meta name="description" content="" />
	<meta name="keywords" content="" />
	<meta name="robots" content="noindex, nofollow">
	<noscript><meta http-equiv="refresh" content="0; url=alternate/no-js.php" /></noscript>
	<script src="js/plugins/browser-detect.js"></script>
	
	<link rel="shortcut icon" href="images/logos/favicon.ico" />
	
	<link media="screen" rel="stylesheet" type="text/css" href="css/styles.css" />
	
	<!--[if lt IE 9]><script type="text/javascript" src="js/plugins/html5shiv.js"></script><![endif]-->
	
	<?php if($_SERVER['HTTP_HOST'] != 'localhost:8888') { ?>
	<!-- Google Analytics -->
	<script type="text/javascript">
		var _gaq = _gaq || [];
		_gaq.push(['_setAccount', 'UA-XXXX-XX']);
		_gaq.push(['_trackPageview']);
		(function() {
			var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
			ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
			var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
		})();
	</script>
	<?php } ?>
</head>

<!--[if IE 7]><body class="ie7 oldie"><![endif]-->
<!--[if IE 8]><body class="ie8 oldie"><![endif]-->
<!--[if (gte IE 9)|!(IE)]><!--><body><!--<![endif]-->


<section id="mentionsLegales">
	<div class="logo">
		<img src="images/logos/logo" alt="Logo" />
	</div>
	<h1>Mentions légales</h1>
	<h2>1- Informations légales</h2>
	<p>
		Le site <a href="http://www.URL-DU-SITE.com" target="_blank">www.URL-DU-SITE.com</a> que vous consultez actuellement est la propriété de : <br />
		<br />
		NOM SOCIÉTÉ <br />
		ADRESSE <br />
		CP VILLE <br />
		Le directeur de la publication est : DIRECTEUR DE PUBLICATION <br />
		Ce site est hébergé par la société : HÉBERGEUR <br />
		Il a été créé par la société : AKARU (<a href="http://www.akaru.fr" target="_blank">http://www.akaru.fr</a>) <br />
		Ce site est déclaré à la CNIL et porte le numéro d'autorisation : (en cours d'attribution)
	</p>
	<h2>2- Données personnelles</h2>
	<p>
		Conformément à la loi Informatique et Libertés du 6 Janvier 1978, vous disposez d'un droit d'accès, de rectification, de modification et de suppression des données personnelles que vous nous avez communiquées. Vous pouvez exercer ce droit en envoyant un e-mail à : <span class="email">rf[dot]ENIAMOD[at]LIAME</span>. <br />
		Si vous êtes abonnés à des services d'information par courrier électronique ("newsletter"), vous pouvez demander à ne plus recevoir ces courriers soit comme indiqué ci-dessus, soit en suivant les instructions figurant en fin de chacun de ces courriers, lorsque vous les recevez.
	</p>
	<h2>3- Cookies</h2>
	<p>
		Le site n'utilise pas de cookies. 
	</p>
	<h2>4- Liens vers d'autres sites</h2>
	<p>
		SOCIÉTÉ propose sur son site des liens vers des sites tiers. Ces liens sont établis en accord avec les sites concernés à un moment où SOCIÉTÉ a pu juger opportun de le faire, compte tenu des contenus et services de ces sites. SOCIÉTÉ ne pourra être tenu responsable du contenu de ces sites et de l'usage qui pourra en être fait par les utilisateurs.
	</p>
	<h2>5- Propriété Intellectuelle</h2>
	<p>
		L'accès au site <a href="http://www.URL-DU-SITE.com" target="_blank">www.URL-DU-SITE.com</a> vous confère un droit d'usage privé et non exclusif de ce site. Tous les articles, photographies et autres documents sur ce site sont la propriété SOCIÉTÉ, ou sont autorisés avec l'autorisation de leurs propriétaires, et sont soumis au droit d'auteur et autres droits de propriété intellectuelle. L'utilisation frauduleuse de tout contenu du site Internet est totalement interdite. SOCIÉTÉ vous informe qu'il usera largement de ses droits de propriété intellectuelle pour engager des poursuites, mêmes pénales, si nécessaires.
	</p>
	<h2>6- Indisponibilité du site</h2>
	<p>
		SOCIÉTÉ s'engage à faire ses meilleurs efforts pour assurer aux utilisateurs une accessibilité du site à tout moment. SOCIÉTÉ ne pourra être tenu responsable, en cas d'indisponibilité du site, pour quelque cause que ce soit.
	</p>
	<h2>7- Contact</h2>
	<p>Pour nous contacter par mail : <span class="email">rf[dot]ENIAMOD[at]LIAME</span></p>
</section>



<!-- Scripts -->
<script src="js/plugins/jquery.min.js"></script>
<script src="js/plugins/jquery.dcspamless.min.js"></script>
<script>
	$(function(){
		$('.email').dcSpamless();
	});
</script>


</body>
</html>