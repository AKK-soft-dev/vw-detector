export interface BreakpointValues {
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
  xxl?: number;
  step: number;
}

export type BreakpointKey = keyof BreakpointValues;

export type Breakpoints = {
  values: BreakpointValues;
  up: (breakpointName: BreakpointKey) => MediaQuery;
  down: (breakpointName: BreakpointKey) => MediaQuery;
  between: (
    fromBreakpointName: BreakpointKey,
    toBreakpointName: BreakpointKey
  ) => MediaQuery;
  not: (breakpointName: BreakpointKey) => MediaQuery;
  only: (breakpointName: BreakpointKey) => MediaQuery;
};

export type MediaQuery = [
  keyof Omit<Breakpoints, "values">,
  number | [number, number] | undefined
];

export interface VW {
  breakpoints: Breakpoints;
  configureBreakpoints?: (
    breakpointsSetter: (breakpoints: BreakpointValues) => BreakpointValues
  ) => void;
  matchesMediaQuery: (mediaQuery: MediaQuery) => boolean;
  subscribeMediaQuery: (
    mediaQuery: MediaQuery,
    callback?: (matches: boolean) => void
  ) => () => void;
}
