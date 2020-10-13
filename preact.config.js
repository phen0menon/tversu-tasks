const path = require("path");

export default {
  webpack(config, env, helpers, options) {
    config.module.rules[4].include = [
      path.resolve(__dirname, "src", "tabs"),
      path.resolve(__dirname, "src", "components"),
    ];

    config.module.rules[5].exclude = [
      path.resolve(__dirname, "src", "tabs"),
      path.resolve(__dirname, "src", "components"),
    ];
  },
};
