const { resolve } = require('path')


module.exports = () => {
    global.webpack = {
        context    : resolve(__dirname, '../src'),
        dir        : __dirname,
        env        : process.env.NODE_ENV,
        config     : process.env.CONFIG,
        development: process.env.NODE_ENV === 'development',
        production : process.env.NODE_ENV === 'production',
    }

    config = {
        context: global.webpack.context,
        mode: global.webpack.env,
        entry: require('./entry'),
        output: require('./output'),
        resolve: require('./resolve'),
        optimization: require('./optimization'),
        devtool: require('./devtool'),
        plugins: require('./plugins'),
        module: {
            rules: require('./rules'),
        },
    }

    if (global.webpack.development) {
        config.devServer = require('./devServer')
    }

    return config
}
