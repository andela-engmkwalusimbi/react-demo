const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    devtool: 'cheap-source-map',
    noInfo: false,
    entry: [
        './src/app',
    ],
    output: {
        path: './build',
        filename: 'bundle.js',
    },
    module: {
        loaders: [
            {
                test: /\.(js|jsx)?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    cacheDirectory: true,
                    presets: ['react', 'es2015'],
                },
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('css!sass'),
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('css'),
            },
            {
                test: /\.(png|woff|woff2|eot|ttf|svg)$/,
                loader: 'url-loader',
            },
        ],
    },
    devServer: {
        inline: true,
        port: 7000,
        historyApiFallback: true,
        contentBase: 'build/',
        proxy: {
            '/api*': {
                target: 'http://localhost:8000',
            },
        },
    },
    plugins: [
        new ExtractTextPlugin('[name].min.css', {
            allChunks: true,
        }),
    ],
};
