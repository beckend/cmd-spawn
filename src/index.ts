/* tslint:disable: max-func-body-length */
import {
  SpawnOptions,
} from 'child_process';
import * as _ from 'lodash';
import {
  execute,
  ICmdSpawnPromise,
  ICmdSpawnPromiseResolve,
} from './execute';
import { parseCmd } from './parse-cmd';

const merge: typeof _.merge = require('lodash.merge');

const defaultOpts = {
  spawnOpts: {},
  crossSpawn: true,
  buffer: false,
  shell: 'bash',
};
export interface ICSOpts {
  // Options passed to spawn
  spawnOpts?: SpawnOptions;
  // buffer output flag, default false
  buffer?: boolean;
  // crossSpawn flag, default enabled
  crossSpawn?: boolean;
}
// Same thing but merged with default options
export interface ICSOptsDefined {
  spawnOpts: SpawnOptions;
  buffer: boolean;
  crossSpawn: boolean;
}
export interface ICmdSpawnFn {
  (
    // The unix command to run
    cmdStr: string,
    opts?: ICSOpts
  ): ICmdSpawnPromise<ICmdSpawnPromiseResolve> | ICmdSpawnPromise<undefined>;
  (
    cmdStr: string[],
    opts?: ICSOpts
  ): ICmdSpawnPromise<ICmdSpawnPromiseResolve> | ICmdSpawnPromise<undefined>;
}

export const cmdSpawn: ICmdSpawnFn = (
  cmd: string | string[],
  opts: ICSOpts
) => {
  if (cmd.length < 1) {
    throw new Error('No command to run');
  }
  // Merge with defaults
  const { spawnOpts, crossSpawn, buffer } = merge({}, defaultOpts, opts) as ICSOptsDefined;

  const cmdParsed = parseCmd({ cmd });

  return execute({
    cmd: cmdParsed.cmd,
    cmdArgs: cmdParsed.cmdArgs,
    spawnOpts: Object.assign({}, spawnOpts) as SpawnOptions,
    crossSpawn,
    shouldBuffer: buffer,
  });
};
