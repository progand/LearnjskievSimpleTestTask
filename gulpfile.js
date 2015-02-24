var gulp = require('gulp'),
        templateCache = require('gulp-angular-templatecache'),
        concat = require('gulp-concat'),
        uglify = require('gulp-uglifyjs'),
        runSequence = require('run-sequence');
        

gulp.task('angular-templatecache', function () {
    gulp.src('public_html/templates/*.html')
            .pipe(templateCache({
                standalone: true,
                root: '/templates/',
                module: 'templates'
            }))
            .pipe(gulp.dest('public_html/build/compiled_templates'));
});

gulp.task('scripts', function () {
    gulp.src([              
        'public_html/build/compiled_templates/*.js',
        'public_html/js/*.js'
    ])
            .pipe(concat('math-test.js', {newLine: ';\n'}))
            .pipe(gulp.dest('public_html/dist/'))
            .pipe(uglify('math-test.min.js', {
                mangle: false
            }))
            .pipe(gulp.dest('public_html/dist/'));
});

gulp.task('build', function () {
    runSequence('angular-templatecache', 'scripts');
});

gulp.task('watch', function () {
    gulp.watch('public_html/templates/*.html', ['angular-templatecache']);
});


// Default Task
gulp.task('default', ['angular-templatecache', 'watch']);

