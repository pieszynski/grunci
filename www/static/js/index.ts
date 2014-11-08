
/// <reference path="../../../tsd/angular.d.ts"/>

interface IIndexController {
    abc() : string;
}

(() => {

    'use strict';

    var app : ng.IModule = angular.module('indexModule', []);

    app.controller('indexCtrl', ['$scope', function ($scope) {

        var self : IIndexController = this;

        self.abc = function () {

            return 'abc';

        }

    }]);

})();
