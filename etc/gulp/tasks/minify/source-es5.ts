/**
 * Minify regular src folder
 */
import * as gulp from 'gulp';
import {
  PATH_BUILD_ES5,
} from '../../config';
import { writeAllFiles } from './utils';

const globby = require('globby');

gulp.task('minify:src-es5', async () => {
  const filePaths: string[] = await globby([
    `${PATH_BUILD_ES5}/**/*.js`,
    '!**/*.spec.*',
    '!**/*.min.*',
  ]);
  if (filePaths.length > 0) {
    return writeAllFiles({
      filePaths,
      compilerFlags: {
        languageIn: 'ECMASCRIPT5',
        languageOut: 'ECMASCRIPT5',
      },
    });
  }
});
