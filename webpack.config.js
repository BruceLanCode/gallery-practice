module.exports = {
    entry: 'index.js',
    output: {
        filename: 'main.js',
        publicPath: '/assets/'
    },
    devtool: 'sourcemap',
    module: {
        rules: [{
            test: /\.(jsx?$)/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        },{
            test: /\.scss/,
            loader: 'style-loader!css-loader!sass-loader'
        },{
            test: /\.css$/,
            loader: 'style-loader!css-loader'
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
        extensions: ['','js','jsx']
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
}