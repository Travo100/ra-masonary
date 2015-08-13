(function() {


	angular
		.module("heroProgramApp")
		.directive("automaticShowMore", automaticShowMore);

	function automaticShowMore() {
		return {
			restrict: "A",
			link: function(scope, elem, attrs) {
				document.addEventListener("scroll", function(e) {
					var scrollTop = Math.max(
						document.documentElement.clientHeight + document.body.scrollTop,
						document.documentElement.clientHeight + document.documentElement.scrollTop
					);
					var scrollHeightThreshold = document.body.scrollHeight * 0.60;

					console.log(scrollTop, scrollHeightThreshold);

					if (scrollTop > scrollHeightThreshold) {
						scope.$broadcast("scrollThreshold", e);
					}
				});
			}
		};
	}
})();