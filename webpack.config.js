const path = require('path');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const webpack = require('webpack');

module.exports = env => {
    return {
        mode: env.NODE_ENV || 'production',
        entry: './src/index.js',
        devtool: 'inline-source-map',
        output: {
            filename: '[name].[hash].js',
            path: path.resolve(__dirname, 'dist')
        },
        devServer: {
            host: "0.0.0.0",
            port: 3000,
        },
        optimization: {
            runtimeChunk: 'single',
            splitChunks: {
                cacheGroups: {
                    vendor: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendors',
                        chunks: 'all'
                    }
                }
            }
        },
        module: {
            rules: [
                {
                    test: /\.s?css$/,
                    use: [
                        'style-loader',
                        'css-loader',
                        'sass-loader'
                    ]
                },

                {
                    test: /\.(png|svg|jpg|gif)$/,
                    use: [
                        'file-loader'
                    ]
                },

                {
                    test: /\.(woff|woff2|eot|ttf|otf)$/,
                    use: [
                        'file-loader'
                    ]
                }
            ]
        },

        plugins: [
            new CleanWebpackPlugin(),
            new HtmlWebpackPlugin({
                filename: 'index.html',
                template: './src/index.html'
            }),
            new webpack.HotModuleReplacementPlugin()
        ],
        watchOptions: {
            poll: true
        }
    }
};
