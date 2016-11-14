/**
 * Parse command and return command and arguments for child process spawn
 */
import { sanitizeSpaces } from './sanitize-spaces';

export interface IParseCmdArgs {
  cmd: string | string[];
}
export interface IParseCmdFn {
  (args: IParseCmdArgs): {
    cmd: string;
    cmdArgs: string[];
  };
}
export const parseCmd: IParseCmdFn = ({ cmd }) => {
  let cmdStr: string;
  let cmdArgs: string[] = [];
  if (Array.isArray(cmd)) {
    cmdStr = cmd[0];
    if (cmd.length > 1) {
      // Take all but first
      cmdArgs = cmdArgs.concat(cmd.slice(1, cmd.length));
    }
  } else {
    // First sanitize spaces
    const cmdSanitized = sanitizeSpaces(cmd);

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
