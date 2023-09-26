export const initialBreakpoints = {
    values: {
        xs: 0,
        sm: 576,
        md: 768,
        lg: 992,
        xl: 1200,
        xxl: 1400,
        step: 5,
    },
    up: function (breakpointName) {
        return ["up", this.values[breakpointName]];
    },
    down: function (breakpointName) {
        const breakpoint = this.values[breakpointName];
        let res = undefined;
        if (typeof breakpoint === "number") {
            res = breakpoint - this.values.step / 100;
        }
        return ["down", res];
    },
    between: function (fromBreakpointName, toBreakpointName) {
        const breakpoint1 = this.values[fromBreakpointName];
        const breakpoint2 = this.values[toBreakpointName];
        let res = undefined;
        if (typeof breakpoint1 === "number" && typeof breakpoint2 === "number") {
            res = [breakpoint1, breakpoint2 - this.values.step / 100];
        }
        return ["between", res];
    },
    not: function (breakpointName) {
        return ["not", this.values[breakpointName]];
    },
    only: function (breakpointName) {
        return ["only", this.values[breakpointName]];
    },
};
