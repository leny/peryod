"use strict";

module.exports = function( grunt ) {

    grunt.initConfig( {
        pkg: grunt.file.readJSON( "package.json" ),
        nodeunit: {
            files: [ "test/**/*_test.js" ],
        },
        jshint: {
            options: {
                jshintrc: ".jshintrc"
            },
            gruntfile: {
                src: "Gruntfile.js"
            },
            lib: {
                src: [ "dist/peryod.js" ]
            },
            test: {
                src: [ "test/**/*.js" ]
            },
        },
        uglify: {
            lib: {
                options: {
                    banner: "/* peryòd - v<%= pkg.version %> - https://github.com/leny/peryod - (c) 2013 Leny - Licensed under the MIT license. */\n"
                },
                files: {
                    "dist/peryod.min.js": [ "dist/peryod.js" ]
                }
            }
        },
        watch: {
            gruntfile: {
                files: "<%= jshint.gruntfile.src %>",
                tasks: [ "jshint:gruntfile" ]
            },
            lib: {
                files: "<%= jshint.lib.src %>",
                tasks: [ "jshint:lib", "nodeunit" ]
            },
            test: {
                files: "<%= jshint.test.src %>",
                tasks: [ "jshint:test", "nodeunit" ]
            },
        },
    } );

    grunt.loadNpmTasks( "grunt-contrib-nodeunit" );
    grunt.loadNpmTasks( "grunt-contrib-jshint" );
    grunt.loadNpmTasks( "grunt-contrib-uglify" );
    grunt.loadNpmTasks( "grunt-contrib-watch" );

    grunt.registerTask( "default", [ "jshint", "nodeunit", "uglify" ] );
};
