/**
 * Lint gulp
 */
import * as gulp from 'gulp';
import {
  PATH_GULP,
} from '../../config';
import { getLinterTslintStream } from './utils/get-linter-tslint-stream';

gulp.task('lint:gulp', () => {
  return getLinterTslintStream({
    src: `${PATH_GULP}/**/*.{ts,tsx}`,
  });
});
