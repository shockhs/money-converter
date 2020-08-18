const path = require('path')

module.exports = {
    contentBase: path.resolve(__dirname, '../build'),
    hot: true,
    inline: true,
    port: 4200,
}