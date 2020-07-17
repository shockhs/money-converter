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

const filename = ext => isDevelopment ? `static/${ext}/[name].${ext}` : `static/${ext}/[name].[contenthash:8].${ext}`
const chunkname = ext => isDevelopment ? `static/${ext}/[name].chunk.${ext}` : `static/${ext}/[name].[contenthash:8].chunk.${ext}`

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
                from: './public/favicon.ico',
                to: path.resolve(__dirname, 'build')
            }]
        }),
        new MiniCssExtractPlugin({
            filename: filename('css'),
            chunkFilename: chunkname('css'),
        })
    ]

    if (isProduction) plugins.push(new BundleAnalyzerPlugin())

    return plugins
}

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: ['@babel/polyfill', './app/index.tsx'],
    output: {
        filename: filename('js'),
        path: path.resolve(__dirname, 'build')
    },
    resolve: {
        modules: [path.resolve(__dirname, 'src'), 'node_modules'],
        extensions: ['.wasm', '.mjs', '.js', '.jsx', '.ts', '.tsx', '.json']
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
                test: /\.jsx$/,
                exclude: /node-modules/,
                use: reactModuleOptions()
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
                test: /\.tsx$/,
                exclude: /node-modules/,
                use: 'ts-loader'
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
                options: {
                    name: 'static/media/[name].[ext]'
                },
                loader: 'file-loader'
            },
            {
                test: /\.(ttf|woff|woff2|eot)$/,
                options: {
                    name: 'static/fonts/[name].[ext]'
                },
                loader: 'url-loader'
            }
        ]
    }
}