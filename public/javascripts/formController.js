'use strict';

var app = angular.module('fileUpload', ['ngFileUpload', 'angular-loading-bar', 'ngAnimate']);

app.controller('SubmissionController', ['$scope', '$http', 'Upload', '$timeout',
    function($scope, $http, Upload, $timeout) {

        $scope.upload = function(files) {


            $http({
                method: 'GET',
                url: '/id'
            }).then(function successCallback(response) {

                var id = response.data.id;

                if (files && files.length) {
                    for (var i = 0; i < files.length; i++) {
                        var file = files[i];
                        if (!file.$error) {
                            Upload.upload({
                                url: '/uploads',
                                data: {
                                    email: $scope.email,
                                    id: id,
                                    file: file
                                }
                            }).then(function(resp) {
                                $timeout(function() {
                                    $scope.log = 'file: ' + resp.config.data.file.name +
                                        ', Response: ' + JSON.stringify(resp.data) +
                                        '\n' + $scope.log;
                                });
                            }, null, function(evt) {
                                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                                $scope.log = 'progress: ' + progressPercentage +
                                    '% ' + evt.config.data.file.name + '\n' +
                                    $scope.log;
                            });
                        }
                    }
                }

            }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });

        }
    }
]);
