/**
 * Minify em all
 */
import * as gulp from 'gulp';

const gV4: any = gulp;

gulp.task('minify:all', gV4.parallel(
  'minify:src-es5',
  'minify:src-es2015',
  'minify:src-es2017'
));
