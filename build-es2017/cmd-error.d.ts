/// <reference types="node" />
export declare class ECmdError extends Error {
    code: string;
    stderr?: string;
    stdout?: string;
    details?: string;
    status: number;
    signal: string | null;
    constructor(message: string);
}
