/**
 * Created by gurusrikar on 9/5/16.
 */
silverScreenApp.directive('reelBar', function() {
    return {
        restrict: 'E',
        templateUrl: 'directives/navbar.html',
//        controller: function ($scope, $uibModal, UserService, ScreenState, ModalService, $location) {
        controller: function ($scope, UserService, ScreenState, ModalService, $location) {

            var hostName = $location.host().split('.');
            var subDomain = hostName.length > 2 ? hostName[0] : undefined;
            $scope.moviePermalink = subDomain;

            $scope.openLoginModal = function ($event, force) {
                ModalService.openLoginModal($event, force).then(function (loggedIn) {
                    $scope.loggedIn = loggedIn;
                }, function () {
                    console.info('User logged in at ' + new Date());
                });

            };

            $scope.isSignedIn = function () {
                return ScreenState.isLoggedIn();
            };

            $scope.logout = function () {
                return UserService.signOut().
                    then(function (response) {
                        $location.path('/');
                    });
            };
        }
    }
});