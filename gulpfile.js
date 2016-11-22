var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var ngmin = require('gulp-ngmin');
var sass = require("gulp-sass");

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

gulp.task('js', function() {
    return gulp.src(paths.dev.js)
        .pipe(concat(paths.dist.js.name))
        .pipe(ngmin())
        .pipe(uglify({ mangle: false }))
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

gulp.task('dist', function() {
    // add your optimizations
    console.log("Updated");
});


gulp.task('watch', ['sass', 'js'], function() {
    console.log('js directory: ' + paths.dev.js.join(', '));
    console.log('sass directory: ' + paths.dev.sass.join(', '));
    gulp.watch(paths.dev.sass, ['sass']);
    gulp.watch(paths.dev.js, ['js', 'dist']);
});
