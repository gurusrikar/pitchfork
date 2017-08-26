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