/**
 * Prepare for publish
 */
import * as gulp from 'gulp';

const gV4: any = gulp;

gulp.task('prepare:publish', (gV4.series(
  gV4.parallel(
    'clean:all',
    'lint:all',
  ),

  gV4.parallel(
    'coverage',

    gV4.series(
      'build:all',
      'minify:all'
    )
  )
)));
