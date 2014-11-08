
/// <reference path="./../tsd/node.d.ts"/>
/// <reference path="./controllers.ts"/>

(() => {

    var express = require('express'),
        compression = require('compression'),
        router = express.Router(),
        controllers : Controllers.Global = new Controllers.Global();

    var config = {
        port : 80
    };

    var app = module.exports = express();

    app.disable('x-powered-by');

    app.use(compression());

    app.use(express.static(__dirname + '/static'));

    function routeAction(req, res, next) {

        controllers.execute(req, res, next);

    }

    router.get(/.*/i, routeAction);

    app.all('/', router);
    app.all(/.*/i, router);

    app.listen(config.port, function () {
        console.log('Server running at http://*:' + config.port);
    });

})();
