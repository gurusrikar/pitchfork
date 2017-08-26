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