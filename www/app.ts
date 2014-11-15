
/// <reference path="./helpers.ts"/>
/// <reference path="./project.ts"/>
/// <reference path="./controllers.ts"/>

class Main {

    private _fileSystem : Helpers.IFileSystem;
    private _express : Helpers.IExpress;
    private _router : Helpers.IExpressRouter;
    private _global : Controllers.Global;

    constructor() {

        this._fileSystem = Helpers.Node.GetFileSystem();
        this._express = Helpers.Node.GetExpress();
        this._router = Helpers.Node.GetExpressRouter();

    }

    private noAction(text : string, req, res, next) {

        res.status(404).end(text);

    }

    public updateConfig(configData : Helpers.IConfig) : Helpers.IConfig {

        configData.projects = Helpers.Node.GetFullPath(configData.projects);

        return configData;

    }

    public startWithConfig(configData : Helpers.IConfig) : Main {

        this.updateConfig(configData);

        // print config
        Helpers.Log.info(configData);

        this._global = new Controllers.Global(configData);

        this._express.disable('x-powered-by');

        this._express.use(Helpers.Node.UseExpressCompression());
        this._express.use(Helpers.Node.UseExpressStatic('/static'));

        this._global.RegisterRoutes(this._router);

        this._router.all(/.*/i, (req, res, next) => {

            this.noAction(configData.goAway, req, res, next);

        });

        this._express.all(/.*/i, this._router);

        this._express.listen(configData.port, () => {

            Helpers.Log.info('Listening on http://*:' + configData.port + '/');

        });

        return this;

    }

    public start(configPath : string) : Main {

        this._fileSystem.readFile(configPath, 'utf8', (err, data) => {

            if (err)
                return Helpers.Log.error(err);

            var configData : Helpers.IConfig = JSON.parse(data);

            this.startWithConfig(configData);

        });

        return this;

    }

}

// Start server from config in code (no filesystem read)
//
// module.exports = (new Main()).startWithConfig({
//     port: 80,
//     goAway : 'go away!'
// });


// start server using config parameter
//
// > node www/app.min.js grunci.json

if (3 > process.argv.length)
    throw new Error('No config path in parameters.');

var configPath : string = Helpers.Node.GetFullPath(process.argv[2]);

module.exports = (new Main()).start(configPath);
