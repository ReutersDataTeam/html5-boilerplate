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
        aws: grunt.file.readJSON('grunt-aws.json'),
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
        },
        
        
        s3: {   
            dev:{
                options:{
                    key: '<%= aws.key %>',
                    secret: '<%= aws.secret %>',
                    bucket: '<%= aws.bucket %>',
                    access: 'private',
                    maxOperations: 20,
                    //encodePaths: true,
                    debug: false,
                    gzip: true,
                    gzipExclude: ['.png', '.jpg', '.gif', '.jpeg']
                },
                upload:[
                    {
                        src: 'js_compiled/*',
                        dest: '<%= aws.folder %>js_compiled/',
                    },
                    {
                        src: 'js_compiled/templates/*',
                        dest: '<%= aws.folder %>js_compiled/templates/',
                    },
                    {
                        src: 'js_compiled/templates/widgets/*',
                        dest: '<%= aws.folder %>js_compiled/templates/widgets/',
                    },
                    {
                        src: 'js_compiled/widgets/*',
                        dest: '<%= aws.folder %>js_compiled/widgets/',
                    },
                    {
                        src: 'css/*',
                        dest: '<%= aws.folder %>css/',
                    },
                    {
                        src: 'css/less/*',
                        dest: '<%= aws.folder %>css/less/',
                    },
                    {
                        src: 'css/less/widgets/*',
                        dest: '<%= aws.folder %>css/less/widgets/',
                    },
                    {
                        src: 'img/*',
                        dest: '<%= aws.folder %>img/',
                        gzip: false,
                    },
                    {
                        src: 'assets/fonts/*',
                        dest: '<%= aws.folder %>assets/fonts/',
                        gzip: false,
                    },
                    {
                        src: '*',
                        dest: '<%= aws.folder %>',
                    }
                ]
            }
        }
        
    });

    grunt.loadNpmTasks('grunt-contrib-jst');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-s3');

    // Default task.
    grunt.registerTask('default', ['less', 'jst', 'concat', 'uglify']);

};
