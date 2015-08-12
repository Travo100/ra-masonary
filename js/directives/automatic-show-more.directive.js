(function() {


	angular
		.module("heroProgramApp")
		.directive("automaticShowMore", automaticShowMore);

	function automaticShowMore() {
		return {
			restrict: "A",
			link: function(scope, elem, attrs) {
				document.addEventListener("scroll", function(e) {
					if (document.documentElement.clientHeight + document.body.scrollTop > document.body.scrollHeight * 0.80) {
						scope.$broadcast("scrollThreshold", e);
					}
				});
			}
		};
	}
})();