"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    daysBetweenDates(start, end) {
        const diffInMillisecs = (end.getTime() - start.getTime());
        return diffInMillisecs / (1000 * 3600 * 24);
    }
};
//# sourceMappingURL=utils.js.map