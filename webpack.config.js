// webpack.config.js

const path = require("path");
const webpackMerge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const modeConfiguration = mode => require(`./build-utils/webpack.${mode}`)(mode);

module.exports = (env, argv) => {
    console.log(`mode is: ${argv.mode}`);

    return webpackMerge(
        {
            mode: argv.mode,
            entry: "./src/index.js",
            output: {
                publicPath: "/",
                path: path.resolve(__dirname, "build"),
                filename: "bundled.js"
            },
            module: {
                rules: [
                    {
                        test: /\.(js|jsx)$/,
                        exclude: /node_modules/,
                        loader: "babel-loader",
                    },
                    {
                        test: /\.svg$/,
                        use: [
                            {
                                loader: 'svg-url-loader',
                                options: {
                                    limit: 100000,
                                    name: '[path][name].[ext]',
                                    encoding: 'base64'
                                },
                            },
                        ],
                    },
                    {
                        test:/\.(png|jpg|gif)$/,
                        loader: 'url-loader',
                        options: {
                          limit: 8192,
                            name: '[path][name].[ext]',
                        },
                    },
                    {
                        test: /\.css$/,
                        use : [
                            {
                                    loader: 'style-loader',
                            },
                            {
                                    loader: 'css-loader',
                                    options: {
                                            sourceMap: true,
                                    }
                            }
                        ]
                     },
                     {
                        test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
                        use: [
                          {
                            loader: 'file-loader',
                            options: {
                              name: '[path][name].[ext]',
                            }
                          }
                        ]
                      }
                ]
            },
            plugins: [
                new HtmlWebpackPlugin({
                    template: "./public/template/index.html"
                }),
            ]
        },
        modeConfiguration(argv.mode)
    );
};
