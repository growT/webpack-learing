process.env.NODE_ENV = 'production'

var ora = require('ora');
var rm = require('rimraf');
var chalk = require('chalk');
var webpack = require("webpack");
var webpackConfig = require("./webpack.production.config");
var path = require('path');
var config = require('../config');

var spinner = ora('building for production...');
spinner.start();

rm(path.join(config.build.assetRoot,config.build.assetSubDirectory),error => {
    if (error) throw error;

    webpack(webpackConfig,(error,stats) => {
        spinner.stop();
        process.stdout.write(stats.toString({
            color: true,
            modules: false,
            children: false,
            chunks: false,
            chunkModules: false
        })+ '\n\n')

        if (stats.hasErrors()) {
            console.log(chalk.red("  Build failed with errors.\n"));
            process.exit(1);
        }

        console.log(chalk.cyan('构建已经完成'));
        console.log(chalk.yellow( 
            '  Tip: built files are meant to be served over an HTTP server.\n' +
            '  Opening index.html over file:// won\'t work.\n'));

    })

})