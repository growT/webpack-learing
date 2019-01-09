const VueLoaderPlugin = require('vue-loader/lib/plugin');
const config  = require('../config');

const path = require("path");

function resolve(dir) {
    return path.join(__dirname, "..", dir);
}

module.exports = {
    entry: {
        bundle: './src/main.js',
    },
    output:{
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].js',
        publicPath: process.env.NODE_ENV == 'production'
                    ? config.build.asserpublicPath
                    : process.env.NODE_ENV == 'testing'
                        ? config.testing.asserpublicPath
                        : config.dev.asserpublicPath
    },
    resolve: {
        extensions: [".js", ".vue", ".json"],
        alias: {
            vue$: "vue/dist/vue.esm.js",
            "@": resolve("src")
        }
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                exclude: [/node_modules/, require.resolve('../index.html')],
                use: {
                    loader: 'file-loader',
                    query: {
                        name: '[name].[ext]'
                    },
                },
            },
            {
                test: /\.html$/,
                use: ['html-loader']
            },
            {
                test: /\.vue$/,
                use: ['vue-loader']
            },
            {
                test:  /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                use: ['url-loader']
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
    ]
}