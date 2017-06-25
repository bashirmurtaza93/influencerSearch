var sass         = require('gulp-sass');
var gulp         = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var csscomb      = require('gulp-csscomb');
var minify       = require('gulp-clean-css');
var rename       = require("gulp-rename");
var plumber      = require('gulp-plumber');

// config
var config = require('../../../config.json');

// options
var options = require('../../options/fonts');

module.exports = function () {
  return gulp.src([config.source.fonts  + '/*/*.scss', '!' + config.source.fonts  + '/*/_*.scss'])
    .pipe(plumber())
    .pipe(sass(options.sass))
    .pipe(autoprefixer(options.autoprefixer))
    .pipe(csscomb(options.csscomb))
    .pipe(gulp.dest(config.destination.fonts))

    .pipe(minify(options.minify))
    .pipe(rename({
      extname: '.min.css'
    }))
    .pipe(gulp.dest(config.destination.fonts));
};
