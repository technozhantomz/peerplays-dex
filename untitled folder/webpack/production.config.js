const merge = require('webpack-merge')
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const {resolve} = require('path');

const SOURCES = resolve(__dirname, '..', 'src')
const DIST = resolve(__dirname, '..', 'dist');

const {config} = require('./common')

module.exports = merge(config, {
    module: {
        rules: [
            {
                test: /\.s?css$/,
                use: [
                  MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'sass-loader',
                ],
            },
        ],
    },

    cache: false,
    watch: false,
    profile: true,
    mode: 'production',
    optimization: {
      minimize: true,
      minimizer: [new TerserPlugin()],
    },

    plugins: [
        new CopyWebpackPlugin({patterns: [{ context: SOURCES, from: 'assets', to: DIST }]}),
        new CopyWebpackPlugin({patterns: [{ context: SOURCES, from: 'charting_library', to: DIST }]}),
        new MiniCssExtractPlugin(),
    ],
})
