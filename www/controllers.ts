
/// <reference path="./../tsd/node.d.ts"/>
/// <reference path="./helpers.ts"/>
/// <reference path="./project.ts"/>

module Controllers {

    export class Global {

        private _config : Helpers.IConfig;

        constructor(configData : Helpers.IConfig) {

            this._config = configData;

        }

        public RegisterRoutes(router : Helpers.IExpressRouter) : void {

            // PARAMETERS

            // project name
            router.param('projectName', (req, res, next, projectName)
                => Global.ProjectNameParameter(req, res, next, projectName));

            // ROUTES

            // projects list
            router.all('/project/list', (req, res, next) => this.ProjectListAction(req, res, next));

            // build project
            router.all('/project/build/:projectName', (req, res, next) => this.ProjectBuild(req, res, next));

        }

        public Execute(req : any, res : any, fallback : any) : void {

            fallback();

        }

        public static ProjectNameParameter(req : any, res : any, next : any, projectName : string) : void {

            req.projectName = projectName;

            next();

        }

        public ProjectListAction(req : any, res : any, fallback : any) : void {

            Helpers.ProjectHelper.GetProjectsList(this._config.projects, function (err, projectsList) {

                if (err) {

                    Helpers.Log.error(err);
                    res.status(500).send(err.message);
                    return;

                }

                res.status(200).send(projectsList);

            });

        }

        public ProjectBuild(req : any, res : any, fallback : any) : void {

            var name = req.projectName;

            if (!name) {

                fallback();
                return;

            }

            var normalizedPath = Helpers.Node.NormalizePath(this._config.projects + '/' + name);

            Helpers.Process.RunNpmAndGrunt(
                normalizedPath,
                function(data) {

                    res.write(data);
                    // ToDo: optimize FOR in a form similar to below (cached spaces buffer)
                    for(var a=0;a<4096;a++) res.write(' ');
                    //res.write(new Buffer(4096));

                },
                function(code) {

                    res.end();

                });

            res.status(200);

        }

    }

}

