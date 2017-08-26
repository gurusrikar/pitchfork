/**
 * Created by gurusrikar on 4/3/16.
 */

module.exports = function (grunt) {

    //Load all the plugins
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-angular-templates');
    grunt.loadNpmTasks('grunt-bower-concat');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');

    var angularSource = './silverscreen';
    var publicFolder = './public';

    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        concat: {
            distJavascript: {
                src: [angularSource + '/silverScreenApp.js',
                      angularSource + '/controllers/**/*.js',
                      angularSource + '/directives/**/*.js',
                      angularSource + '/services/**/*.js'],
                dest: publicFolder + '/javascripts/app.js'
            }
        },

        bower_concat: {
            all: {
                dest: publicFolder + '/javascripts/lib.js',
                include: [
                    'jquery',
                    'angular',
                    'angular-ui-router',
                    'angular-material',
                    'angular-animate',
                    'angular-aria',
                    'angular-cookies',
                    'font-awesome'
                ],
                bowerOptions: {
                    relative: false
                }
            }
        },

        uglify: {
            lib: {
                files: {
                    './public/javascripts/lib.min.js': [publicFolder + '/javascripts/lib.js']
                }
            },
            app: {
                files: {
                    './public/javascripts/app.min.js': [publicFolder + '/javascripts/app.js']
                }
            }
        },

        ngtemplates: {
            app: {
                cwd: './silverscreen/templates',
                src: '**/*.html',
                dest: './public/javascripts/templates.js',
                options: {
                    module: 'silverScreen',
                    htmlmin: {
                        collapseWhitespace: true,
                        collapseBooleanAttributes: true,
                        removeComments: true,
                        removeEmptyAttributes: true,
                        removeRedundantAttributes: true
                    }
                }
            }
        },

        less: {
            dist: {
                options: {
                    paths: [publicFolder + '/stylesheets/'],
                    yuicompress: true
                },
                files: {
                    './public/stylesheets/style.css': publicFolder + '/stylesheets/style.less'
                }
            }
        },

        watch: {
            javascript: {
                files: angularSource + '/**/*.js',
                tasks: ['concat:distJavascript']
            },
            templates: {
                files: angularSource + '/**/*.html',
                tasks: ['ngtemplates:app']
            },
            less: {
                files: publicFolder + '/stylesheets/style.less',
                tasks: ['less:dist']
            }
        }
    });


    //Default Tasks:
    grunt.registerTask('build', ['concat:distJavascript', 'uglify:app', 'bower_concat', 'uglify:lib', 'ngtemplates:app', 'less:dist']);
};