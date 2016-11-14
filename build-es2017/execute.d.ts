/// <reference types="node" />
/// <reference types="bluebird" />
/**
 * Real executing function
 */
import { SpawnOptions, ChildProcess } from 'child_process';
import * as Bluebird from 'bluebird';
export interface IExecuteArgs {
    cmd: string;
    cmdArgs: string[];
    spawnOpts: SpawnOptions;
    crossSpawn: boolean;
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
export declare const execute: IExecuteFn;
