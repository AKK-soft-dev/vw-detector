import { breakpoints } from "./breakpoints";
export const VW = {
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
                return vw >= mediaQuery[1];
            }
            case "down": {
                return vw <= mediaQuery[1];
            }
            case "not": {
                return vw !== mediaQuery[1];
            }
            case "only": {
                return vw === mediaQuery[1];
            }
            case "between": {
                const [from, to] = mediaQuery[1];
                return vw >= from && vw <= to;
            }
        }
        return false;
    },
};
