const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')

const config =  {
    development: {},
    production: {
        splitChunks: {
            chunks: 'all'
        },
        minimizer: [
            new OptimizeCssAssetsPlugin(), 
            new TerserWebpackPlugin()
        ]
    }
}

module.exports = config[global.webpack.env]