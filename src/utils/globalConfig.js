// let声明变量只能在当前大括号内使用
let env = process.env.NODE_ENV
// const声明的是常亮,默认不可改变
// 开发地址
const devUrl = 'http://127.0.0.1:9999'
// 生产环境地址
const prodUrl = 'http://127.0.0.1:8888'
// 备用地址
const backUpUrl = 'http://127.0.0.1:10086'
const baseUrl = env === 'development' ? devUrl : env === 'production' ? prodUrl : backUpUrl
export default baseUrl
