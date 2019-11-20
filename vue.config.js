const path = require('path')

function resolve(dir) {
  return path.join(__dirname, './', dir)
}
// cdn预加载使用

module.exports = {
    baseUrl: './',
    assetsDir: 'static',
    productionSourceMap: false,
    // devServer: {
    //     proxy: {
    //         '/api':{
    //             target:'http://jsonplaceholder.typicode.com',
    //             changeOrigin:true,
    //             pathRewrite:{
    //                 '/api':''
    //             }
    //         }
    //     }
    // }
}