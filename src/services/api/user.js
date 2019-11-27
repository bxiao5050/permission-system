import http from '../http'

export default {
  /**
   * OA用户登录
   * @params {*} params
   */
  OALogin : (params) => {
    return http.jsonp("/admin/login", params);
  },
  /**
   * 获取系统游戏
   */
  getSystemGame:(params)=>{
    return http.jsonp("/admin/games", params);
  },
  /**
   * 改变当前游戏
   */
  OAChange : (params) => {
    return http.jsonp('/admin/change', params);
  },
  /**
   * 获取OA菜单
   */
  getOAMenus : (params) => {
    return http.jsonp('/user/OAMenus', params);

  },
  /**
   * 获取菜单权限
   */
  // getPowerMenus : (params) => {
  //   return http.jsonp("/permiss/menus", params);
  // },
  /**
   * 获取区服权限
   */
  // getPowerZones : (params) => {
  //   return http.jsonp("/permiss/zones", params);
  // },
  /**
   * 获取区服权限
   */
  // getPowerChannels : (params) => {
  //   return http.jsonp("/permiss/channels", params);
  // },
  /**
   * 菜单权限授权
   */
  // setPowerMenus : (params) => {
  //   return http.post("/add/grant/menus", params);
  // },
  /**
   * 区服权限授权
   */
  // setPowerZones : (params) => {
  //   return http.post("/add/grant/zones", params);
  // },
  /**
   * 渠道权限授权
   */
  // setGrantChannels : (params) => {
  //   return http.post('/add/grant/channels', params);
  // },
  /**
   * 查询所有角色
   */
  getActorList : (params) => {
    return http.jsonp('/admin/actor/list', params);
  },
  /**
   * 添加角色
   */
  addActor : (params) => {
    return http.jsonp('/actor/add', params);
  },
  /**
   * 获取菜单渠道权限
   */
  getActorMenus : (params) => {
    return http.jsonp('/actor/menus', params);
  },
  /**
   * 获取区服渠道权限
   */
  getActorZones : (params) => {
    return http.jsonp('/actor/zones', params);
  },
  /**
   * 获取角色渠道权限
   */
  getActorChannels : (params) => {
    return http.jsonp('/actor/channels', params);
  },
  /**
   * 获取付费渠道权限
   */
  getActorPayChannels : (params) => {
    return http.jsonp("/actor/paychannels", params);
  },


  /**
   * 授予角色菜单权限
   */
  setActorMenus : (params) => {
    return http.post('/actor/grant/menus', params);
  },
  /**
   * 授予角色区服权限
   */
  setActorZones : (params) => {
    return http.post('/actor/grant/zones', params);
  },
  /**
   * 授予角色渠道权限
   */
  setActorChannels : (params) => {
    return http.post('/actor/grant/channels', params);
  },
  /**
   * 付费渠道权限授权
   */
  setActorPayChannels : (params) => {
    return http.post('/actor/grant/paychannels', params);
  },


  /**
   * 给用户设置角色权限
   */
  setActorForUser : (params) => {
    return http.jsonp('/admin/actor/grant', params);
  },
  
  /**
   * 获取用户列表
   */
  getUsers : (params) => {
    return http.jsonp('/admin/user/list', params);
  },
  /**
   * 移除用户角色
   */
  removeUserRole : (params) => {
    return http.jsonp('/admin/actor/unAuActor',params);
  }
}
