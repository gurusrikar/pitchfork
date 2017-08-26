/**
 * Created by gurusrikar on 18/5/16.
 */
silverScreenApp.factory('ScreenState', function ($http, $rootScope, $cookies) {

    console.log("ScreenState init");

    function setAuthenticatedUser(user) {
        $rootScope.authenticatedUser = user;
        $cookies.put('fan', user._id, {maxAge: 900000});
        $cookies.put('fanInfo', JSON.stringify(user), {maxAge: 900000});
        $rootScope.signedIn = true;
    }

    function clearAuthenticatedUser() {
        $rootScope.authenticatedUser = undefined;
        $cookies.remove('fan');
        $cookies.remove('fanInfo');
        $rootScope.signedIn = false;
    }

    function isLoggedIn() {
        return $cookies.get('fan') != undefined;
    }

    function isAdminLoggedIn() {
        return $cookies.get('fan') != undefined && JSON.parse($cookies.get('fanInfo')).admin;
    }

    return {
        setAuthenticatedUser: setAuthenticatedUser,
        clearAuthenticatedUser: clearAuthenticatedUser,
        isLoggedIn: isLoggedIn,
        isAdminLoggedIn: isAdminLoggedIn
    }
});