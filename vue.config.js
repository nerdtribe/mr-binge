module.exports = {
  // To keep unit tests from failing
  // see: https://github.com/vuetifyjs/vue-cli-plugin-vuetify/issues/101
  // chainWebpack: config => {
  //   if (process.env.NODE_ENV === "test") {
  //     const sassRule = config.module.rule("sass");
  //     sassRule.uses.clear();
  //     sassRule.use("null-loader").loader("null-loader");
  //   }
  // },
  assetsDir: "assets"
};
