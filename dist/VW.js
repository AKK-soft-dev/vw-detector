import { initialBreakpoints } from "./breakpoints";
const isOnServer = () => typeof window === "undefined";
const detect = (mediaQuery) => {
    if (isOnServer())
        return false;
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
};
export const VW = {
    breakpoints: initialBreakpoints,
    configureBreakpoints: function (breakpointsSetter) {
        const prevBreakpointValues = this.breakpoints.values;
        const newBreakpointValues = breakpointsSetter(prevBreakpointValues);
        this.breakpoints.values = {
            ...breakpointsSetter(prevBreakpointValues),
            ...(!Object.hasOwn(newBreakpointValues, "step")
                ? { step: prevBreakpointValues.step }
                : {}),
        };
    },
    matchesMediaQuery: function (mediaQuery) {
        return detect(mediaQuery);
    },
    subscribeMediaQuery: function (mediaQuery, callback) {
        // to prevent invoking every times resize
        let invokedCallback = false;
        const isOnClient = !isOnServer();
        const detector = () => {
            const matchesMediaQuery = detect(mediaQuery);
            if (typeof callback === "function") {
                if (matchesMediaQuery && !invokedCallback) {
                    invokedCallback = true;
                    callback(matchesMediaQuery);
                }
                else if (!matchesMediaQuery) {
                    invokedCallback = false;
                    callback(matchesMediaQuery);
                }
            }
        };
        isOnClient && window.addEventListener("resize", detector);
        return () => {
            isOnClient && window.removeEventListener("resize", detector);
        };
    },
};
