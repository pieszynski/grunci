
/// <reference path="./helpers.ts"/>
/// <reference path="./controllers.ts"/>

class Main {

    private _fileSystem : Helpers.IFileSystem;
    private _express : Helpers.IExpress;
    private _router : Helpers.IExpressRouter;

    constructor() {

        this._fileSystem = Helpers.Node.GetFileSystem();
        this._express = Helpers.Node.GetExpress();
        this._router = Helpers.Node.GetExpressRouter();

    }

    private noAction(text : string, req, res, next) {

        res.status(404).end(text);

    }

    public startWithConfig(configData : Helpers.IConfig) : void {

        this._express.disable('x-powered-by');

        this._express.use(Helpers.Node.UseExpressCompression());
        this._express.use(Helpers.Node.UseExpressStatic('/static'));

        // TODO: register controller actions here

        this._router.all(/.*/i, (req, res, next) => {

            this.noAction(configData.goAway, req, res, next);

        });

        this._express.all(/.*/i, this._router);

        this._express.listen(configData.port, () => {

            Helpers.Log.info('Listening on port', configData.port, configData);

        });

    }

    public start(configPath : string) : Main {

        this._fileSystem.readFile(configPath, (err, data) => {

            if (err)
                return Helpers.Log.error(err);

            var configData : Helpers.IConfig = data.toJSON();

            this.startWithConfig(configData);

        });

        return this;

    }

}

module.exports = (new Main()).startWithConfig({
    port: 80,
    goAway : 'go away!'
});
