/* tslint:disable: no-console */
/**
 * Test
 */
import * as gulp from 'gulp';
//import {
//  PATH_PACKAGE,
//} from '../config';
import * as debugMod from 'debug';
import { cmdSpawn } from './../../../src/index';

gulp.task('test', async () => {
  const cmd = 'tsc --p ./src/tsconfig-es2015.json';
  const debug = debugMod('task-test');
  debug(`running: ${cmd}`);
  const r = await cmdSpawn(cmd, { buffer: true });
  if (r) {
    console.log(r.stdout);
  }
  debug(`finish: ${cmd}`);
});
