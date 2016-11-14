"use strict";
/* tslint:disable: prefer-array-literal */
/**
 * Real executing function
 */
const child_process_1 = require("child_process");
const Bluebird = require("bluebird");
const cSpawn = require('cross-spawn');
exports.execute = ({ cmd, cmdArgs, spawnOpts, crossSpawn: useCrossSpawn, shouldBuffer, }) => {
    let promise;
    let cp = undefined;
    /**
     * Buffer clause
     */
    if (shouldBuffer) {
        promise = new Bluebird((resolve, reject) => {
            let stderrBuff = new Buffer('');
            let stdoutBuff = new Buffer('');
            // Buffer output, reporting progress
            // Use cross or node's spawn if told to
            cp = useCrossSpawn
                ?
                    cSpawn(cmd, cmdArgs, spawnOpts)
                :
                    child_process_1.spawn(cmd, cmdArgs, spawnOpts);
            if (cp.stdout) {
                // cp.stdout.pipe(process.stdout);
                cp.stdout.on('data', (data) => {
                    stdoutBuff = Buffer.concat([stdoutBuff, data]);
                });
            }
            if (cp.stderr) {
                // cp.stderr.pipe(process.stderr);
                cp.stderr.on('data', (data) => {
                    stderrBuff = Buffer.concat([stderrBuff, data]);
                });
            }
            // If there is an error spawning the command, reject the promise
            cp.once('error', reject);
            // Listen to the close event instead of exit
            // They are similar but close ensures that streams are flushed
            cp.once('close', (code, signal) => {
                const stdout = stdoutBuff.toString();
                const stderr = stderrBuff.toString();
                if (code === 0) {
                    resolve({ stdout, stderr });
                }
                else {
                    reject(Object.assign(new Error(`Failed to execute "${cmd}", exit code of #${code}`), {
                        code: 'ECMDERR',
                        stderr,
                        stdout,
                        details: stderr,
                        status: code,
                        signal,
                    }));
                }
            });
        });
        promise.cp = cp;
        return promise;
    }
    else {
        /**
         * non buffered
         */
        promise = new Bluebird((resolve, reject) => {
            cp = useCrossSpawn
                ?
                    cSpawn(cmd, cmdArgs, spawnOpts)
                :
                    child_process_1.spawn(cmd, cmdArgs, spawnOpts);
            cp.once('error', reject);
            cp.once('close', (code) => {
                if (code === 0) {
                    resolve();
                }
                else {
                    reject(`child process exited with code ${code}`);
                }
            });
        });
        promise.cp = cp;
        return promise;
    }
};
//# sourceMappingURL=execute.js.map