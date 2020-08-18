const config = {
    development: 'source-map',
    production: false,
}

module.exports = config[global.webpack.env]
