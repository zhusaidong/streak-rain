const fs = require('fs');
const gulp = require('gulp');
const minify = require("gulp-minify");

gulp.task('default', () => (
		gulp.src('src/streak-rain.js')
  		.pipe(minify())
		.pipe(gulp.dest('dist/'))
	));
