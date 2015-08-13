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
                return 12;
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
                //vm.stories = storiesList.slice(0, storiesNumber * counter);
                //vm.stories.push(storiesList.slice(storiesNumber * (counter - 1), storiesNumber * counter));
                console.log('hit true');
            } else {
                //vm.stories = storiesList.slice(0, storiesList.length+1);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhlcm9Qcm9ncmFtQXBwLmpzIiwiY29udHJvbGxlcnMvbWFzb25yeUNvbnRyb2xsZXIuanMiLCJmaWx0ZXJzL2hlcm9UVkZpbHRlci5qcyIsImRpcmVjdGl2ZXMvYXV0b21hdGljLXNob3ctbW9yZS5kaXJlY3RpdmUuanMiLCJmYWN0b3JpZXMvbWFzb25yeUZhY3RvcnkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxPQUFPLGtCQUFrQixDQUFDLFlBQVk7QUNEeEMsQ0FBQyxXQUFXO0FBQ1o7S0FDSyxPQUFPO0tBQ1AsV0FBVyxxQkFBcUI7O0lBRWpDLFNBQVMsa0JBQWtCLGdCQUFnQixTQUFTLFFBQVE7UUFDeEQsSUFBSSxLQUFLO1lBQ0wsVUFBVTtZQUNWLGdCQUFnQjtZQUNoQixjQUFjO1lBQ2QsR0FBRyxVQUFVO1lBQ2IsR0FBRyxZQUFZO1lBQ2YsR0FBRyxrQkFBa0I7WUFDckIsR0FBRyxhQUFhOztRQUVwQixpQkFBaUIsVUFBVTtZQUN2QixJQUFJLFFBQVEsYUFBYSxLQUFLO2dCQUMxQixPQUFPO21CQUNKLElBQUksUUFBUSxhQUFhLE9BQU8sUUFBUSxhQUFhLEtBQUs7Z0JBQzdELE9BQU87bUJBQ0o7Z0JBQ0gsT0FBTzs7OztRQUlmLFNBQVMsZ0JBQWdCO1lBQ3JCO2lCQUNLO2lCQUNBLEtBQUssU0FBUyxTQUFTO29CQUNwQixjQUFjLFNBQVMsS0FBSztvQkFDNUIsR0FBRyxTQUFTLEtBQUssUUFBUSxTQUFTLGVBQWU7d0JBQzdDLEdBQUcsVUFBVSxTQUFTLEtBQUs7d0JBQzNCLFFBQVEsSUFBSSxTQUFTLEtBQUssUUFBUTsyQkFDL0I7d0JBQ0gsR0FBRyxVQUFVLFNBQVMsS0FBSyxRQUFRLE1BQU0sR0FBRzt3QkFDNUMsR0FBRyxhQUFhO3dCQUNoQixRQUFRLElBQUksU0FBUyxLQUFLLFFBQVE7O21CQUV2QyxTQUFTLFNBQVM7b0JBQ2pCLFFBQVEsSUFBSSxVQUFVOzs7O1FBSWxDOztRQUVBLFNBQVMsa0JBQWtCO1lBQ3ZCLEVBQUU7WUFDRixJQUFJLFlBQVksU0FBUyxnQkFBZ0IsU0FBUzs7O2dCQUc5QyxRQUFRLElBQUk7bUJBQ1Q7O2dCQUVILEdBQUcsYUFBYTtnQkFDaEIsUUFBUSxJQUFJOzs7O1FBSXBCLFNBQVMsVUFBVSxTQUFTO1lBQ3hCLE1BQU0sMkJBQTJCOzs7OztRQUtyQyxPQUFPLElBQUksbUJBQW1CLFdBQVc7WUFDckMsSUFBSSxZQUFZLFNBQVMsZ0JBQWdCLFNBQVM7Z0JBQzlDO2dCQUNBLE9BQU87Ozs7O0tBSWxCO0FDdkVMLENBQUMsVUFBVTs7QUFFWDtFQUNFLE9BQU87RUFDUCxPQUFPLFdBQVc7Q0FDbkIsU0FBUyxRQUFRLE1BQU07S0FDbkIsT0FBTyxVQUFVLEtBQUs7U0FDbEIsT0FBTyxLQUFLLG1CQUFtQjs7OztLQUduQztBQ1ZMLENBQUMsQ0FBQyxXQUFXO0NBQ1o7O0NBRUE7R0FDRSxPQUFPO0dBQ1AsVUFBVSxxQkFBcUI7O0NBRWpDLFNBQVMsb0JBQW9CO0VBQzVCLE9BQU87R0FDTixVQUFVO0dBQ1YsTUFBTSxTQUFTLE9BQU87SUFDckIsU0FBUyxpQkFBaUIsVUFBVSxTQUFTLEdBQUc7S0FDL0MsSUFBSSxTQUFTLGdCQUFnQixlQUFlLFNBQVMsS0FBSyxZQUFZLFNBQVMsS0FBSyxlQUFlLE1BQU07TUFDeEcsTUFBTSxXQUFXLG1CQUFtQjs7Ozs7O0tBTXJDO0FDbkJMLENBQUMsV0FBVztBQUNaO0tBQ0ssT0FBTztLQUNQLFFBQVEsa0JBQWtCOztJQUUzQixTQUFTLGVBQWUsT0FBTzs7UUFFM0IsSUFBSSxVQUFVO1lBQ1YsYUFBYTs7O1FBR2pCLE9BQU87O1FBRVAsU0FBUyxhQUFhO1lBQ2xCLElBQUksYUFBYTtZQUNqQixPQUFPLE1BQU0sSUFBSTs7Ozs7S0FJeEIiLCJmaWxlIjoiYWxsLWhlcm80LWFuZ3VsYXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJhbmd1bGFyXG5cdC5tb2R1bGUoJ2hlcm9Qcm9ncmFtQXBwJywgWydtYXNvbnJ5J10pOyIsIihmdW5jdGlvbigpIHtcbmFuZ3VsYXJcbiAgICAubW9kdWxlKCdoZXJvUHJvZ3JhbUFwcCcpXG4gICAgLmNvbnRyb2xsZXIoJ21hc29ucnlDb250cm9sbGVyJywgbWFzb25yeUNvbnRyb2xsZXIpO1xuICAgIFxuICAgIGZ1bmN0aW9uIG1hc29ucnlDb250cm9sbGVyKG1hc29ucnlGYWN0b3J5LCAkd2luZG93LCAkc2NvcGUpIHtcbiAgICAgICAgdmFyIHZtID0gdGhpcyxcbiAgICAgICAgICAgIGNvdW50ZXIgPSAxLFxuICAgICAgICAgICAgc3Rvcmllc051bWJlciA9IDUsXG4gICAgICAgICAgICBzdG9yaWVzTGlzdCA9IFtdO1xuICAgICAgICAgICAgdm0uc3RvcmllcyA9IFtdO1xuICAgICAgICAgICAgdm0ucGxheVZpZGVvID0gcGxheVZpZGVvO1xuICAgICAgICAgICAgdm0uc2hvd01vcmVTdG9yaWVzID0gc2hvd01vcmVTdG9yaWVzO1xuICAgICAgICAgICAgdm0uc2hvd0J1dHRvbiA9IGZhbHNlO1xuXG4gICAgICAgIHN0b3JpZXNOdW1iZXIgPSAoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIGlmICgkd2luZG93LmlubmVyV2lkdGggPiA5OTIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gMTI7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKCR3aW5kb3cuaW5uZXJXaWR0aCA+IDQ4MCAmJiAkd2luZG93LmlubmVyV2lkdGggPCA5OTIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gODtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDEyO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KCkpO1xuXG4gICAgICAgIGZ1bmN0aW9uIGdldEFsbFN0b3JpZXMoKSB7XG4gICAgICAgICAgICBtYXNvbnJ5RmFjdG9yeVxuICAgICAgICAgICAgICAgIC5nZXRTdG9yaWVzKClcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbihyZXNwb25zZSl7XG4gICAgICAgICAgICAgICAgICAgIHN0b3JpZXNMaXN0ID0gcmVzcG9uc2UuZGF0YS5zdG9yaWVzO1xuICAgICAgICAgICAgICAgICAgICBpZihyZXNwb25zZS5kYXRhLnN0b3JpZXMubGVuZ3RoIDwgc3Rvcmllc051bWJlcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdm0uc3RvcmllcyA9IHJlc3BvbnNlLmRhdGEuc3RvcmllcztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlLmRhdGEuc3Rvcmllcy5sZW5ndGgpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdm0uc3RvcmllcyA9IHJlc3BvbnNlLmRhdGEuc3Rvcmllcy5zbGljZSgwLCBzdG9yaWVzTnVtYmVyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZtLnNob3dCdXR0b24gPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UuZGF0YS5zdG9yaWVzLmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihyZXNwb25zZSl7ICBcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2Vycm9yIScsIHJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgZ2V0QWxsU3RvcmllcygpO1xuXG4gICAgICAgIGZ1bmN0aW9uIHNob3dNb3JlU3RvcmllcygpIHtcbiAgICAgICAgICAgICsrY291bnRlcjtcbiAgICAgICAgICAgIGlmIChzdG9yaWVzTGlzdC5sZW5ndGggPiBzdG9yaWVzTnVtYmVyICogY291bnRlcikge1xuICAgICAgICAgICAgICAgIC8vdm0uc3RvcmllcyA9IHN0b3JpZXNMaXN0LnNsaWNlKDAsIHN0b3JpZXNOdW1iZXIgKiBjb3VudGVyKTtcbiAgICAgICAgICAgICAgICAvL3ZtLnN0b3JpZXMucHVzaChzdG9yaWVzTGlzdC5zbGljZShzdG9yaWVzTnVtYmVyICogKGNvdW50ZXIgLSAxKSwgc3Rvcmllc051bWJlciAqIGNvdW50ZXIpKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnaGl0IHRydWUnKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy92bS5zdG9yaWVzID0gc3Rvcmllc0xpc3Quc2xpY2UoMCwgc3Rvcmllc0xpc3QubGVuZ3RoKzEpO1xuICAgICAgICAgICAgICAgIHZtLnNob3dCdXR0b24gPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnaGl0IGZhbHNlJyk7XG4gICAgICAgICAgICB9ICAgXG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBwbGF5VmlkZW8odmlkZW9JZCkge1xuICAgICAgICAgICAgYWxlcnQoJ3BsYXlpbmcgdmlkZW8gd2l0aCBJRCAnICsgdmlkZW9JZCk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIC8vZ3JhYmJpbmcgdGhpcyBmcm9tIHRoZSBicm9hZGNhc3RcbiAgICAgICAgJHNjb3BlLiRvbihcInNjcm9sbFRocmVzaG9sZFwiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmIChzdG9yaWVzTGlzdC5sZW5ndGggPiBzdG9yaWVzTnVtYmVyICogY291bnRlcikge1xuICAgICAgICAgICAgICAgIHNob3dNb3JlU3RvcmllcygpO1xuICAgICAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxufSkoKTsiLCIoZnVuY3Rpb24oKXtcbi8vIHRoaXMgaXMgYSBmaWx0ZXIgZm9yIG1ha2luZyB0aGUgeW91dHViZSBsaW5rIHRydXN0ZWQgXG5hbmd1bGFyXG5cdC5tb2R1bGUoJ2hlcm9Qcm9ncmFtQXBwJylcblx0LmZpbHRlcigndHJ1c3RlZCcsIHRydXN0ZWQpOyBcblx0ZnVuY3Rpb24gdHJ1c3RlZCgkc2NlKSB7XG5cdCAgICByZXR1cm4gZnVuY3Rpb24gKHVybCkge1xuXHQgICAgICAgIHJldHVybiAkc2NlLnRydXN0QXNSZXNvdXJjZVVybCh1cmwpO1xuXHQgICAgfTtcblx0fVxufSkoKTsiLCI7KGZ1bmN0aW9uKCkge1xuXHRcInVzZSBzdHJpY3RcIjtcblxuXHRhbmd1bGFyXG5cdFx0Lm1vZHVsZShcImhlcm9Qcm9ncmFtQXBwXCIpXG5cdFx0LmRpcmVjdGl2ZShcImF1dG9tYXRpY1Nob3dNb3JlXCIsIGF1dG9tYXRpY1Nob3dNb3JlKTtcblxuXHRmdW5jdGlvbiBhdXRvbWF0aWNTaG93TW9yZSgpIHtcblx0XHRyZXR1cm4ge1xuXHRcdFx0cmVzdHJpY3Q6IFwiQVwiLFxuXHRcdFx0bGluazogZnVuY3Rpb24oc2NvcGUpIHtcblx0XHRcdFx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLCBmdW5jdGlvbihlKSB7XG5cdFx0XHRcdFx0aWYgKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQgKyBkb2N1bWVudC5ib2R5LnNjcm9sbFRvcCA+IGRvY3VtZW50LmJvZHkuc2Nyb2xsSGVpZ2h0ICogMC45MCkge1xuXHRcdFx0XHRcdFx0c2NvcGUuJGJyb2FkY2FzdChcInNjcm9sbFRocmVzaG9sZFwiLCBlKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdH07XG5cdH1cbn0pKCk7IiwiKGZ1bmN0aW9uKCkge1xuYW5ndWxhclxuICAgIC5tb2R1bGUoJ2hlcm9Qcm9ncmFtQXBwJylcbiAgICAuZmFjdG9yeSgnbWFzb25yeUZhY3RvcnknLCBtYXNvbnJ5RmFjdG9yeSk7XG4gICAgXG4gICAgZnVuY3Rpb24gbWFzb25yeUZhY3RvcnkoJGh0dHApIHtcblxuICAgICAgICB2YXIgbWFzb25yeSA9IHtcbiAgICAgICAgICAgIGdldFN0b3JpZXMgOiBnZXRTdG9yaWVzXG4gICAgICAgIH07XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gbWFzb25yeTtcbiAgICAgICAgXG4gICAgICAgIGZ1bmN0aW9uIGdldFN0b3JpZXMoKSB7XG4gICAgICAgICAgICB2YXIgc3Rvcmllc1VSTCA9IFwiLi4vc3Rvcmllcy5qc29uXCI7XG4gICAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KHN0b3JpZXNVUkwpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgIH1cbn0pKCk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9