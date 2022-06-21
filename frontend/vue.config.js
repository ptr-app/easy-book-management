require('dotenv/config')

module.exports = {
  outputDir: './dist',
  devServer: {
    port: '81',
    proxy: {
      '^/api/': {
        target: 'http://localhost:80/',
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          '^/api/': '/api/',
        },
      },
    },
  },
  transpileDependencies: ['vuetify'],
}
