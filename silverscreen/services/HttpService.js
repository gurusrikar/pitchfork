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