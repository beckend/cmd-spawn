/**
 * Minify regular src folder
 */
import * as gulp from 'gulp';
import {
  PATH_BUILD_ES2015,
} from '../../config';
import { writeAllFiles } from './utils';

const globby = require('globby');

gulp.task('minify:src-es2015', async () => {
  const filePaths: string[] = await globby([
    `${PATH_BUILD_ES2015}/**/*.js`,
    '!**/*.spec.*',
    '!**/*.min.*',
  ]);
  if (filePaths.length > 0) {
    return writeAllFiles({
      filePaths,
      compilerFlags: {
        languageIn: 'ECMASCRIPT6',
        // ES6 out not yet supported
        languageOut: 'ECMASCRIPT5',
      },
    });
  }
});
