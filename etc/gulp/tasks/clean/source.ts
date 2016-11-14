/**
 * Cleanup
 */
import * as gulp from 'gulp';
import * as fs from 'fs-extra';
import { PATH_BUILD } from '../../config';
import * as debugMod from 'debug';

gulp.task('clean:src', (done: Function) => {
  const debug = debugMod('task-clean-source');
  fs.remove(PATH_BUILD, (er) => {
    if (!er) {
      debug(`Deleted dir: ${PATH_BUILD}`);
    }
    done();
  });
});
