var gulp = require('gulp');
var run = require('gulp-run');
var clean = require('gulp-clean');
var s3 = require('gulp-s3');
var fs = require('fs');

gulp.task('s3', ['default'], function(){
    var aws = JSON.parse(fs.readFileSync('./aws.json'));
    return gulp.src('./dist/**')
        .pipe(s3(aws));
});

gulp.task('clean', function () {
    return gulp.src('dist', {read: false})
        .pipe(clean());
});

gulp.task('html-dist', ['clean'], function () {
    return run('./node_modules/.bin/html-dist index.html --remove-all --minify --insert app.min.js -o dist/index.html').exec();
});

gulp.task('jspm', ['clean'], function(){
    return run('jspm bundle-sfx --minify app/main dist/app.min.js').exec();
});

gulp.task('copy_loader', ['clean'], function(){
    return gulp.src('loader.css')
            .pipe(gulp.dest('dist/'));
});

gulp.task('copy_resources', ['clean'], function(){
    return gulp.src('resources/*')
            .pipe(gulp.dest('dist/resources'));
});

gulp.task('copy', ['copy_resources', 'copy_loader']);

gulp.task('default', ['clean', 'html-dist', 'jspm', 'copy']);
