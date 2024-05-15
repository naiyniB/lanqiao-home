const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
// vue-loader 16 起，VueLoaderPlugin 已经被包含在内
// 不再需要引用 vue-loader/lib/plugin
const { VueLoaderPlugin } = require("vue-loader");


module.exports = {
  mode: "development", // 设置模式为开发模式，生产模式为 'production'
  // js 打包入口
  entry: {
    index: "./src/index.js",
    about: "./src/about.js",
  },
  // 打包文件存放处
  output: {
    // 使用模板字符串来定义输出文件名
    filename: "[contenthash:5].js", // 使用[name]占位符，它会被替换为entry中的键 [contenthash]用打包文件的hash [打包文件的id]
    path: __dirname + "/dist",
  },
  // webpack的module是不是根据rules将不同的文件后缀按照vue-loader提供的功能转化为js的代码【个人理解】
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: "vue-loader",
      },
      {
        test: /\.css$/,
        use: [
          // 数组中的loader是按照从后向前的顺序执行的
          "style-loader", // 2 先将 CSS 转换为 style 元素并注入到页面中
          "css-loader", // 1 解析 @import 和 url()，将 CSS 转换 js代码
         
          // ...
        ],
      },
      // 可以根据需要添加更多的文件类型规则
    ],
  },
  plugins: [
    // 此处可以添加各种插件，例如：
    new VueLoaderPlugin(),
    // vue-loader 需要配合 VueLoaderPlugin 一起使用 vue-cli自动的配置好

    new HtmlWebpackPlugin({
      template: "./public/about.html", // 使用模板自动生成 HTML 文件
      inject: "body",
      chunks: ["about"],
      //chunks 数组中的名称需要与 webpack 配置中的 entry 属性的键相匹配
      filename: "about.html",
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      inject: "body",
      chunks: ["index"],
      //chunks 数组中的名称需要与 webpack 配置中的 entry 属性的键相匹配
      filename: "index.html",
    }),
    // 它的作用是自动化生成 HTML 文件，这个文件可以包含你应用程序的 Webpack 生成的 bundle。

    // 可以根据需要添加更多的插件
  ],

  // webpack 只能理解 JavaScript 和 JSON 文件
  // loader 让 webpack 能够去处理其他类型的文件，并将它们转换为有效[模块]
  // webpack 的其中一个强大的特性就是能通过 import 导入任何类型的模块（例如 .css 文件）

  devServer: {
   
    static: {
      directory: __dirname+'dist', // 指定静态文件目录 webpack5 的方案
    },
    // contentBase: path.join(__dirname, "dist"), // 本地服务器文件根目录
    host: "0.0.0.0", // 监听地址，0.0.0.0 表示监听所有地址
    port: 8080, // 本地服务器端口号
    // 可以根据需要添加更多的开发服务器配置
  },
};
