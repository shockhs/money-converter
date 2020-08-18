const path = require('path')

module.exports = {
    modules: [path.resolve(global.webpack.context, 'app'), 'node_modules'],
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
}