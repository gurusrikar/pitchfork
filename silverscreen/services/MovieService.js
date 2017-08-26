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