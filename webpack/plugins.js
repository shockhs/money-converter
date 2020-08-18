const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const isDevelopment = global.webpack.env === 'development'
const isProduction = !isDevelopment

const filename = (ext) => (isDevelopment ? `static/${ext}/[name].${ext}` : `static/${ext}/[name].[contenthash:8].${ext}`)
const chunkname = (ext) =>
    isDevelopment ? `static/${ext}/[name].chunk.${ext}` : `static/${ext}/[name].[contenthash:8].chunk.${ext}`


module.exports = [
    new HTMLWebpackPlugin({
        template: path.resolve(global.webpack.context, './public/index.html'),
        minify: {
            collapseWhitespace: isProduction,
        },
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
        patterns: [
            {
                from: path.resolve(global.webpack.context, './public/favicon.ico'),
                to: path.resolve(__dirname, '../build'),
            },
        ],
    }),
    new MiniCssExtractPlugin({
        filename: filename('css'),
        chunkFilename: chunkname('css'),
    }),
]
