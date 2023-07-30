import { Breakpoints, MediaQuery } from "./types";

export const breakpoints: Breakpoints = {
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
    const breakpoint = this[breakpointName];
    let res = undefined;
    if (typeof breakpoint === "number") {
      res = breakpoint - this.step / 100;
    }
    return ["down", res];
  },
  between: function (fromBreakpointName, toBreakpointName) {
    const breakpoint1 = this[fromBreakpointName];
    const breakpoint2 = this[toBreakpointName];
    let res = undefined;
    if (typeof breakpoint1 === "number" && typeof breakpoint2 === "number") {
      res = [breakpoint1, breakpoint2 - this.step / 100];
    }
    return ["between", res] as MediaQuery;
  },
  not: function (breakpointName) {
    return ["not", this[breakpointName]];
  },
  only: function (breakpointName) {
    return ["only", this[breakpointName]];
  },
};
