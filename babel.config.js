module.exports = {
  presets: [
    [
      "@babel/preset-env",
      // "jest",
      {
        modules: "commonjs"
      }
    ],
    // "@babel/preset-flow",
    "@babel/preset-react"
  ],
  plugins: [
    "@babel/plugin-syntax-dynamic-import",
    // ["@babel/plugin-proposal-decorators", { legacy: true }],
    "@babel/plugin-proposal-class-properties",
    ["babel-plugin-styled-components", { displayName: true }],
    // "@loadable/babel-plugin",
    // "transform-dynamic-import",
    // ["module-resolver", { root: ["./"] }],
    "transform-es2015-modules-commonjs",
    "@babel/plugin-transform-modules-commonjs"
  ]
};
