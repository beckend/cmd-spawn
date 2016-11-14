"use strict";
class ECmdError extends Error {
    constructor(message) {
        super(message);
        this.code = 'ECMDERR';
        this.stack = (new Error()).stack;
    }
}
exports.ECmdError = ECmdError;
//# sourceMappingURL=cmd-error.js.map