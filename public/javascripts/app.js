/**
 * Created by gurusrikar on 11/4/16.
 */
'use strict';
var silverScreenApp = angular.module('silverScreen', ['ui.router', 'ngCookies', 'ngAnimate' ,'ngMaterial']);

silverScreenApp.run(function ($location, $rootScope) {
    var hostName = $location.host().split('.');
    $rootScope.moviePermalink = hostName.length > 2 ? hostName[0] : undefined;
});

silverScreenApp.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('admin-home', {
            url: '/dashboard',
            templateUrl: 'admin/admin-home.html',
            controller: 'AdminHomeController'
        })
        .state('admin-update-movie', {
            url: '/dashboard/update-movie/:permalink',
            templateUrl: 'admin/admin-edit-movie.html'
        })
        .state('movie-home', {
            url: '/',
            views: {
                "movieCover": {
                    templateUrl: 'movie-cover.html',
                    controller: 'MovieHomeController'
                },

                "": {
                    templateUrl: 'movie-home.html',
                    controller: 'MovieHomeController'
                }
            }
        })
        .state('movie-photos', {
            url: '/photos',
            templateUrl: 'movie-photos.html',
            controller: 'MoviePhotosController'
        });
});
/**
 * Created by gurusrikar on 21/5/16.
 */
silverScreenApp.controller('AdminHomeController', function ($scope, $rootScope, ModalService, MovieService, ScreenState, $stateParams) {

    function init() {
        $scope.movie = {};
        $scope.media = {};
        $scope.permalink = $stateParams.permalink;
        var adminLoggedIn = ScreenState.isAdminLoggedIn();
        if (!adminLoggedIn) {
            ModalService.openLoginModal(undefined, true).then(function (loggedIn) {
                console.log("admin logged in");
            });
        }
    }

    init();

    $scope.createNewMovie = function () {
        MovieService.createMovie($scope.movie).
            then(function(newMovie) {
                $scope.movie = newMovie;
                $scope.active = 1;
            });
    };

    $scope.addPeopleToMovie = function () {
        MovieService.addPeople($scope.movie.permalink, $scope.movie.people).
            then(function (newMovie) {
                $scope.movie = newMovie;
                $scope.active = 2;
            });
    };

    $scope.addMediaObject = function () {
        MovieService.createMediaObject($scope.movie.permalink, $scope.media).
            then(function (newMovie) {
                $scope.movie = newMovie;
            });
    };

    $scope.getAllMovies = function () {
        MovieService.getAllMovies().
            then(function (movies) {
                $scope.movies = movies;
            });
    }
});
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
/**
 * Created by gurusrikar on 24/5/16.
 */
silverScreenApp.controller('MovieHomeController', function ($scope, $rootScope, ModalService, MovieService, ScreenState, $stateParams) {

    console.log('MovieHomeController init');
    var coverCssStringLeft = "background-image: linear-gradient(rgba(0, 0, 0, 0.5),rgba(0, 0, 0, 0.5)),  url('";
    var coverCssStringRight = "');";

    MovieService.getMovie($rootScope.moviePermalink).
        then(function (movie) {
            $scope.movie = movie;
            $scope.movieCoverCss = coverCssStringLeft + movie.mediaObject.titlePoster + coverCssStringRight;
        });

});
/**
 * Created by gurusrikar on 16/6/16.
 */
silverScreenApp.controller('MoviePhotosController', function ($scope, $rootScope, ModalService, MovieService, ScreenState, $stateParams) {

    console.log('MoviePhotosController init');

    MovieService.getMovieMedia($rootScope.moviePermalink).
        then(function (media) {
            $scope.media = media;
        });

});
/**
 * Created by gurusrikar on 23/5/16.
 */
silverScreenApp.directive('movieEditor', function () {
    return {
        restrict: 'E',
        templateUrl: 'directives/movie-editor.html',
        scope: {
            permalink: '=permalink'
        },
        controller: function ($scope, UserService, ScreenState, MovieService, $stateParams) {
            $scope.movie = {};
            $scope.media = {};
            $scope.selectedIndex = 0;
            $scope.editing = false;

            if ($scope.permalink !== undefined || $stateParams.permalink !== undefined) {
                MovieService.getMovie($stateParams.permalink)
                    .then(function (response) {
                        $scope.movie = response;
                        $scope.media = response.mediaObject || {};
                        $scope.editing = true;
                    });
            }

            $scope.createNewMovie = function () {
                MovieService.createMovie($scope.movie).
                    then(function(newMovie) {
                        $scope.movie = newMovie;
                        $scope.selectedIndex = 1;
                    });
            };

            $scope.updateMovie = function () {
                MovieService.updateMovie($stateParams.permalink, $scope.movie).
                    then(function(newMovie) {
                        $scope.movie = newMovie;
                        $scope.selectedIndex = 1;
                    });
            };

            $scope.addPeopleToMovie = function () {
                MovieService.addPeople($scope.movie.permalink, $scope.movie.people).
                    then(function (newMovie) {
                        $scope.movie = newMovie;
                        $scope.selectedIndex = 2;
                    });
            };

            $scope.addMediaObject = function () {
                MovieService.createMediaObject($scope.movie.permalink, $scope.media).
                    then(function (newMovie) {
                        $scope.movie = newMovie;
                    });
            };

            $scope.updateMediaObject = function () {
                MovieService.updateMediaObject($scope.movie.permalink, $scope.media).
                    then(function (newMedia) {
                        $scope.movie.media = newMedia;
                    });
            };

        }
    }
});
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
/**
 * Created by gurusrikar on 16/5/16.
 */
silverScreenApp.factory('HttpService', function ($q, $http) {
    var apiRoot = '/api';

    var get = function (path, queryData) {
        return httpAgent('GET', path, undefined, queryData, undefined);
    };

    var post = function (path, postData, queryData) {
        return httpAgent('POST', path, postData, queryData, undefined);
    };

    var httpAgent = function (method, path, postData, queryData, timeout) {
        var includesRawPostData = postData != undefined && typeof postData === String;

        return $http({
            method: method,
            url: apiRoot + path,
            data: postData == undefined ? undefined : (includesRawPostData ? postData : $.param(postData)),
            params: queryData,
            timeout: timeout === undefined ? 30000 : timeout,
            headers: {'Content-Type': includesRawPostData ? 'application/json' : 'application/x-www-form-urlencoded'}
        })
            .then(function (response) {
                console.log("success "+method+" "+apiRoot+path);
                console.log(response.data);
                return response.data;
            }, function (error) {
                console.log("error "+method+" "+apiRoot+path);
                console.log(error);
                return error;
            });
    };

    return {
        get: get,
        post: post
    }

});
/**
 * Created by gurusrikar on 21/5/16.
 */
//silverScreenApp.factory('ModalService', function ($uibModal) {
silverScreenApp.factory('ModalService', function ($mdDialog) {

    function openLoginModal(ev, force) {
        console.log("Clicked openLoginModal");
        return $mdDialog.show({
            controller: 'LoginController',
            templateUrl: 'modals/modal-login.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: force !== true
        });
    }

    return {
        openLoginModal: openLoginModal
    };

});
/**
 * Created by gurusrikar on 21/5/16.
 */
silverScreenApp.factory('MovieService', function (HttpService) {

    var movieApiRoot = '/movie';
    var mediaApiRoot = '/media';

    var createMovie = function (movie) {
        return HttpService.post( movieApiRoot + '/create-movie', undefined, movie).
            then(function (response) {
                return response;
            });
    };

    var updateMovie = function (permalink, movie) {
        return HttpService.post( movieApiRoot + '/' + permalink + '/update-movie', undefined, movie).
            then(function (response) {
                return response;
            });
    };

    var addPeople = function (permalink, people) {
        return HttpService.post( movieApiRoot + '/'+ permalink + '/update-people', undefined, people).
            then(function (response) {
                return response;
            });
    };

    var createMediaObject = function (permalink, media) {
        return HttpService.post( mediaApiRoot + '/' + permalink + '/create-media', undefined, media).
            then(function (response) {
                return response;
            });
    };

    var updateMediaObject = function (permalink, media) {
        return HttpService.post( mediaApiRoot + '/' + permalink + '/update-media', undefined, media).
            then(function (response) {
                return response;
            });
    };

    var getAllMovies = function () {
        return HttpService.get( movieApiRoot + '/all', undefined, undefined).
            then(function (response) {
                return response;
            });
    };

    var getMovie = function (permalink) {
        return HttpService.get( movieApiRoot + '/' + permalink, undefined, undefined).
            then(function (response) {
                return response;
            });
    };

    var getMovieMedia = function (permalink) {
        return HttpService.get( mediaApiRoot + '/' + permalink, undefined, undefined).
            then(function (response) {
                return response;
            });
    };

    return {
        createMovie: createMovie,
        updateMovie: updateMovie,
        addPeople: addPeople,
        createMediaObject: createMediaObject,
        updateMediaObject: updateMediaObject,
        getAllMovies: getAllMovies,
        getMovie: getMovie,
        getMovieMedia: getMovieMedia
    };

});
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