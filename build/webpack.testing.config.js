var webpack =  require('webpack');
var merge = require('webpack-merge');
var baseConfig = require('./webpack.base.config');
var env = require('../config/testing.env');
var path = require("path");
var config  = require('../config')
var utils  =require('./utils');

//专门用来压缩js文件的
var UglifyJsPlugin = require('uglifyjs-webpack-plugin');
// html-webpack-plugin是生成html文件，可以设置模板，
var HtmlWebpackPlugin = require('html-webpack-plugin');
// extract-text-webpack-plugin这个插件是用来将bundle中的css等文件产出单独的bundle文件的，之前也详细讲过
var ExtractTextPlugin = require('extract-text-webpack-plugin')
// optimize-css-assets-webpack-plugin插件的作用是压缩css代码的，还能去掉extract-text-webpack-plugin插件抽离文件产生的重复代码，因为同一个css可能在多个模块中出现所以会导致重复代码，换句话说这两个插件是两兄弟
var OptimizeCSSPlugin  = require('optimize-css-assets-webpack-plugin')
//复制那些静态文件到打包的文件中
const CopyWebpackPlugin = require('copy-webpack-plugin')

var webpackConfig = merge(baseConfig,{
    module: {
        rules: utils.styleLoaders({
            sourceMap: config.testing.productionSourceMap,
            extract: true
        })
    },
    output: {
        path: config.testing.assetRoot, //因为这里是生成的打包后的路径
        filename: utils.assetsPath('js/[name].[chunkhash].js'), //不懂这里为什么也要 assetsPath函数 可以再不同的平台上生成统一的路径 ，所以需要使用这个方法
        chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
    },
    devtool: config.testing.productionSourceMap ? config.testing.devtool : false,
    plugins: [
        new webpack.DefinePlugin({
            "process.env": env
        }),
        new UglifyJsPlugin({ 
            uglifyOptions: {
                compress: {
                    warnings: false
                }
            },
            parallel: true,
            sourceMap: config.testing.productionSourceMap
        }),
        new HtmlWebpackPlugin({ 
             //非测试环境生成index.html
            filename: process.env.NODE_ENV === 'testing'
            ? 'index.html'
            : config.testing.index,
            template: 'index.html',
            inject: true,
            minify: {
                // 压缩产出后的html页面
              removeComments: true,
              collapseWhitespace: true,
              removeAttributeQuotes: true
              // more options:
              // https://github.com/kangax/html-minifier#options-quick-reference
            },
            // necessary to consistently work with multiple chunks via CommonsChunkPlugin
            // 分类要插到html页面的模块
            chunksSortMode: 'dependency'
        }),

     
        new ExtractTextPlugin({
            filename: utils.assetsPath('css/[name].[contenthash].css'),
        }),
        // new OptimizeCSSPlugin({
        //     cssProcessorOptions: {
        //         safe: true
        //       }
        // }),

        new  CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, '../static'),
                to: config.testing.assetSubDirectory,
                ignore: ['.*']
            }
        ]),

        //打包生成公共模块

        // split vendor js into its own file
        // 下面的插件是将打包后的文件中的第三方库文件抽取出来，便于浏览器缓存，提高程序的运行速度
        new webpack.optimize.CommonsChunkPlugin({
            name: 'verdor',
            minChunks: function (module, count) {
                // any required modules inside node_modules are extracted to vendor
                // 将所有依赖于node_modules下面文件打包到vendor中
                return (
                  module.resource &&
                  /\.js$/.test(module.resource) &&
                  module.resource.indexOf(
                    path.join(__dirname, '../node_modules')
                  ) === 0
                )
              }
        }),
        // extract webpack runtime and module manifest to its own file in order to
        // prevent vendor hash from being updated whenever app bundle is updated
        // 把webpack的runtime代码和module manifest代码提取到manifest文件中，防止修改了代码但是没有修改第三方库文件导致第三方库文件也打包的问题
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest',
            chunks: ['vendor']
        }),
    ]
})

if (config.testing.productionGzip) {
    // 开启Gzi压缩打包后的文件，老铁们知道这个为什么还能压缩吗？？，就跟你打包压缩包一样，把这个压缩包给浏览器，浏览器自动解压的
    // 你要知道，vue-cli默认将这个神奇的功能禁用掉的，理由是Surge 和 Netlify 静态主机默认帮你把上传的文件gzip了
  var CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp( // 这里是把js和css文件压缩
        '\\.(' +
        config.testing.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

if (config.testing.bundleAnalyzerReport) {
    // 打包编译后的文件打印出详细的文件信息，vue-cli默认把这个禁用了，个人觉得还是有点用的，可以自行配置
  var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}


module.exports = webpackConfig;