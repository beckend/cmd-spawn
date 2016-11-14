/// <reference types="node" />
import { SpawnOptions } from 'child_process';
import { ICmdSpawnPromise, ICmdSpawnPromiseResolve } from './execute';
export interface ICSOpts {
    spawnOpts?: SpawnOptions;
    buffer?: boolean;
    crossSpawn?: boolean;
}
export interface ICSOptsDefined {
    spawnOpts: SpawnOptions;
    buffer: boolean;
    crossSpawn: boolean;
}
export interface ICmdSpawnFn {
    (cmdStr: string, opts?: ICSOpts): ICmdSpawnPromise<ICmdSpawnPromiseResolve> | ICmdSpawnPromise<undefined>;
    (cmdStr: string[], opts?: ICSOpts): ICmdSpawnPromise<ICmdSpawnPromiseResolve> | ICmdSpawnPromise<undefined>;
}
export declare const cmdSpawn: ICmdSpawnFn;
