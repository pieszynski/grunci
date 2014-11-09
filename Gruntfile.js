
module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            production : {
                force : true,
                src : ["dist/**"]
            }
        },
        less : {
            production : {
                options : {
                    compress : true
                },
                files: {
                    "./dist/www/static/css/style.css": "./www/static/css/style.less"
                }
            }
        },
        typescript: {
            production : {
                normal : [
                    { dest: './dist/www/app.js', src: './www/app.ts' },
                    { dest: './dist/www/static/js/index.js', src: './www/static/js/index.ts' }
                ]
            }
        },
        uglify: {
            options: {
                mangle: {
                    except: ['jQuery', 'Backbone', 'angular']
                }
            },
            typescripts: {
                files: {
                    './dist/www/app.min.js': ['./dist/www/app.js']
                }
            },
            production: {
                files: {
                    './dist/www/static/js/index.min.js': ['./dist/www/static/js/index.js']
                }
            }
        },
        concat : {
            productionCss : {
                src : ['./dist/www/static/css/style.css'],
                dest : './dist/www/static/css/style.min.css'
            },
            productionJs : {
                src : [
                    './www/static/js/vendor/jquery-2.1.1.min.js',
                    './www/static/js/vendor/underscore-min.js',
                    './www/static/js/vendor/angular.min.js'
                ],
                dest : './dist/www/static/js/vendor/vendor.min.js'
            }/*,
            productionOneJs : {
                src : [
                    './dist/www/static/js/vendor/vendor.min.js',
                    './dist/www/static/js/index.min.js'
                ],
                dest : './dist/www/static/js/index.min.js'
            }*/
        },
        copy : {
            production : {
                files : [
                    {expand: false, src: ['www/static/index.html'], dest: 'dist/www/static/index.html'}
                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadTasks('userTasks');

    grunt.registerTask('default', ['clean', 'less', 'typescript', 'uglify', 'concat', 'copy']);

    grunt.registerTask('ts', ['typescript']);

};
