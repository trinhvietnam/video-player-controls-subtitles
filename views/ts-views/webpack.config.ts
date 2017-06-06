/**
 * Created by NamTV on 6/6/2017.
 */
var path = require("path");
var webpack = require("webpack");
module.exports = {
    devtool:'source-map',
    entry:["./ts-src/app.ts"],
    output:{
        path:path.resolve(__dirname,'./../../public/javascripts'),
        filename:'app.js'
    },
    module:{
        loaders:[{
            test:/\.ts$/,
            include:path.resolve(__dirname,'ts-src'),
            loader:'ts-loader'
        }]
    },
    resolve:{
        extensions:[".webpack.js",".web.js",".ts",".js"]
    }
}