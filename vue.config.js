module.exports = {
  publicPath: '/frontend',
  outputDir: "../../src/main/resources/static/frontend",
  devServer: {
    proxy: {
        '^/api': {
            target: 'http://localhost:8080/',
            ws: true,
            changeOrigin: true
        }
    }
},
  transpileDependencies: [
    'vuetify'
  ]
}
