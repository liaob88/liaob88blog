"use strict"
require("ts-node").register({
  compilerOptions: {
    module: "CommonJS",
    target: "esnext",
  },
})

exports.createPages = require("./gatsby-node").createPages
exports.onCreateNode = require("./gatsby-node").onCreateNode
