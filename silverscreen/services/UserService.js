/**
 * Created by gurusrikar on 17/5/16.
 */
silverScreenApp.factory('UserService', function (HttpService, ScreenState) {

    var userApiRoot = '/user';

    var signIn = function (username, password, remember) {
        return HttpService.post( userApiRoot + '/sign-in', {
            username: username,
            password: password
        }).
            then(function (response) {
                ScreenState.setAuthenticatedUser(response);
                return response;
            })
    };

    var signUp = function (userObject, remember) {
        return HttpService.post( userApiRoot + '/sign-up', {
            name: userObject.name,
            email: userObject.email,
            username: userObject.username,
            password: userObject.password
        }).
            then(function (response) {
                ScreenState.setAuthenticatedUser(response);
                return response;
            })
    };

    var signOut = function () {
        return HttpService.post( userApiRoot + '/sign-out').
            then(function (response) {
                ScreenState.clearAuthenticatedUser();
                return response;
            });
    };

    return {
        signIn: signIn,
        signUp: signUp,
        signOut: signOut
    };

});