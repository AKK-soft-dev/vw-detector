import { breakpoints } from "./breakpoints";
import { VW as VWType } from "./types";

export const VW: VWType = {
  breakpoints: breakpoints,
  configureBreakpoints: function (breakpointsSetter) {
    const { up, down, between, not, ...breakpoints } = this.breakpoints;
    this.breakpoints = {
      ...this.breakpoints,
      ...breakpointsSetter(breakpoints),
    };
  },
  useMediaQuery: function (mediaQuery, callback) {
    const vw = window.innerWidth;
    switch (mediaQuery[0]) {
      case "up": {
        return vw >= (mediaQuery[1] as number);
      }
      case "down": {
        return vw <= (mediaQuery[1] as number);
      }
      case "not": {
        return vw !== (mediaQuery[1] as number);
      }
      case "only": {
        return vw === (mediaQuery[1] as number);
      }
      case "between": {
        const [from, to] = mediaQuery[1] as [number, number];
        return vw >= from && vw <= to;
      }
    }
    return false;
  },
};
