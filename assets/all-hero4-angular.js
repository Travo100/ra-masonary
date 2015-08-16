angular
	.module('heroProgramApp', ['masonry', 'ngAnimate']);
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
                return 12;
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
                console.log('hit false');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhlcm9Qcm9ncmFtQXBwLmpzIiwiY29udHJvbGxlcnMvbWFzb25yeUNvbnRyb2xsZXIuanMiLCJmYWN0b3JpZXMvbWFzb25yeUZhY3RvcnkuanMiLCJkaXJlY3RpdmVzL2F1dG9tYXRpYy1zaG93LW1vcmUuZGlyZWN0aXZlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsT0FBTyxrQkFBa0IsQ0FBQyxXQUFXLGNBQWM7QUNEckQsQ0FBQyxXQUFXO0FBQ1o7S0FDSyxPQUFPO0tBQ1AsV0FBVyxxQkFBcUI7O0lBRWpDLFNBQVMsa0JBQWtCLGdCQUFnQixTQUFTLFFBQVE7UUFDeEQsSUFBSSxLQUFLO1lBQ0wsVUFBVTtZQUNWLGdCQUFnQjtZQUNoQixlQUFlO1lBQ2YsY0FBYztZQUNkLGNBQWM7WUFDZCxHQUFHLFVBQVU7WUFDYixHQUFHLFlBQVk7WUFDZixHQUFHLGtCQUFrQjtZQUNyQixHQUFHLGFBQWE7O1FBRXBCLGlCQUFpQixVQUFVO1lBQ3ZCLElBQUksUUFBUSxhQUFhLGNBQWM7Z0JBQ25DLE9BQU87bUJBQ0osSUFBSSxRQUFRLGFBQWEsZUFBZSxRQUFRLGFBQWEsY0FBYztnQkFDOUUsT0FBTzttQkFDSjtnQkFDSCxPQUFPOzs7OztRQUtmLFNBQVMsZ0JBQWdCO1lBQ3JCO2lCQUNLO2lCQUNBLEtBQUssU0FBUyxTQUFTO29CQUNwQixjQUFjLFNBQVMsS0FBSztvQkFDNUIsR0FBRyxTQUFTLEtBQUssUUFBUSxTQUFTLGVBQWU7d0JBQzdDLEdBQUcsVUFBVTsyQkFDVjt3QkFDSCxHQUFHLFVBQVUsWUFBWSxNQUFNLEdBQUc7d0JBQ2xDLEdBQUcsYUFBYTs7bUJBRXJCLFNBQVMsU0FBUztvQkFDakIsUUFBUSxJQUFJLFVBQVU7Ozs7UUFJbEM7O1FBRUEsU0FBUyxrQkFBa0I7WUFDdkIsRUFBRTtZQUNGLElBQUksWUFBWSxTQUFTLGdCQUFnQixTQUFTOztnQkFFOUMsR0FBRyxVQUFVLFlBQVksTUFBTSxHQUFHLGdCQUFnQjttQkFDL0M7Z0JBQ0gsR0FBRyxVQUFVLFlBQVksTUFBTSxHQUFHLFlBQVksU0FBUztnQkFDdkQsR0FBRyxhQUFhO2dCQUNoQixRQUFRLElBQUk7Ozs7UUFJcEIsU0FBUyxVQUFVLFNBQVM7WUFDeEIsTUFBTSwyQkFBMkI7Ozs7O1FBS3JDLE9BQU8sSUFBSSxtQkFBbUIsV0FBVztZQUNyQyxJQUFJLFlBQVksU0FBUyxnQkFBZ0IsU0FBUztnQkFDOUM7Z0JBQ0EsT0FBTzs7Ozs7O0tBS2xCO0FDeEVMLENBQUMsV0FBVztBQUNaO0tBQ0ssT0FBTztLQUNQLFFBQVEsa0JBQWtCOztJQUUzQixTQUFTLGVBQWUsT0FBTzs7UUFFM0IsSUFBSSxVQUFVO1lBQ1YsYUFBYTs7O1FBR2pCLE9BQU87O1FBRVAsU0FBUyxhQUFhO1lBQ2xCLElBQUksYUFBYTtZQUNqQixPQUFPLE1BQU0sSUFBSTs7Ozs7S0FJeEI7QUNuQkwsQ0FBQyxXQUFXO0NBQ1g7R0FDRSxPQUFPO0dBQ1AsVUFBVSxxQkFBcUI7O0NBRWpDLFNBQVMsb0JBQW9CO0VBQzVCLE9BQU87R0FDTixVQUFVO0dBQ1YsTUFBTSxTQUFTLE9BQU8sTUFBTSxPQUFPO0lBQ2xDLFNBQVMsaUJBQWlCLFVBQVUsU0FBUyxHQUFHO0tBQy9DLElBQUksWUFBWSxLQUFLO01BQ3BCLFNBQVMsZ0JBQWdCLGVBQWUsU0FBUyxLQUFLO01BQ3RELFNBQVMsZ0JBQWdCLGVBQWUsU0FBUyxnQkFBZ0I7O0tBRWxFLElBQUksd0JBQXdCLFNBQVMsS0FBSyxlQUFlOztLQUV6RCxJQUFJLFlBQVksdUJBQXVCO01BQ3RDLE1BQU0sV0FBVyxtQkFBbUI7Ozs7OztLQU1yQyIsImZpbGUiOiJhbGwtaGVybzQtYW5ndWxhci5qcyIsInNvdXJjZXNDb250ZW50IjpbImFuZ3VsYXJcblx0Lm1vZHVsZSgnaGVyb1Byb2dyYW1BcHAnLCBbJ21hc29ucnknLCAnbmdBbmltYXRlJ10pOyIsIihmdW5jdGlvbigpIHtcbmFuZ3VsYXJcbiAgICAubW9kdWxlKCdoZXJvUHJvZ3JhbUFwcCcpXG4gICAgLmNvbnRyb2xsZXIoJ21hc29ucnlDb250cm9sbGVyJywgbWFzb25yeUNvbnRyb2xsZXIpO1xuICAgIFxuICAgIGZ1bmN0aW9uIG1hc29ucnlDb250cm9sbGVyKG1hc29ucnlGYWN0b3J5LCAkd2luZG93LCAkc2NvcGUpIHtcbiAgICAgICAgdmFyIHZtID0gdGhpcyxcbiAgICAgICAgICAgIGNvdW50ZXIgPSAxLFxuICAgICAgICAgICAgc3Rvcmllc051bWJlciA9IDMsXG4gICAgICAgICAgICBkZXNrdG9wV2lkdGggPSA5OTIsXG4gICAgICAgICAgICB0YWJsZXRXaWR0aCA9IDQ4MDtcbiAgICAgICAgICAgIHN0b3JpZXNMaXN0ID0gW107XG4gICAgICAgICAgICB2bS5zdG9yaWVzID0gW107XG4gICAgICAgICAgICB2bS5wbGF5VmlkZW8gPSBwbGF5VmlkZW87XG4gICAgICAgICAgICB2bS5zaG93TW9yZVN0b3JpZXMgPSBzaG93TW9yZVN0b3JpZXM7XG4gICAgICAgICAgICB2bS5zaG93QnV0dG9uID0gZmFsc2U7XG5cbiAgICAgICAgc3Rvcmllc051bWJlciA9IChmdW5jdGlvbigpe1xuICAgICAgICAgICAgaWYgKCR3aW5kb3cuaW5uZXJXaWR0aCA+IGRlc2t0b3BXaWR0aCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAxMjtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoJHdpbmRvdy5pbm5lcldpZHRoID4gdGFibGV0V2lkdGggJiYgJHdpbmRvdy5pbm5lcldpZHRoIDwgZGVza3RvcFdpZHRoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDg7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiAxMjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSgpKTtcblxuICAgICAgICAvLyBnZXRBbGxTdG9yaWVzIGdldHMgYWxsIHRoZSBzdG9yaWVzIGZyb20gdGhlIG1hc29ucnlGYWN0b3J5LmdldFN0b3JpZXMgZW5kcG9pbnRcbiAgICAgICAgZnVuY3Rpb24gZ2V0QWxsU3RvcmllcygpIHtcbiAgICAgICAgICAgIG1hc29ucnlGYWN0b3J5XG4gICAgICAgICAgICAgICAgLmdldFN0b3JpZXMoKVxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKXtcbiAgICAgICAgICAgICAgICAgICAgc3Rvcmllc0xpc3QgPSByZXNwb25zZS5kYXRhLnN0b3JpZXM7XG4gICAgICAgICAgICAgICAgICAgIGlmKHJlc3BvbnNlLmRhdGEuc3Rvcmllcy5sZW5ndGggPCBzdG9yaWVzTnVtYmVyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2bS5zdG9yaWVzID0gc3Rvcmllc0xpc3Q7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2bS5zdG9yaWVzID0gc3Rvcmllc0xpc3Quc2xpY2UoMCwgc3Rvcmllc051bWJlcik7XG4gICAgICAgICAgICAgICAgICAgICAgICB2bS5zaG93QnV0dG9uID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKHJlc3BvbnNlKXsgIFxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnZXJyb3IhJywgcmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBnZXRBbGxTdG9yaWVzKCk7XG5cbiAgICAgICAgZnVuY3Rpb24gc2hvd01vcmVTdG9yaWVzKCkge1xuICAgICAgICAgICAgKytjb3VudGVyO1xuICAgICAgICAgICAgaWYgKHN0b3JpZXNMaXN0Lmxlbmd0aCA+IHN0b3JpZXNOdW1iZXIgKiBjb3VudGVyKSB7XG5cbiAgICAgICAgICAgICAgICB2bS5zdG9yaWVzID0gc3Rvcmllc0xpc3Quc2xpY2UoMCwgc3Rvcmllc051bWJlciAqIGNvdW50ZXIpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB2bS5zdG9yaWVzID0gc3Rvcmllc0xpc3Quc2xpY2UoMCwgc3Rvcmllc0xpc3QubGVuZ3RoICsgMSk7XG4gICAgICAgICAgICAgICAgdm0uc2hvd0J1dHRvbiA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdoaXQgZmFsc2UnKTtcbiAgICAgICAgICAgIH0gICBcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIHBsYXlWaWRlbyh2aWRlb0lkKSB7XG4gICAgICAgICAgICBhbGVydCgncGxheWluZyB2aWRlbyB3aXRoIElEICcgKyB2aWRlb0lkKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgLy9ncmFiYmluZyB0aGlzIGZyb20gdGhlIGJyb2FkY2FzdFxuICAgICAgICAkc2NvcGUuJG9uKFwic2Nyb2xsVGhyZXNob2xkXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKHN0b3JpZXNMaXN0Lmxlbmd0aCA+IHN0b3JpZXNOdW1iZXIgKiBjb3VudGVyKSB7XG4gICAgICAgICAgICAgICAgc2hvd01vcmVTdG9yaWVzKCk7XG4gICAgICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgIH1cbn0pKCk7IiwiKGZ1bmN0aW9uKCkge1xuYW5ndWxhclxuICAgIC5tb2R1bGUoJ2hlcm9Qcm9ncmFtQXBwJylcbiAgICAuZmFjdG9yeSgnbWFzb25yeUZhY3RvcnknLCBtYXNvbnJ5RmFjdG9yeSk7XG4gICAgXG4gICAgZnVuY3Rpb24gbWFzb25yeUZhY3RvcnkoJGh0dHApIHtcblxuICAgICAgICB2YXIgbWFzb25yeSA9IHtcbiAgICAgICAgICAgIGdldFN0b3JpZXMgOiBnZXRTdG9yaWVzXG4gICAgICAgIH07XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gbWFzb25yeTtcbiAgICAgICAgXG4gICAgICAgIGZ1bmN0aW9uIGdldFN0b3JpZXMoKSB7XG4gICAgICAgICAgICB2YXIgc3Rvcmllc1VSTCA9IFwiLi4vc3Rvcmllcy5qc29uXCI7XG4gICAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KHN0b3JpZXNVUkwpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgIH1cbn0pKCk7IiwiKGZ1bmN0aW9uKCkge1xuXHRhbmd1bGFyXG5cdFx0Lm1vZHVsZShcImhlcm9Qcm9ncmFtQXBwXCIpXG5cdFx0LmRpcmVjdGl2ZShcImF1dG9tYXRpY1Nob3dNb3JlXCIsIGF1dG9tYXRpY1Nob3dNb3JlKTtcblxuXHRmdW5jdGlvbiBhdXRvbWF0aWNTaG93TW9yZSgpIHtcblx0XHRyZXR1cm4ge1xuXHRcdFx0cmVzdHJpY3Q6IFwiQVwiLFxuXHRcdFx0bGluazogZnVuY3Rpb24oc2NvcGUsIGVsZW0sIGF0dHJzKSB7XG5cdFx0XHRcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgZnVuY3Rpb24oZSkge1xuXHRcdFx0XHRcdHZhciBzY3JvbGxUb3AgPSBNYXRoLm1heChcblx0XHRcdFx0XHRcdGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQgKyBkb2N1bWVudC5ib2R5LnNjcm9sbFRvcCxcblx0XHRcdFx0XHRcdGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQgKyBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wXG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0XHR2YXIgc2Nyb2xsSGVpZ2h0VGhyZXNob2xkID0gZG9jdW1lbnQuYm9keS5zY3JvbGxIZWlnaHQgKiAwLjkwO1xuXG5cdFx0XHRcdFx0aWYgKHNjcm9sbFRvcCA+IHNjcm9sbEhlaWdodFRocmVzaG9sZCkge1xuXHRcdFx0XHRcdFx0c2NvcGUuJGJyb2FkY2FzdChcInNjcm9sbFRocmVzaG9sZFwiLCBlKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdH07XG5cdH1cbn0pKCk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9