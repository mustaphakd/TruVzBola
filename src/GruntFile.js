module.exports = function(grunt){

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint:{
            source: ['motor/**/*.js'],
            destination:['../test/motor/core.js', '../test/motor/directives.js' ]
        },
        cssmin: {
            css_mv: {
                files:[{
                    expand: true,
                    cwd: 'css/',
                    src: '**/*.css',
                    dest: '../test/css/',
                    ext: '.min.css'
                }]
            },
            bwr_to_libs_css_mv: {
                files:[
                    {
                        src: 'bower_components/bootstrap/dist/css/bootstrap.min.css',
                        dest: 'libs/bootstrap/css/bootstrap.min.css' },
                    {
                        src: 'bower_components/bootstrap/dist/css/bootstrap-theme.min.css',
                        dest: 'libs/bootstrap/css/bootstrap-theme.min.css' },
                    {
                        src: 'bower_components/font-awesome/css/font-awesome.min.css',
                        dest: 'css/font-awesome.min.css' },
                    {
                        src: 'bower_components/angular/angular-csp.css',
                        dest: 'css/angular-csp.css' }
                ]
            }
        },
        uglify : {
            options : {
                mangle : false,
                compress: true
            },
            libs_mv: {
                files:[{
                    expand: true,
                    cwd: 'libs',
                    src: '**/*.*',
                    dest: '../test/libs'
                }]
            },
            bwr_to_libs_mv: {
                options : {
                    mangle : false,
                    compress: false
                },
                files:[
                    {
                    src: 'bower_components/jquery/dist/jquery.min.js',
                    dest: 'libs/jquery.min.js'
                    },
                    {
                        src: 'bower_components/bootstrap/dist/js/bootstrap.min.js',
                        dest: 'libs/bootstrap/js/bootstrap.min.js' },
                    {
                        src: ['bower_components/angular/angular.min.js', 'bower_components/angular-route/angular-route.min.js'],
                        dest: 'libs/angular.min.js' },
                    /*{
                        src: ['bower_components/angular-route/angular-route.min.js'],
                        dest: 'libs/angular-route.min.js' },*/
                    {
                        src: ['bower_components/angular-bootstrap/ui-bootstrap.min.js', 'bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js'],
                        dest: 'libs/ui-bootstrap.min.js' },
                    {
                        src: 'bower_components/angular-fontawesome/dist/angular-fontawesome.min.js',
                        dest: 'libs/angular-fontawesome.min.js' },
                    {
                        src: 'bower_components/d3/d3.min.js',
                        dest: 'libs/d3.min.js' },
                    {
                        src: 'bower_components/lodash/dist/lodash.min.js',
                        dest: 'libs/lodash.min.js' },
                    {
                        src: 'bower_components/prefixfree/prefixfree.min.js',
                        dest: 'libs/prefixfree.min.js' },
                    {
                        src: 'bower_components/crds-jaydata/release/jaydatamodules/angular.js',
                        dest: 'libs/jaydata-angular.min.js' },
                    {
                        src: 'bower_components/angular-d3-map/d3map.js',
                        dest: 'libs/d3map.min.js'
                    },
                    {
                        src: 'bower_components/topojson/topojson.js',
                        dest: 'libs/topojson.js'
                    }
                ]
            },
            bwr_to_libs_min_mv: {
                options : {
                    mangle : false,
                    compress: true
                },
                files:[
                    {
                        src: 'bower_components/modernizr/modernizr.js',
                        dest: 'libs/modernizr.min.js'
                    },
                    {
                        src: 'bower_components/angular-animate/angular-animate.js',
                        dest: 'libs/angular-animate.min.js' },
                    {
                        src: 'bower_components/d3-tip/index.js',
                        dest: 'libs/d3-tip.min.js' },
                    {
                        src: 'bower_components/angular-d3-chart-sizer/d3chartsizer.js',
                        dest: 'libs/d3chartsizer.min.js' }
                ]
            },
            imgs_mv: {
                options:{
                    compress: false
                },
                files:[{
                    expand: true,
                    cwd: 'imgs',
                    src: '**/*.*',
                    dest: '../test/imgs'
                }]
            },
            motor_mv:{
                options: {
                    compress : false
                },
                files: {'../test/motor/directives.js': ['motor/directives.js']}
            }
        },
        concat: {
            motor_mv: {
                src: ['motor/app.js', 'motor/controllers.js', 'motor/services.js'],
                dest: '../test/motor/core.js'
            }
        },
        copy: {
            bwr_to_libs_fonts_mv:
                {
                    expand: true,
                    cwd: 'bower_components/bootstrap/dist/fonts/',
                    src: ['*'],
                    flatten: true,
                    dest: 'libs/bootstrap/fonts/'
                },
            bwr_to_libs_fonts_mv2:
                {
                    expand: true,
                    cwd: 'bower_components/font-awesome/fonts/',
                    src: ['*'],
                    flatten: true,
                    dest: 'fonts/'
                },
            bwr_to_libs_cpy_mv:
                {
                    files:
                        [
                            {
                                src: 'bower_components/crds-jaydata/release/jaydata.min.js',
                                dest: 'libs/jaydata.min.js'
                            },
                            {
                                src: 'bower_components/crds-jaydata/release/jaydataproviders/IndexedDbProvider.min.js',
                                dest: 'libs/jaydataproviders/IndexedDbProvider.min.js'
                            },
                            {
                                src: 'bower_components/crds-jaydata/release/jaydataproviders/InMemoryProvider.min.js',
                                dest: 'libs/jaydataproviders/InMemoryProvider.min.js'
                            }
                        ]
                }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('default', [
        'jshint:source',
        'uglify:libs_mv','uglify:imgs_mv','uglify:motor_mv',
        'concat',
        'jshint:destination'
    ]);

    grunt.registerTask('prep', [
        'uglify:bwr_to_libs_mv','uglify:bwr_to_libs_min_mv',
        'cssmin:bwr_to_libs_css_mv',
        'copy:bwr_to_libs_fonts_mv',
        'copy:bwr_to_libs_fonts_mv2',
        'copy:bwr_to_libs_cpy_mv'
    ]);
};