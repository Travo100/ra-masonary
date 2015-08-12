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
            storiesList = [];
            vm.stories = [];
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

        function getAllStories() {
            masonryFactory
                .getStories()
                .then(function(response){
                    storiesList = response.data.stories;
                    if(response.data.stories.length < storiesNumber) {
                        vm.stories = storiesList;
                    } else {
                        vm.stories = storiesList.slice(0, storiesNumber);
                        vm.showButton = true;
                    }
                }, function(response){  
                    console.log('error!', response);
                });
        }
        
        getAllStories();

        function showMoreStories() {
            ++counter;
            if (storiesList.length > storiesNumber * counter) {
                vm.stories = storiesList.slice(0, storiesNumber * counter);
            } else {
                vm.stories = storiesList.slice(0, storiesList.length + 1);
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
					var scrollHeightThreshold = document.body.scrollHeight * 0.80;

					console.log(scrollTop, scrollHeightThreshold);

					if (scrollTop > scrollHeightThreshold) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhlcm9Qcm9ncmFtQXBwLmpzIiwiY29udHJvbGxlcnMvbWFzb25yeUNvbnRyb2xsZXIuanMiLCJkaXJlY3RpdmVzL2F1dG9tYXRpYy1zaG93LW1vcmUuZGlyZWN0aXZlLmpzIiwiZmFjdG9yaWVzL21hc29ucnlGYWN0b3J5LmpzIiwiZmlsdGVycy9oZXJvVFZGaWx0ZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxPQUFPLGtCQUFrQixDQUFDLFlBQVk7QUNEeEMsQ0FBQyxXQUFXO0FBQ1o7S0FDSyxPQUFPO0tBQ1AsV0FBVyxxQkFBcUI7O0lBRWpDLFNBQVMsa0JBQWtCLGdCQUFnQixTQUFTLFFBQVE7UUFDeEQsSUFBSSxLQUFLO1lBQ0wsVUFBVTtZQUNWLGdCQUFnQjtZQUNoQixjQUFjO1lBQ2QsR0FBRyxVQUFVO1lBQ2IsR0FBRyxZQUFZO1lBQ2YsR0FBRyxrQkFBa0I7WUFDckIsR0FBRyxhQUFhOztRQUVwQixpQkFBaUIsVUFBVTtZQUN2QixJQUFJLFFBQVEsYUFBYSxLQUFLO2dCQUMxQixPQUFPO21CQUNKLElBQUksUUFBUSxhQUFhLE9BQU8sUUFBUSxhQUFhLEtBQUs7Z0JBQzdELE9BQU87bUJBQ0o7Z0JBQ0gsT0FBTzs7OztRQUlmLFNBQVMsZ0JBQWdCO1lBQ3JCO2lCQUNLO2lCQUNBLEtBQUssU0FBUyxTQUFTO29CQUNwQixjQUFjLFNBQVMsS0FBSztvQkFDNUIsR0FBRyxTQUFTLEtBQUssUUFBUSxTQUFTLGVBQWU7d0JBQzdDLEdBQUcsVUFBVTsyQkFDVjt3QkFDSCxHQUFHLFVBQVUsWUFBWSxNQUFNLEdBQUc7d0JBQ2xDLEdBQUcsYUFBYTs7bUJBRXJCLFNBQVMsU0FBUztvQkFDakIsUUFBUSxJQUFJLFVBQVU7Ozs7UUFJbEM7O1FBRUEsU0FBUyxrQkFBa0I7WUFDdkIsRUFBRTtZQUNGLElBQUksWUFBWSxTQUFTLGdCQUFnQixTQUFTO2dCQUM5QyxHQUFHLFVBQVUsWUFBWSxNQUFNLEdBQUcsZ0JBQWdCO21CQUMvQztnQkFDSCxHQUFHLFVBQVUsWUFBWSxNQUFNLEdBQUcsWUFBWSxTQUFTO2dCQUN2RCxHQUFHLGFBQWE7Ozs7UUFJeEIsU0FBUyxVQUFVLFNBQVM7WUFDeEIsTUFBTSwyQkFBMkI7Ozs7O1FBS3JDLE9BQU8sSUFBSSxtQkFBbUIsV0FBVztZQUNyQyxJQUFJLFlBQVksU0FBUyxnQkFBZ0IsU0FBUztnQkFDOUM7Z0JBQ0EsT0FBTzs7Ozs7O0tBS2xCO0FDbkVMLENBQUMsV0FBVzs7O0NBR1g7R0FDRSxPQUFPO0dBQ1AsVUFBVSxxQkFBcUI7O0NBRWpDLFNBQVMsb0JBQW9CO0VBQzVCLE9BQU87R0FDTixVQUFVO0dBQ1YsTUFBTSxTQUFTLE9BQU8sTUFBTSxPQUFPO0lBQ2xDLFNBQVMsaUJBQWlCLFVBQVUsU0FBUyxHQUFHO0tBQy9DLElBQUksWUFBWSxLQUFLO01BQ3BCLFNBQVMsZ0JBQWdCLGVBQWUsU0FBUyxLQUFLO01BQ3RELFNBQVMsZ0JBQWdCLGVBQWUsU0FBUyxnQkFBZ0I7O0tBRWxFLElBQUksd0JBQXdCLFNBQVMsS0FBSyxlQUFlOztLQUV6RCxRQUFRLElBQUksV0FBVzs7S0FFdkIsSUFBSSxZQUFZLHVCQUF1QjtNQUN0QyxNQUFNLFdBQVcsbUJBQW1COzs7Ozs7S0FNckM7QUMzQkwsQ0FBQyxXQUFXO0FBQ1o7S0FDSyxPQUFPO0tBQ1AsUUFBUSxrQkFBa0I7O0lBRTNCLFNBQVMsZUFBZSxPQUFPOztRQUUzQixJQUFJLFVBQVU7WUFDVixhQUFhOzs7UUFHakIsT0FBTzs7UUFFUCxTQUFTLGFBQWE7WUFDbEIsSUFBSSxhQUFhO1lBQ2pCLE9BQU8sTUFBTSxJQUFJOzs7OztLQUl4QjtBQ25CTCxDQUFDLFVBQVU7O0FBRVg7RUFDRSxPQUFPO0VBQ1AsT0FBTyxXQUFXO0NBQ25CLFNBQVMsUUFBUSxNQUFNO0tBQ25CLE9BQU8sVUFBVSxLQUFLO1NBQ2xCLE9BQU8sS0FBSyxtQkFBbUI7Ozs7S0FHbkMiLCJmaWxlIjoiYWxsLWhlcm80LWFuZ3VsYXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJhbmd1bGFyXHJcblx0Lm1vZHVsZSgnaGVyb1Byb2dyYW1BcHAnLCBbJ21hc29ucnknXSk7IiwiKGZ1bmN0aW9uKCkge1xyXG5hbmd1bGFyXHJcbiAgICAubW9kdWxlKCdoZXJvUHJvZ3JhbUFwcCcpXHJcbiAgICAuY29udHJvbGxlcignbWFzb25yeUNvbnRyb2xsZXInLCBtYXNvbnJ5Q29udHJvbGxlcik7XHJcbiAgICBcclxuICAgIGZ1bmN0aW9uIG1hc29ucnlDb250cm9sbGVyKG1hc29ucnlGYWN0b3J5LCAkd2luZG93LCAkc2NvcGUpIHtcclxuICAgICAgICB2YXIgdm0gPSB0aGlzLFxyXG4gICAgICAgICAgICBjb3VudGVyID0gMSxcclxuICAgICAgICAgICAgc3Rvcmllc051bWJlciA9IDUsXHJcbiAgICAgICAgICAgIHN0b3JpZXNMaXN0ID0gW107XHJcbiAgICAgICAgICAgIHZtLnN0b3JpZXMgPSBbXTtcclxuICAgICAgICAgICAgdm0ucGxheVZpZGVvID0gcGxheVZpZGVvO1xyXG4gICAgICAgICAgICB2bS5zaG93TW9yZVN0b3JpZXMgPSBzaG93TW9yZVN0b3JpZXM7XHJcbiAgICAgICAgICAgIHZtLnNob3dCdXR0b24gPSBmYWxzZTtcclxuXHJcbiAgICAgICAgc3Rvcmllc051bWJlciA9IChmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBpZiAoJHdpbmRvdy5pbm5lcldpZHRoID4gOTkyKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gMTI7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoJHdpbmRvdy5pbm5lcldpZHRoID4gNDgwICYmICR3aW5kb3cuaW5uZXJXaWR0aCA8IDk5Mikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDg7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gMztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0oKSk7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGdldEFsbFN0b3JpZXMoKSB7XHJcbiAgICAgICAgICAgIG1hc29ucnlGYWN0b3J5XHJcbiAgICAgICAgICAgICAgICAuZ2V0U3RvcmllcygpXHJcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbihyZXNwb25zZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgc3Rvcmllc0xpc3QgPSByZXNwb25zZS5kYXRhLnN0b3JpZXM7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYocmVzcG9uc2UuZGF0YS5zdG9yaWVzLmxlbmd0aCA8IHN0b3JpZXNOdW1iZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdm0uc3RvcmllcyA9IHN0b3JpZXNMaXN0O1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZtLnN0b3JpZXMgPSBzdG9yaWVzTGlzdC5zbGljZSgwLCBzdG9yaWVzTnVtYmVyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdm0uc2hvd0J1dHRvbiA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24ocmVzcG9uc2UpeyAgXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2Vycm9yIScsIHJlc3BvbnNlKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBnZXRBbGxTdG9yaWVzKCk7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHNob3dNb3JlU3RvcmllcygpIHtcclxuICAgICAgICAgICAgKytjb3VudGVyO1xyXG4gICAgICAgICAgICBpZiAoc3Rvcmllc0xpc3QubGVuZ3RoID4gc3Rvcmllc051bWJlciAqIGNvdW50ZXIpIHtcclxuICAgICAgICAgICAgICAgIHZtLnN0b3JpZXMgPSBzdG9yaWVzTGlzdC5zbGljZSgwLCBzdG9yaWVzTnVtYmVyICogY291bnRlcik7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB2bS5zdG9yaWVzID0gc3Rvcmllc0xpc3Quc2xpY2UoMCwgc3Rvcmllc0xpc3QubGVuZ3RoICsgMSk7XHJcbiAgICAgICAgICAgICAgICB2bS5zaG93QnV0dG9uID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH0gICBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHBsYXlWaWRlbyh2aWRlb0lkKSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KCdwbGF5aW5nIHZpZGVvIHdpdGggSUQgJyArIHZpZGVvSWQpO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIC8vZ3JhYmJpbmcgdGhpcyBmcm9tIHRoZSBicm9hZGNhc3RcclxuICAgICAgICAkc2NvcGUuJG9uKFwic2Nyb2xsVGhyZXNob2xkXCIsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBpZiAoc3Rvcmllc0xpc3QubGVuZ3RoID4gc3Rvcmllc051bWJlciAqIGNvdW50ZXIpIHtcclxuICAgICAgICAgICAgICAgIHNob3dNb3JlU3RvcmllcygpO1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfVxyXG59KSgpOyIsIihmdW5jdGlvbigpIHtcclxuXHJcblxyXG5cdGFuZ3VsYXJcclxuXHRcdC5tb2R1bGUoXCJoZXJvUHJvZ3JhbUFwcFwiKVxyXG5cdFx0LmRpcmVjdGl2ZShcImF1dG9tYXRpY1Nob3dNb3JlXCIsIGF1dG9tYXRpY1Nob3dNb3JlKTtcclxuXHJcblx0ZnVuY3Rpb24gYXV0b21hdGljU2hvd01vcmUoKSB7XHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRyZXN0cmljdDogXCJBXCIsXHJcblx0XHRcdGxpbms6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtLCBhdHRycykge1xyXG5cdFx0XHRcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgZnVuY3Rpb24oZSkge1xyXG5cdFx0XHRcdFx0dmFyIHNjcm9sbFRvcCA9IE1hdGgubWF4KFxyXG5cdFx0XHRcdFx0XHRkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0ICsgZG9jdW1lbnQuYm9keS5zY3JvbGxUb3AsXHJcblx0XHRcdFx0XHRcdGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQgKyBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wXHJcblx0XHRcdFx0XHQpO1xyXG5cdFx0XHRcdFx0dmFyIHNjcm9sbEhlaWdodFRocmVzaG9sZCA9IGRvY3VtZW50LmJvZHkuc2Nyb2xsSGVpZ2h0ICogMC44MDtcclxuXHJcblx0XHRcdFx0XHRjb25zb2xlLmxvZyhzY3JvbGxUb3AsIHNjcm9sbEhlaWdodFRocmVzaG9sZCk7XHJcblxyXG5cdFx0XHRcdFx0aWYgKHNjcm9sbFRvcCA+IHNjcm9sbEhlaWdodFRocmVzaG9sZCkge1xyXG5cdFx0XHRcdFx0XHRzY29wZS4kYnJvYWRjYXN0KFwic2Nyb2xsVGhyZXNob2xkXCIsIGUpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9XHJcblx0XHR9O1xyXG5cdH1cclxufSkoKTsiLCIoZnVuY3Rpb24oKSB7XHJcbmFuZ3VsYXJcclxuICAgIC5tb2R1bGUoJ2hlcm9Qcm9ncmFtQXBwJylcclxuICAgIC5mYWN0b3J5KCdtYXNvbnJ5RmFjdG9yeScsIG1hc29ucnlGYWN0b3J5KTtcclxuICAgIFxyXG4gICAgZnVuY3Rpb24gbWFzb25yeUZhY3RvcnkoJGh0dHApIHtcclxuXHJcbiAgICAgICAgdmFyIG1hc29ucnkgPSB7XHJcbiAgICAgICAgICAgIGdldFN0b3JpZXMgOiBnZXRTdG9yaWVzXHJcbiAgICAgICAgfTtcclxuICAgICAgICBcclxuICAgICAgICByZXR1cm4gbWFzb25yeTtcclxuICAgICAgICBcclxuICAgICAgICBmdW5jdGlvbiBnZXRTdG9yaWVzKCkge1xyXG4gICAgICAgICAgICB2YXIgc3Rvcmllc1VSTCA9IFwiLi4vc3Rvcmllcy5qc29uXCI7XHJcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5nZXQoc3Rvcmllc1VSTCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgfVxyXG59KSgpOyIsIihmdW5jdGlvbigpe1xyXG4vLyB0aGlzIGlzIGEgZmlsdGVyIGZvciBtYWtpbmcgdGhlIHlvdXR1YmUgbGluayB0cnVzdGVkIFxyXG5hbmd1bGFyXHJcblx0Lm1vZHVsZSgnaGVyb1Byb2dyYW1BcHAnKVxyXG5cdC5maWx0ZXIoJ3RydXN0ZWQnLCB0cnVzdGVkKTsgXHJcblx0ZnVuY3Rpb24gdHJ1c3RlZCgkc2NlKSB7XHJcblx0ICAgIHJldHVybiBmdW5jdGlvbiAodXJsKSB7XHJcblx0ICAgICAgICByZXR1cm4gJHNjZS50cnVzdEFzUmVzb3VyY2VVcmwodXJsKTtcclxuXHQgICAgfTtcclxuXHR9XHJcbn0pKCk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9