module.exports = {
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        // options placed here will be merged with default configuration and passed to electron-builder
      }
    }
  },
  css: {
    loaderOptions: {
      sass: {
        data: `@import "@/sass/globals.sass"`
      }
    }
  }
}
