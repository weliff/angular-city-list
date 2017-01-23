module.exports = function(grunt) {

	grunt.initConfig({
		clean: {
			temp: ['dist/js/scripts.js', 'dist/js/libs.js', 'dist/js/libs.min.js', 'dist/js/scripts.min.js'],
			all: ['dist/']
		},

		jshint: {
			dist: {
				src: ['js/**/*.js']
			}
		},
		concat: {
			scripts: {
				src: ['js/**/*.js',
						'lib/ui/*.js',
						'lib/serialGenerator/*.js'
					],
				dest: 'dist/js/scripts.js'
			},
			libs: {
				src: ['lib/angular/angular.min.js', 'lib/angular/*.js', 'lib/bootstrap/*.js'],
				dest: 'dist/js/libs.js'
			},
			all: {
				src: ['dist/js/libs.min.js', 'dist/js/scripts.min.js'],
				dest: 'dist/js/all.min.js'
			}
		},
		uglify: {
			 options: {
			    report: 'min',
			    mangle: false
			},
			scripts: {
				src: ['dist/js/scripts.js'],
				dest: 'dist/js/scripts.min.js'
			}, 
			libs: {
				src: ['dist/js/libs.js'],
				dest: 'dist/js/libs.min.js'
			}
		},
		cssmin: {
			all: {
				src: ['/css/*.css', 'lib/bootstrap/*.css'],
				dest: 'dist/css/styles.min.css'
			}
		},
		htmlmin: {
			options: {
		    	removeComments: true,
		        collapseWhitespace: true
		    },
		    views: {
		    	expand: true,
		    	cwd: 'view/',
		    	src: ['*.html'],
		    	dest: 'dist/view'
		    }
		},
		copy: {
			all: {
				src: 'index-prod.html',
				dest: 'dist/index.html'	
			}
		}
	});

	//carregar plugins
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');


	grunt.registerTask('prod', ['clean:all', 'jshint', 'concat:libs', 'concat:scripts', 'uglify', 'concat:all', 'cssmin', 'htmlmin', 'copy', 'clean:temp']);

}