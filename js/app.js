;(function(){

	$(function(){
		var $window = $(window);
		var $htmlbody = $("body");
		$window.on("scroll", function(){
			if ($htmlbody.scrollTop() > 30){
				$(".navigation-bar").addClass("-solid");
			} else {
				$(".navigation-bar").removeClass("-solid");
			}
		});
	});

})();