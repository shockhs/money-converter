const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const isDevelopment = global.webpack.env === 'development'
const isProduction = !isDevelopment

const reactModuleOptions = () => {
    const loaders = [
        {
            loader: 'babel-loader',
            options: babelOptions('@babel/preset-react'),
        },
    ]
    if (isDevelopment) loaders.push('eslint-loader')
    return loaders
}


const cssLoaders = (extra) => {
    const loaders = [
        {
            loader: MiniCssExtractPlugin.loader,
            options: {
                hmr: isDevelopment,
                reloadAll: true,
            },
        },
        'css-loader',
    ]

    if (extra) loaders.push(extra)
    return loaders
}

const loaderModuleOptions = () => {
    const loaders = [
        {
            loader: 'babel-loader',
            options: babelOptions(),
        },
    ]
    if (isDevelopment) {
        loaders.push('eslint-loader')
    }

    return loaders
}

const babelOptions = (preset) => {
    const options = {
        presets: ['@babel/preset-env'],
        plugins: ['@babel/plugin-proposal-class-properties'],
    }

    if (preset) options.presets.push(preset)
    return options
}


module.exports = [
            {
                test: /\.js$/,
                exclude: /node-modules/,
                use: loaderModuleOptions(),
            },
            {
                test: /\.jsx$/,
                exclude: /node-modules/,
                use: reactModuleOptions(),
            },
            {
                test: /\.ts$/,
                exclude: /node-modules/,
                loader: {
                    loader: 'babel-loader',
                    options: babelOptions('@babel/preset-typescript'),
                },
            },
            {
                test: /\.tsx$/,
                exclude: /node-modules/,
                use: 'ts-loader',
            },
            {
                test: /\.css$/,
                use: cssLoaders(),
            },
            {
                test: /\.s[ac]ss$/,
                use: cssLoaders('sass-loader'),
            },
            {
                test: /\.(ttf|woff|woff2|eot)$/,
                options: {
                    name: 'static/fonts/[name].[ext]',
                },
                loader: 'url-loader',
            },
        ]