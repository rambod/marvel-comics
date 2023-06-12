module.exports = {
  chainWebpack: config => {
    config.module
      .rule('scss')
      .test(/\.scss$/)
      .use('sass-loader')
      .loader('sass-loader')
      .end()
  },
  transpileDependencies: true
}
