
/// <reference path="./../tsd/node.d.ts"/>
/// <reference path="./helpers.ts"/>

module Helpers {

    interface IGruntProjectCheckInfo {
        exists : boolean;
        name : string;
        gruntFile : string;
    }

    export class ProjectHelper {

        private static getCheckGruntFileAction(fs : IFileSystem, info : IGruntProjectCheckInfo) : IPlainCallback {

            return function(callback) {

                // check if path to GRUNT file really exists
                fs.exists(info.gruntFile, function (exists) {

                    info.exists = exists;
                    callback();

                });

            };

        }

        private static checkForGruntFiles(projectsDir : string, folders : string[], callback : (err : NodeJS.ErrnoException, projectsList : string[]) => void) {

            var fs : IFileSystem = Node.GetFileSystem(),
                gruntPaths : IGruntProjectCheckInfo[] = [];

            // prepare supposed paths for project GRUNT files
            for(var i = 0; i < folders.length; i++)
                gruntPaths.push({
                    name : folders[i],
                    exists : false,
                    gruntFile : Node.NormalizePath(projectsDir + '/' + folders[i] + '/Gruntfile.js')
                });

            var async : SimpleAsync = new SimpleAsync(function() {

                // final action - build list of real projects
                var existingProjectNames : string[] = [];
                for(var i = 0; i < gruntPaths.length; i++)
                    if (true === gruntPaths[i].exists)
                        existingProjectNames.push(gruntPaths[i].name);

                callback(null, existingProjectNames);

            });

            for(var i = 0; i < gruntPaths.length; i++)
                async.Push(ProjectHelper.getCheckGruntFileAction(fs, gruntPaths[i]));

            async.Start();

        }

        public static GetProjectsList(projectsDir : string, callback : (err : NodeJS.ErrnoException, projectsList : string[]) => void) : void {

            var fs : IFileSystem = Node.GetFileSystem();
            fs.readdir(projectsDir, function (err, files) {

                if (err) {

                    callback(err, null);
                    return;

                }

                ProjectHelper.checkForGruntFiles(projectsDir, files, callback);

            });

        }
    }
}
