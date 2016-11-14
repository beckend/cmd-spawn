/* tslint:disable: prefer-array-literal */
/**
 * Real executing function
 */
import {
  spawn,
  SpawnOptions,
  ChildProcess,
} from 'child_process';
import * as Bluebird from 'bluebird';
import { ECmdError } from './cmd-error';

const cSpawn = require('cross-spawn');

export interface IExecuteArgs {
  // cmd to run
  cmd: string;
  // arguments passed to spawn
  cmdArgs: string[];
  // spawn options
  spawnOpts: SpawnOptions;
  // use cross spawn?
  crossSpawn: boolean;
  // should buffer stdout and stderr?
  shouldBuffer: boolean;
}
export interface ICmdSpawnPromise<T> extends Bluebird<T> {
  cp: ChildProcess;
}
export interface IExecuteFn {
  (args: IExecuteArgs): ICmdSpawnPromise<ICmdSpawnPromiseResolve> | ICmdSpawnPromise<undefined>;
}
export interface ICmdSpawnPromiseResolve {
  stdout: string;
  stderr: string;
}

export const execute: IExecuteFn = ({
  cmd,
  cmdArgs,
  spawnOpts,
  crossSpawn: useCrossSpawn,
  shouldBuffer,
}) => {
  let promise: any;
  let cp: ChildProcess | any = undefined;

  /**
   * Buffer clause
   */
  if (shouldBuffer) {
    promise = new Bluebird<any>((resolve, reject) => {
      let stderrBuff = new Buffer('');
      let stdoutBuff = new Buffer('');

      // Buffer output, reporting progress
      // Use cross or node's spawn if told to
      cp = useCrossSpawn
        ?
          cSpawn(cmd, cmdArgs, spawnOpts)
        :
          spawn(cmd, cmdArgs, spawnOpts);

      if (cp.stdout) {
        // cp.stdout.pipe(process.stdout);
        cp.stdout.on('data', (data: Buffer) => {
          stdoutBuff = Buffer.concat([stdoutBuff, data]);
        });
      }
      if (cp.stderr) {
        // cp.stderr.pipe(process.stderr);
        cp.stderr.on('data', (data: Buffer) => {
          stderrBuff = Buffer.concat([stderrBuff, data]);
        });
      }

      // If there is an error spawning the command, reject the promise
      cp.once('error', reject);

      // Listen to the close event instead of exit
      // They are similar but close ensures that streams are flushed
      cp.once('close', (code: number, signal: string | null) => {
        const stdout = stdoutBuff.toString();
        const stderr = stderrBuff.toString();

        if (code === 0) {
          resolve({ stdout, stderr });
        } else {
          reject(
            Object.assign(new Error(`Failed to execute "${cmd}", exit code of #${code}`), {
              code: 'ECMDERR',
              stderr,
              stdout,
              details: stderr,
              status: code,
              signal,
            }) as ECmdError
          );
        }
      });

    });

    promise.cp = cp;

    return promise as ICmdSpawnPromise<ICmdSpawnPromiseResolve>;
  } else {
    /**
     * non buffered
     */
    promise = new Bluebird<any>((resolve, reject) => {
      cp = useCrossSpawn
        ?
          cSpawn(cmd, cmdArgs, spawnOpts)
        :
          spawn(cmd, cmdArgs, spawnOpts);
      cp.once('error', reject);
      cp.once('close', (code: number) => {
        if (code === 0) {
          resolve();
        } else {
          reject(`child process exited with code ${code}`);
        }
      });
    });

    promise.cp = cp;

    return promise as ICmdSpawnPromise<undefined>;
  }
};
