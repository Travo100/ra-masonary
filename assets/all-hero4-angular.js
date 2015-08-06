angular
	.module('heroProgramApp', ['youtube-embed']);
(function() {
angular
    .module('heroProgramApp')
    .controller('masonaryController', masonaryController);
    
    function masonaryController() {
        var vm = this;
        vm.message = "I'm working!";
    }
})();
// this directive allows a CSS3 transition on model change with a class 
// called changed
// CSS Example-
// [animate-on-change] {
// 	  transition: opacity 0.5s ease-in-out;
// 	  -webkit-transition: opacity 0.5s ease-in-out;
// 	}
// 	[animate-on-change].changed {
// 	    opacity: 0;
// 	    transition: none;
// 	    -webkit-transition: none;
// 	}	
(function(){
angular
    .module('heroProgramApp')
    .directive('animateOnChange', animateOnChange); 

    function animateOnChange($timeout) {
        return function(scope, element, attr) {
            scope.$watch(attr.animateOnChange, function(nv,ov) {
                if (nv!==ov) {
                    element.addClass('changed');
                    $timeout(function() {
                        element.removeClass('changed');
                    }, 250); // this is a set timeout time, that can be changed
                }
            });
        };  
    }
    animateOnChange.$inject = ["$timeout"];
})();
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
    heroTVFactory.$inject = ["$http"];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhlcm9Qcm9ncmFtQXBwLmpzIiwiY29udHJvbGxlcnMvbWFzb25hcnlDb250cm9sbGVyLmpzIiwiZGlyZWN0aXZlcy9oZXJvVFZEaXJlY3RpdmVzLmpzIiwiZmFjdG9yaWVzL2hlcm9UVkZhY3RvcnkuanMiLCJmaWx0ZXJzL2hlcm9UVkZpbHRlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLE9BQU8sa0JBQWtCLENBQUMsa0JBQWtCO0FDRDlDLENBQUMsV0FBVztBQUNaO0tBQ0ssT0FBTztLQUNQLFdBQVcsc0JBQXNCOztJQUVsQyxTQUFTLHFCQUFxQjtRQUMxQixJQUFJLEtBQUs7UUFDVCxHQUFHLFVBQVU7O0tBRWhCO0FDVEw7Ozs7Ozs7Ozs7OztBQVlBLENBQUMsVUFBVTtBQUNYO0tBQ0ssT0FBTztLQUNQLFVBQVUsbUJBQW1COztJQUU5QixTQUFTLGdCQUFnQixVQUFVO1FBQy9CLE9BQU8sU0FBUyxPQUFPLFNBQVMsTUFBTTtZQUNsQyxNQUFNLE9BQU8sS0FBSyxpQkFBaUIsU0FBUyxHQUFHLElBQUk7Z0JBQy9DLElBQUksS0FBSyxJQUFJO29CQUNULFFBQVEsU0FBUztvQkFDakIsU0FBUyxXQUFXO3dCQUNoQixRQUFRLFlBQVk7dUJBQ3JCOzs7Ozs7S0FLbEI7QUM3QkwsQ0FBQyxXQUFXO0FBQ1o7S0FDSyxPQUFPO0tBQ1AsUUFBUSxpQkFBaUI7O0lBRTFCLFNBQVMsY0FBYyxPQUFPOztRQUUxQixJQUFJLFNBQVM7WUFDVCxTQUFTO1lBQ1QsWUFBWTs7OztRQUloQixPQUFPLGVBQWUsWUFBWTtZQUM5QixJQUFJLFlBQVksa0ZBQWtGLFNBQVMsTUFBTSxZQUFZO1lBQzdILE9BQU8sTUFBTSxJQUFJOzs7O1FBSXJCLE9BQU8sZUFBZSxXQUFXO1lBQzdCLElBQUksY0FBYywwRUFBMEUsWUFBWSxtQkFBbUIsU0FBUztZQUNwSSxPQUFPLE1BQU0sSUFBSTs7O1FBR3JCLE9BQU8sd0JBQXdCLFNBQVMsWUFBWTtZQUNoRCxJQUFJLG9CQUFvQiw2RkFBNkYsV0FBVyxNQUFNO1lBQ3RJLE9BQU8sTUFBTSxJQUFJOzs7UUFHckIsT0FBTzs7O0tBRVY7QUMvQkwsQ0FBQyxVQUFVOztBQUVYO0VBQ0UsT0FBTztFQUNQLE9BQU8sV0FBVztDQUNuQixTQUFTLFFBQVEsTUFBTTtLQUNuQixPQUFPLFVBQVUsS0FBSztTQUNsQixPQUFPLEtBQUssbUJBQW1COzs7O0tBR25DIiwiZmlsZSI6ImFsbC1oZXJvNC1hbmd1bGFyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiYW5ndWxhclxyXG5cdC5tb2R1bGUoJ2hlcm9Qcm9ncmFtQXBwJywgWyd5b3V0dWJlLWVtYmVkJ10pOyIsIihmdW5jdGlvbigpIHtcclxuYW5ndWxhclxyXG4gICAgLm1vZHVsZSgnaGVyb1Byb2dyYW1BcHAnKVxyXG4gICAgLmNvbnRyb2xsZXIoJ21hc29uYXJ5Q29udHJvbGxlcicsIG1hc29uYXJ5Q29udHJvbGxlcik7XHJcbiAgICBcclxuICAgIGZ1bmN0aW9uIG1hc29uYXJ5Q29udHJvbGxlcigpIHtcclxuICAgICAgICB2YXIgdm0gPSB0aGlzO1xyXG4gICAgICAgIHZtLm1lc3NhZ2UgPSBcIkknbSB3b3JraW5nIVwiO1xyXG4gICAgfVxyXG59KSgpOyIsIi8vIHRoaXMgZGlyZWN0aXZlIGFsbG93cyBhIENTUzMgdHJhbnNpdGlvbiBvbiBtb2RlbCBjaGFuZ2Ugd2l0aCBhIGNsYXNzIFxyXG4vLyBjYWxsZWQgY2hhbmdlZFxyXG4vLyBDU1MgRXhhbXBsZS1cclxuLy8gW2FuaW1hdGUtb24tY2hhbmdlXSB7XHJcbi8vIFx0ICB0cmFuc2l0aW9uOiBvcGFjaXR5IDAuNXMgZWFzZS1pbi1vdXQ7XHJcbi8vIFx0ICAtd2Via2l0LXRyYW5zaXRpb246IG9wYWNpdHkgMC41cyBlYXNlLWluLW91dDtcclxuLy8gXHR9XHJcbi8vIFx0W2FuaW1hdGUtb24tY2hhbmdlXS5jaGFuZ2VkIHtcclxuLy8gXHQgICAgb3BhY2l0eTogMDtcclxuLy8gXHQgICAgdHJhbnNpdGlvbjogbm9uZTtcclxuLy8gXHQgICAgLXdlYmtpdC10cmFuc2l0aW9uOiBub25lO1xyXG4vLyBcdH1cdFxyXG4oZnVuY3Rpb24oKXtcclxuYW5ndWxhclxyXG4gICAgLm1vZHVsZSgnaGVyb1Byb2dyYW1BcHAnKVxyXG4gICAgLmRpcmVjdGl2ZSgnYW5pbWF0ZU9uQ2hhbmdlJywgYW5pbWF0ZU9uQ2hhbmdlKTsgXHJcblxyXG4gICAgZnVuY3Rpb24gYW5pbWF0ZU9uQ2hhbmdlKCR0aW1lb3V0KSB7XHJcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRyKSB7XHJcbiAgICAgICAgICAgIHNjb3BlLiR3YXRjaChhdHRyLmFuaW1hdGVPbkNoYW5nZSwgZnVuY3Rpb24obnYsb3YpIHtcclxuICAgICAgICAgICAgICAgIGlmIChudiE9PW92KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5hZGRDbGFzcygnY2hhbmdlZCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50LnJlbW92ZUNsYXNzKCdjaGFuZ2VkJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSwgMjUwKTsgLy8gdGhpcyBpcyBhIHNldCB0aW1lb3V0IHRpbWUsIHRoYXQgY2FuIGJlIGNoYW5nZWRcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTsgIFxyXG4gICAgfVxyXG59KSgpOyIsIihmdW5jdGlvbigpIHtcclxuYW5ndWxhclxyXG4gICAgLm1vZHVsZSgnaGVyb1Byb2dyYW1BcHAnKVxyXG4gICAgLmZhY3RvcnkoJ2hlcm9UVkZhY3RvcnknLCBoZXJvVFZGYWN0b3J5KTtcclxuICAgIFxyXG4gICAgZnVuY3Rpb24gaGVyb1RWRmFjdG9yeSgkaHR0cCkge1xyXG5cclxuICAgICAgICB2YXIgaGVyb1RWID0ge30sXHJcbiAgICAgICAgICAgIGFwaUtleSA9ICdrZXk9QUl6YVN5QkNfVWdiaHNCSlVSYU14MDg1UW12bFdtOG1ZZ1VjcEY0JyxcclxuICAgICAgICAgICAgY2hhbm5lbElEID0gJ2NoYW5uZWxJZD1VQ0JEcURIaUpqRmJjRVZOYlFWNmQ3U0EnO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIHRoaXMgZ2V0cyBhbGwgdmlkZW9zIGZyb20gdGhlIHlvdXR1YmUgY2hhbm5lbCBcclxuICAgICAgICAvLyBhbmQgZGlzcGxheXMgdGhlbSBieSBsYXRlc3QgYWNjb3JkaW5nIHRvIGRhdGUgYW5kIGZpbHRlcnMgb3V0IGFueSBwcml2YXRlIHZpZGVvc1xyXG4gICAgICAgIGhlcm9UVi5nZXRBbGxWaWRlb3MgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBhcGlWaWRlb3MgPSAnaHR0cHM6Ly93d3cuZ29vZ2xlYXBpcy5jb20veW91dHViZS92My9zZWFyY2g/dHlwZT12aWRlbyZ2aWRlb0VtYmVkZGFibGU9dHJ1ZSYnICsgYXBpS2V5ICsgJyYnICsgY2hhbm5lbElEICsgJyZwYXJ0PWlkJTJDK3NuaXBwZXQmb3JkZXI9ZGF0ZSZtYXhSZXN1bHRzPTUwJztcclxuICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldChhcGlWaWRlb3MpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vdGhpcyBtYXliZSB1c2VmdWwgbGF0ZXIgVE9ETyBsb29rIGF0IHNlYXJjaCBjYWxsIGluc3RlYWRcclxuICAgICAgICBoZXJvVFYuZ2V0UGxheWxpc3RzID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciBwbGF5bGlzdFVSTCA9ICdodHRwczovL3d3dy5nb29nbGVhcGlzLmNvbS95b3V0dWJlL3YzL3NlYXJjaD9vcmRlcj1kYXRlJnBhcnQ9c25pcHBldCYnICsgY2hhbm5lbElEICsgJyZ0eXBlPXBsYXlsaXN0JicrIGFwaUtleSArICcmbWF4UmVzdWx0cz01MCc7XHJcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5nZXQocGxheWxpc3RVUkwpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGhlcm9UVi5nZXRWaWRlb3NGcm9tUGxheWxpc3QgPSBmdW5jdGlvbihwbGF5bGlzdElkKSB7XHJcbiAgICAgICAgICAgIHZhciBwbGF5bGlzdFVSTFNpbmdsZSA9ICdodHRwczovL3d3dy5nb29nbGVhcGlzLmNvbS95b3V0dWJlL3YzL3BsYXlsaXN0SXRlbXM/cGFydD1zbmlwcGV0Jm1heFJlc3VsdHM9NTAmcGxheWxpc3RJZD0nK3BsYXlsaXN0SWQrJyYnICsgYXBpS2V5O1xyXG4gICAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KHBsYXlsaXN0VVJMU2luZ2xlKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiBoZXJvVFY7XHJcbiAgICB9XHJcbn0pKCk7IiwiKGZ1bmN0aW9uKCl7XHJcbi8vIHRoaXMgaXMgYSBmaWx0ZXIgZm9yIG1ha2luZyB0aGUgeW91dHViZSBsaW5rIHRydXN0ZWQgXHJcbmFuZ3VsYXJcclxuXHQubW9kdWxlKCdoZXJvUHJvZ3JhbUFwcCcpXHJcblx0LmZpbHRlcigndHJ1c3RlZCcsIHRydXN0ZWQpOyBcclxuXHRmdW5jdGlvbiB0cnVzdGVkKCRzY2UpIHtcclxuXHQgICAgcmV0dXJuIGZ1bmN0aW9uICh1cmwpIHtcclxuXHQgICAgICAgIHJldHVybiAkc2NlLnRydXN0QXNSZXNvdXJjZVVybCh1cmwpO1xyXG5cdCAgICB9O1xyXG5cdH1cclxufSkoKTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=