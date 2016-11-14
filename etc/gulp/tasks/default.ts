/**
 * Default task
 */
import * as gulp from 'gulp';

const gV4: any = gulp;

gulp.task('default', gV4.series(
  gV4.parallel('prepare:publish')
));
