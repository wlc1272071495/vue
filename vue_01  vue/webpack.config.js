
var path = require("path");
var webpack = require("webpack");
var extractTextWebpackPlugin = require("extract-text-webpack-plugin")
var htmlWebpackPlugin = require("html-webpack-plugin");
var openBrowserWebpackPlugin = require("open-browser-webpack-plugin")

module.exports = {
    entry:{
        path:path.resolve(path,"./src/index.js")
    },
    outry:{
        path:path.resolve(path,"./dist"),
        name:'js/[name][hash:8].js'
    },
    devServer:{
        contentBase:path.resolve(path,"dist"),  //用来指定index.html所在目录
        publicPath:"/",                         //用来指定上线时运行地址
        host:"127.0.0.1",
        port:"3000",
        hot:true,                                //表示热加载，使用Inline:true可以自动刷新
        inline:true,
        historyApiFallback:true,                 // html5 history API 
        disableHostCheck:true                     //不检查host地址
    },
    devTool:{
        sourceMap:true
    },
    module:{
        relus:[
            {
                test:/\.js[x]?$/,
                use:"babel-loader",
                exclude:path.resolve(__dirname,"node_modules")

            },{
                test:/\.[css|scss]$/,
                use:extractTextWebpackPlugins({
                    fallback:"style-load",
                    use:["css-load",{
                        loader:"postcss-loader",
                        options:{
                            plugins:function(){
                                return [
                                    require("cssgrace"),   //CSS Grace 让CSS兼容旧版IE, 中文文档: https://github.com/cssdream/cssgrace/blob/master/README-zh.md
                                    require("postcss-px2rem")({remUnit:100}),  //将px转化成rem   使用插件：注意下列代码的75代表了1rem对应的px值，这个值根据设计师提供的设计图的总宽度/10决定。如果设计图的总宽度是以750px为标准，则填写75；如果是375px，则填写37.5；以此类推……
                                    require("autoprefixer")  //Autoprefixer 为CSS补全浏览器前缀   中文文档: https://github.com/postcss/autoprefixer
                                ]
                            }
                        }
                    },"scss-load"]
                })
            },{
                test:/\.[css|less]$/,
                use:extractTextWebpackPlugins({
                    fallback:"style-loader",
                    use:["css-load",{
                        loader:"postcss-loader",
                        options:function(){
                            return [
                                require("cssprace"),
                                require("postcss-px2rem")({remUnit:100}),
                                require("autoprefixer")()

                             ]
                        }
                    },"less-load"]
                })
         },{
             test:/\.[png|jpg|gif|svg|woff|eto|ttf]\??.$/,
             use:["url-load?limit=8192&name=font/[name].[hash:8].[ext]"]
         }
        
        ]
    },
    plugins:[
        new htmlWebpackPlugins({
            template:"./src/index.html",
            inject:true
        }),
        new openBrowserWebpackPlugin({
            url:"127.0.0.1:3000"
        }),
        new extractTextWebpackPlugin({
            filename:"app.[hash:8].css",  //结果文件的名称。可能包含[name]，[id]和[contenthash]
            allChunks:true, 
            //从所有其他块中提取（默认情况下，它仅从最初的块中提取） 当使用CommonsChunkPlugin并且公共块中有ExtractTextPlugin.extract块时，allChunks必须设置为true
            disable:true    //	Disables the plugin
        })
    ]
}