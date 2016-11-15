/* tslint:disable: no-console */
/**
 * es2017 build
 */
import * as debugMod from 'debug';
import * as gulp from 'gulp';
import { cmdSpawn } from '../../../../src';

gulp.task('build:src-es2017', async () => {
  const cmd = './node_modules/typescript/bin/tsc --p src/tsconfig-es2017.json';
  const debug = debugMod('task-test');
  debug(`running: ${cmd}`);
  const r = await cmdSpawn(cmd, { buffer: true });
  if (r) {
    console.log(r.stdout);
  }
  debug(`finish: ${cmd}`);
});
