(function() {
angular
    .module('heroProgramApp')
    .factory('heroTVFactory', heroTVFactory);
    
    function heroTVFactory($http) {

        var heroTV = {},
            apiKey = 'key=AIzaSyBC_UgbhsBJURaMx085QmvlWm8mYgUcpF4',
            channelID = 'channelId=UCBDqDHiJjFbcEVNbQV6d7SA';
        
        // this gets all videos from the youtube channel 
        // and displays them by latest according to date and filters out any private videos
        heroTV.getAllVideos = function () {
            var apiVideos = 'https://www.googleapis.com/youtube/v3/search?type=video&videoEmbeddable=true&' + apiKey + '&' + channelID + '&part=id%2C+snippet&order=date&maxResults=50';
            return $http.get(apiVideos);
        };

        //this maybe useful later TODO look at search call instead
        heroTV.getPlaylists = function() {
            var playlistURL = 'https://www.googleapis.com/youtube/v3/search?order=date&part=snippet&' + channelID + '&type=playlist&'+ apiKey + '&maxResults=50';
            return $http.get(playlistURL);
        };

        heroTV.getVideosFromPlaylist = function(playlistId) {
            var playlistURLSingle = 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId='+playlistId+'&' + apiKey;
            return $http.get(playlistURLSingle);
        };
        
        return heroTV;
    }
})();