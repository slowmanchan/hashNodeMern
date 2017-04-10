var gulp = require('gulp');
var babelify = require('babelify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var watchify = require('watchify');
var util = require('util');

// gulp.task('bundle', function() {
//   return browserify('src/App.js')
//     .transform(babelify, {presets: ["react", "es2015"]})
//     .bundle()
//     .pipe(source('bundle.js'))
//     .pipe(gulp.dest('static/'));
// });

gulp.task('watch', function() {
  var b = browserify({
    entries: ['src/Components/App.js'],
    cache: {},
    packageCache: {},
    plugin: [watchify]
  });

  b.on('update', createBundle)

  function createBundle() {
    b.transform(babelify, {presets: ['react', 'es2015']})
      .bundle()
      .on('error', function(err) {
        console.error(err.message);
        console.error(err.codeFrame);
        this.emit('end'); })
      .pipe(source('bundle.js'))
      .pipe(gulp.dest('static/'));
    console.log('Bundled!! Have a nice day')
  }

  createBundle()

  return b;
})

gulp.task('default', ['watch'])
