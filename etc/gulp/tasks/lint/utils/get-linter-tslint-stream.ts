import * as gulp from 'gulp';
// import {
//   PATH_TSCONFIG_DEFAULT,
// } from '../../../config';
import {  } from 'tslint';
import gTslint from 'gulp-tslint';

interface IGetLinterTslintStreamArgs {
  // used in gulp.src
  src: string | string[];
  srcOpts?: gulp.SrcOptions;
  // see https://github.com/panuhorsmalahti/gulp-tslint typings are not up to date
  tslintOpts?: any;
  // outdated typings
  tslintReportOpts?: any;
}
export const getLinterTslintStream = ({ src, srcOpts }: IGetLinterTslintStreamArgs) => {
  // const program = tslint.createProgram(PATH_TSCONFIG_DEFAULT);
  return gulp.src(src, srcOpts || {})
    .pipe(gTslint({
      // program,
      formatter: 'verbose',
    }))
    .pipe(gTslint.report({
      summarizeFailureOutput: true,
    }));
};
