import gulp from 'gulp';
import header from 'gulp-header';
import pkg from './package.json' with { type: 'json' };


gulp.task('default', function () {
  return gulp
    .src('./dist/analytics-snippet.js')
    .pipe(header('/* ' + pkg.name + ' ' + pkg.version + ' */\n'))
    .pipe(gulp.dest('./dist/'));
});
