
/// <reference path="../../../tsd/angular.d.ts"/>

interface IIndexController {
    _projectsList : string[];
    buildOutput : string;
    title() : string;
    getProjectsList() : string[];
    getBuildOutput() : string;
}

var StreamAjax;
(function(sjax) {

    var StreamClass = function (method, url) {

        var nop = function () {}

        this.url = url;
        this.method = method || 'post';

        this.onProgress = nop;
        this.onError = nop;
        this.onSuccess = nop;
    };
    StreamClass.prototype = function() {

        var progress = function(callback) {

                this.onProgress = callback;

                return this;

            },
            error = function(callback) {

                this.onError = callback;

                return this;

            },
            success = function(callback) {

                this.onSuccess = callback;

                return this;

            },
            execute = function() {

                var _this = this;
                _this.xhr = new XMLHttpRequest();
                _this.xhr.open(_this.method, _this.url, true);
                _this.xhr.onprogress = function () {

                    _this.onProgress.apply(this, arguments);

                };
                _this.xhr.onerror = function () {

                    _this.onError.apply(this, arguments);

                }
                _this.xhr.onreadystatechange = function () {

                    if (4 === this.readyState)
                        _this.onSuccess.apply(this, arguments);

                };

                _this.xhr.send();

                return _this;

            };

        return {

            error : error,
            execute : execute,
            progress : progress,
            success : success

        };

    }();

    sjax.post = function (url, data) {

        var response = new StreamClass('post', url);
        return response;

    };

})(StreamAjax || (StreamAjax = {}));

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
            $scope.$applyAsync(slideBottom);
            //console.log('progress:', data, this.responseText);

        }

        StreamAjax
            .post('/project/build/build1')
            .success(onProgressAndSuccess)
            .progress(onProgressAndSuccess)
            .execute();

    }]);

})();
