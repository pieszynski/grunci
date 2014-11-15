
/// <reference path="./../tsd/node.d.ts"/>
/// <reference path="./helpers.ts"/>

module Helpers {

    export class ProjectHelper {

        public static GetProjectsList(projectsDir : string, callback : (err : NodeJS.ErrnoException, projectsList : string[]) => void) : void {

            var fs : IFileSystem = Node.GetFileSystem();
            fs.readdir(projectsDir, function (err, files) {

                if (err) {

                    callback(err, null);
                    return;

                }

                callback(null, files);

            });

        }
    }
}
