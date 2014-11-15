
/// <reference path="../../../tsd/angular.d.ts"/>

interface IIndexController {
    _projectsList : string[];
    title() : string;
    getProjectsList() : string[];
}

(() => {

    'use strict';

    var app : ng.IModule = angular.module('indexModule', []);

    app.controller('indexCtrl', ['$scope', '$http', function ($scope, $http) {

        var self : IIndexController = this;

        self._projectsList = [];

        self.title = function () {

            return 'GrunCI';

        }

        self.getProjectsList = function () {

            return self._projectsList;

        }

        $http
            .post('/project/list')
            .success(function(data) {

                self._projectsList = data;

            });

    }]);

})();
