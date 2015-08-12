angular
	.module('heroProgramApp', ['masonry']);
(function() {
angular
    .module('heroProgramApp')
    .controller('masonryController', masonryController);
    
    function masonryController(masonryFactory, $window, $scope) {
        var vm = this,
        	counter = 1,
        	storiesNumber = 5,
        	storiesList = [],
        	getStories;
        	vm.stories;
        	vm.playVideo = playVideo;
        	vm.showMoreStories = showMoreStories;
        	vm.showButton = false;

        storiesNumber = (function(){
        	if ($window.innerWidth > 992) {
        		return 12;
        	} else if ($window.innerWidth > 480 && $window.innerWidth < 992) {
        		return 8;
        	} else {
        		return 3;
        	}
        }());

        getStories = (function() {
        	masonryFactory
  				.getStories()
  				.then(function(response){
        			storiesList = response.data.stories;
        			if(response.data.stories.length < storiesNumber) {
        				vm.stories = response.data.stories;
        			} else {
        				vm.stories = response.data.stories.slice(0, storiesNumber);
        				vm.showButton = true;
        			}
        		}, function(response){	
        			console.log('error!', response);
        		});
        })();

        function showMoreStories() {
        	++counter;
        	if (storiesList.length > storiesNumber * counter) {
        		vm.stories = storiesList.slice(0, storiesNumber * counter);
        	} else {
        		vm.stories = storiesList.slice(0, storiesList.length);
        		vm.showButton = false;
        	}	
        }

        function playVideo(videoId) {
        	alert('playing video with ID ' + videoId);
        }


        //grabbing this from the broadcast
        $scope.$on("scrollThreshold", function() {
        	if (storiesList.length > storiesNumber * counter) {
	        	showMoreStories();
	        	$scope.$apply();
        	}
        });
    }
    masonryController.$inject = ["masonryFactory", "$window", "$scope"];
})();
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
(function() {
angular
    .module('heroProgramApp')
    .factory('masonryFactory', masonryFactory);
    
    function masonryFactory($http) {

        var masonry = {
            getStories : getStories
        };
        
        return masonry;
        
        function getStories() {
            var storiesURL = "../stories.json";
            return $http.get(storiesURL);
        }
        
    }
    masonryFactory.$inject = ["$http"];
})();
(function(){
// this is a filter for making the youtube link trusted 
angular
	.module('heroProgramApp')
	.filter('trusted', trusted); 
	function trusted($sce) {
	    return function (url) {
	        return $sce.trustAsResourceUrl(url);
	    };
	}
	trusted.$inject = ["$sce"];
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhlcm9Qcm9ncmFtQXBwLmpzIiwiY29udHJvbGxlcnMvbWFzb25yeUNvbnRyb2xsZXIuanMiLCJkaXJlY3RpdmVzL2F1dG9tYXRpYy1zaG93LW1vcmUuZGlyZWN0aXZlLmpzIiwiZmFjdG9yaWVzL21hc29ucnlGYWN0b3J5LmpzIiwiZmlsdGVycy9oZXJvVFZGaWx0ZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxPQUFPLGtCQUFrQixDQUFDLFlBQVk7QUNEeEMsQ0FBQyxXQUFXO0FBQ1o7S0FDSyxPQUFPO0tBQ1AsV0FBVyxxQkFBcUI7O0lBRWpDLFNBQVMsa0JBQWtCLGdCQUFnQixTQUFTLFFBQVE7UUFDeEQsSUFBSSxLQUFLO1NBQ1IsVUFBVTtTQUNWLGdCQUFnQjtTQUNoQixjQUFjO1NBQ2Q7U0FDQSxHQUFHO1NBQ0gsR0FBRyxZQUFZO1NBQ2YsR0FBRyxrQkFBa0I7U0FDckIsR0FBRyxhQUFhOztRQUVqQixpQkFBaUIsVUFBVTtTQUMxQixJQUFJLFFBQVEsYUFBYSxLQUFLO1VBQzdCLE9BQU87Z0JBQ0QsSUFBSSxRQUFRLGFBQWEsT0FBTyxRQUFRLGFBQWEsS0FBSztVQUNoRSxPQUFPO2dCQUNEO1VBQ04sT0FBTzs7OztRQUlULGFBQWEsQ0FBQyxXQUFXO1NBQ3hCO09BQ0Y7T0FDQSxLQUFLLFNBQVMsU0FBUztXQUNuQixjQUFjLFNBQVMsS0FBSztXQUM1QixHQUFHLFNBQVMsS0FBSyxRQUFRLFNBQVMsZUFBZTtZQUNoRCxHQUFHLFVBQVUsU0FBUyxLQUFLO2tCQUNyQjtZQUNOLEdBQUcsVUFBVSxTQUFTLEtBQUssUUFBUSxNQUFNLEdBQUc7WUFDNUMsR0FBRyxhQUFhOzthQUVmLFNBQVMsU0FBUztXQUNwQixRQUFRLElBQUksVUFBVTs7OztRQUl6QixTQUFTLGtCQUFrQjtTQUMxQixFQUFFO1NBQ0YsSUFBSSxZQUFZLFNBQVMsZ0JBQWdCLFNBQVM7VUFDakQsR0FBRyxVQUFVLFlBQVksTUFBTSxHQUFHLGdCQUFnQjtnQkFDNUM7VUFDTixHQUFHLFVBQVUsWUFBWSxNQUFNLEdBQUcsWUFBWTtVQUM5QyxHQUFHLGFBQWE7Ozs7UUFJbEIsU0FBUyxVQUFVLFNBQVM7U0FDM0IsTUFBTSwyQkFBMkI7Ozs7O1FBS2xDLE9BQU8sSUFBSSxtQkFBbUIsV0FBVztTQUN4QyxJQUFJLFlBQVksU0FBUyxnQkFBZ0IsU0FBUztVQUNqRDtVQUNBLE9BQU87Ozs7O0tBSVo7QUNqRUwsQ0FBQyxDQUFDLFdBQVc7Q0FDWjs7Q0FFQTtHQUNFLE9BQU87R0FDUCxVQUFVLHFCQUFxQjs7Q0FFakMsU0FBUyxvQkFBb0I7RUFDNUIsT0FBTztHQUNOLFVBQVU7R0FDVixNQUFNLFNBQVMsT0FBTztJQUNyQixTQUFTLGlCQUFpQixVQUFVLFNBQVMsR0FBRztLQUMvQyxJQUFJLFNBQVMsZ0JBQWdCLGVBQWUsU0FBUyxLQUFLLFlBQVksU0FBUyxLQUFLLGVBQWUsTUFBTTtNQUN4RyxNQUFNLFdBQVcsbUJBQW1COzs7Ozs7S0FNckM7QUNuQkwsQ0FBQyxXQUFXO0FBQ1o7S0FDSyxPQUFPO0tBQ1AsUUFBUSxrQkFBa0I7O0lBRTNCLFNBQVMsZUFBZSxPQUFPOztRQUUzQixJQUFJLFVBQVU7WUFDVixhQUFhOzs7UUFHakIsT0FBTzs7UUFFUCxTQUFTLGFBQWE7WUFDbEIsSUFBSSxhQUFhO1lBQ2pCLE9BQU8sTUFBTSxJQUFJOzs7OztLQUl4QjtBQ25CTCxDQUFDLFVBQVU7O0FBRVg7RUFDRSxPQUFPO0VBQ1AsT0FBTyxXQUFXO0NBQ25CLFNBQVMsUUFBUSxNQUFNO0tBQ25CLE9BQU8sVUFBVSxLQUFLO1NBQ2xCLE9BQU8sS0FBSyxtQkFBbUI7Ozs7S0FHbkMiLCJmaWxlIjoiYWxsLWhlcm80LWFuZ3VsYXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJhbmd1bGFyXHJcblx0Lm1vZHVsZSgnaGVyb1Byb2dyYW1BcHAnLCBbJ21hc29ucnknXSk7IiwiKGZ1bmN0aW9uKCkge1xyXG5hbmd1bGFyXHJcbiAgICAubW9kdWxlKCdoZXJvUHJvZ3JhbUFwcCcpXHJcbiAgICAuY29udHJvbGxlcignbWFzb25yeUNvbnRyb2xsZXInLCBtYXNvbnJ5Q29udHJvbGxlcik7XHJcbiAgICBcclxuICAgIGZ1bmN0aW9uIG1hc29ucnlDb250cm9sbGVyKG1hc29ucnlGYWN0b3J5LCAkd2luZG93LCAkc2NvcGUpIHtcclxuICAgICAgICB2YXIgdm0gPSB0aGlzLFxyXG4gICAgICAgIFx0Y291bnRlciA9IDEsXHJcbiAgICAgICAgXHRzdG9yaWVzTnVtYmVyID0gNSxcclxuICAgICAgICBcdHN0b3JpZXNMaXN0ID0gW10sXHJcbiAgICAgICAgXHRnZXRTdG9yaWVzO1xyXG4gICAgICAgIFx0dm0uc3RvcmllcztcclxuICAgICAgICBcdHZtLnBsYXlWaWRlbyA9IHBsYXlWaWRlbztcclxuICAgICAgICBcdHZtLnNob3dNb3JlU3RvcmllcyA9IHNob3dNb3JlU3RvcmllcztcclxuICAgICAgICBcdHZtLnNob3dCdXR0b24gPSBmYWxzZTtcclxuXHJcbiAgICAgICAgc3Rvcmllc051bWJlciA9IChmdW5jdGlvbigpe1xyXG4gICAgICAgIFx0aWYgKCR3aW5kb3cuaW5uZXJXaWR0aCA+IDk5Mikge1xyXG4gICAgICAgIFx0XHRyZXR1cm4gMTI7XHJcbiAgICAgICAgXHR9IGVsc2UgaWYgKCR3aW5kb3cuaW5uZXJXaWR0aCA+IDQ4MCAmJiAkd2luZG93LmlubmVyV2lkdGggPCA5OTIpIHtcclxuICAgICAgICBcdFx0cmV0dXJuIDg7XHJcbiAgICAgICAgXHR9IGVsc2Uge1xyXG4gICAgICAgIFx0XHRyZXR1cm4gMztcclxuICAgICAgICBcdH1cclxuICAgICAgICB9KCkpO1xyXG5cclxuICAgICAgICBnZXRTdG9yaWVzID0gKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIFx0bWFzb25yeUZhY3RvcnlcclxuICBcdFx0XHRcdC5nZXRTdG9yaWVzKClcclxuICBcdFx0XHRcdC50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKXtcclxuICAgICAgICBcdFx0XHRzdG9yaWVzTGlzdCA9IHJlc3BvbnNlLmRhdGEuc3RvcmllcztcclxuICAgICAgICBcdFx0XHRpZihyZXNwb25zZS5kYXRhLnN0b3JpZXMubGVuZ3RoIDwgc3Rvcmllc051bWJlcikge1xyXG4gICAgICAgIFx0XHRcdFx0dm0uc3RvcmllcyA9IHJlc3BvbnNlLmRhdGEuc3RvcmllcztcclxuICAgICAgICBcdFx0XHR9IGVsc2Uge1xyXG4gICAgICAgIFx0XHRcdFx0dm0uc3RvcmllcyA9IHJlc3BvbnNlLmRhdGEuc3Rvcmllcy5zbGljZSgwLCBzdG9yaWVzTnVtYmVyKTtcclxuICAgICAgICBcdFx0XHRcdHZtLnNob3dCdXR0b24gPSB0cnVlO1xyXG4gICAgICAgIFx0XHRcdH1cclxuICAgICAgICBcdFx0fSwgZnVuY3Rpb24ocmVzcG9uc2Upe1x0XHJcbiAgICAgICAgXHRcdFx0Y29uc29sZS5sb2coJ2Vycm9yIScsIHJlc3BvbnNlKTtcclxuICAgICAgICBcdFx0fSk7XHJcbiAgICAgICAgfSkoKTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gc2hvd01vcmVTdG9yaWVzKCkge1xyXG4gICAgICAgIFx0Kytjb3VudGVyO1xyXG4gICAgICAgIFx0aWYgKHN0b3JpZXNMaXN0Lmxlbmd0aCA+IHN0b3JpZXNOdW1iZXIgKiBjb3VudGVyKSB7XHJcbiAgICAgICAgXHRcdHZtLnN0b3JpZXMgPSBzdG9yaWVzTGlzdC5zbGljZSgwLCBzdG9yaWVzTnVtYmVyICogY291bnRlcik7XHJcbiAgICAgICAgXHR9IGVsc2Uge1xyXG4gICAgICAgIFx0XHR2bS5zdG9yaWVzID0gc3Rvcmllc0xpc3Quc2xpY2UoMCwgc3Rvcmllc0xpc3QubGVuZ3RoKTtcclxuICAgICAgICBcdFx0dm0uc2hvd0J1dHRvbiA9IGZhbHNlO1xyXG4gICAgICAgIFx0fVx0XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBwbGF5VmlkZW8odmlkZW9JZCkge1xyXG4gICAgICAgIFx0YWxlcnQoJ3BsYXlpbmcgdmlkZW8gd2l0aCBJRCAnICsgdmlkZW9JZCk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgLy9ncmFiYmluZyB0aGlzIGZyb20gdGhlIGJyb2FkY2FzdFxyXG4gICAgICAgICRzY29wZS4kb24oXCJzY3JvbGxUaHJlc2hvbGRcIiwgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgXHRpZiAoc3Rvcmllc0xpc3QubGVuZ3RoID4gc3Rvcmllc051bWJlciAqIGNvdW50ZXIpIHtcclxuXHQgICAgICAgIFx0c2hvd01vcmVTdG9yaWVzKCk7XHJcblx0ICAgICAgICBcdCRzY29wZS4kYXBwbHkoKTtcclxuICAgICAgICBcdH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxufSkoKTsiLCI7KGZ1bmN0aW9uKCkge1xyXG5cdFwidXNlIHN0cmljdFwiO1xyXG5cclxuXHRhbmd1bGFyXHJcblx0XHQubW9kdWxlKFwiaGVyb1Byb2dyYW1BcHBcIilcclxuXHRcdC5kaXJlY3RpdmUoXCJhdXRvbWF0aWNTaG93TW9yZVwiLCBhdXRvbWF0aWNTaG93TW9yZSk7XHJcblxyXG5cdGZ1bmN0aW9uIGF1dG9tYXRpY1Nob3dNb3JlKCkge1xyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0cmVzdHJpY3Q6IFwiQVwiLFxyXG5cdFx0XHRsaW5rOiBmdW5jdGlvbihzY29wZSkge1xyXG5cdFx0XHRcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgZnVuY3Rpb24oZSkge1xyXG5cdFx0XHRcdFx0aWYgKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQgKyBkb2N1bWVudC5ib2R5LnNjcm9sbFRvcCA+IGRvY3VtZW50LmJvZHkuc2Nyb2xsSGVpZ2h0ICogMC45MCkge1xyXG5cdFx0XHRcdFx0XHRzY29wZS4kYnJvYWRjYXN0KFwic2Nyb2xsVGhyZXNob2xkXCIsIGUpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9XHJcblx0XHR9O1xyXG5cdH1cclxufSkoKTsiLCIoZnVuY3Rpb24oKSB7XHJcbmFuZ3VsYXJcclxuICAgIC5tb2R1bGUoJ2hlcm9Qcm9ncmFtQXBwJylcclxuICAgIC5mYWN0b3J5KCdtYXNvbnJ5RmFjdG9yeScsIG1hc29ucnlGYWN0b3J5KTtcclxuICAgIFxyXG4gICAgZnVuY3Rpb24gbWFzb25yeUZhY3RvcnkoJGh0dHApIHtcclxuXHJcbiAgICAgICAgdmFyIG1hc29ucnkgPSB7XHJcbiAgICAgICAgICAgIGdldFN0b3JpZXMgOiBnZXRTdG9yaWVzXHJcbiAgICAgICAgfTtcclxuICAgICAgICBcclxuICAgICAgICByZXR1cm4gbWFzb25yeTtcclxuICAgICAgICBcclxuICAgICAgICBmdW5jdGlvbiBnZXRTdG9yaWVzKCkge1xyXG4gICAgICAgICAgICB2YXIgc3Rvcmllc1VSTCA9IFwiLi4vc3Rvcmllcy5qc29uXCI7XHJcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5nZXQoc3Rvcmllc1VSTCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgfVxyXG59KSgpOyIsIihmdW5jdGlvbigpe1xyXG4vLyB0aGlzIGlzIGEgZmlsdGVyIGZvciBtYWtpbmcgdGhlIHlvdXR1YmUgbGluayB0cnVzdGVkIFxyXG5hbmd1bGFyXHJcblx0Lm1vZHVsZSgnaGVyb1Byb2dyYW1BcHAnKVxyXG5cdC5maWx0ZXIoJ3RydXN0ZWQnLCB0cnVzdGVkKTsgXHJcblx0ZnVuY3Rpb24gdHJ1c3RlZCgkc2NlKSB7XHJcblx0ICAgIHJldHVybiBmdW5jdGlvbiAodXJsKSB7XHJcblx0ICAgICAgICByZXR1cm4gJHNjZS50cnVzdEFzUmVzb3VyY2VVcmwodXJsKTtcclxuXHQgICAgfTtcclxuXHR9XHJcbn0pKCk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9