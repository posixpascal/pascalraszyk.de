define(function(){
	'use strict';
	var Parallax = function() {
	    return this;
	};





	Parallax.prototype.start = function() {
	    var body = document.body;
	    var backgroundPosition = 0;
	    var maxPosition = -1 * (4272 - document.body.width);

	    setInterval(function() {
	        backgroundPosition -= 1;
	        body.style.backgroundPositionX = backgroundPosition + 'px';

	        if (backgroundPosition === maxPosition) {
	            backgroundPosition = 0;
	        }

	    }, 1000 / 16);
	};

	return Parallax;
});