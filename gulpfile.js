var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var imagemin = require('gulp-imagemin');
var browserSync = require('browser-sync').create();

gulp.task('css', function() {
	return gulp.src('src/sass/**/*.scss')
		.pipe(sourcemaps.init())
		.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
		.pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(sourcemaps.write('./maps'))
		.pipe(gulp.dest('public/css'))
		.pipe(browserSync.stream())
});

gulp.task('images', function(){
	return gulp.src('src/images/*')
		.pipe(imagemin())
		.pipe(gulp.dest('public/images'))
});

gulp.task('copy', function() {
	return gulp.src('src/**/*.+(html|js)')
		.pipe(gulp.dest('public'))
		.pipe(browserSync.stream())
});

gulp.task('browserSync', function() {
	browserSync.init({
		browser: "opera",
		server: {
			baseDir: 'public'

		},
	})
});

gulp.task('watch', ['browserSync', 'css'], function(){
	gulp.watch('src/sass/**/*.scss', ['css']);
	gulp.watch('src/**/*.+(html|js)', ['copy']);
});
