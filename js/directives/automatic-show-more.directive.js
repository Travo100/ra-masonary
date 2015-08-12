;(function() {
	"use strict";

	angular
		.module("heroProgramApp")
		.directive("automaticShowMore", automaticShowMore);

	function automaticShowMore() {
		return {
			restrict: "A",
			link: function(scope) {
				document.addEventListener("scroll", function(e) {
					if (document.documentElement.clientHeight + document.body.scrollTop > document.body.scrollHeight * 0.90) {
						scope.$broadcast("scrollThreshold", e);
					}
				});
			}
		};
	}
})();