/**
 * Minify regular src folder
 */
import * as gulp from 'gulp';
import {
  PATH_BUILD,
} from '../../config';
import { writeAllFiles } from './utils';

const globby = require('globby');

gulp.task('minify:src', async () => {
  const filePaths: string[] = await globby([
    `${PATH_BUILD}/**/*.js`,
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
