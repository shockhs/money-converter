const path = require('path')

const filename = (ext) => (global.webpack.env === 'development' ? `static/${ext}/[name].${ext}` : `static/${ext}/[name].[contenthash:8].${ext}`)

module.exports = {
    filename: filename('js'),
    path: path.resolve(__dirname, '../build'),
}