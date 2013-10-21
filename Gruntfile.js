var header_js_src = [
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
        //for Amazon
        //aws: grunt.file.readJSON('creds/grunt-aws.json'),
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
                    namespace: 'Reuters.Template'
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
        
        /*
        s3: {   
            dev:{
                options:{
                    key: '<%= aws.dev.key %>',
                    secret: '<%= aws.dev.secret %>',
                    bucket: '<%= aws.dev.bucket %>',
                    access: 'private',
                    maxOperations: 20,
                    //encodePaths: true,
                    headers: {
                        'Cache-Control': 'public, max-age=900',
                    },
                    debug: false,
                    gzip: true,
                    gzipExclude: ['.png', '.jpg', '.gif', '.jpeg', '.ogg', '.ogv', '.mp3', '.mp4']
                },
                upload:[
                    {
                        src: 'js_compiled/**/*',
                        dest: '<%= aws.dev.folder %>js_compiled/',
                        rel: 'js_compiled/'
                    },
                    {
                        src: 'js/**/*',
                        dest: '<%= aws.dev.folder %>js/',
                        rel: 'js/'
                    },
                    {
                        src: 'articles/*',
                        dest: '<%= aws.dev.folder %>articles/',
                    },
                    {
                        src: 'css/**/*',
                        dest: '<%= aws.dev.folder %>css/',
                        rel: 'css/'
                    },
                    {
                        src: 'less/**/*',
                        dest: '<%= aws.dev.folder %>css/',
                        rel: 'less'
                    },
                    {
                        src: 'data/*',
                        dest: '<%= aws.dev.folder %>data/',
                    },
                    {
                        src: 'images/**/*',
                        dest: '<%= aws.dev.folder %>images/',
                        rel: 'images/',
                        gzip: false,
                    },
                    {
                        src: 'assets/fonts/*',
                        dest: '<%= aws.dev.folder %>assets/fonts/',
                        gzip: false,
                    },
                    {
                        src: 'media/**/*',
                        dest: '<%= aws.dev.folder %>media/',
                        gzip: false,
                        rel: 'media/'
                    },
                    {
                        src: '*',
                        dest: '<%= aws.dev.folder %>',
                    }
                ]
            },
            
            
            prod:{
                options:{
                    key: '<%= aws.prod.key %>',
                    secret: '<%= aws.prod.secret %>',
                    bucket: '<%= aws.prod.bucket %>',
                    access: 'private',
                    maxOperations: 20,
                    //encodePaths: true,
                    headers: {
                        'Cache-Control': 'public, max-age=900',
                    },
                    debug: false,
                    gzip: true,
                    gzipExclude: ['.png', '.jpg', '.gif', '.jpeg', '.ogg', '.ogv', '.mp3', '.mp4']
                },
                upload:[
                    {
                        src: 'js_compiled/**/*',
                        dest: '<%= aws.prod.folder %>js_compiled/',
                        rel: 'js_compiled/'
                    },
                    {
                        src: 'js/**/*',
                        dest: '<%= aws.prod.folder %>js/',
                        rel: 'js/'
                    },
                    {
                        src: 'articles/*',
                        dest: '<%= aws.prod.folder %>articles/',
                    },
                    {
                        src: 'css/**/*',
                        dest: '<%= aws.prod.folder %>css/',
                        rel: 'css/'
                    },
                    {
                        src: 'less/**/*',
                        dest: '<%= aws.prod.folder %>css/',
                        rel: 'less'
                    },
                    {
                        src: 'data/*',
                        dest: '<%= aws.prod.folder %>data/',
                    },
                    {
                        src: 'images/**/*',
                        dest: '<%= aws.prod.folder %>images/',
                        rel: 'images/',
                        gzip: false,
                    },
                    {
                        src: 'assets/fonts/*',
                        dest: '<%= aws.prod.folder %>assets/fonts/',
                        gzip: false,
                    },
                    {
                        src: 'media/**/*',
                        dest: '<%= aws.prod.folder %>media/',
                        gzip: false,
                        rel: 'media/'
                    },
                    {
                        src: '*',
                        dest: '<%= aws.prod.folder %>',
                    }
                ]
            }
            
        }
        */
    });

    grunt.loadNpmTasks('grunt-contrib-jst');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    //grunt.loadNpmTasks('grunt-s3');

    // Default task.
    grunt.registerTask('default', ['less', 'jst', 'concat', 'uglify']);
    //grunt.registerTask('all', ['less', 'jst', 'concat', 'uglify', 's3:dev']);
    //grunt.registerTask('dev', ['less', 'jst', 'concat', 'uglify', 's3:dev']);
    //grunt.registerTask('live', ['less', 'jst', 'concat', 'uglify', 's3:live']);

};
