module.exports = {
  pwa: {
    name: 'DIMedge',
    themeColor: '#46B49E',
    msTileColor: '#22967B'
  },
  transpileDependencies: ['vuetify'],
  devServer: {
    proxy: {
      '/': {
        target: 'http://127.0.0.1:5000'
      }
    }
  }
};
