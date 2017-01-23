var gulp = require('gulp');
var jshint = require('gulp-jshint');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var es = require('event-stream');
var htmlmin = require('gulp-htmlmin');
var cleanCss = require('gulp-clean-css');
var runSequence = require('run-sequence');
var rename = require('gulp-rename');

gulp.task('clean', function () {
	return gulp.src('dist/')
		.pipe(clean());
});

gulp.task('jshint', function () {
	//return para ser assincrono
	return gulp.src('js/**/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});

gulp.task('ugfily', function () {
	return es.merge([//não precisaria fazer o merge pq tive que minificar as libs tbm, foi só por didatica
		gulp.src(['lib/angular/angular.min.js', 'lib/angular/*.js']).pipe(uglify()),
		gulp.src(['js/**/*.js', 'lib/ui/*.js', 'lib/serialGenerator/*.js']).pipe(concat('scripts.js')).pipe(uglify({mangle:false}))
	])
	.pipe(concat('all.min.js'))
	.pipe(gulp.dest('dist/js'))
});

gulp.task('htmlmin', function () {
	return gulp.src('view/*.html')
		.pipe(htmlmin({collapseWhitespace:true}))
		.pipe(gulp.dest('dist/view'))
});

gulp.task('cssmin', function () {
	return gulp.src(['css/*.css', 'lib/bootstrap/bootstrap.min.css']).pipe(cleanCss())
		.pipe(concat('styles.min.css'))
		.pipe(gulp.dest('dist/css'))
});

gulp.task('copy', function() {
	return gulp.src('index-prod.html')
		.pipe(rename('index.html'))
		.pipe(gulp.dest('dist/'))
});

gulp.task('prod', function (callback) {
	return runSequence('clean', ['jshint', 'ugfily', 'htmlmin', 'cssmin', 'copy'], callback);
});

