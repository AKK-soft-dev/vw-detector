"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.breakpoints = void 0;
exports.breakpoints = {
    xs: 0,
    sm: 564,
    md: 768,
    lg: 992,
    xl: 1048,
    xxl: 1200,
    step: 5,
    up: function (breakpointName) {
        return ["up", this[breakpointName]];
    },
    down: function (breakpointName) {
        var breakpoint = this[breakpointName];
        var res = undefined;
        if (typeof breakpoint === "number") {
            res = breakpoint - this.step / 100;
        }
        return ["down", res];
    },
    between: function (fromBreakpointName, toBreakpointName) {
        var breakpoint1 = this[fromBreakpointName];
        var breakpoint2 = this[toBreakpointName];
        var res = undefined;
        if (typeof breakpoint1 === "number" && typeof breakpoint2 === "number") {
            res = [breakpoint1, breakpoint2 - this.step / 100];
        }
        return ["between", res];
    },
    not: function (breakpointName) {
        return ["not", this[breakpointName]];
    },
    only: function (breakpointName) {
        return ["only", this[breakpointName]];
    },
};
