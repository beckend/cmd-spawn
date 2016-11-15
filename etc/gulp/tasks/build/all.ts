/**
 * Build em all
 */
import * as gulp from 'gulp';

const gV4: any = gulp;

gulp.task('build:all', gV4.parallel(
  'build:src-es5',
  'build:src-es2015',
  'build:src-es2017'
));
