const TerserPlugin = require('terser-webpack-plugin')
const config = require('./webpack.base.conf')

process.env.NODE_ENV = 'production'

// using runtime only in production
config.resolve.alias.set('vue$', 'vue/dist/vue.runtime.esm.js')

config.performance.maxEntrypointSize((1024 ** 2) * 5)
config.performance.maxAssetSize((1024 ** 2) * 5)

config.optimization.minimizer('terser')
  .use(TerserPlugin, [{
    terserOptions: {
      output: {
        comments: false,
      },
    },
  }])

config.module.rule('eslint')
  .test(/\.(vue|tsx?|jsx?)$/)
  .enforce('pre')
  .use('eslint')
  .loader('eslint-loader')
  .end()
  .exclude.add(/node_modules/)

config.module.rule('ts')
  .use('ts')
  .loader('ts-loader')
  .options({ happyPackMode: true })

config.plugins.delete('fork-ts-checker-webpack-plugin')

config.mode('production')
config.devtool('source-map')

module.exports = config
