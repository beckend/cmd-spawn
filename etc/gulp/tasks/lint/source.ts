/**
 * Lint project source
 */
import * as gulp from 'gulp';
import {
  PATH_SRC,
} from '../../config';
import { getLinterTslintStream } from './utils/get-linter-tslint-stream';

gulp.task('lint:src', () => {
  return getLinterTslintStream({
    src: `${PATH_SRC}/**/*.{ts,tsx}`,
  });
});
