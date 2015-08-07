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
})();