var header_js_src = [
                    'js/vendor/jquery.js',
                    'js/vendor/modernizr.js'
                ];
                

var footer_js_src = [
                    'js/vendor/jquery.js', //redundant with header. For embedding.
                    'js/vendor/underscore.js',
                    'js/vendor/backbone.js',
                    'js/vendor/d3.js',
                    'js/vendor/jquery.tipsy.js',
                    'js/vendor/tabletop.js',
                    'js/closureStart.frag.js', // defines a closure that wraps the following...
                    'js/templates.js',
                    'js/plugins.js',
                    'js/main.js',
                    'js/closureEnd.frag.js' // ends closure, passes jquery (no conflict), _ (no conflict), backbone (no conflict), and d3.
                ];

module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        min: {
            header_js: {
                src: header_js_src,
                dest: 'js_compiled/app-header.min.js'
            },
            footer_js:{
                src: footer_js_src,
                dest: 'js_compiled/app-footer.min.js'
            }
        },
        concat: {
            css: {
                src: [
                    'css/normalize.css',
                    'css/tipsy.css',
                    'css/cleanslate.css',
                    'css/main.css',
                    'css/app.css'
                ],
                dest: 'css/app.min.css'
            },
            header_dev_js: {
                src: header_js_src,
                dest: 'js_compiled/app-header.js'
            },
            footer_dev_js:{
                src: footer_js_src,
                dest: 'js_compiled/app-footer.js'
            }
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
                    namespace: 'Reuters.Graphics.Views'
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
                tasks: 'min:header_js min:footer_js concat:header_dev_js concat:footer_dev_js',
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jst');
    grunt.loadNpmTasks('grunt-contrib-less');

    // Default task.
    grunt.registerTask('default', 'less jst min concat');

};
