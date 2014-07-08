
var gulp = require('gulp');
var less = require('gulp-less');
var plumber = require('gulp-plumber');

gulp.task('less', function() {
 gulp.src('public/stylesheets/style.less')
   .pipe(plumber())
   .pipe(less())
   .pipe(gulp.dest('public/stylesheets'));
});

gulp.task('watch', function() {
 gulp.watch('public/stylesheets/*.less', ['less']);
});

gulp.task('default', ['less', 'watch']);

