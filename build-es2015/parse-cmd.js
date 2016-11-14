"use strict";
/**
 * Parse command and return command and arguments for child process spawn
 */
const sanitize_spaces_1 = require("./sanitize-spaces");
exports.parseCmd = ({ cmd }) => {
    let cmdStr;
    let cmdArgs = [];
    if (Array.isArray(cmd)) {
        cmdStr = cmd[0];
        if (cmd.length > 1) {
            // Take all but first
            cmdArgs = cmdArgs.concat(cmd.slice(1, cmd.length));
        }
    }
    else {
        // First sanitize spaces
        const cmdSanitized = sanitize_spaces_1.sanitizeSpaces(cmd);
        // Separate cmd and arguments
        const cmdArr = cmdSanitized.split(' ');
        cmdStr = cmdArr[0];
        if (cmdArr.length > 1) {
            // Take all but first
            cmdArgs = cmdArgs.concat(cmdArr.slice(1, cmd.length));
        }
    }
    return {
        cmd: cmdStr,
        cmdArgs,
    };
};
//# sourceMappingURL=parse-cmd.js.map