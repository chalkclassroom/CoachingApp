// webpack.config.js

const path = require("path");
const webpackMerge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const modeConfiguration = env => require(`./build-utils/webpack.${env}`)(env);

module.exports = ({ mode } = { mode: "development" }) => {
    console.log(`mode is: ${mode}`);

    return webpackMerge(
        {
            mode,
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
                                    name: '/assets/images/[name].[ext]',
                                    encoding: 'base64'
                                },
                            },
                        ],
                    },
                    {
                        test:/\.(png|jpg|gif)$/,
                        loader: 'url-loader',
                        options: {
                          limit: 100000,
                            name: '/assets/images/[name].[ext]',
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
                              name: '[name].[ext]',
                              outputPath: "/assets/fonts"
                            }
                          }
                        ]
                      }
                ]
            },
            plugins: [
                new HtmlWebpackPlugin({
                    template: "./public/index.html"
                }),
            ]
        },
        modeConfiguration(mode)
    );
};