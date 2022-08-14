const path = require("path");
const fs = require('fs');

const HTMLWebpackPlugin = require('html-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const environment = require('./configuration/environment');
const webpack = require('webpack');

const templateFiles = fs.readdirSync(environment.paths.source)
    .filter((file) => path.extname(file).toLowerCase() === '.html');

const htmlPluginEntries = templateFiles.map((template) => new HTMLWebpackPlugin({
    inject: true,
    hash: false,
    filename: template,
    template: path.resolve(environment.paths.source, template),
    favicon: path.resolve(environment.paths.source, 'images', 'favicon.ico'),
}));

module.exports = {
    entry: {
        app: path.resolve(environment.paths.source, 'js', 'app.js'),
    },
    output: {
        filename: 'js/[name].js',
        path: environment.paths.output,
    },
    target: ["web", "es5"],
    stats: { children: true },
    mode: "development",
    devServer: {
        static: path.resolve(__dirname, "./dist"),
        compress: true,
        port: 8080,
        open: true,
    },
    devtool: "inline-source-map",
    module: {
        rules: [
            {
                test: /\.html$/i,
                include: path.resolve(environment.paths.source, 'layer'),
                loader: "html-loader",
                options: {
                    interpolate: true
                }
            },
            {
                test: /\.((c|sa|sc)ss)$/i,
                //use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
                // Creates `style` nodes from JS strings
                use: [
                    // Creates `style` nodes from JS strings
                    "style-loader",
                    // Translates CSS into CommonJS
                    "css-loader",
                    // Compiles Sass to CSS
                    "sass-loader",
                ],
            },
            {
                test: /\\.js$/,
                loader: "babel-loader",
                exclude: "/node_modules/",
            },
            {
                test: /\.(png|gif|jpe?g|svg)$/i,
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        maxSize: environment.limits.images,
                    },
                },
                generator: {
                    filename: 'images/[name].[hash:6][ext]',
                },
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'src/fonts/'
                        }
                    }
                ]
            }
        ],
    },
    optimization: {
        minimizer: [
            '...',
            new ImageMinimizerPlugin({
                minimizer: {
                    implementation: ImageMinimizerPlugin.imageminMinify,
                    options: {
                        // Lossless optimization with custom option
                        // Feel free to experiment with options for better result for you
                        plugins: [
                            ['gifsicle', { interlaced: true }],
                            ['jpegtran', { progressive: true }],
                            ['optipng', { optimizationLevel: 5 }],
                            // Svgo configuration here https://github.com/svg/svgo#configuration
                            [
                                'svgo',
                                {
                                    plugins: [
                                        {
                                            name: 'removeViewBox',
                                            active: false,
                                        },
                                    ],
                                },
                            ],
                        ],
                    },
                },
            }),
        ],
    },
    plugins: [
        new webpack.ProvidePlugin({
            Swal: "sweetalert2",
            $: "jquery",
            jQuery: "jquery",
            Popper: ['popper.js', 'default'],
            // In   case you imported plugins individually, you must also require them here:
            Util: "exports-loader?Util!bootstrap/js/dist/util",
            Dropdown: "exports-loader?Dropdown!bootstrap/js/dist/dropdown",
        }),
        new HTMLWebpackPlugin({
            template: "./src/index.html",
        }),
        //     new MiniCssExtractPlugin({
        //     filename: 'css/[name].css',
        // }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(environment.paths.source, 'images', 'content'),
                    to: path.resolve(environment.paths.output, 'images', 'content'),
                    toType: 'dir',
                    globOptions: {
                        ignore: ['*.DS_Store', 'Thumbs.db'],
                    },
                },
                {
                    from: path.resolve(environment.paths.source, 'fonts'),
                    to: path.resolve(environment.paths.output, 'fonts'),
                    toType: 'dir',
                },
            ],
        }),
    ],
};