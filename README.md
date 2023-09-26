# VW Detector

A lib that can be used to detect viewport width. You can use it to apply viewport specific features.

## Usage

```js
import VW from "vw-detector";

const { subscribeMediaQuery, breakpoints } = VW;

// customizing breakpoints
VW.configureBreakpoints((previousBreakpoints) => ({
  ...previousBreakpoints,
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
```

## Default breakpoint values

```js
{
    xs: 0,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
    xxl: 1400,
    step: 5, // this is not viewport width
}
```

If you are using TypeScript, you can extend breakpoint values type by using module augmentation:

```js
declare module 'vw-detector/dist/types' {
  interface BreakpointValues {
    // Add properties here
    xxxl?: number;
  }
}
```

## API Reference

`VW` has the following properties :

- `configureBreakpoints`
- `subscribeMediaQuery`
- `breakpoints`

### **configureBreakpoints**

Can be used to override and extend default breakpoint values. It accepts argument as a function type. That function will received previous configured breakpoints value. You must return breakpoints values.

> Warning: Don't destructure this property. Otherwise, you will get `TypeError` when you invoke it.

```js
VW.configureBreakpoints((previousBreakpoints) => ({
  ...previousBreakpoints,
  sm: 600,
  md: 900,
}));
```

### **subscribeMediaQuery**

Can be used to subscribe optional callback to be invoked on media query matches and it returns boolean type indicating whether or not media query matches. Unlike callback function, its returned value will not be dynamic.

```js
const downSm = subscribeMediaQuery(breakpoints.down("sm"), (matches) => {
  if (matches) {
    console.log("media query matches with the current viewport width");
  }
});

console.log(downSm); // true (or) false
```

### **breakpoints**

It provides utility functions which generate media queries that you can pass to the first argument of `subscribeMediaQuery`.

```js
breakpoints.down(breakpointKey);
breakpoints.up(breakpointKey);
breakpoints.only(breakpointKey);
breakpoints.not(breakpointKey);
breakpoints.between(fromBreakpointKey, toBreakpointKey);
```

> if you are wondering how this methods work, read [MUI `useMediaQuery` technique.](https://mui.com/material-ui/customization/breakpoints/#api)
