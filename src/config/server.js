// const isDebug = !IS_PROD // 是否是本地开发 --由webpack配置的全局属性确定
const isOfficial = true // 是否是正式版本

// 测试/调试 地址
var test = {
  server: 'http://172.16.3.144:7011',
  // port: 7011,
  path: '/api/v1.0'
}

// 正式 地址
const official = {
  server: 'https://integeroas.pocketgamesol.com',
  // port: 7011,
  path: '/api/v1.0'
}

const serverConfig = isOfficial ? official : test

const serverUrl = serverConfig.server + serverConfig.path

export default {
  isOfficial: isOfficial,
  url: serverUrl
}