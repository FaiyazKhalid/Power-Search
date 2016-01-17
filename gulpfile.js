'use strict';

var gulp = require('gulp');
var minifyCSS = require('gulp-minify-css');
var rename = require('gulp-rename');


/*** CSS TASKS ***/

gulp.task('minifyCss', function () {
	return gulp.src('css/style.css')
		.pipe(minifyCSS())
		.pipe(rename('minified.css'))
		.pipe(gulp.dest('css'));
}); // minifyCss
