const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const CompressionPlugin = require('compression-webpack-plugin');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const webpack = require("webpack");
const path = require("path");
//const globSync = require("glob").sync;
const { VueLoaderPlugin } = require('vue-loader');

function findPara(param){
    let result = '';
    process.argv.forEach((argv)=>{
        if(argv.indexOf('--' + param) === -1) return;
        result = argv.split('=')[1];
    });
    return  result;
}

const btype = findPara('btype');

let wp_entry =  "./src/index.js";
let wp_filename = "main.js";

// switch (btype) {
//     case 'neworder':
//         wp_entry = "./src/index-neworder.js";
//         wp_filename = "neworder.js";
//         break;
//     case 'empty':
//         wp_entry =  "./src/index-empty.js";
//         wp_filename = "empty.js";
//         break;
//     default:
//         wp_entry =  "./src/index.js";
//         wp_filename = "main.js";
//         break;
// }

let webpack_options = {
    entry: [
        wp_entry
    ],
    devServer: {
        contentBase: "./dist"
    },
    devtool: "source-map",
    node: {
        fs: 'empty'
    },
    externals: {
        jquery: 'jQuery'
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: "../"
                        }
                    },
                    "css-loader",
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: function () {
                                return [
                                    require('precss'),
                                    require('autoprefixer')
                                ];
                            }
                        }
                    },
                    "sass-loader"
                ]
            },
            {
                test: /\.(png|jpg|gif|svg|webp)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "[name].[ext]",
                            outputPath: "img/"
                        }
                    }
                ]
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"]
                    }
                }
            },
            {
                test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'fonts/'
                        }
                    }
                ]
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            // filename: "css/[name].[contenthash].css"
            filename: "css/[name].css"
        }),
        new CleanWebpackPlugin(["dist"]),
        new webpack.ProvidePlugin({
            // Popper: ["popper.js", "default"],
            Util: "exports-loader?Util!bootstrap/js/dist/util",
            Dropdown: "exports-loader?Dropdown!bootstrap/js/dist/dropdown"
        }),
        new VueLoaderPlugin(),
    ],
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true,
                extractComments: false
            }),
            // new CompressionPlugin({
            //     test: /\.js$|\.css(\?.*)?$/i
            // }),
            new OptimizeCSSAssetsPlugin({})
        ]
    },
    output: {
        filename: wp_filename,
        path: path.resolve(__dirname, "../"),
        publicPath: ""
    }
};
if(btype == "neworder") {
    webpack_options.resolve ={
        alias: {
            vue: path.resolve('node_modules','vue/dist/vue.js'),
        }
    };
} else {
    webpack_options.module.rules.push({
        test: /\.(html)$/,
        use: {
            loader: "html-srcsets-loader",
            options: {
                attrs: [":src", ':srcset']
            }
        }
    });
    webpack_options.resolve ={
        alias: {
            vue: path.resolve('node_modules','vue/dist/vue.js'),
        }
    };
    //webpack_options.plugins.push(...globSync("src/**/*.html").map(fileName => {
   /*     return new HtmlWebpackPlugin({
            template: fileName,
            inject: "body",
            filename: fileName.replace("src/", "")
        });
    })); */
}



module.exports = (env, options) => (webpack_options);
