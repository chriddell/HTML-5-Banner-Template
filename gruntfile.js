module.exports = function (grunt) {
	'use strict';

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		watch: {
			sass: {
				files: ['./css/style.scss'],
				tasks: ['sass:dev', 'autoprefixer:main'],
				options: {
					livereload: true
				}
			},
			js: {
				files: [ './js/app.js' ],
				tasks: [ 'uglify:dev' ],
				options: {
					livereload: true
				}
			}
		},

		sass: {
			dev: {
				options: {
					outputStyle: 'compressed',
					sourceMap: true
				},
				files: {
					'./css/style.min.css': './css/style.scss'
				}
			},
			dist: {
				options: {
					outputStyle: 'compressed',
					sourceMap: false
				},
				files: {
					'./dist/css/style.min.css': './css/style.scss'
				}
			}
		},

		autoprefixer: {
			main: {
				options: {
					map: true,
					browsers: ['ie >= 8', '> 0.5%']
				},
				src: './css/style.min.css',
				dest: './css/style.min.css'
			}
		},

		uglify: {
			dev: {
				files: {
					'js/app.min.js': [ 'js/app.js' ]
				},
				options: {
					sourceMap: true
				}
			},
			dist: {
				files: {
					'./dist/js/app.min.js': ['js/app.js']
				},
				options: {
					sourceMap: false
				}
			}
		},

		copy: {
			dist: {
				files: [
					{
						expand: true,
						cwd: './',
						src: [
							'index.html', 
							'media/*'
						],
						dest: 'dist/'
          }
        ]
			}
		},

		imageoptim: {
			options: {
				imageAlpha: false,
				jpegMini: false
			},
			allJpgs: {
				src: ['media/*.jpg']
			},
			allPngs: {
				options: {
					imageAlpha: true
				},
				src: ['media/*.png']
			}
		},

		browserSync: {
			bsFiles: {
				src: [
					'./css/style.min.css',
					'./js/*.js',
					'./js/*/*.js',
					'./*.html'
				]
			},
			options: {
				watchTask: true,
				proxy: 'http://xx.dev'
			}
		}

	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-browser-sync');
	grunt.loadNpmTasks('grunt-imageoptim');

	grunt.registerTask('default', [
    'browserSync', 'watch'
	]);
	grunt.registerTask('dist', [
    'sass:dist', 'uglify:dist', 'autoprefixer:main', 'imageoptim:allJpgs', 'imageoptim:allPngs', 'copy:dist'
	]);
};