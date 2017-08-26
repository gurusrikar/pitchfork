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