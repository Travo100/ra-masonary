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
                        vm.stories = response.data.stories;
                        console.log(response.data.stories.length);
                    } else {
                        vm.stories = response.data.stories.slice(0, storiesNumber);
                        vm.showButton = true;
                        console.log(response.data.stories.length);
                    }
                }, function(response){  
                    console.log('error!', response);
                });
        }
        
        getAllStories();

        function showMoreStories() {
            ++counter;
            if (storiesList.length > storiesNumber * counter) {
                // vm.stories = storiesList.slice(0, storiesNumber * counter);
                vm.stories.push(storiesList.slice(storiesNumber * (counter - 1), storiesNumber * counter));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhlcm9Qcm9ncmFtQXBwLmpzIiwiY29udHJvbGxlcnMvbWFzb25yeUNvbnRyb2xsZXIuanMiLCJkaXJlY3RpdmVzL2F1dG9tYXRpYy1zaG93LW1vcmUuZGlyZWN0aXZlLmpzIiwiZmFjdG9yaWVzL21hc29ucnlGYWN0b3J5LmpzIiwiZmlsdGVycy9oZXJvVFZGaWx0ZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxPQUFPLGtCQUFrQixDQUFDLFlBQVk7QUNEeEMsQ0FBQyxXQUFXO0FBQ1o7S0FDSyxPQUFPO0tBQ1AsV0FBVyxxQkFBcUI7O0lBRWpDLFNBQVMsa0JBQWtCLGdCQUFnQixTQUFTLFFBQVE7UUFDeEQsSUFBSSxLQUFLO1lBQ0wsVUFBVTtZQUNWLGdCQUFnQjtZQUNoQixjQUFjO1lBQ2QsR0FBRyxVQUFVO1lBQ2IsR0FBRyxZQUFZO1lBQ2YsR0FBRyxrQkFBa0I7WUFDckIsR0FBRyxhQUFhOztRQUVwQixpQkFBaUIsVUFBVTtZQUN2QixJQUFJLFFBQVEsYUFBYSxLQUFLO2dCQUMxQixPQUFPO21CQUNKLElBQUksUUFBUSxhQUFhLE9BQU8sUUFBUSxhQUFhLEtBQUs7Z0JBQzdELE9BQU87bUJBQ0o7Z0JBQ0gsT0FBTzs7OztRQUlmLFNBQVMsZ0JBQWdCO1lBQ3JCO2lCQUNLO2lCQUNBLEtBQUssU0FBUyxTQUFTO29CQUNwQixjQUFjLFNBQVMsS0FBSztvQkFDNUIsR0FBRyxTQUFTLEtBQUssUUFBUSxTQUFTLGVBQWU7d0JBQzdDLEdBQUcsVUFBVSxTQUFTLEtBQUs7d0JBQzNCLFFBQVEsSUFBSSxTQUFTLEtBQUssUUFBUTsyQkFDL0I7d0JBQ0gsR0FBRyxVQUFVLFNBQVMsS0FBSyxRQUFRLE1BQU0sR0FBRzt3QkFDNUMsR0FBRyxhQUFhO3dCQUNoQixRQUFRLElBQUksU0FBUyxLQUFLLFFBQVE7O21CQUV2QyxTQUFTLFNBQVM7b0JBQ2pCLFFBQVEsSUFBSSxVQUFVOzs7O1FBSWxDOztRQUVBLFNBQVMsa0JBQWtCO1lBQ3ZCLEVBQUU7WUFDRixJQUFJLFlBQVksU0FBUyxnQkFBZ0IsU0FBUzs7Z0JBRTlDLEdBQUcsUUFBUSxLQUFLLFlBQVksTUFBTSxpQkFBaUIsVUFBVSxJQUFJLGdCQUFnQjttQkFDOUU7Z0JBQ0gsR0FBRyxVQUFVLFlBQVksTUFBTSxHQUFHLFlBQVk7Z0JBQzlDLEdBQUcsYUFBYTs7OztRQUl4QixTQUFTLFVBQVUsU0FBUztZQUN4QixNQUFNLDJCQUEyQjs7Ozs7UUFLckMsT0FBTyxJQUFJLG1CQUFtQixXQUFXO1lBQ3JDLElBQUksWUFBWSxTQUFTLGdCQUFnQixTQUFTO2dCQUM5QztnQkFDQSxPQUFPOzs7OztLQUlsQjtBQ3JFTCxDQUFDLENBQUMsV0FBVztDQUNaOztDQUVBO0dBQ0UsT0FBTztHQUNQLFVBQVUscUJBQXFCOztDQUVqQyxTQUFTLG9CQUFvQjtFQUM1QixPQUFPO0dBQ04sVUFBVTtHQUNWLE1BQU0sU0FBUyxPQUFPO0lBQ3JCLFNBQVMsaUJBQWlCLFVBQVUsU0FBUyxHQUFHO0tBQy9DLElBQUksU0FBUyxnQkFBZ0IsZUFBZSxTQUFTLEtBQUssWUFBWSxTQUFTLEtBQUssZUFBZSxNQUFNO01BQ3hHLE1BQU0sV0FBVyxtQkFBbUI7Ozs7OztLQU1yQztBQ25CTCxDQUFDLFdBQVc7QUFDWjtLQUNLLE9BQU87S0FDUCxRQUFRLGtCQUFrQjs7SUFFM0IsU0FBUyxlQUFlLE9BQU87O1FBRTNCLElBQUksVUFBVTtZQUNWLGFBQWE7OztRQUdqQixPQUFPOztRQUVQLFNBQVMsYUFBYTtZQUNsQixJQUFJLGFBQWE7WUFDakIsT0FBTyxNQUFNLElBQUk7Ozs7O0tBSXhCO0FDbkJMLENBQUMsVUFBVTs7QUFFWDtFQUNFLE9BQU87RUFDUCxPQUFPLFdBQVc7Q0FDbkIsU0FBUyxRQUFRLE1BQU07S0FDbkIsT0FBTyxVQUFVLEtBQUs7U0FDbEIsT0FBTyxLQUFLLG1CQUFtQjs7OztLQUduQyIsImZpbGUiOiJhbGwtaGVybzQtYW5ndWxhci5qcyIsInNvdXJjZXNDb250ZW50IjpbImFuZ3VsYXJcblx0Lm1vZHVsZSgnaGVyb1Byb2dyYW1BcHAnLCBbJ21hc29ucnknXSk7IiwiKGZ1bmN0aW9uKCkge1xuYW5ndWxhclxuICAgIC5tb2R1bGUoJ2hlcm9Qcm9ncmFtQXBwJylcbiAgICAuY29udHJvbGxlcignbWFzb25yeUNvbnRyb2xsZXInLCBtYXNvbnJ5Q29udHJvbGxlcik7XG4gICAgXG4gICAgZnVuY3Rpb24gbWFzb25yeUNvbnRyb2xsZXIobWFzb25yeUZhY3RvcnksICR3aW5kb3csICRzY29wZSkge1xuICAgICAgICB2YXIgdm0gPSB0aGlzLFxuICAgICAgICAgICAgY291bnRlciA9IDEsXG4gICAgICAgICAgICBzdG9yaWVzTnVtYmVyID0gNSxcbiAgICAgICAgICAgIHN0b3JpZXNMaXN0ID0gW107XG4gICAgICAgICAgICB2bS5zdG9yaWVzID0gW107XG4gICAgICAgICAgICB2bS5wbGF5VmlkZW8gPSBwbGF5VmlkZW87XG4gICAgICAgICAgICB2bS5zaG93TW9yZVN0b3JpZXMgPSBzaG93TW9yZVN0b3JpZXM7XG4gICAgICAgICAgICB2bS5zaG93QnV0dG9uID0gZmFsc2U7XG5cbiAgICAgICAgc3Rvcmllc051bWJlciA9IChmdW5jdGlvbigpe1xuICAgICAgICAgICAgaWYgKCR3aW5kb3cuaW5uZXJXaWR0aCA+IDk5Mikge1xuICAgICAgICAgICAgICAgIHJldHVybiAxMjtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoJHdpbmRvdy5pbm5lcldpZHRoID4gNDgwICYmICR3aW5kb3cuaW5uZXJXaWR0aCA8IDk5Mikge1xuICAgICAgICAgICAgICAgIHJldHVybiA4O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gMztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSgpKTtcblxuICAgICAgICBmdW5jdGlvbiBnZXRBbGxTdG9yaWVzKCkge1xuICAgICAgICAgICAgbWFzb25yeUZhY3RvcnlcbiAgICAgICAgICAgICAgICAuZ2V0U3RvcmllcygpXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2Upe1xuICAgICAgICAgICAgICAgICAgICBzdG9yaWVzTGlzdCA9IHJlc3BvbnNlLmRhdGEuc3RvcmllcztcbiAgICAgICAgICAgICAgICAgICAgaWYocmVzcG9uc2UuZGF0YS5zdG9yaWVzLmxlbmd0aCA8IHN0b3JpZXNOdW1iZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZtLnN0b3JpZXMgPSByZXNwb25zZS5kYXRhLnN0b3JpZXM7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZS5kYXRhLnN0b3JpZXMubGVuZ3RoKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZtLnN0b3JpZXMgPSByZXNwb25zZS5kYXRhLnN0b3JpZXMuc2xpY2UoMCwgc3Rvcmllc051bWJlcik7XG4gICAgICAgICAgICAgICAgICAgICAgICB2bS5zaG93QnV0dG9uID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlLmRhdGEuc3Rvcmllcy5sZW5ndGgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24ocmVzcG9uc2UpeyAgXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdlcnJvciEnLCByZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGdldEFsbFN0b3JpZXMoKTtcblxuICAgICAgICBmdW5jdGlvbiBzaG93TW9yZVN0b3JpZXMoKSB7XG4gICAgICAgICAgICArK2NvdW50ZXI7XG4gICAgICAgICAgICBpZiAoc3Rvcmllc0xpc3QubGVuZ3RoID4gc3Rvcmllc051bWJlciAqIGNvdW50ZXIpIHtcbiAgICAgICAgICAgICAgICAvLyB2bS5zdG9yaWVzID0gc3Rvcmllc0xpc3Quc2xpY2UoMCwgc3Rvcmllc051bWJlciAqIGNvdW50ZXIpO1xuICAgICAgICAgICAgICAgIHZtLnN0b3JpZXMucHVzaChzdG9yaWVzTGlzdC5zbGljZShzdG9yaWVzTnVtYmVyICogKGNvdW50ZXIgLSAxKSwgc3Rvcmllc051bWJlciAqIGNvdW50ZXIpKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdm0uc3RvcmllcyA9IHN0b3JpZXNMaXN0LnNsaWNlKDAsIHN0b3JpZXNMaXN0Lmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgdm0uc2hvd0J1dHRvbiA9IGZhbHNlO1xuICAgICAgICAgICAgfSAgIFxuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gcGxheVZpZGVvKHZpZGVvSWQpIHtcbiAgICAgICAgICAgIGFsZXJ0KCdwbGF5aW5nIHZpZGVvIHdpdGggSUQgJyArIHZpZGVvSWQpO1xuICAgICAgICB9XG5cblxuICAgICAgICAvL2dyYWJiaW5nIHRoaXMgZnJvbSB0aGUgYnJvYWRjYXN0XG4gICAgICAgICRzY29wZS4kb24oXCJzY3JvbGxUaHJlc2hvbGRcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAoc3Rvcmllc0xpc3QubGVuZ3RoID4gc3Rvcmllc051bWJlciAqIGNvdW50ZXIpIHtcbiAgICAgICAgICAgICAgICBzaG93TW9yZVN0b3JpZXMoKTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbn0pKCk7IiwiOyhmdW5jdGlvbigpIHtcblx0XCJ1c2Ugc3RyaWN0XCI7XG5cblx0YW5ndWxhclxuXHRcdC5tb2R1bGUoXCJoZXJvUHJvZ3JhbUFwcFwiKVxuXHRcdC5kaXJlY3RpdmUoXCJhdXRvbWF0aWNTaG93TW9yZVwiLCBhdXRvbWF0aWNTaG93TW9yZSk7XG5cblx0ZnVuY3Rpb24gYXV0b21hdGljU2hvd01vcmUoKSB7XG5cdFx0cmV0dXJuIHtcblx0XHRcdHJlc3RyaWN0OiBcIkFcIixcblx0XHRcdGxpbms6IGZ1bmN0aW9uKHNjb3BlKSB7XG5cdFx0XHRcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgZnVuY3Rpb24oZSkge1xuXHRcdFx0XHRcdGlmIChkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0ICsgZG9jdW1lbnQuYm9keS5zY3JvbGxUb3AgPiBkb2N1bWVudC5ib2R5LnNjcm9sbEhlaWdodCAqIDAuOTApIHtcblx0XHRcdFx0XHRcdHNjb3BlLiRicm9hZGNhc3QoXCJzY3JvbGxUaHJlc2hvbGRcIiwgZSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9O1xuXHR9XG59KSgpOyIsIihmdW5jdGlvbigpIHtcbmFuZ3VsYXJcbiAgICAubW9kdWxlKCdoZXJvUHJvZ3JhbUFwcCcpXG4gICAgLmZhY3RvcnkoJ21hc29ucnlGYWN0b3J5JywgbWFzb25yeUZhY3RvcnkpO1xuICAgIFxuICAgIGZ1bmN0aW9uIG1hc29ucnlGYWN0b3J5KCRodHRwKSB7XG5cbiAgICAgICAgdmFyIG1hc29ucnkgPSB7XG4gICAgICAgICAgICBnZXRTdG9yaWVzIDogZ2V0U3Rvcmllc1xuICAgICAgICB9O1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIG1hc29ucnk7XG4gICAgICAgIFxuICAgICAgICBmdW5jdGlvbiBnZXRTdG9yaWVzKCkge1xuICAgICAgICAgICAgdmFyIHN0b3JpZXNVUkwgPSBcIi4uL3N0b3JpZXMuanNvblwiO1xuICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldChzdG9yaWVzVVJMKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICB9XG59KSgpOyIsIihmdW5jdGlvbigpe1xuLy8gdGhpcyBpcyBhIGZpbHRlciBmb3IgbWFraW5nIHRoZSB5b3V0dWJlIGxpbmsgdHJ1c3RlZCBcbmFuZ3VsYXJcblx0Lm1vZHVsZSgnaGVyb1Byb2dyYW1BcHAnKVxuXHQuZmlsdGVyKCd0cnVzdGVkJywgdHJ1c3RlZCk7IFxuXHRmdW5jdGlvbiB0cnVzdGVkKCRzY2UpIHtcblx0ICAgIHJldHVybiBmdW5jdGlvbiAodXJsKSB7XG5cdCAgICAgICAgcmV0dXJuICRzY2UudHJ1c3RBc1Jlc291cmNlVXJsKHVybCk7XG5cdCAgICB9O1xuXHR9XG59KSgpOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==