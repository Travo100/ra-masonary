// this directive allows a CSS3 transition on model change with a class 
// called changed
// CSS Example-
// [animate-on-change] {
// 	  transition: opacity 0.5s ease-in-out;
// 	  -webkit-transition: opacity 0.5s ease-in-out;
// 	}
// 	[animate-on-change].changed {
// 	    opacity: 0;
// 	    transition: none;
// 	    -webkit-transition: none;
// 	}	
(function(){
angular
    .module('heroProgramApp')
    .directive('animateOnChange', animateOnChange); 

    function animateOnChange($timeout) {
        return function(scope, element, attr) {
            scope.$watch(attr.animateOnChange, function(nv,ov) {
                if (nv!==ov) {
                    element.addClass('changed');
                    $timeout(function() {
                        element.removeClass('changed');
                    }, 250); // this is a set timeout time, that can be changed
                }
            });
        };  
    }
})();