module.exports = { 
    // baseUrl: process.env.NODE_ENV === 'production' ? './' : '/',
    // lintOnSave: process.env.NODE_ENV !== 'production',
    // pages: {
    //   index: {
    //     // page 的入口
    //     entry: 'src/main.js',
    //     // 模板来源
    //     template: 'public/index.html',
    //     // 在 dist/index.html 的输出
    //     filename: 'index.html'
    //   }   
    // },  
    devServer: {
      proxy: {
        '/api': {
          target: 'http://localhost:3001/',
          ws: true,
          changeOrigin: true,
          pathRewrite: {
            '/api': ''
          }   
        }   
      }   
    }
  }