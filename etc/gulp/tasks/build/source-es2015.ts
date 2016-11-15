/* tslint:disable: no-console */
/**
 * es2015 build
 */
import * as debugMod from 'debug';
import * as gulp from 'gulp';
import { cmdSpawn } from '../../../../src';

gulp.task('build:src-es2015', async () => {
  const cmd = './node_modules/typescript/bin/tsc --p src/tsconfig-es2015.json';
  const debug = debugMod('task-test');
  debug(`running: ${cmd}`);
  const r = await cmdSpawn(cmd, { buffer: true });
  if (r) {
    console.log(r.stdout);
  }
  debug(`finish: ${cmd}`);
});
