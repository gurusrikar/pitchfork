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