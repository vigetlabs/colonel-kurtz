var src = require.context("./src", true, /-test$/)
var lib = require.context("./lib", true, /-test$/)

src.keys().forEach(src)
lib.keys().forEach(lib)
