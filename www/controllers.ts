
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

            // projects list
            router.post('/project/list', (req, res, next) => this.ProjectListAction(req, res, next));

            // build project
            router.all('/project/build/:name', (req, res, next) => this.ProjectBuild(req, res, next));

        }

        public Execute(req : any, res : any, fallback : any) : void {

            fallback();

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

            Helpers.Process.RunNpmAndGrunt(
                'c:\\Users\\PP14777\\Desktop\\grunci\\dist\\projects\\build1\\',
                function(data) {

                    res.write(data);

                },
                function(code) {

                    res.end();

                });

            res.status(200);

        }

    }

}

