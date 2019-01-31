var gulp        = require("gulp");
var sass        = require("gulp-sass");
var serve       = require('gulp-serve');
var shell       = require('gulp-shell');
var clean       = require('gulp-clean');

// what goes where?
var buildSrc = "scss";
var buildDest = "_site";

/*
 Clean the site build directory
*/
gulp.task('clean-build', function (done) {
  return gulp.src(buildDest, {read: false})
    .pipe(clean());
    done();
});

/*
 Generate static site
*/
gulp.task('generate', shell.task('eleventy --config=eleventy.js'));

/*
 Generate static site, watch and serve Eleventy locally
*/
gulp.task('serve', shell.task('eleventy --serve'));

/*
  Watch src SCSS folder for changes
*/
gulp.task("watch-scss", function (done) {
  gulp.watch(buildSrc, gulp.parallel('scss'));
  done();
});

/*
Compile SCSS files to CSS
*/
gulp.task("scss", function (done) {
  gulp.src(buildSrc + "/main.scss")
    .pipe(sass({
      outputStyle: "compressed"
    }).on('error', sass.logError))
    .pipe(gulp.dest("css"));
    done();
});

gulp.task('watch', gulp.parallel('clean-build','serve','watch-scss'));
gulp.task('default', gulp.series('clean-build','generate','scss'));