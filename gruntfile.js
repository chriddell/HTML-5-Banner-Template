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
				files: ['./js/app.js'],
				tasks: ['uglify:dev'],
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
					'./css/style.min.css': './css/style.scss'
				}
			}
		},

		autoprefixer: {
			main: {
				options: {
					map: true,
					browsers: ['ie >= 8', '> 2%']
				},
				src: './css/style.min.css',
				dest: './css/style.min.css'
			}
		},

		uglify: {
			dev: {
				files: {
					'js/min/app.min.js': ['js/app.js']
				},
				options: {
					sourceMap: true
				}
			},
			dist: {
				files: {
					'js/min/app.min.js': ['js/app.js']
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
						src: ['js/min/app.min.js', 'index.html', 'css/style.min.css', 'assets/*'],
						dest: 'dist/'
          }
        ]
			}
		}

	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-copy');

	grunt.registerTask('default', [
    'watch'
	]);
	grunt.registerTask('dist', [
    'sass:dist', 'uglify:dist', 'autoprefixer:main', 'copy:dist'
	]);
};