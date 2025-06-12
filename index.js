module.exports = {
    rules: {
      "max-depth": require("./lib/rules/max-depth")
    },
    configs: {
      recommended: {
        plugins: ["ternary-depth"],
        rules: {
          "ternary-depth/max-depth": ["error", { maxDepth: 2 }]
        }
      }
    }
  };