/**
 * CI task
 */
import * as gulp from 'gulp';

const gV4: any = gulp;

gulp.task('ci', gV4.series(
  gV4.parallel('prepare:publish')
));
