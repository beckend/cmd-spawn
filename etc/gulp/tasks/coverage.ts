/* tslint:disable: no-console */
/**
 * Run jest and collect coverage
 */
import * as gulp from 'gulp';
import * as debugMod from 'debug';
import {
  PATH_PACKAGE,
} from '../config';
import { cmdSpawn } from './../../../src';

gulp.task('coverage', async () => {
  const pkg = require(PATH_PACKAGE);
  const cmd = pkg.scripts['test:coverage'];
  const debug = debugMod('task-coverage');
  debug(`running: ${cmd}`);
  const r = await cmdSpawn(cmd, { buffer: true });
  if (r) {
    console.log(r.stdout);
  }
  debug(`finish: ${cmd}`);
});
