
'use strict';

// Libraries
var gulp = require('gulp')
var autoprefixer = require('gulp-autoprefixer');
var babel = require('gulp-babel');
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
var IMAGES_PATH = 'public/img/**/*.{png,jpeg,svg,gif}';
var JS_PATH = 'public/js/**/*.js';
var SCSS_PATH = 'public/scss/styles.scss';


// SCSS
gulp.task('scss', function() {
	console.log('Starting SCSS task');
	return gulp.src(SCSS_PATH)
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
});

// Images
gulp.task('img', function() {
	console.log('Starting IMG task');
	return gulp.src(IMAGES_PATH)
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
		.pipe(gulp.dest(DIST_PATH + '/images'))
});

gulp.task('clean', function() {
	return del.sync([DIST_PATH])
})
gulp.task('default', ['clean', 'img', 'scss']);
