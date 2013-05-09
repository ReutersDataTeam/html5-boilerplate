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
    'js/closureStart.frag.js',  // defines a closure that wraps the following...
    'js/templates.js',
    'js/plugins.js',
    'js/main.js',
    'js/closureEnd.frag.js' 
];

module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        uglify: {
            header_js: {
                src: 'js_compiled/app-header.js',
                dest: 'js_compiled/app-header.min.js'
            },
            footer_js:{
                src: 'js_compiled/app-footer.js',
                dest: 'js_compiled/app-footer.min.js'
            },
        },
        concat: {
            css: {
                src: [
                    'css/normalize.css',
                    'css/tipsy.css',
                    'css/cleanslate.css',
                    'css/main.css',
                    'css/less/!(reset).css',
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
            },
        },
        less: {
            all: {
                files: [{
                    expand: true,
                    cwd: 'less',
                    src: ['**/*.less'],
                    dest: 'css/less',
                    ext: '.css',
                }]
            },
        },
        jst: {
            all: {
                options: {
                    processName: function(filename) {
                        return filename.split("/").pop().split(".")[0];
                    },
                    namespace: 'Reuters.Polls.Template'
                },
                files: {
                    'js/templates.js': ['jst/*.html']
                }
            },
            individuals: {
               options: {
                    processName: function(filename) {
                        return filename.split("/").pop().split(".")[0];
                    },
                    namespace: 'Reuters.Template'
                },
                files: [{
                    expand: true,
                    cwd: 'jst',
                    src: ['**/*.html'],
                    dest: 'js_compiled/templates',
                    ext: '.js',
                }]
            }
        },
        watch: {
            css: {
                files: ['less/**/*.less'],
                tasks: ['less', 'concat:css']
            },
            jst: {
                files: ['jst/**/*.html'],
                tasks: ['jst', 'concat:footer_dev_js', 'uglify:footer_js']
            },
            js: {
                files: ['js/**/*.js'],
                tasks: [ 'concat:header_dev_js', 'concat:footer_dev_js', 'uglify:header_js', 'uglify:footer_js'],
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jst');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Default task.
    grunt.registerTask('default', ['less', 'jst', 'concat', 'uglify']);

};
