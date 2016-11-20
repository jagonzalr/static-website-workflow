
'use strict';

// Libraries
var gulp = require('gulp')
var autoprefixer = require('gulp-autoprefixer');
var babel = require('gulp-babel');
var browserSync = require('browser-sync').create();
var concat = require('gulp-concat');
var del = require('del');
var imagemin = require('gulp-imagemin');
var imageminJpegRecompress 	= require('imagemin-jpeg-recompress');
var imageminPngQuant = require('imagemin-pngquant');
var plumber = require('gulp-plumber');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var zip = require('gulp-zip')

// Paths
var DIST_PATH = 'public/dist';
var HTML_PATH = 'public/**/*.html';
var IMAGES_PATH = 'public/img/**/*.{png,jpeg,svg,gif}';
var JS_PATH = 'public/js/**/*.js';
var SCSS_PATH = 'public/scss/styles.scss';


// HTML
gulp.task('html', function() {
	console.log('Starting HTML task');
	return gulp.src([HTML_PATH])
		.pipe(gulp.dest(DIST_PATH));
});

// SCSS
gulp.task('scss', function() {
	console.log('Starting SCSS task');
	return gulp.src([SCSS_PATH])
		.pipe(plumber(function(err) {
			console.log('SCSS Error');
			console.log(err);
			this.emit('end');
		}))
		.pipe(sourcemaps.init())
		.pipe(autoprefixer())
		.pipe(sass({
			outputStyle: 'compressed'
		}))
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(DIST_PATH))
		.pipe(browserSync.stream());
});

// Images
gulp.task('img', function() {
	console.log('Starting IMG task');
	return gulp.src([IMAGES_PATH])
		.pipe(imagemin(
			[
				imagemin.gifsicle(),
				imagemin.jpegtran(),
				imagemin.optipng(),
				imagemin.svgo(),
				imageminPngQuant(),
				imageminJpegRecompress()
			]
		))
		.pipe(gulp.dest(DIST_PATH + '/img'))
});

gulp.task('clean', function() {
	return del.sync([DIST_PATH])
});

gulp.task('default', ['clean', 'html', 'img', 'scss']);

gulp.task('serve', ['default'], function(err) {
	browserSync.init({
    server: {
        baseDir: "./public/dist/"
    }
	});

	gulp.watch("public/scss/**/*.scss", ['scss']);
  gulp.watch("public/**/*.html").on('change', browserSync.reload);
});

