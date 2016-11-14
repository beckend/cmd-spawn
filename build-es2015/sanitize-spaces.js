"use strict";
/* tslint:disable: no-regex-spaces */
exports.sanitizeSpaces = (str) => {
    return str
        .trim()
        .replace(/  +/g, ' ');
};
//# sourceMappingURL=sanitize-spaces.js.map