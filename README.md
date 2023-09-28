# VW Detector

A lib that can be used to detect viewport width. You can use it to apply viewport specific features.

## Usage

```js
import VW from "vw-detector";

const { matchesMediaQuery, subscribeMediaQuery, breakpoints } = VW;

// customizing breakpoints
VW.configureBreakpoints((previousBreakpoints) => ({
  ...previousBreakpoints,
  sm: 600,
  md: 900,
  step: 2, // prevent query matching conflict, default 5
}));

const downSm = matchesMediaQuery(breakpoints.down("sm"));
console.log(downSm); // true (or) false

// subscribe callback
const unsubscribe = subscribeMediaQuery(breakpoints.down("sm"), (matches) => {
  // this callback will be invoked once if the media query matches
  // we need to type guard to prevent running callback body multiple times
  if (matches) {
    console.log("media query matches with the current viewport width");
  }
});

unsubscribe(); // unsubscribe callback

// You can use other ways
subscribeMediaQuery(breakpoints.up("sm"));

subscribeMediaQuery(breakpoints.only("sm"));

subscribeMediaQuery(breakpoints.between("sm", "lg"));
```

## React reusable custom hook

If you want to use this library in your React application, copy and paste this in your project and modify it base on your needs :

```js
import { useEffect, useRef, useState } from "react";
import VW from "vw-detector";

const { matchesMediaQuery, subscribeMediaQuery, breakpoints } = VW;

export default function useMediaQuery(mediaQuery) {
  // For initial value, check if current viewport width matches with the provided mediaQuery.
  const [matches, setMatches] = useState(matchesMediaQuery(mediaQuery));

  // To prevent setting same value multiple times.
  const prevMatches = useRef(matches);

  // We need to stringify media query to pass it into useEffect deps because breakpoints utility functions return array type..
  // It will be new reference on every renders.
  // For better performance, I will refactor returning array soon.
  const stringifiedMediaQuery = JSON.stringify(mediaQuery);

  useEffect(() => {
    const unsubscribe = subscribeMediaQuery(
      JSON.parse(stringifiedMediaQuery), // We need to parse stringified media query to transform it into array.
      (matches) => {
        if (prevMatches.current !== matches) {
          prevMatches.current = matches;
          setMatches(matches);
        }
      }
    );

    return () => {
      unsubscribe();
    };
  }, [stringifiedMediaQuery, breakpoints, subscribeMediaQuery]);

  return matches;
}
```

And you can use it in your component like this :

```js
import VW from "vw-detector";
import useMediaQuery from "./useMediaQuery";

export default function VWTest() {
  const downSm = useMediaQuery(VW.breakpoints.down("sm"));

  console.log(downSm);

  //...
}
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

## Version

### `2.0.1`

- `configureBreakpoints` will not merge with your returned value meaning that you should do it on your own within your callback function as it receives previous configured or default breakpoint values.
- Added type safe for SSR applications. `matchesMediaQuery` will return false if your app is running on server.

## API Reference

`VW` has the following properties :

- `configureBreakpoints`
- `matchesMediaQuery`
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

### **matchesMediaQuery**

Can be used to detect when this function is invoked. Return boolean.

```js
const notSm = matchesMediaQuery(breakpoints.not("sm"));
console.log(notSm); // true (or) false
```

### **subscribeMediaQuery**

Can be used to subscribe optional callback to be invoked on media query matches. It returns function to unsubscribe callback.

```js
const unsubscribe = subscribeMediaQuery(breakpoints.down("sm"), (matches) => {
  if (matches) {
    console.log("media query matches with the current viewport width");
  }
});

unsubscribe(); // unsubscribe callback
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
