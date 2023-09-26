import VW from "vw-detector";

const { configureBreakpoints, subscribeMediaQuery, breakpoints } = VW;

// customizing breakpoints
configureBreakpoints((defaultBreakpoints) => ({
  ...defaultBreakpoints,
  sm: 600,
  md: 900,
  step: 2, // prevent query matching conflict, default 5
}));

// registering callback
const downSm = subscribeMediaQuery(breakpoints.down("sm"), (matches) => {
  // this callback will be invoked once if the media query matches
  // we need to type guard to prevent running callback body multiple times
  if (matches) {
    console.log("media query matches with the current viewport width");
  }
});

const upSm = subscribeMediaQuery(breakpoints.up("sm"));

const onlySm = subscribeMediaQuery(breakpoints.only("sm"));

const betweenSmAndLg = subscribeMediaQuery(breakpoints.between("sm", "lg"));
