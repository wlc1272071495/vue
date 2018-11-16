
一、path的join和resolve的使用区别
1.连接路径：path.join([path1][, path2][, ...])
path.join()方法可以连接任意多个路径字符串。要连接的多个路径可做为参数传入。

path.join()方法在接边路径的同时也会对路径进行规范化。例如：

var path = require('path'); 
//合法的字符串连接 
path.join('/foo', 'bar', 'baz/asdf', 'quux', '..') 
// 连接后 
'/foo/bar/baz/asdf' 

//不合法的字符串将抛出异常 
path.join('foo', {}, 'bar') 
// 抛出的异常 TypeError: Arguments to path.join must be strings'



2.路径解析：path.resolve([from ...], to)
path.resolve()方法可以将多个路径解析为一个规范化的绝对路径。其处理方式类似于对这些路径逐一进行cd操作，与cd操作不同的是，这引起路径可以是文件，并且可不必实际存在（resolve()方法不会利用底层的文件系统判断路径是否存在，而只是进行路径字符串操作）。例如：

path.resolve('foo/bar', '/tmp/file/', '..', 'a/../subfile')
相当于

cd foo/bar
cd /tmp/file/
cd ..
cd a/../subfile
pwd
例子：

path.resolve('/foo/bar', './baz') 
// 输出结果为 
'/foo/bar/baz' 
path.resolve('/foo/bar', '/tmp/file/') 
// 输出结果为 
'/tmp/file' 

path.resolve('wwwroot', 'static_files/png/', '../gif/image.gif') 
// 当前的工作路径是 /home/itbilu/node，则输出结果为 
'/home/itbilu/node/wwwroot/static_files/gif/image.gif'
3.对比
const path = require('path'); 
let myPath = path.join(__dirname,'/img/so'); 
let myPath2 = path.join(__dirname,'./img/so'); 
let myPath3 = path.resolve(__dirname,'/img/so'); 
let myPath4 = path.resolve(__dirname,'./img/so'); 
console.log(__dirname); //D:\myProgram\test 
console.log(myPath); //D:\myProgram\test\img\so 
console.log(myPath2); //D:\myProgram\test\img\so 
console.log(myPath3); //D:\img\so<br> 
console.log(myPath4); //D:\myProgram\test\img\so



二、webpack-dev-server 配置详解
devServer:{
        contentBase:path.resolve(path,"dist"),  //用来指定index.html所在目录
        publicPath:"/",                         //用来指定上线时运行地址
        host:"127.0.0.1",
        port:"3000",
        hot:true,                                //表示热加载，使用Inline:true可以自动刷新
        inline:true,
        historyApiFallback:true,                 // html5 history API 
        disableHostCheck:true                     //不检查host地址
    } 


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
            }
 }

 