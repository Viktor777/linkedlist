var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    browserify = require('gulp-browserify'),
    rename = require('gulp-rename'),
    paths = {
        scripts: [
            'index.js', 'lib/*.js'
        ],
        jshint: [
            'gulpfile.js', 'index.js', 'lib/*.js'
        ]
    };

gulp.task('js', function() {
    gulp.src('./index.js')
        .pipe(browserify({
            debug: true
        }))
        .on('error', function (error) {
            console.log(error.toString());
            this.emit('end');
        })
        .pipe(rename('bundle.js'))
        .pipe(gulp.dest('./'));
});

gulp.task('jshint', function () {
    gulp.src(paths.jshint)
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('watch', function() {
    gulp.watch(paths.scripts, ['js']);
});

gulp.task('default', ['js', 'jshint']);