"use strict";
exports.isPromise = (value) => {
    if (value !== null && typeof value === 'object') {
        return value && typeof value.then === 'function';
    }
    return false;
};
//# sourceMappingURL=is-promise.js.map