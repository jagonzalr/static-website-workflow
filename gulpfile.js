
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
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var zip = require('gulp-zip')
