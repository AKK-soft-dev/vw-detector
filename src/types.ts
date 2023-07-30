export interface Breakpoints {
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
  xxl?: number;
  step: number;
  up: (breakpointName: BreakpointKey) => MediaQuery;
  down: (breakpointName: BreakpointKey) => MediaQuery;
  between: (
    fromBreakpointName: BreakpointKey,
    toBreakpointName: BreakpointKey
  ) => MediaQuery;
  not: (breakpointName: BreakpointKey) => MediaQuery;
  only: (breakpointName: BreakpointKey) => MediaQuery;
}

export type BreakPointValues = Omit<
  Breakpoints,
  "up" | "down" | "between" | "not" | "only" | "step"
>;

export type BreakpointKey = keyof BreakPointValues;

export type MediaQuery = [
  keyof Omit<Breakpoints, keyof BreakPointValues | "step">,
  number | [number, number] | undefined
];

export interface VW {
  breakpoints: Breakpoints;
  configureBreakpoints?: (
    breakpointsSetter: (breakpoints: BreakPointValues) => BreakPointValues
  ) => void;
  useMediaQuery: (mediaQuery: MediaQuery, callback?: () => void) => boolean;
}
