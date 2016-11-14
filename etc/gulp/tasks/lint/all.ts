/**
 * Lint em all
 */
import * as gulp from 'gulp';

const gV4: any = gulp;

gulp.task('lint:all', gV4.parallel('lint:gulp', 'lint:src'));
