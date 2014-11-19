/* @flow */

declare var GLOBAL: Object
declare var window: Object

var exportGlobal = function(name: string, object: any) {
    if (typeof(GLOBAL) !== "undefined")  {
        GLOBAL[name] = object
    }
    else if (typeof(window) !== "undefined") {
        window[name] = object
    }
    else {
        throw new Error("Unknown run-time environment. Currently only browsers and Node.js are supported.")
    }
}

module.exports = exportGlobal
