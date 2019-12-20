// webpack.config.js

const path = require("path");
const webpackMerge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WorkboxPlugin = require('workbox-webpack-plugin');
const modeConfiguration = mode => require(`./build-utils/webpack.${mode}`)(mode);

module.exports = (env, argv) => {
    console.log(`mode is: ${argv.mode}`);

    return webpackMerge(
        {
            mode: argv.mode,
            entry: "./src/index.tsx",
            output: {
                publicPath: "/",
                path: path.resolve(__dirname, "build"),
                filename: "bundled.js"
            },
            resolve: {
                extensions: ['.ts', '.tsx', '.js', '.json']
            },
            module: {
                rules: [
                    {
                        test: /\.tsx?$/,
                        loader: 'babel-loader',
                    },
                    {
                        test: /\.js$/,
                        use: ["source-map-loader"],
                        enforce:    "pre"
                    },
                    {//Should remove this rule after JS Migration to TS is Done.
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
                new WorkboxPlugin.GenerateSW({
                           // these options encourage the ServiceWorkers to get in there fast
                           // and not allow any straggling "old" SWs to hang around
                           clientsClaim: true,
                           skipWaiting: true,
                         }),
            ]
        },
        modeConfiguration(argv.mode)
    );
};
