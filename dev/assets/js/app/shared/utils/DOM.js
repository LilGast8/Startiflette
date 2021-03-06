

window.STF_dom_addClass = ( el, classToAdd ) => {
	if ( el.classList )
		el.classList.add( classToAdd );
	else {
		if ( !STF_dom_hasClass( el, classToAdd ) )
			el.className += ' ' + classToAdd;
	}
};


window.STF_dom_removeClass = ( el, classToRemove ) => {
	if ( el.classList )
		el.classList.remove( classToRemove );
	else {
		el.className = el.className.replace( new RegExp( '(^|\\b)' + classToRemove.split(' ').join( '|' ) + '(\\b|$)', 'gi' ), '');
		
		const lastCharPos = el.className.length - 1;
		if ( el.className[ lastCharPos ] == ' ' )
			el.className = el.className.substring( 0, lastCharPos );
	}
};


window.STF_dom_resetClass = ( el ) => {
	el.className = '';
};


window.STF_dom_hasClass = ( el, classToCheck ) => {
	let hasClass;
	
	if ( el.classList )
		hasClass = el.classList.contains( classToCheck );
	else
		hasClass = new RegExp( '(^| )' + classToCheck + '( |$)', 'gi' ).test( el.className );
	
	
	return hasClass;
};


window.STF_dom_resetStyle = ( el ) => {
	el.style.cssText = '';
};


window.STF_dom_setTranslate = ( el, x, y ) => {
	x = x === null ? 0 : x;
	y = y === null ? 0 : y;
	
	if ( STF.Configs.Props.HAS_TRANSFORMS_3D )
		el.style[ STF.Configs.Props.TRANSFORM ] = 'translate3d(' + x + 'px, ' + y + 'px, 0px)';
	else
		el.style[ STF.Configs.Props.TRANSFORM ] = 'translate(' + x + 'px, ' + y + 'px)';
};

