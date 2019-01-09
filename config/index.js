var path = require('path');
module.exports = {
    build: {

        //flag 一会试验一下每个配置的功能
        //paths
        assetRoot: path.resolve(__dirname, '../dist'),//生成文件的路径
        assetSubDirectory: 'static', //生成的下级文件夹 存放 js和css的目录，index.html不放在那个地方
        asserpublicPath: '', //生成的js或者是css等，在html中的访问地址

        devtool: '#source-map',
        productionSourceMap: true, //用来控制是否开启sourceMap
        index: 'index.html',

        productionGzip: false, //是否开启gzip打包
        productionGzipExtensions: ["js", "css"],
        bundleAnalyzerReport:  process.env.npm_config_report, // 是否给出 打包编译后的文件打印出详细的文件信息，

    },
    testing: {
        //paths
        assetRoot: path.resolve(__dirname, '../beta'),//生成文件的路径
        assetSubDirectory: 'static', //生成的下级文件夹
        asserpublicPath: '', //生成的js或者是css等，在html中的访问地址

        devtool: '#source-map',
        productionSourceMap: true,
        index: 'index.html',

        productionGzip: false, //是否开启gzip打包
        productionGzipExtensions: ["js", "css"],
        bundleAnalyzerReport:  process.env.npm_config_report, // 是否给出 打包编译后的文件打印出详细的文件信息，
    },
    dev: {
        //paths
        assetRoot: path.resolve(__dirname, '../dev'),//生成文件的路径
        assetSubDirectory: '', //生成的下级文件夹
        asserpublicPath: '', //生成的js或者是css等，在html中的访问地址
 
        productionSourceMap: true,

    }
}