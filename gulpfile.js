var gulp = require('gulp');
    less = require('gulp-less'),
    changed = require('gulp-changed'),
    minifyCSS = require('gulp-clean-css'),
    jshint = require('gulp-jshint'),
    cssPath = 'public/css',
    jsPath = 'public/js';

gulp.task('less', function() {
    return gulp.src(cssPath + '/**/*.less')
        .pipe(less({
            paths: [cssPath]
        }))
        .pipe(changed(cssPath))
        .pipe(minifyCSS())
        .pipe(gulp.dest(cssPath))

});
gulp.task('jshint', function(){
    gulp.src(jsPath + '/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
})
gulp.task('watch', function(){
    gulp.watch(cssPath + '/**/*.less',['less']);
    gulp.watch(jsPath + '/**/*.js',['jshint']);
})
gulp.task('default',['less','watch'])