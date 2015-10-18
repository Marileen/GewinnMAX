/*global module:true */
module.exports = function (grunt) {
    'use strict';
    var path = require('path');
    var phpMiddleware = require('connect-php');
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
                    directory: './',
                    open: 'http://127.0.0.1:8050/_release/index.html',
                    middleware: function(connect, options) {
//                        var middlewares = [];
//                        var directory = options.directory ||
//                            options.base[options.base.length - 1];
//                        if (!Array.isArray(options.base)) {
//                            options.base = [options.base];
//                        }
//                        console.log(options);
//
//                        // Here comes the PHP middleware
//                        middlewares.push(phpMiddleware(directory));
//
//                        // Same as in grunt-contrib-connect
//                        options.base.forEach(function(base) {
//                            middlewares.push(connect.static(base));
//                        });
//
//                        middlewares.push(connect.directory(directory));
//                        return middlewares;

                        var path = require('path');
                        return [
                            connect.compress(),
                            connect.bodyParser(),

//                    require(path.resolve('_resources/grunt/rewerest')),
//                            require(path.resolve('_resources/grunt/expireHeader')),
                            require('connect-livereload')(),
                            connect.static(path.resolve('.'))
                        ];
                    }
                }
            }
        },
        php: {
            dev: {
                options: {
                    hostname: '192.168.2.103',
                    port: 8050
                }
            }
        },
        express: {
            server: {
                options: {
                    hostname: '*',
                    port: 8050,
                    bases: './',
                    server: path.resolve(__dirname, '_grunt/server/websocket.js'),
                    serverreload: false
                }
            }
        },
        'less': {
            dev: {
                files: [
                    {
                        src: 'less/style.less',
                        dest: '_release/css/style.css'
                    }, {
                        expand: true,
                        cwd: 'less/tests/',
                        src: ['*.less'],
                        dest: '_release/css/tests/',
                        ext: '.css'
                    }, {
                        expand: true,
                        cwd: 'less/demos/',
                        src: ['*.less'],
                        dest: '_release/css/demos/',
                        ext: '.css'
                    }
                ]
            }
        },
        imagemin: {                          // Task
            dev: {
                options: {                       // Target options
                    optimizationLevel: 3
                },
                files: [{
                    expand: true,                           // Enable dynamic expansion
                    cwd: 'assets/',               // Src matches are relative to this path
                    src: ['img/**/*.{png,jpg,gif}'],        // Actual patterns to match
                    dest: '_release/assets/'      // Destination path prefix
                }]
            }
        },
        'compile-handlebars' : {
            dev: {
                template: 'tmpl/*.handlebars',
                templateData: 'data/*.json',
                partials: 'tmpl/**/*.handlebars',
                output: '_release/*.html',
                helpers: '_grunt/handlebars/*.js',
                globals: ['data/globals.json']
            },
            test: {
                template: 'tmpl/tests/**/*.handlebars',
                templateData: 'data/tests/**/*.json',
                partials: 'tmpl/**/*.handlebars',
                output: '_release/tests/*.html',
                helpers: '_grunt/handlebars/*.js',
                globals: ['data/globals.json']
            },
            demos: {
                template: 'tmpl/demos/**/*.handlebars',
                templateData: 'data/demos/**/*.json',
                partials: 'tmpl/**/*.handlebars',
                output: '_release/demos/*.html',
                helpers: '_grunt/handlebars/*.js',
                globals: ['data/globals.json']
            }
        },
        'copy': {
            assets: {
                files: [{
                    expand: true,
                    cwd: './',
                    src: ['assets/**/*.{png,jpg,gif,css,ttf,eot,woff,svg,ico}'],
                    dest: '_release/'
                }]
            },
            external_sources: {
                files: [{
                    expand: true,
                    cwd: '_resources/',
                    src: ['external_sources/**'],
                    dest: '_release/'
                }]
            },
            php: {
                files: [{
                    expand: true,
                    cwd: './',
                    src: ['php/**/*.php'],
                    dest: '_release/'
                }]
            }
        },
        'clean': {
            assets: {
                src: ['_release/assets/*', '!_release/assets/videos/**']
            },
            external_sources: {
                src: ['_release/external_sources/']
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
                files: ['less/**/*.less'],
                tasks: ['less:dev']
            },
            css: {
                files: ['_release/css/style.css', '_release/css/**/*.css'],
                tasks: []
            },
//            assets: {
//                files: ["assets/**"],
//                tasks: ['copy:assets']
//            },
//            external_sources: {
//                files: ["_resources/external_sources/**"],
//                tasks: ['copy:external_sources']
//            },
            php: {
                files: ["php/**"],
                tasks: ['copy:php']
            },
            tmpl: {
                files: ['tmpl/**/*.handlebars', 'data/*.json', 'data/tests/**/*.json', 'data/demos/**/*.json'],
                tasks: ['handlebars']
            }
        },
        'bower': require('./_grunt/conf/bower.js'),
        'responsive_videos': require('./_grunt/conf/responsive_videos.js'),
        'convert': require('./_grunt/conf/convert.js'),
        'generate_build_script': require('./_grunt/conf/generate_build_script.js'),
        'bowerRequireWrapper': require('./_grunt/conf/bowerRequireWrapper.js')
    });


    /*
     * required Node Modules
     */
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-compile-handlebars');
    grunt.loadNpmTasks('grunt-convert');
    grunt.loadNpmTasks('grunt-php');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-express');

    grunt.loadNpmTasks('grunt-bower-requirejs');
    grunt.loadNpmTasks('grunt-bower-install-task');
    grunt.loadNpmTasks('grunt-responsive-videos');

    /*
     * Tasks - CMD Syntax: grunt [setup,video,handlebars]
     */
    grunt.registerTask('default', ['clean', 'copy', 'express', 'watch' /*, 'connect'*/]);
    grunt.registerTask('setup', ['bower_install', 'bower']);
    grunt.registerTask('video', ['responsive_videos']);
    grunt.registerTask('generate_report_suite_list', ['convert']);

    grunt.registerTask('handlebars', ['page-handlebars', 'compile-handlebars']);
    grunt.registerTask('page-handlebars', require('./_grunt/task/page-handlebars.js')(grunt));


//    grunt.event.on('watch', require('./_grunt/task/watch/deleted.js')(grunt, 'images'));
//    grunt.event.on('watch', require('./_grunt/task/watch/added-handlebar.js')(grunt, 'tmpl'));
};