var gulp = require('gulp');
    less = require('gulp-less'),
    minifyCSS = require('gulp-clean-css'),
    jshint = require('gulp-jshint');

gulp.task('less', function() {
    return gulp.src('public/css/*.less')
        .pipe(less({
            paths: ['public/css']
        }))
        .pipe(minifyCSS())
        .pipe(gulp.dest('public/css'))

});
gulp.task('jshint', function(){
    gulp.src('public/js/car/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
})
gulp.task('watch', function(){
    gulp.watch('public/css/*.less',['less']);
    gulp.watch('public/js/car/*.js',['jshint']);
})
gulp.task('default',['less','watch'])