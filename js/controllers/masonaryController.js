(function() {
angular
    .module('heroProgramApp')
    .controller('masonaryController', masonaryController);
    
    function masonaryController() {
        var vm = this;
        vm.message = "I'm working!";
    }
})();