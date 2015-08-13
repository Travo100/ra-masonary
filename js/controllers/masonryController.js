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
})();