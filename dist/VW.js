"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VW = void 0;
var breakpoints_1 = require("./breakpoints");
exports.VW = {
    breakpoints: breakpoints_1.breakpoints,
    configureBreakpoints: function (breakpointsSetter) {
        var _a = this.breakpoints, up = _a.up, down = _a.down, between = _a.between, not = _a.not, breakpoints = __rest(_a, ["up", "down", "between", "not"]);
        this.breakpoints = __assign(__assign({}, this.breakpoints), breakpointsSetter(breakpoints));
    },
    useMediaQuery: function (mediaQuery, callback) {
        var vw = window.innerWidth;
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
                var _a = mediaQuery[1], from = _a[0], to = _a[1];
                return vw >= from && vw <= to;
            }
        }
        return false;
    },
};
