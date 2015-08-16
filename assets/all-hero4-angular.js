angular
	.module('heroProgramApp', ['masonry', 'ngAnimate']);
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
					var scrollHeightThreshold = document.body.scrollHeight * 0.90;

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
(function() {
angular
    .module('heroProgramApp')
    .controller('masonryController', masonryController);
    
    function masonryController(masonryFactory, $window, $scope) {
        var vm = this,
            counter = 1,
            storiesNumber = 3,
            desktopWidth = 992,
            tabletWidth = 480;
            storiesList = [];
            vm.stories = [];
            vm.playVideo = playVideo;
            vm.showMoreStories = showMoreStories;
            vm.showButton = false;

        storiesNumber = (function(){
            if ($window.innerWidth > desktopWidth) {
                return 12;
            } else if ($window.innerWidth > tabletWidth && $window.innerWidth < desktopWidth) {
                return 8;
            } else {
                return 3;
            }
        }());

        // getAllStories gets all the stories from the masonryFactory.getStories endpoint
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhlcm9Qcm9ncmFtQXBwLmpzIiwiZGlyZWN0aXZlcy9hdXRvbWF0aWMtc2hvdy1tb3JlLmRpcmVjdGl2ZS5qcyIsImZhY3Rvcmllcy9tYXNvbnJ5RmFjdG9yeS5qcyIsImZpbHRlcnMvaGVyb1RWRmlsdGVyLmpzIiwiY29udHJvbGxlcnMvbWFzb25yeUNvbnRyb2xsZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxPQUFPLGtCQUFrQixDQUFDLFdBQVcsY0FBYztBQ0RyRCxDQUFDLFdBQVc7Q0FDWDtHQUNFLE9BQU87R0FDUCxVQUFVLHFCQUFxQjs7Q0FFakMsU0FBUyxvQkFBb0I7RUFDNUIsT0FBTztHQUNOLFVBQVU7R0FDVixNQUFNLFNBQVMsT0FBTyxNQUFNLE9BQU87SUFDbEMsU0FBUyxpQkFBaUIsVUFBVSxTQUFTLEdBQUc7S0FDL0MsSUFBSSxZQUFZLEtBQUs7TUFDcEIsU0FBUyxnQkFBZ0IsZUFBZSxTQUFTLEtBQUs7TUFDdEQsU0FBUyxnQkFBZ0IsZUFBZSxTQUFTLGdCQUFnQjs7S0FFbEUsSUFBSSx3QkFBd0IsU0FBUyxLQUFLLGVBQWU7O0tBRXpELElBQUksWUFBWSx1QkFBdUI7TUFDdEMsTUFBTSxXQUFXLG1CQUFtQjs7Ozs7O0tBTXJDO0FDdkJMLENBQUMsV0FBVztBQUNaO0tBQ0ssT0FBTztLQUNQLFFBQVEsa0JBQWtCOztJQUUzQixTQUFTLGVBQWUsT0FBTzs7UUFFM0IsSUFBSSxVQUFVO1lBQ1YsYUFBYTs7O1FBR2pCLE9BQU87O1FBRVAsU0FBUyxhQUFhO1lBQ2xCLElBQUksYUFBYTtZQUNqQixPQUFPLE1BQU0sSUFBSTs7Ozs7S0FJeEI7QUNuQkwsQ0FBQyxVQUFVOztBQUVYO0VBQ0UsT0FBTztFQUNQLE9BQU8sV0FBVztDQUNuQixTQUFTLFFBQVEsTUFBTTtLQUNuQixPQUFPLFVBQVUsS0FBSztTQUNsQixPQUFPLEtBQUssbUJBQW1COzs7O0tBR25DO0FDVkwsQ0FBQyxXQUFXO0FBQ1o7S0FDSyxPQUFPO0tBQ1AsV0FBVyxxQkFBcUI7O0lBRWpDLFNBQVMsa0JBQWtCLGdCQUFnQixTQUFTLFFBQVE7UUFDeEQsSUFBSSxLQUFLO1lBQ0wsVUFBVTtZQUNWLGdCQUFnQjtZQUNoQixlQUFlO1lBQ2YsY0FBYztZQUNkLGNBQWM7WUFDZCxHQUFHLFVBQVU7WUFDYixHQUFHLFlBQVk7WUFDZixHQUFHLGtCQUFrQjtZQUNyQixHQUFHLGFBQWE7O1FBRXBCLGlCQUFpQixVQUFVO1lBQ3ZCLElBQUksUUFBUSxhQUFhLGNBQWM7Z0JBQ25DLE9BQU87bUJBQ0osSUFBSSxRQUFRLGFBQWEsZUFBZSxRQUFRLGFBQWEsY0FBYztnQkFDOUUsT0FBTzttQkFDSjtnQkFDSCxPQUFPOzs7OztRQUtmLFNBQVMsZ0JBQWdCO1lBQ3JCO2lCQUNLO2lCQUNBLEtBQUssU0FBUyxTQUFTO29CQUNwQixjQUFjLFNBQVMsS0FBSztvQkFDNUIsR0FBRyxTQUFTLEtBQUssUUFBUSxTQUFTLGVBQWU7d0JBQzdDLEdBQUcsVUFBVTsyQkFDVjt3QkFDSCxHQUFHLFVBQVUsWUFBWSxNQUFNLEdBQUc7d0JBQ2xDLEdBQUcsYUFBYTs7bUJBRXJCLFNBQVMsU0FBUztvQkFDakIsUUFBUSxJQUFJLFVBQVU7Ozs7UUFJbEM7O1FBRUEsU0FBUyxrQkFBa0I7WUFDdkIsRUFBRTtZQUNGLElBQUksWUFBWSxTQUFTLGdCQUFnQixTQUFTO2dCQUM5QyxHQUFHLFVBQVUsWUFBWSxNQUFNLEdBQUcsZ0JBQWdCO21CQUMvQztnQkFDSCxHQUFHLFVBQVUsWUFBWSxNQUFNLEdBQUcsWUFBWSxTQUFTO2dCQUN2RCxHQUFHLGFBQWE7Ozs7UUFJeEIsU0FBUyxVQUFVLFNBQVM7WUFDeEIsTUFBTSwyQkFBMkI7Ozs7O1FBS3JDLE9BQU8sSUFBSSxtQkFBbUIsV0FBVztZQUNyQyxJQUFJLFlBQVksU0FBUyxnQkFBZ0IsU0FBUztnQkFDOUM7Z0JBQ0EsT0FBTzs7Ozs7O0tBS2xCIiwiZmlsZSI6ImFsbC1oZXJvNC1hbmd1bGFyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiYW5ndWxhclxyXG5cdC5tb2R1bGUoJ2hlcm9Qcm9ncmFtQXBwJywgWydtYXNvbnJ5JywgJ25nQW5pbWF0ZSddKTsiLCIoZnVuY3Rpb24oKSB7XHJcblx0YW5ndWxhclxyXG5cdFx0Lm1vZHVsZShcImhlcm9Qcm9ncmFtQXBwXCIpXHJcblx0XHQuZGlyZWN0aXZlKFwiYXV0b21hdGljU2hvd01vcmVcIiwgYXV0b21hdGljU2hvd01vcmUpO1xyXG5cclxuXHRmdW5jdGlvbiBhdXRvbWF0aWNTaG93TW9yZSgpIHtcclxuXHRcdHJldHVybiB7XHJcblx0XHRcdHJlc3RyaWN0OiBcIkFcIixcclxuXHRcdFx0bGluazogZnVuY3Rpb24oc2NvcGUsIGVsZW0sIGF0dHJzKSB7XHJcblx0XHRcdFx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLCBmdW5jdGlvbihlKSB7XHJcblx0XHRcdFx0XHR2YXIgc2Nyb2xsVG9wID0gTWF0aC5tYXgoXHJcblx0XHRcdFx0XHRcdGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQgKyBkb2N1bWVudC5ib2R5LnNjcm9sbFRvcCxcclxuXHRcdFx0XHRcdFx0ZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodCArIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3BcclxuXHRcdFx0XHRcdCk7XHJcblx0XHRcdFx0XHR2YXIgc2Nyb2xsSGVpZ2h0VGhyZXNob2xkID0gZG9jdW1lbnQuYm9keS5zY3JvbGxIZWlnaHQgKiAwLjkwO1xyXG5cclxuXHRcdFx0XHRcdGlmIChzY3JvbGxUb3AgPiBzY3JvbGxIZWlnaHRUaHJlc2hvbGQpIHtcclxuXHRcdFx0XHRcdFx0c2NvcGUuJGJyb2FkY2FzdChcInNjcm9sbFRocmVzaG9sZFwiLCBlKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fVxyXG5cdFx0fTtcclxuXHR9XHJcbn0pKCk7IiwiKGZ1bmN0aW9uKCkge1xyXG5hbmd1bGFyXHJcbiAgICAubW9kdWxlKCdoZXJvUHJvZ3JhbUFwcCcpXHJcbiAgICAuZmFjdG9yeSgnbWFzb25yeUZhY3RvcnknLCBtYXNvbnJ5RmFjdG9yeSk7XHJcbiAgICBcclxuICAgIGZ1bmN0aW9uIG1hc29ucnlGYWN0b3J5KCRodHRwKSB7XHJcblxyXG4gICAgICAgIHZhciBtYXNvbnJ5ID0ge1xyXG4gICAgICAgICAgICBnZXRTdG9yaWVzIDogZ2V0U3Rvcmllc1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIG1hc29ucnk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgZnVuY3Rpb24gZ2V0U3RvcmllcygpIHtcclxuICAgICAgICAgICAgdmFyIHN0b3JpZXNVUkwgPSBcIi4uL3N0b3JpZXMuanNvblwiO1xyXG4gICAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KHN0b3JpZXNVUkwpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgIH1cclxufSkoKTsiLCIoZnVuY3Rpb24oKXtcclxuLy8gdGhpcyBpcyBhIGZpbHRlciBmb3IgbWFraW5nIHRoZSB5b3V0dWJlIGxpbmsgdHJ1c3RlZCBcclxuYW5ndWxhclxyXG5cdC5tb2R1bGUoJ2hlcm9Qcm9ncmFtQXBwJylcclxuXHQuZmlsdGVyKCd0cnVzdGVkJywgdHJ1c3RlZCk7IFxyXG5cdGZ1bmN0aW9uIHRydXN0ZWQoJHNjZSkge1xyXG5cdCAgICByZXR1cm4gZnVuY3Rpb24gKHVybCkge1xyXG5cdCAgICAgICAgcmV0dXJuICRzY2UudHJ1c3RBc1Jlc291cmNlVXJsKHVybCk7XHJcblx0ICAgIH07XHJcblx0fVxyXG59KSgpOyIsIihmdW5jdGlvbigpIHtcclxuYW5ndWxhclxyXG4gICAgLm1vZHVsZSgnaGVyb1Byb2dyYW1BcHAnKVxyXG4gICAgLmNvbnRyb2xsZXIoJ21hc29ucnlDb250cm9sbGVyJywgbWFzb25yeUNvbnRyb2xsZXIpO1xyXG4gICAgXHJcbiAgICBmdW5jdGlvbiBtYXNvbnJ5Q29udHJvbGxlcihtYXNvbnJ5RmFjdG9yeSwgJHdpbmRvdywgJHNjb3BlKSB7XHJcbiAgICAgICAgdmFyIHZtID0gdGhpcyxcclxuICAgICAgICAgICAgY291bnRlciA9IDEsXHJcbiAgICAgICAgICAgIHN0b3JpZXNOdW1iZXIgPSAzLFxyXG4gICAgICAgICAgICBkZXNrdG9wV2lkdGggPSA5OTIsXHJcbiAgICAgICAgICAgIHRhYmxldFdpZHRoID0gNDgwO1xyXG4gICAgICAgICAgICBzdG9yaWVzTGlzdCA9IFtdO1xyXG4gICAgICAgICAgICB2bS5zdG9yaWVzID0gW107XHJcbiAgICAgICAgICAgIHZtLnBsYXlWaWRlbyA9IHBsYXlWaWRlbztcclxuICAgICAgICAgICAgdm0uc2hvd01vcmVTdG9yaWVzID0gc2hvd01vcmVTdG9yaWVzO1xyXG4gICAgICAgICAgICB2bS5zaG93QnV0dG9uID0gZmFsc2U7XHJcblxyXG4gICAgICAgIHN0b3JpZXNOdW1iZXIgPSAoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgaWYgKCR3aW5kb3cuaW5uZXJXaWR0aCA+IGRlc2t0b3BXaWR0aCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDEyO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKCR3aW5kb3cuaW5uZXJXaWR0aCA+IHRhYmxldFdpZHRoICYmICR3aW5kb3cuaW5uZXJXaWR0aCA8IGRlc2t0b3BXaWR0aCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDg7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gMztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0oKSk7XHJcblxyXG4gICAgICAgIC8vIGdldEFsbFN0b3JpZXMgZ2V0cyBhbGwgdGhlIHN0b3JpZXMgZnJvbSB0aGUgbWFzb25yeUZhY3RvcnkuZ2V0U3RvcmllcyBlbmRwb2ludFxyXG4gICAgICAgIGZ1bmN0aW9uIGdldEFsbFN0b3JpZXMoKSB7XHJcbiAgICAgICAgICAgIG1hc29ucnlGYWN0b3J5XHJcbiAgICAgICAgICAgICAgICAuZ2V0U3RvcmllcygpXHJcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbihyZXNwb25zZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgc3Rvcmllc0xpc3QgPSByZXNwb25zZS5kYXRhLnN0b3JpZXM7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYocmVzcG9uc2UuZGF0YS5zdG9yaWVzLmxlbmd0aCA8IHN0b3JpZXNOdW1iZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdm0uc3RvcmllcyA9IHN0b3JpZXNMaXN0O1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZtLnN0b3JpZXMgPSBzdG9yaWVzTGlzdC5zbGljZSgwLCBzdG9yaWVzTnVtYmVyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdm0uc2hvd0J1dHRvbiA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24ocmVzcG9uc2UpeyAgXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2Vycm9yIScsIHJlc3BvbnNlKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBnZXRBbGxTdG9yaWVzKCk7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHNob3dNb3JlU3RvcmllcygpIHtcclxuICAgICAgICAgICAgKytjb3VudGVyO1xyXG4gICAgICAgICAgICBpZiAoc3Rvcmllc0xpc3QubGVuZ3RoID4gc3Rvcmllc051bWJlciAqIGNvdW50ZXIpIHtcclxuICAgICAgICAgICAgICAgIHZtLnN0b3JpZXMgPSBzdG9yaWVzTGlzdC5zbGljZSgwLCBzdG9yaWVzTnVtYmVyICogY291bnRlcik7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB2bS5zdG9yaWVzID0gc3Rvcmllc0xpc3Quc2xpY2UoMCwgc3Rvcmllc0xpc3QubGVuZ3RoICsgMSk7XHJcbiAgICAgICAgICAgICAgICB2bS5zaG93QnV0dG9uID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH0gICBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHBsYXlWaWRlbyh2aWRlb0lkKSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KCdwbGF5aW5nIHZpZGVvIHdpdGggSUQgJyArIHZpZGVvSWQpO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIC8vZ3JhYmJpbmcgdGhpcyBmcm9tIHRoZSBicm9hZGNhc3RcclxuICAgICAgICAkc2NvcGUuJG9uKFwic2Nyb2xsVGhyZXNob2xkXCIsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBpZiAoc3Rvcmllc0xpc3QubGVuZ3RoID4gc3Rvcmllc051bWJlciAqIGNvdW50ZXIpIHtcclxuICAgICAgICAgICAgICAgIHNob3dNb3JlU3RvcmllcygpO1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfVxyXG59KSgpOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==