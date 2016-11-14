export interface IParseCmdArgs {
    cmd: string | string[];
}
export interface IParseCmdFn {
    (args: IParseCmdArgs): {
        cmd: string;
        cmdArgs: string[];
    };
}
export declare const parseCmd: IParseCmdFn;
