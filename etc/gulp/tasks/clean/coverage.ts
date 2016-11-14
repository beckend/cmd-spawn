/**
 * Cleanup
 */
import * as gulp from 'gulp';
import * as fs from 'fs-extra';
import { PATH_COVERAGE } from '../../config';
import * as debugMod from 'debug';

gulp.task('clean:coverage', (done: Function) => {
  const debug = debugMod('task-clean-coverage');
  fs.remove(PATH_COVERAGE, (er) => {
    if (!er) {
      debug(`Deleted dir: ${PATH_COVERAGE}`);
    }
    done();
  });
});
