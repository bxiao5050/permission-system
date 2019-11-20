import request from '../utils/request.js';
import Qs from 'qs'
//登录
export function login(query) {
    return request({
        url: '/admin/login',
        method: 'post',
        data: Qs.stringify(query)
    })
}
// 获取用户列表
export function getUserListApi() {
    return request({
        url: '/user/list',
        method: 'get',
    })
}
// 添加用户
export function addUserDataApi(query) {
    return request({
        url: '/user/add',
        method: 'post',
        data: Qs.stringify(query)
    })
}
// 删除 && 修改用户
export function delUserDataApi(query) {
    return request({
        url: '/user/edit',
        method: 'post',
        data: Qs.stringify(query)
    })
}
// 修改用户信息
export function changeInfoDatApi(query) {
    return request({
        url: '/user/edit',
        method: 'post',
        data: Qs.stringify(query)
    })
}
// 获取所有用户角色信息
export function getRoleInfoApi(query) {
    return request({
        url: '/role/list',
        method: 'post',
        data: Qs.stringify(query)
    })
}
// 添加用户角色
export function addRoleDataApi(query) {
    return request({
        url: '/user/addRole',
        method: 'post',
        data: Qs.stringify(query)
    })
}
// 角色移除
export function removeRoleDataApi(query) {
    return request({
        url: '/user/removeRole',
        method: 'post',
        data: Qs.stringify(query)
    })
}
/*********************************************************************************************/
/*********************************************************************************************/
/*********************************************************************************************/
// 获取角色管理角色列表
export function getRoleListApi(query) {
    return request({
        url: '/role/list',
        method: 'get',
    })
}
// 角色管理>>>添加新角色
export function addNewUserDataApi(query) {
    return request({
        url: '/role/add',
        method: 'post',
        data: Qs.stringify(query)
    })
}
// 角色管理 >>> 修改角色
export function changeRoleInfoApi(query) {
    return request({
        url: '/role/edit',
        method: 'post',
        data: Qs.stringify(query)
    })
}
//角色赋权
export function addRolePowerApi(query) {
    return request({
        url: '/role/grant',
        method: 'post',
        data: Qs.stringify(query)
    })
}

// 角色移权
export function removeRolePowerApi(query) {
    return request({
        url: '/role/remove',
        method: 'post',
        data: Qs.stringify(query)
    })
}
// 获取角色权限
export function getRolePowerApi(query) {
    return request({
        url: '/role/grantList',
        method: 'post',
        data: Qs.stringify(query)
    })
}
/*********************************************************************************************/
/*********************************************************************************************/
/*********************************************************************************************/
// 获取系统列表
export function getSystemListApi(query) {
    return request({
        url: '/role/system',
        method: 'get',
    })
}
// 添加系统
export function addSystemDataApi(query) {
    return request({
        url: '/role/addsystem',
        method: 'post',
        data: Qs.stringify(query)
    })
}
// 修改系统
export function changeSystemDataApi(query) {
    return request({
        url: '/role/editsystem',
        method: 'post',
        data: Qs.stringify(query)
    })
}
/*********************************************************************************************/
/*********************************************************************************************/
/*********************************************************************************************/
// 获取游戏列表
export function getGameListApi(query) {
    return request({
        url: '/game/list',
        method: 'get',
    })
}
// 添加游戏
export function addGameDataApi(query) {
    return request({
        url: '/game/add',
        method: 'post',
        data: Qs.stringify(query)
    })
}
// 修改游戏
export function changeGameDataApi(query) {
    return request({
        url: '/game/edit',
        method: 'post',
        data: Qs.stringify(query)
    })
}
/*********************************************************************************************/
/*********************************************************************************************/
/*********************************************************************************************/
// 获取区服列表
export function getZoneListApi(query) {
    return request({
        url: '/game/zone/list',
        method: 'get',
        params: query
    })
}
// 添加区服
export function addZoneDataApi(query) {
    return request({
        url: '/game/zone/add',
        method: 'post',
        data: Qs.stringify(query)
    })
}
/*********************************************************************************************/
/*********************************************************************************************/
/*********************************************************************************************/
// 获取区服列表
export function getChannelListApi(query) {
    return request({
        url: '/game/channel/list',
        method: 'get',
        params: query
    })
}
// 新增渠道包
export function addChannelDataApi(query) {
    return request({
        url: '/game/channel/add',
        method: 'post',
        data: Qs.stringify(query)
    })
}
// 修改渠道包
export function changeChannelDataApi(query) {
    return request({
        url: '/game/channel/edit',
        method: 'post',
        data: Qs.stringify(query)
    })
}
/*********************************************************************************************/
/*********************************************************************************************/
/*********************************************************************************************/
// 获取菜单列表
export function getMenuListApi(query) {
    return request({
        url: '/menus/list',
        method: 'get',
        params: query
    })
}
// 修改菜单
export function changeMenuDataApi(query) {
    return request({
        url: '/menus/edit',
        method: 'post',
        data: Qs.stringify(query)
    })
}
// 添加菜单
export function addMenuDataApi(query) {
    return request({
        url: '/menus/add',
        method: 'post',
        data: Qs.stringify(query)
    })
}