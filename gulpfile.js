var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var ngmin = require('gulp-ngmin');
var sass = require("gulp-sass");
var stripDebug = require('gulp-strip-debug');
var zip = require('gulp-zip');
var email = require('gulp-email');

var paths = {
    dev: {
        sass: ['public/libs/css/*.scss'],
        js: ['public/libs/js/main.js', 'public/libs/js/controllers/**.js']
    },
    dist: {
        sass: {
            name: 'base.css',
            dest: 'public/dist/css'
        },
        js: {
            name: 'app.js',
            dest: 'public/dist/js'
        }
    }
};

var options = {
            user: '<api_key>',
            url: 'https://api.mailgun.net/v3/<sandbox_here>/messages',
            form: {
                from: 'Foo Bar <foo@example.com>',
                to: 'Foo Bar <foo@example.com>',
                cc: 'Foo Bar <foo@example.com>',
                cc: 'Foo Bar <foo@example.com>',
                subject: '<Subject>',
                text: 'Some sample text here!',
                attachment: '@public.zip'
            },
            form_string: {
                html: '<p>Some sample text here!</p>'
            }
        };

gulp.task('zip', () => {
    return gulp.src('public/**')
        .pipe(zip('public.zip'))
        .pipe(gulp.dest('public/../'));
});

gulp.task('email', function() {
    return gulp.src(['./demo/no-matter.html'])
        .pipe(email(options));
});

gulp.task('js', function() {
    return gulp.src(paths.dev.js)
        .pipe(concat(paths.dist.js.name))
        .pipe(ngmin())
        .pipe(uglify({
            mangle: false
        }))
        .pipe(gulp.dest(paths.dist.js.dest));
});

gulp.task('sass', function() {
    return gulp.src(paths.dev.sass)
        .pipe(concat(paths.dist.sass.name))
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(gulp.dest(paths.dist.sass.dest));
});

gulp.task('jsdist', function() {
    return gulp.src(paths.dev.js)
        .pipe(concat(paths.dist.js.name))
        .pipe(stripDebug())
        .pipe(ngmin())
        .pipe(uglify({
            mangle: false
        }))
        .pipe(gulp.dest(paths.dist.js.dest));
});

gulp.task('dist', ['sass', 'jsdist'], function() {
    console.log("Ready for production");
});


gulp.task('watch', ['sass', 'js'], function() {
    console.log('js directory: ' + paths.dev.js.join(', '));
    console.log('sass directory: ' + paths.dev.sass.join(', '));
    gulp.watch(paths.dev.sass, ['sass']);
    gulp.watch(paths.dev.js, ['js']);
});
