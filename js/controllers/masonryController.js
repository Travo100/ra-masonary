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
})();