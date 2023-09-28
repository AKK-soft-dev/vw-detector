import { initialBreakpoints } from "./breakpoints";
import { MediaQuery, VW as VWType } from "./types";

const detect = (mediaQuery: MediaQuery) => {
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
};

export const VW: VWType = {
  breakpoints: initialBreakpoints,
  configureBreakpoints: function (breakpointsSetter) {
    const prevBreakpointValues = this.breakpoints.values;
    this.breakpoints.values = breakpointsSetter(prevBreakpointValues);
  },
  matchesMediaQuery: function (mediaQuery) {
    return detect(mediaQuery);
  },
  subscribeMediaQuery: function (mediaQuery, callback) {
    // to prevent invoking every times resize
    let invokedCallback = false;

    const detector = () => {
      const matchesMediaQuery = detect(mediaQuery);
      if (typeof callback === "function") {
        if (matchesMediaQuery && !invokedCallback) {
          invokedCallback = true;
          callback(matchesMediaQuery);
        } else if (!matchesMediaQuery) {
          invokedCallback = false;
          callback(matchesMediaQuery);
        }
      }
    };
    window.addEventListener("resize", detector);

    return () => {
      window.removeEventListener("resize", detector);
    };
  },
};
