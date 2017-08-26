/**
 * Created by gurusrikar on 16/5/16.
 */
silverScreenApp.controller('LoginController', function ($scope, $location, UserService, $mdDialog) {

    $scope.signin = {
        username: undefined,
        password: undefined
    };

    $scope.signup = {
        name: undefined,
        email: undefined,
        username: undefined,
        password: undefined,
        admin: false
    };

    $scope.login = function () {

        console.log($scope.signin.username);
        console.log($scope.signin.password);
        UserService.signIn($scope.signin.username, $scope.signin.password).
            then(function (response) {
                console.log("signed-In");
                $mdDialog.hide(true);
            });
    };

    $scope.register = function () {
        var hostName = $location.host().split('.');
        var subDomain = hostName.length > 2 ? hostName[0] : undefined;
        if (subDomain === 'admin') {
            $scope.signup.admin = true;
        }
        UserService.signUp($scope.signup).
            then(function (response) {
                console.log("registered");
                $mdDialog.hide(true);
            });
    };

    $scope.cancel = function () {
        console.log("Closing");
        $mdDialog.cancel();
    };
});