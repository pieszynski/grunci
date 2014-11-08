
var path = require('path'),
    exec = require('child_process').exec;

module.exports = function(grunt) {

    'use strict';

    grunt.registerMultiTask('typescript', function () {

        var done = this.async(),
            normalFiles = this.data.normal,
            wait = prepareWait(normalFiles.length, done);

        for(var idx = 0; idx < normalFiles.length; idx++) {

            runTsc(normalFiles[idx].src, normalFiles[idx].dest, wait);

        }
    });

    grunt.log.writeln('typescript registered');

    function runTsc(tsSourceFile, tsDestinationFile, callback) {

        var tsSourceFilePath = '',
            tsDestinationFilePath = path.normalize(path.resolve() + '/' + tsDestinationFile),
            args = ['tsc', '--target', 'ES5', '--out', '"' + tsDestinationFilePath + '"'];

        if (tsSourceFile instanceof Array) {

            for(var i = 0; i < tsSourceFile.length; i++) {

                tsSourceFilePath = path.normalize(path.resolve() + '/' + tsSourceFile[i]);
                args.push('"' + tsSourceFilePath + '"');

            }

        } else {

            tsSourceFilePath = path.normalize(path.resolve() + '/' + tsSourceFile);
            args.push('"' + tsSourceFilePath + '"');
        }

        var cmd = args.join(' ');

        grunt.verbose.writeln('cmd:', cmd);

        var ex = exec(cmd, function (err, stdout, stderr) {

            if (err) {

                grunt.log.writeln('Command failed:', cmd.toString().yellow);
                grunt.log.writeln('Err:', err.toString().red);
                grunt.log.writeln('StdOut:', stdout.toString().red);
                grunt.log.writeln('StdErr:', stderr.toString().red);

            } else {

                grunt.log.writeln('File', tsSourceFile.cyan, 'compiled successfully.');

            }

            callback(err === null);

        });
    }

    function prepareWait(times, callback) {

        var _times = times,
            _callback = callback,
            _status = true;

        return function (status) {

            _times--;
            _status = _status && status;

            if (_times <= 0)
                _callback(_status);
        }
    }
};
