module.exports = {
  presets: [
    ["@babel/preset-env", {
      "modules": false,
      useBuiltIns: "usage"
    }]
  ],
  plugins: ["transform-vue-jsx", "@babel/plugin-syntax-dynamic-import"],
  env: {
    test: {
      presets: [
        "@babel/preset-env"
      ],
      plugins: [
        "transform-vue-jsx",
        "dynamic-import-node"
      ]
    }
  }
}