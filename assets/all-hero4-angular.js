angular
	.module('heroProgramApp', ['youtube-embed']);
(function() {
angular
    .module('heroProgramApp')
    .controller('masonryController', masonryController);
    
    function masonryController(masonryFactory) {
        var vm = this;
        	vm.stories;
        	vm.playVideo = playVideo;

        function getStories() {
        	masonryFactory
  				.getStories()
  				.then(function(response){
        			vm.stories = response.data.stories;
        			console.log(vm.stories);
        		}, function(response){	
        			console.log('error!', response);
        		});
        }
        getStories();

        function playVideo(videoId) {
        	alert('playing video with ID ' + videoId);
        }
    }
    masonryController.$inject = ["masonryFactory"];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhlcm9Qcm9ncmFtQXBwLmpzIiwiY29udHJvbGxlcnMvbWFzb25yeUNvbnRyb2xsZXIuanMiLCJmYWN0b3JpZXMvbWFzb25yeUZhY3RvcnkuanMiLCJmaWx0ZXJzL2hlcm9UVkZpbHRlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLE9BQU8sa0JBQWtCLENBQUMsa0JBQWtCO0FDRDlDLENBQUMsV0FBVztBQUNaO0tBQ0ssT0FBTztLQUNQLFdBQVcscUJBQXFCOztJQUVqQyxTQUFTLGtCQUFrQixnQkFBZ0I7UUFDdkMsSUFBSSxLQUFLO1NBQ1IsR0FBRztTQUNILEdBQUcsWUFBWTs7UUFFaEIsU0FBUyxhQUFhO1NBQ3JCO09BQ0Y7T0FDQSxLQUFLLFNBQVMsU0FBUztXQUNuQixHQUFHLFVBQVUsU0FBUyxLQUFLO1dBQzNCLFFBQVEsSUFBSSxHQUFHO2FBQ2IsU0FBUyxTQUFTO1dBQ3BCLFFBQVEsSUFBSSxVQUFVOzs7UUFHekI7O1FBRUEsU0FBUyxVQUFVLFNBQVM7U0FDM0IsTUFBTSwyQkFBMkI7Ozs7S0FHckM7QUMxQkwsQ0FBQyxXQUFXO0FBQ1o7S0FDSyxPQUFPO0tBQ1AsUUFBUSxrQkFBa0I7O0lBRTNCLFNBQVMsZUFBZSxPQUFPOztRQUUzQixJQUFJLFVBQVU7WUFDVixhQUFhOzs7UUFHakIsT0FBTzs7UUFFUCxTQUFTLGFBQWE7WUFDbEIsSUFBSSxhQUFhO1lBQ2pCLE9BQU8sTUFBTSxJQUFJOzs7OztLQUl4QjtBQ25CTCxDQUFDLFVBQVU7O0FBRVg7RUFDRSxPQUFPO0VBQ1AsT0FBTyxXQUFXO0NBQ25CLFNBQVMsUUFBUSxNQUFNO0tBQ25CLE9BQU8sVUFBVSxLQUFLO1NBQ2xCLE9BQU8sS0FBSyxtQkFBbUI7Ozs7S0FHbkMiLCJmaWxlIjoiYWxsLWhlcm80LWFuZ3VsYXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJhbmd1bGFyXHJcblx0Lm1vZHVsZSgnaGVyb1Byb2dyYW1BcHAnLCBbJ3lvdXR1YmUtZW1iZWQnXSk7IiwiKGZ1bmN0aW9uKCkge1xyXG5hbmd1bGFyXHJcbiAgICAubW9kdWxlKCdoZXJvUHJvZ3JhbUFwcCcpXHJcbiAgICAuY29udHJvbGxlcignbWFzb25yeUNvbnRyb2xsZXInLCBtYXNvbnJ5Q29udHJvbGxlcik7XHJcbiAgICBcclxuICAgIGZ1bmN0aW9uIG1hc29ucnlDb250cm9sbGVyKG1hc29ucnlGYWN0b3J5KSB7XHJcbiAgICAgICAgdmFyIHZtID0gdGhpcztcclxuICAgICAgICBcdHZtLnN0b3JpZXM7XHJcbiAgICAgICAgXHR2bS5wbGF5VmlkZW8gPSBwbGF5VmlkZW87XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGdldFN0b3JpZXMoKSB7XHJcbiAgICAgICAgXHRtYXNvbnJ5RmFjdG9yeVxyXG4gIFx0XHRcdFx0LmdldFN0b3JpZXMoKVxyXG4gIFx0XHRcdFx0LnRoZW4oZnVuY3Rpb24ocmVzcG9uc2Upe1xyXG4gICAgICAgIFx0XHRcdHZtLnN0b3JpZXMgPSByZXNwb25zZS5kYXRhLnN0b3JpZXM7XHJcbiAgICAgICAgXHRcdFx0Y29uc29sZS5sb2codm0uc3Rvcmllcyk7XHJcbiAgICAgICAgXHRcdH0sIGZ1bmN0aW9uKHJlc3BvbnNlKXtcdFxyXG4gICAgICAgIFx0XHRcdGNvbnNvbGUubG9nKCdlcnJvciEnLCByZXNwb25zZSk7XHJcbiAgICAgICAgXHRcdH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBnZXRTdG9yaWVzKCk7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHBsYXlWaWRlbyh2aWRlb0lkKSB7XHJcbiAgICAgICAgXHRhbGVydCgncGxheWluZyB2aWRlbyB3aXRoIElEICcgKyB2aWRlb0lkKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0pKCk7IiwiKGZ1bmN0aW9uKCkge1xyXG5hbmd1bGFyXHJcbiAgICAubW9kdWxlKCdoZXJvUHJvZ3JhbUFwcCcpXHJcbiAgICAuZmFjdG9yeSgnbWFzb25yeUZhY3RvcnknLCBtYXNvbnJ5RmFjdG9yeSk7XHJcbiAgICBcclxuICAgIGZ1bmN0aW9uIG1hc29ucnlGYWN0b3J5KCRodHRwKSB7XHJcblxyXG4gICAgICAgIHZhciBtYXNvbnJ5ID0ge1xyXG4gICAgICAgICAgICBnZXRTdG9yaWVzIDogZ2V0U3Rvcmllc1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIG1hc29ucnk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgZnVuY3Rpb24gZ2V0U3RvcmllcygpIHtcclxuICAgICAgICAgICAgdmFyIHN0b3JpZXNVUkwgPSBcIi4uL3N0b3JpZXMuanNvblwiO1xyXG4gICAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KHN0b3JpZXNVUkwpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgIH1cclxufSkoKTsiLCIoZnVuY3Rpb24oKXtcclxuLy8gdGhpcyBpcyBhIGZpbHRlciBmb3IgbWFraW5nIHRoZSB5b3V0dWJlIGxpbmsgdHJ1c3RlZCBcclxuYW5ndWxhclxyXG5cdC5tb2R1bGUoJ2hlcm9Qcm9ncmFtQXBwJylcclxuXHQuZmlsdGVyKCd0cnVzdGVkJywgdHJ1c3RlZCk7IFxyXG5cdGZ1bmN0aW9uIHRydXN0ZWQoJHNjZSkge1xyXG5cdCAgICByZXR1cm4gZnVuY3Rpb24gKHVybCkge1xyXG5cdCAgICAgICAgcmV0dXJuICRzY2UudHJ1c3RBc1Jlc291cmNlVXJsKHVybCk7XHJcblx0ICAgIH07XHJcblx0fVxyXG59KSgpOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==