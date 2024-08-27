const AutoImport = require("unplugin-auto-import/webpack");
const Components = require("unplugin-vue-components/webpack");
const { ElementPlusResolver } = require("unplugin-vue-components/resolvers");

module.exports = {
  chainWebpack: (config) => {
    // ...other chains
    config.module
      .rule("mjs$")
      .test(/\.mjs$/)
      .include.add(/node_modules/)
      .end()
      .type("javascript/auto");
  },
  configureWebpack: {
    plugins: [
      //   require("unplugin-element-plus/webpack")({
      //     // options
      //   }),
      require("unplugin-icons/webpack")({
        /* options */
      }),
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
    ],
    resolve: {
      //
      extensions: ["*", ".mjs", ".js", ".vue", ".json"],
    },
  },
};
