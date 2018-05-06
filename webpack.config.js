const path = require('path'),
 HtmlWebpackPlugin = require('html-webpack-plugin'),
 UglifyJSPlugin = require('uglifyjs-webpack-plugin'),
 OptimizeJsPlugin = require('optimize-js-plugin'),
 webpack = require('webpack');
 
let plugins = [new HtmlWebpackPlugin({
    template: 'client/index.html',
    filename: 'index.html',
    inject: 'body'
})];

//webpack.config.js
module.exports = (env) => {
    const environment = env ||'production';
    if (env == 'production') {
        plugins.push(
            new webpack.optimize.UglifyJsPlugin(),
            new OptimizeJsPlugin({
                sourceMap: false
            })
        )
    }
    return {
        // mode: environment,
        entry: (env !== 'production' ? [
            'react-hot-loader/patch',
            'webpack-dev-server/client?http://localhost:8080',
            'webpack/hot/only-dev-server',
        ] : []).concat(['./client/index.js']),
        output: {
            path: path.resolve(__dirname, 'public'),
            filename: 'app.'+ environment+'.bundle.js'
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    loader: "babel-loader",
                    options: {
                        plugins: env !== 'production' ? ["react-hot-loader/babel"] : []
                    }
                },
                {
                    test:/\.css$/,
                    use: [
                        {loader: 'style-loader'},
                        {
                            loader: 'css-loader',
                            options: {
                                modules:true
                            }
                        }
                    ]
                }
            ]
        },
        plugins
    }
    
};