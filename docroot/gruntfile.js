/*global module:true */
module.exports = function (grunt) {
    'use strict';

    var project = '';
    var stylename = 'style_hueck';
    if(grunt.option('project')) {
        project = '_pages/' + grunt.option('project') + '/';
        stylename = project.replace('_pages/', 'pages_');
    }

    /*
     * Grunt Configuration
     */
    grunt.initConfig({
        'pkg': grunt.file.readJSON('package.json'),
        'connect': {
            server: {
                options: {
                    hostname: '*',
                    port: 8050,
                    open: 'http://127.0.0.1:8050/_release/' + project + 'index.html',
                    middleware: function(connect) {
                        var path = require('path');
                        return [
                            connect.compress(),
                            connect.bodyParser(),
                            require('connect-livereload')(),
                            connect.static(path.resolve('.'))
                        ];
                    }
                }
            }
        },
        'less': {
            dev: {
                files: [
                    { src: project + 'less/style.less', dest: '_release/css/' + stylename + '.css' }
                ]
            }
        },
        'compile-handlebars' : {
            dev: {
                template: project + 'tmpl/pages/**/*.handlebars',
                templateData: project + 'data/**/*.json',
                partials: project + 'tmpl/**/*.handlebars',
                output: project + '_release/**/*.html',
                helpers: '_grunt/handlebars/*.js',
                globals: ['data/globals.json']
            }
        },
        'copy': {
            dev: {
                files: [{
                    expand: true,
                    cwd: project,
                    src: ['assets/**/*.{png,jpg,gif,css,ttf,eot,woff,svg}'],
                    dest: '_release/' + project
                }]
            }
        },
        'clean': {
            build: {
                src: ['_release/' + project + 'assets/']
            }
        },
        'watch': {
            options: {
                forever: true,
                livereload: true,
                atBegin: true
            },
            less: {
                options: {
                    livereload: false
                },
                files: [project + 'less/**/*.less'],
                tasks: ['less:dev']
            },
            css: {
                files: ['_release/css/' + stylename + '.css'],
                tasks: []
            },
            assets: {
                files: [project + "assets/**"],
                tasks: ['copy:dev']
            },
            tmpl: {
                files: [project + 'tmpl/**/*.handlebars', project + 'data/*.json'],
                tasks: ['handlebars']
            }
        },
        'bower': require('./_grunt/conf/bower.js')
    });


    /*
     * required Node Modules
     */
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.loadNpmTasks('grunt-compile-handlebars');

    grunt.loadNpmTasks('grunt-bower-requirejs');
    grunt.loadNpmTasks('grunt-bower-install-task');

    /*
     * Tasks - CMD Syntax: grunt [setup,video,handlebars]
     */
    grunt.registerTask('default', ['connect', 'watch']);
    grunt.registerTask('setup', ['bower_install', 'bower']);

    grunt.registerTask('handlebars', ['page-handlebars', 'compile-handlebars']);
    grunt.registerTask('page-handlebars', require('./_grunt/task/page-handlebars.js')(grunt, project));

};