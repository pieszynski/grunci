
/// <reference path="../../../tsd/angular.d.ts"/>
/// <reference path="stream-ajax.ts"/>

interface IIndexController {
    _projectsList : string[];
    buildOutput : any;
    title() : string;
    getProjectsList() : string[];
    buildProject(projectName : string) : void;
    getBuildOutput() : string;
}

function slideBottom() {

    $('.scrollToBottom').each(function (idx, domElem) {

        domElem.scrollTop = domElem.scrollHeight;

    });

}

(() => {

    'use strict';

    var app : ng.IModule = angular.module('indexModule', []);

    app.controller('indexCtrl', ['$scope', '$http', function ($scope, $http) {

        var self : IIndexController = this;

        self._projectsList = [];
        self.buildOutput = ''

        self.title = function () {

            return 'GrunCI';

        }

        self.getProjectsList = function () {

            return self._projectsList;

        }

        self.buildProject = function (projectName) {

            Ajax.StreamAjax
                .post('/project/build/' + projectName)
                .success(onProgressAndSuccess)
                .progress(onProgressAndSuccess);

        }

        self.getBuildOutput = function () {

            return self.buildOutput;

        }

        $http
            .post('/project/list')
            .success(function(data) {

                self._projectsList = data;

            });

        var onProgressAndSuccess = function() {

            self.buildOutput = this.responseText;
            self.buildOutput = self.buildOutput.replace(/( ){10,}/gi, ' ', 'gi');
            $scope.$applyAsync(slideBottom);
            //console.log('progress:', data, this.responseText);

        }

            Ajax.StreamAjax
                .post('/project/build/build1')
                .success(onProgressAndSuccess)
                .progress(onProgressAndSuccess);

    }]);

})();
