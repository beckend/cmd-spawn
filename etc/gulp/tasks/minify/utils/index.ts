/* tslint:disable: no-conditional-assignment */
/* tslint:disable: no-invalid-this */
/* tslint:disable: no-function-expression */
/**
 * Using google closure compiler js
 */
import * as fsMod from 'fs-extra';
import * as path from 'path';
import * as debugMod from 'debug';
import * as Bluebird from 'bluebird';

const encoding = 'utf8';

const pWriteFile: any = Bluebird.promisify(fsMod.writeFile);
const pReadFile: any = Bluebird.promisify(fsMod.readFile);
const debug = debugMod('task-minify-util');
const compiler = require('google-closure-compiler-js').compile;

interface IGCCompilerOutput {
  // Outputed minified code
  compiledCode: string;
  errors: string[];
  warnings: string[];
  // Outputed sourcemap from minified code
  sourceMap: string;
}

// Get the minified filename, very dirty because of path.parse does not handle multiple exts
const regNullExt = /(\.[^/.]+)+$/;
const getMinFilename = (filePath: string) => {
  const parsedPath = path.parse(filePath);
  const multipleExt = parsedPath.name.split('.');
  // Add extensions correctly to ext if the split was successfull
  if (multipleExt.length > 1) {
    // Filter out the original filename only interested in the ext
    multipleExt.splice(0, 1);
    // Build the full extension
    let prependedExt = '';
    multipleExt.forEach((extWithoutDot) => {
      prependedExt += `.${extWithoutDot}`;
    });

    // Prepend the ext before the parsed ext...
    parsedPath.ext = `${prependedExt}${parsedPath.ext}`;

    // Remove the overflown extension from the filename since multiple were present...
    parsedPath.name = parsedPath.name.replace(regNullExt, '');
  }
  return `${parsedPath.dir}/${parsedPath.name}.min${parsedPath.ext}`;
};

// Generate correct source map filename
const getMapName = (filePath: string) => `${filePath}.map`;

// Write single file
const defaultCompilerFlags = {
  languageIn: 'ECMASCRIPT5',
  languageOut: 'ECMASCRIPT5',
  warningLevel: 'VERBOSE',
  compilationLevel: 'ADVANCED',
  // processCommonJsModules: false,
  // Usefull if distributing to browser
  // outputWrapper: '(function(){%output%}).call(this)',
  createSourceMap: true,
};

interface IWriteSingleFileArgs {
  // Full absolute path
  filePath: string;
  // Google closure compiler flags, will be merged with defaults above
  compilerFlags?: any;
}
// tslint:disable-next-line
const writeSingleFile = async ({ filePath, compilerFlags }: IWriteSingleFileArgs) => {
  // First read the orignal file
  const source = await pReadFile(filePath, encoding);
  // Then compile it
  const passedCompilerFlags = Object.assign(
    {},
    defaultCompilerFlags,
    {
      jsCode: [{
        src: source,
      }],
    },
    compilerFlags
  );
  debug(`Minifying: ${filePath}`);
  const output: IGCCompilerOutput = compiler(passedCompilerFlags);
  // Creating a node module so the error will throw because exports is not declared...
  // if (output.errors.length > 0) {
  //   throw new Error(JSON.stringify(output.errors));
  // }

  // Lastly write it
  const minFileName = getMinFilename(filePath);
  const minMapFileName = getMapName(minFileName);
  return Bluebird.all([
    // Normal js
    pWriteFile(minFileName, output.compiledCode)
      .then(() => {
        debug(`Wrote file ${minFileName}`);
        return minMapFileName;
      }),
    // Map
    pWriteFile(minMapFileName, output.sourceMap)
      .then(() => {
        debug(`Wrote file ${minMapFileName}`);
        return minMapFileName;
      }),
  ]);
};

// Compile and write all files
interface IWriteAllFilesArgs {
  // Full absolute path
  filePaths: string[];
  // Google closure compiler flags, will be merged with defaults above
  compilerFlags?: any;
}
export const writeAllFiles = ({ filePaths, compilerFlags }: IWriteAllFilesArgs) => {
  const writePromises: Bluebird.Thenable<any>[] = [];
  filePaths.forEach((filePath) => {
    writePromises.push(
      writeSingleFile({ filePath, compilerFlags })
    );
  });
  return Bluebird.all(writePromises);
};
