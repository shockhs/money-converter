const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

const isDevelopment = process.env.NODE_ENV === 'development'
const isProduction = !isDevelopment

const filename = ext => isDevelopment ? `[name].${ext}` : `[name].[hash].${ext}`

const cssLoaders = extra => {
    const loaders = [{
        loader: MiniCssExtractPlugin.loader,
        options: {
            hmr: isDevelopment,
            reloadAll: true
        }
    }, 'css-loader']

    if (extra) loaders.push(extra)
    return loaders
}

const loaderModuleOptions = () => {
    const loaders = [{
        loader: 'babel-loader',
        options: babelOptions()
    }]
    if (isDevelopment) {
        loaders.push('eslint-loader')
    }

    return loaders
}


const babelOptions = preset => {
    const options = {
        presets: [
            '@babel/preset-env'
        ],
        plugins: [
            '@babel/plugin-proposal-class-properties'
        ]
    }

    if (preset) options.presets.push(preset)
    return options
}

const optimizationOptions = () => {
    const config = {
        splitChunks: {
            chunks: 'all'
        }
    }
    if (isProduction) {
        config.minimizer = [new OptimizeCssAssetsPlugin(), new TerserWebpackPlugin()]
    }
    return config
}

const reactModuleOptions = () => {
    const loaders = [{
        loader: 'babel-loader',
        options: babelOptions('@babel/preset-react')
    }]
    if (isDevelopment) loaders.push('eslint-loader')
    return loaders
}

const pluginsList = () => {
    const plugins = [
        new HTMLWebpackPlugin({
            template: './public/index.html',
            minify: {
                collapseWhitespace: isProduction
            }
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [{
                from: './public/favicon.png',
                to: path.resolve(__dirname, 'build')
            }]
        }),
        new MiniCssExtractPlugin({
            filename: filename('.css')
        })
    ]

    if (isProduction) plugins.push(new BundleAnalyzerPlugin())

    return plugins
}

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: ['@babel/polyfill', './app/index.jsx'],
    output: {
        filename: filename('js'),
        path: path.resolve(__dirname, 'build')
    },
    resolve: {
        modules: [path.resolve(__dirname, 'src'), 'node_modules'],
        extensions: ['.wasm', '.mjs', '.js', '.jsx', '.ts', '.tsx', '.json'],
        alias: {
            '@': path.resolve(__dirname, 'src')
        }
    },
    optimization: optimizationOptions(),
    devServer: {
        contentBase: path.resolve(__dirname, 'build'),
        hot: isDevelopment,
        port: 4200
    },
    devtool: isDevelopment ? 'source-map' : '',
    plugins: pluginsList(),
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node-modules/,
                use: loaderModuleOptions()
            },
            {
                test: /\.ts$/,
                exclude: /node-modules/,
                loader: {
                    loader: 'babel-loader',
                    options: babelOptions('@babel/preset-typescript')
                }
            },
            {
                test: /\.jsx$/,
                exclude: /node-modules/,
                use: reactModuleOptions()
            },
            {
                test: /\.css$/,
                use: cssLoaders()
            },
            {
                test: /\.s[ac]ss$/,
                use: cssLoaders('sass-loader')
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: ['file-loader']
            },
            {
                test: /\.(ttf|woff|woff2|eot)$/,
                use: ['file-loader']
            },
        ]
    }
}