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