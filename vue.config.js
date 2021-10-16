module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: ' @import "@/assets/styles.scss"; ',
      },
    },
  },
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://localhost:8080',
        ws: true,
        changeOrigin: true,
      },
      '^/foo': {
        target: 'http://localhost:8081',
      },
    },
  },
};
