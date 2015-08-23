module.exports = function(grunt) {

  var _ = require('lodash');

  // Load required Grunt tasks. These are installed based on the versions listed
  // * in 'package.json' when you do 'npm install' in this directory.
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('jasmine-given');
  grunt.loadNpmTasks('grunt-connect-prism');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-bump');
  grunt.loadNpmTasks('grunt-ng-annotate');
  grunt.loadNpmTasks('grunt-html2js');
  grunt.loadNpmTasks("grunt-bower-install-simple");
  grunt.loadNpmTasks('grunt-sonar-runner');

  /** ********************************************************************************* */
  /** **************************** File Config **************************************** */
  var fileConfig = {
    build_dir: 'build',
    compile_dir: 'bin',

    /**
     * This is a collection of file patterns for our app code (the
     * stuff in 'src/'). These paths are used in the configuration of
     * build tasks. 'js' is all project javascript, except tests.
     * 'commonTemplates' contains our reusable components' ('src/common')
     * template HTML files, while 'appTemplates' contains the templates for
     * our app's code. 'html' is just our main HTML file. 'scss' is our main
     * stylesheet, and 'unit' contains our app's unit tests.
     */
    app_files: {
      js: ['./src/**/*.module.js', 'src/**/*.js',
        '!src/**/*.spec.js', '!src/assets/**/*.js'
      ],
      jsunit: ['src/**/*.spec.js'],

      appTemplates: ['src/app/**/*.tpl.html'],
      commonTemplates: ['src/common/**/*.tpl.html'],

      html: ['src/index.html'],
      scss: 'src/scss/application.scss'
    },

    /**
     * This is a collection of files used during testing only.
     */
    test_files: {
      js: [
        'vendor/angular-mocks/angular-mocks.js'
      ]
    },

    /**
     * This is the same as 'app_files', except it contains patterns that
     * reference vendor code ('vendor/') that we need to place into the build
     * process somewhere. While the 'app_files' property ensures all
     * standardized files are collected for compilation, it is the user's job
     * to ensure non-standardized (i.e. vendor-related) files are handled
     * appropriately in 'vendor_files.js'.
     *
     * The 'vendor_files.js' property holds files to be automatically
     * concatenated and minified with our project source files.
     *
     * The 'vendor_files.css' property holds any CSS files to be automatically
     * included in our app.
     *
     * The 'vendor_files.assets' property holds any assets to be copied along
     * with our app's assets. This structure is flattened, so it is not
     * recommended that you use wildcards.
     */
    vendor_files: {
      js: [
        'vendor/angular/angular.js',
        'vendor/angular-animate/angular-animate.js',
        'vendor/angular-sanitize/angular-sanitize.js',
        'vendor/angular-bootstrap/ui-bootstrap-tpls.js',
        'vendor/angular-ui-router/release/angular-ui-router.js',
        'vendor/js-data/dist/js-data.js',
        'vendor/js-data-angular/dist/js-data-angular.js',
        'vendor/lodash/lodash.js',
        'vendor/flow.js/dist/flow.js',
        'vendor/ng-flow/dist/ng-flow.js',
        'vendor/angular-native-dragdrop/draganddrop.js',
        'vendor/angular-smart-table/dist/smart-table.js',
        'vendor/angular-ui-layout/ui-layout.js',
        'vendor/bg-splitter/js/splitter.js',
        'vendor/angular-loading-bar/build/loading-bar.js',
      ],
      css: [],
      assets: []
    }
  };

  /** ********************************************************************************* */
  /** **************************** Task Config **************************************** */
  var taskConfig = {
    pkg: grunt.file.readJSON("package.json"),

    /**
     * The banner is the comment that is placed at the top of our compiled
     * source files. It is first processed as a Grunt template, where the '<%='
     * pairs are evaluated based on this very configuration object.
     */
    meta: {
      banner: '/**\n' +
      ' * <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
      ' *\n' +
      ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
      ' */\n'
    },

    /**
     * Increments the version number, etc.
     */
    bump: {
      options: {
        files: [
          "package.json",
          "bower.json"
        ],
        commit: false,
        commitMessage: 'chore(release): v%VERSION%',
        commitFiles: [
          "package.json",
          "client/bower.json"
        ],
        createTag: false,
        tagName: 'v%VERSION%',
        tagMessage: 'Version %VERSION%',
        push: false,
        pushTo: 'origin'
      }
    },

    /**
     * The directories to delete when 'grunt clean' is executed.
     */
    clean: {
      all: [
        '<%= build_dir %>',
        '<%= compile_dir %>'
      ],
      vendor: [
        '<%= build_dir %>/vendor/'
      ],
      index: ['<%= build_dir %>/index.html']
    },

    /**
     * The 'copy' task just copies files from A to B. We use it here to copy
     * our project assets (images, fonts, etc.) and javascripts into
     * 'build_dir', and then to copy the assets to 'compile_dir'.
     */
    copy: {
      build_app_assets: {
        files: [{
          src: ['**'],
          dest: '<%= build_dir %>/assets/',
          cwd: 'src/assets',
          expand: true
        }]
      },
      build_vendor_assets: {
        files: [{
          src: ['<%= vendor_files.assets %>'],
          dest: '<%= build_dir %>/assets/',
          cwd: '.',
          expand: true,
          flatten: true
        }]
      },
      build_appjs: {
        files: [{
          src: ['<%= app_files.js %>'],
          dest: '<%= build_dir %>/',
          cwd: '.',
          expand: true
        }]
      },
      build_vendorjs: {
        files: [{
          src: ['<%= vendor_files.js %>'],
          dest: '<%= build_dir %>/',
          cwd: '.',
          expand: true
        }]
      },
      compile_assets: {
        files: [{
          src: ['**', '!**.css.map', '!**.md'],
          dest: '<%= compile_dir %>/assets',
          cwd: '<%= build_dir %>/assets',
          expand: true
        }]
      }
    },

    /**
     * 'grunt concat' concatenates multiple source files into a single file.
     */
    concat: {
      // The 'build_css' target concatenates compiled CSS and vendor CSS together.
      build_css: {
        src: [
          '<%= vendor_files.css %>',
          '<%= build_dir %>/assets/<%= pkg.name %>-<%= pkg.version %>.css'
        ],
        dest: '<%= build_dir %>/assets/<%= pkg.name %>-<%= pkg.version %>.css'
      },
      // The 'compile_js' target concatenates app js code.
      compile_js: {
        options: {
          banner: '<%= meta.banner %>'
        },
        src: [
          'module.prefix',
          '<%= build_dir %>/src/**/*.module.js',
          '<%= build_dir %>/src/**/*.js',
          '<%= html2js.app.dest %>',
          '<%= html2js.common.dest %>',
          'module.suffix'
        ],
        dest: '<%= compile_dir %>/assets/<%= pkg.name %>-<%= pkg.version %>.js'
      },

      // The 'compile_vendor' target concatenates vendor js code.
      compile_vendor: {
        options: {
          banner: '<%= meta.banner %>'
        },
        src: [
          '!**.min.js.map',
          '<%= vendor_files.js %>',
        ],
        dest: '<%= compile_dir %>/assets/vendor-<%= pkg.version %>.js'
      }
    },

    /**
     * 'ng-annotate' annotates the sources for safe minification. That is, it allows us
     * to code without the array syntax.
     */
    ngAnnotate: {
      options: {
        singleQuotes: true
      },
      build: {
        files: [{
          src: ['<%= app_files.js %>'],
          cwd: '<%= build_dir %>',
          dest: '<%= build_dir %>',
          expand: true
        },]
      },
    },

    /**
     * Minify the sources!
     */
    uglify: {
      compile: {
        options: {
          banner: '<%= meta.banner %>'
        },
        files: {
          '<%= concat.compile_js.dest %>': '<%= concat.compile_js.dest %>',
          '<%= concat.compile_vendor.dest %>': '<%= concat.compile_vendor.dest %>'
        }
      }
    },

    /**
     * `grunt-sass` handles our sass compilation and uglification automatically.
     * Only our 'main.sass' file is included in compilation; all other files
     * must be imported from this file.
     */
    sass: {
      build: {
        files: {
          '<%= build_dir %>/assets/<%= pkg.name %>-<%= pkg.version %>.css': '<%= app_files.scss %>'
        },
        options: {
          sourceMap: true,
          lineNumbers: true,
          style: 'nested'

        }
      },
      compile: {
        options: {
          sourceMap: false,
          style: 'compressed'
        },
        files: {
          '<%= build_dir %>/assets/<%= pkg.name %>-<%= pkg.version %>.css': '.css'
        }
      }
    },

    /**
     * 'jshint' defines the rules of our linter as well as which files we
     * should check. This file, all javascript sources, and all our unit tests
     * are linted based on the policies listed in 'options'. But we can also
     * specify exclusionary patterns by prefixing them with an exclamation
     * point (!); this is useful when code comes from a third party but is
     * nonetheless inside 'src/'.
     */
    jshint: {
      src: [
        '!src/**/**.spec.js',
        '<%= app_files.js %>'
      ],
      test: [
        '<%= app_files.jsunit %>'
      ],
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      }

    },

    /**
     * HTML2JS is a Grunt plugin that takes all of your template files and
     * places them into JavaScript files as strings that are added to
     * AngularJS's template cache. This means that the templates too become
     * part of the initial payload as one JavaScript file. Neat!
     */
    html2js: {
      // These are the templates from 'src/app'.
      app: {
        options: {
          base: 'src/app'
        },
        src: ['<%= app_files.appTemplates %>'],
        dest: '<%= build_dir %>/templates-app.js'
      },

      // These are the templates from 'src/common'.
      common: {
        options: {
          base: 'src/common'
        },
        src: ['<%= app_files.commonTemplates %>'],
        dest: '<%= build_dir %>/templates-common.js'
      }
    },

    /**
     * The 'index' task compiles the 'index.html' file as a Grunt template. CSS
     * and JS files co-exist here but they get split apart later.
     */
    index: {

      /**
       * During development, we don't want to have wait for compilation,
       * concatenation, minification, etc. So to avoid these steps, we simply
       * add all script files directly to the '<head>' of 'index.html'. The
       * 'src' property contains the list of included files.
       */
      build: {
        dir: '<%= build_dir %>',
        src: [
          '<%= vendor_files.js %>',
          '<%= build_dir %>/src/**/*.module.js',
          '<%= build_dir %>/src/**/*.js',
          '<%= html2js.common.dest %>',
          '<%= html2js.app.dest %>',
          '<%= vendor_files.css %>',
          '<%= build_dir %>/assets/<%= pkg.name %>-<%= pkg.version %>.css'
        ]
      },

      /**
       * When it is time to have a completely compiled application, we can
       * alter the above to include only a single JavaScript and a single CSS
       * file. Now we're back!
       */
      compile: {
        dir: '<%= compile_dir %>',
        src: [
          '<%= concat.compile_vendor.dest %>',
          '<%= concat.compile_js.dest %>',
          '<%= vendor_files.css %>',
          '<%= build_dir %>/assets/<%= pkg.name %>-<%= pkg.version %>.css'
        ]
      }
    },

    connect: {
      options: {
        port: 9000,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: 'localhost',

        middleware: function(connect) {
          return [
            require('grunt-connect-prism/middleware'),
            connect.static('./' + fileConfig.build_dir)
          ];
        }
      },
      livereload: {
        options: {
          open: false,
          livereload: 35729
        }
      },
      test: {
        options: {
          hostname: 'localhost',
          port: 9000,
          middleware: function(connect) {
            return [
              require('grunt-connect-prism/middleware'),
              connect.static('./' + fileConfig.compile_dir)
            ];
          },
          livereload: false,
          keepalive: true,
          base: '<%= compile_dir %>'

        }
      },
      e2e: {
        options: {
          open: true,
          base: '<%= build_dir %>'
        }
      }
    },
    prism: {
      options: {
        mode: 'proxy',
        host: 'localhost',
        https: false,
        delay:'slow',
        port: 8080,
        mocksPath: './mocks',
        mockFilenameGenerator: function(config, req) {
          var crypto = require('crypto');
          var path = require('path');
          var shasum = crypto.createHash('sha1');
          shasum.update(req.url);

          var method = req.method;
          var url = req.url.replace(/\/|\_|\?|w\>|\\|\:|\*|\||\"/g, '_');

          return method + url + '_' + shasum.digest('hex') + '.json';
        }

        ,
        ignoreParameters: false,
        //changeOrigin: true,
        hashFullRequest: false,
        context: '/rest',
        rewrite: {
          '^/rest': '/rest'
        }
      }
      ,
      dev: {
        options: {
          mode: 'mock'
        }
      }
      ,
      e2e: {
        options: {}
      }
    },

    /**
     * The Karma configurations.
     */
    karma: {
      options: {
        configFile: '<%= build_dir %>/karma-unit.js'
      }
      ,
      unit: {
        runnerPort: 9019,
        background: true
      }
      ,
      continuous: {
        singleRun: true
      }
    }
    ,

    /**
     * This task compiles the karma template so that changes to its file array
     * don't have to be managed manually.
     */
    karmaconfig: {
      unit: {
        dir: '<%= build_dir %>',
        src: [
          '<%= vendor_files.js %>',
          '<%= html2js.app.dest %>',
          '<%= html2js.common.dest %>',
          '<%= test_files.js %>'
        ]
      }
    }
    ,

    /**
     * getting dependencies (bower install)
     */
    'bower-install-simple': {
      options: {
        color: true
      }
      ,
      dev: {
        options: {
          production: false
        }
      }
      ,
      prod: {
        options: {
          production: true
        }
      }
    }
    ,

    /**
     *  grunt-sonar-runner config
     */
    sonarRunner: {
      analysis: {
        options: {
          debug: true,
          separator: '\n',
          sonar: {
            host: {
              url: 'http://10.10.20.79:9000'
            }
            ,
            jdbc: {
              url: 'jdbc:postgresql://10.10.20.23/sonar',
              username: 'sonar',
              password: 'sonar'
            }
            ,

            projectKey: 'sonar:grunt-sonar-runner:0.1.0',
            projectName: 'self-packager-client',
            projectVersion: grunt.config('pkg.version'), // group:artifactId:version ?
            sources: ['src'].join(','),
            language: 'js',
            sourceEncoding: 'UTF-8'
          }
        }
      }
    }
    ,

    /**
     * And for rapid development, we have a watch set up that checks to see if
     * any of the files listed below change, and then to execute the listed
     * tasks when they do. This just saves us from having to type "grunt" into
     * the command-line every time we want to see what we're working on; we can
     * instead just leave "grunt watch" running in a background terminal. Set it
     * and forget it, as Ron Popeil used to tell us.
     *
     * But we don't need the same thing to happen for all the files.
     */
    delta: {
      /**
       * By default, we want the Live Reload to work for all tasks; this is
       * overridden in some tasks (like this file) where browser resources are
       * unaffected. It runs by default on port 35729, which your browser
       * plugin should auto-detect.
       */
      options: {
        livereload: true
      }
      ,

      /**
       * When the Gruntfile changes, we just want to lint it. In fact, when
       * your Gruntfile changes, it will automatically be reloaded!
       * We also want to copy vendor files and rebuild index.html in case
       * vendor_files.js was altered (list of 3rd party vendor files installed by bower)
       */
      gruntfile: {
        files: 'Gruntfile.js',
        tasks: ['jshint:gruntfile', 'clean:vendor',
          'copy:build_vendorjs', 'index:build'
        ],
        options: {
          livereload: false
        }
      }
      ,

      /**
       * When our JavaScript source files change, we want to run lint them and
       * run our unit tests.
       */
      jssrc: {
        files: [
          '<%= app_files.js %>'
        ],
        tasks: ['jshint:src', 'karma:unit:run',
          'copy:build_appjs', 'index:build'
        ]
      }
      ,

      /**
       * When assets are changed, copy them. Note that this will *not* copy new
       * files, so this is probably not very useful.
       */
      assets: {
        files: [
          'src/assets/**/*'
        ],
        tasks: ['copy:build_app_assets']
      }
      ,

      /**
       * When index.html changes, we need to compile it.
       */
      html: {
        files: ['<%= app_files.html %>'],
        tasks: ['index:build']
      }
      ,

      /**
       * When our templates change, we only rewrite the template cache.
       */
      tpls: {
        files: [
          '<%= app_files.appTemplates %>',
          '<%= app_files.commonTemplates %>'
        ],
        tasks: ['html2js']
      }
      ,

      /**
       * When the CSS files change, we need to compile and minify them.
       */
      scss: {
        files: ['src/**/*.scss'],
        tasks: ['sass:build'],
        options: {
          livereload: false
        }
      }
      ,

      css: {
        files: ['<%= build_dir %>/assets/*.css'],
        tasks: []
      }
      ,
      /**
       * When a JavaScript unit test file changes, we only want to lint it and
       * run the unit tests. We don't want to do any live reloading.
       */
      jsunit: {
        files: [
          '<%= app_files.jsunit %>'
        ],
        tasks: ['jshint:test', 'karma:unit:run'],
        options: {
          livereload: false
        }
      }
    }
  };

  /** ********************************************************************************* */
  /** **************************** Project Configuration ****************************** */
  grunt.initConfig(_.extend(taskConfig, fileConfig));

// In order to make it safe to just compile or copy *only* what was changed,
// we need to ensure we are starting from a clean, fresh build. So we rename
// the 'watch' task to 'delta' (that's why the configuration var above is
// 'delta') and then add a new task called 'watch' that does a clean build
// before watching for changes.
  grunt.renameTask('watch', 'delta');
  grunt.registerTask('watch', function(target, prismMode) {
    if (!target) {
      target = 'dev';
      prismMode = 'mock';
    }
    grunt.task.run(['build',
      'karma:unit',
      'prism:' + target + ':' + prismMode,
      'connect:livereload',
      'delta']);
  });

// The default task is to build and compile.
  grunt.registerTask('default', ['bump', 'build', 'compile']);

// The 'build' task gets your app ready to run for development and testing.
  grunt.registerTask('build', [
    'bower-install-simple:dev',
    'clean:all',
    'html2js',
    'jshint',
    'sass:build',
    'concat:build_css',
    'copy:build_app_assets',
    'copy:build_vendor_assets',
    'copy:build_appjs',
    'copy:build_vendorjs',
    'ngAnnotate:build',
    'index:build',
    'karmaconfig',
    'karma:continuous'
  ]);

// The 'compile' task gets your app ready for deployment by concatenating and minifying your code.
// Note - compile builds off of the build dir (look at concat:compile_js), so run grunt build before grunt compile
  grunt.registerTask('compile', [
    'copy:compile_assets',
    'concat:compile_vendor',
    'concat:compile_js',
    'uglify',
    'index:compile'
  ]);

  grunt.registerTask('run-compiled', function(target, prismMode) {

    if (!target) {
      target = 'dev';
      prismMode = 'mock';
    }
    grunt.task.run(['build',
      'compile',
      'prism:' + target + ':' + prismMode,
      'connect:test']);
  });

  grunt.registerTask('update-sonar', ['sonarRunner:analysis']);
  grunt.registerTask('deploy', ['clean', 'test', 'maven:deploy']);
  grunt.registerTask('release', ['clean', 'test', 'maven:release']);

// A utility function to get all app JavaScript sources.
  function filterForJS(files) {
    return files.filter(function(file) {
      return file.match(/\.js$/);
    });
  }

// A utility function to get all app CSS sources.
  function filterForCSS(files) {
    return files.filter(function(file) {
      return file.match(/\.css$/);
    });
  }

// The index.html template includes the stylesheet and javascript sources
// based on dynamic names calculated in this Gruntfile. This task assembles
// the list into variables for the template to use and then runs the
// compilation.
  grunt.registerMultiTask('index', 'Process index.html template',
      function() {
        var dirRE = new RegExp('^(' + grunt.config('build_dir') +
            '|' + grunt.config('compile_dir') + ')\/',
            'g');

        // this.fileSrc comes from either build:src, compile:src, or karmaconfig:src in the index config defined above
        // see - http://gruntjs.com/api/inside-tasks#this.filessrc for documentation
        var jsFiles = filterForJS(this.filesSrc)
            .map(function(file) {
              return file.replace(dirRE, '');
            });
        var cssFiles = filterForCSS(this.filesSrc)
            .map(function(file) {
              return file.replace(dirRE, '');
            });

        // this.data.dir comes from either build:dir, compile:dir, or karmaconfig:dir in the index config defined above
        // see - http://gruntjs.com/api/inside-tasks#this.data for documentation
        grunt.file.copy('src/index.html', this.data.dir +
            '/index.html', {
          process: function(contents, path) {
            // These are the variables looped over in our index.html exposed as "scripts", "styles", and "version"
            return grunt.template.process(contents, {
              data: {
                scripts: jsFiles,
                styles: cssFiles,
                version: grunt.config(
                    'pkg.version'),
                author: grunt.config(
                    'pkg.author'),
                date: grunt.template.today(
                    "yyyy")
              }
            });
          }
        });
      });

// In order to avoid having to specify manually the files needed for karma to
// run, we use grunt to manage the list for us. The 'karma/*' files are
// compiled as grunt templates for use by Karma. Yay!
  grunt.registerMultiTask('karmaconfig', 'Process karma config templates',
      function() {
        var jsFiles = filterForJS(this.filesSrc);

        grunt.file.copy('test/karma-unit.tpl.js',
            grunt.config(
                'build_dir') + '/karma-unit.js',
            {
              process: function(contents, path) {
                // This is the variable looped over in the karma template of our index.html exposed as "scripts"
                return grunt.template.process(contents, {
                  data: {
                    scripts: jsFiles
                  }
                });
              }
            });
      });

}
;
