var header_js = {
                src: [
                    'js/vendor/jquery-1.8.3.min.js',
                    'js/vendor/modernizr-2.6.2.js'
                ],
                dest: 'js_compiled/app-header.min.js'
            }

var footer_js = {
                src: [
                    'js/vendor/underscore-min.js',
                    'js/vendor/d3.v2.min.js',
                    'js/vendor/jquery.tipsy.js',
                    'js/vendor/tabletop.js',
                    'js/templates.js',
                    'js/app.js',
                    'js/plugins.js',
                    'js/income-chart/income-chart.js',
                    'js/main.js',
                    
                ],
                dest: 'js_compiled/app-footer.min.js'
            }

module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        min: {
            header_js: header_js,
            footer_js: footer_js
        },
        concat: {
            css: {
                src: [
                    'css/normalize.css',
                    'css/tipsy.css',
                    'css/main.css',
                    'css/app.css'
                ],
                dest: 'css/app.min.css'
            },
            header_dev_js: header_js,
            footer_dev_js: footer_js
        },
        less: {
            all: {
                files: {
                    'css/app.css': 'less/*.less'
                }
            },
        },
        jst: {
            all: {
                options: {
                    processName: function(filename) {
                        return filename.split("/").pop().split(".")[0];
                    },
                    namespace: 'App.Views'
                },
                files: {
                    'js/templates.js': ['jst/*.html']
                }
            }
        },
        watch: {
            css: {
                files: ['less/*.less'],
                tasks: 'less concat:css'
            },
            jst: {
                files: ['jst/*.html'],
                tasks: 'jst'
            },
            js: {
                files: ['js/*.js'],
                tasks: 'min:header_js min:footer_js',
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jst');
    grunt.loadNpmTasks('grunt-contrib-less');

    // Default task.
    grunt.registerTask('default', 'less jst min concat');

};
