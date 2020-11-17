// webpack.common.js
const path = require('path');  // 路径处理模块
const webpack = require('webpack');  // 这个插件不需要安装，是基于webpack的，需要引入webpack模块
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 引入HtmlWebpackPlugin插件
const MiniCssExtractPlugin = require('mini-css-extract-plugin') //引入分离插件,webpack4废弃extract-text-webpack-plugin，改用mini-css-extract-plugin
const  CssMinimizerPlugin  =  require('css-minimizer-webpack-plugin');
//const devMode = process.env.NODE_ENV !== 'production';
const {VueLoaderPlugin}=require('vue-loader');


module.exports = {
    entry: {
        index: path.join(__dirname, "/src/index.js"), // 第一个入口文件
        two:path.join(__dirname,"/src/two.js"),  //第二个入口文件
        //three:path.join(__dirname,"/src/three.js")  //第三个入口文件
    },
    output: {
        path: path.join( __dirname, "/dist"), //打包后的文件存放的地方
        filename: "[name].js" //打包后输出文件的文件名
    },
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/,
                // use: [
                //   MiniCssExtractPlugin.loader,
                //   'css-loader',
                //   'postcss-loader',
                //   'sass-loader',
                // ],
                use: [
                    {
                      loader: MiniCssExtractPlugin.loader,
                      options: {
                        // 这里可以指定一个 publicPath
                        // 默认使用 webpackOptions.output中的publicPath
                        publicPath: '../'
                      },
                    },
                    'css-loader','postcss-loader','sass-loader',
                ],
            },
            {                             // jsx配置
                test: /(\.jsx|\.js)$/,   
                use: {                    // 注意use选择如果有多项配置，可写成这种对象形式
                    loader: "babel-loader"
                },
                exclude: /node_modules/   // 排除匹配node_modules模块
            },
            {
                test: /\.(png|jpg|svg|gif)$/,  // 正则匹配图片格式名
                use: [
                    {
                        loader: 'url-loader',  // 使用url-loader
                        options:{
                            limit:1024,  // 限制只有小于1kb的图片才能转为base64
                            outputPath:'images' //设置打包后图片存放文件夹名称
                        }
                    }
                ]
            },
        ]
    },
    plugins: [
        new webpack.BannerPlugin('版权所有，翻版必究'),  // new一个插件的实例 
        //new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "/src/index-template.html"),// new一个这个插件的实例，并传入相关的参数
            inject: 'body',
            minify: {
                removeComments: true
            }
        }),
        new webpack.HotModuleReplacementPlugin(),
        new MiniCssExtractPlugin({
            //filename:({ chunk }) => `${chunk.name.replace('/js/', '/css/')}.css`,
            filename:'css/[name].css',
            chunkFilename:'css/[id].css'
        }) // 将css分离到/dist文件夹下
    ],
    optimization: {
        minimizer: [
          new CssMinimizerPlugin(),
        ],
    },
}