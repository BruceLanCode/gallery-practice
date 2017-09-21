var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: [
        './src/index.js'
    ],
    output: {
        filename: 'main.js'
    },
    devtool: 'sourcemap',
    devServer: {
        hot: true,
        inline: true
    },
    module: {
        rules: [{
            test: /\.(jsx?$)/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            options: {
                presets: ['react','es2015','stage-0']
            }
        },{
            test: /\.scss/,
            loader: 'style-loader!css-loader!sass-loader!postcss-loader'
        },{
            test: /\.css$/,
            loader: 'style-loader!css-loader!postcss-loader'
        },{
            test: /\.json$/,
            loader: 'json-loader'
        },{
            test: /\.(png|jpg|woff|woff2|eot|ttf|svg)$/,
            loader: 'url-loader',
            options: {
                limit:8192
            }
        }]
    },
    resolve: {
        extensions: ['.js','.jsx']
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            title: 'react-gallery-practice',
            template: './src/template.html',
            inject: 'body'
        })
    ]
}