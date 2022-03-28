/*
	Author: Leanne Douglas
	Date:	March 27, 2022
    Notes:	COMP2132 - Final Project
			This JavaScript file enables a slide and hide vector menu (nav).
			Each click of the button (class="small_menu") will toggle ON and OFF
			the class="show", between these two states:
   				<nav class="show">
    				OR
   				<nav>
*/

(function(doc)
{
	const $nav = doc.querySelector('nav');
	const $menuBtn = doc.querySelector('.small_menu');
	
	$menuBtn.addEventListener('click', function()
	{
		$nav.classList.toggle('show');
	});
	
})(document);
