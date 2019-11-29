import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';

import paths from './paths';
import rules from './rules';

module.exports = {
    entry: paths.entryPath,
    module: {
        rules
    },
    resolve: {
        modules: ['src', 'node_modules'],
        extensions: ['*', '.js', '.scss', '.css']
    },
    plugins: [
        new webpack.ProgressPlugin(),
        new HtmlWebpackPlugin({
            template: paths.templatePath,
            minify: {
                collapseInlineTagWhitespace: true,
                collapseWhitespace: true,
                preserveLineBreaks: true,
                minifyURLs: true,
                removeComments: true,
                removeAttributeQuotes: true
            }
        })
    ],
    optimization: {
        minimizer: [new UglifyJsPlugin({
            test: /\.js(\?.*)?$/i,
        })],
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                vendors: {
                    test: '/node_modules/'
                }
            }
        },
    },
};