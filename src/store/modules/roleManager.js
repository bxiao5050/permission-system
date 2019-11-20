import {
    getRoleListApi,
    addNewUserDataApi,
    changeRoleInfoApi,
    addRolePowerApi,
    removeRolePowerApi,
    getRolePowerApi
} from '@/api/index'
const roleManager = {
    state: {
        roleList: [],
        systemType: [],
        powerData: [],
    },
    mutations: {
        SET_ROLE_LIST(state, data) {
            state.roleList = data;
        },
        SET_SYSTEM_TYPE(state, data) {
            state.systemType = data;
        },
        SET_POWER_MENU(state, data) {
            state.powerData = data
        }
    },
    getters: {

    },
    actions: {
        // 获取角色列表
        getRoleList({
            commit
        }) {
            return new Promise((resolve, reject) => {
                getRoleListApi().then(response => {
                    const data = response.state
                    let systemName = [...new Set(data.map((todo) => todo.systemName))]
                    let systemType = [...new Set(data.map((todo) => todo.systemType))]
                    let systemOptions = systemName.map((todo, i) => {
                        return {
                            label: todo,
                            value: systemType[i]
                        }
                    });
                    commit("SET_ROLE_LIST", response.state)
                    commit("SET_SYSTEM_TYPE", systemOptions)
                    resolve({
                        data: data,
                        systemOptions: systemOptions
                    })
                }).catch(error => {
                    console.log('catch:', error.data);
                })
            })
        },
        // 获取角色当前权限菜单
        getRolePower({
            commit
        }, params) {
            return new Promise((resolve, reject) => {
                getRolePowerApi(params).then(response => {
                    const data = response.state
                    let menuData = []
                        // if (!!data) {
                        //     menuData = [...new Set(data.map(todo => todo.resourceType))].map(item => {
                        //         return { label: item, value: item };
                        //     });
                        //     for (let index = 0; index < menuData.length; index++) {
                        //         menuData[index].children = data.filter(todo => todo.resourceType === menuData[index].label).map((todo) => { return { gameId: todo.gameId, label: todo.resourceName, value: todo.id, } })
                        //         if (!!menuData[index].children) {
                        //             for (let msg = 0; msg < menuData[index].children.length; msg++) {
                        //                 let params = menuData[index].children[msg]
                        //                 let childrenData = data.filter(todo => (todo.gameId === params.gameId && todo.resourceName === params.label))
                        //                 menuData[index].children[msg].children = childrenData[0].children.map(todo => { return { label: todo.resourceName, value: todo.id, children: todo.children.map(todo => { return { label: todo.resourceName, value: todo.id } }) } })
                        //                 menuData[index].children[msg].children.forEach(element => {!element.children.length && delete element.children });
                        //             }
                        //         }
                        //         menuData[index].children.forEach(element => {!element.children.length && delete element.children });
                        //     }
                        // }
                    commit("SET_POWER_MENU", menuData)
                    resolve(data)
                }).catch(error => {
                    console.log('catch:', error.data);
                })
            })
        },
        // 新增角色
        addNewUserData({
            commit
        }, params) {
            return new Promise((resolve, reject) => {
                addNewUserDataApi(params).then(response => {
                    const data = response.state
                    resolve(data)
                }).catch(error => {
                    console.log('catch:', error.data);
                })
            })
        },
        // 修改角色
        changeRoleInfo({
            commit
        }, params) {
            return new Promise((resolve, reject) => {
                changeRoleInfoApi(params).then(response => {
                    const data = response.state
                    resolve(data)
                }).catch(error => {
                    console.log('catch:', error.data);
                })
            })
        },
        // 角色赋权
        addRolePower({
            commit
        }, params) {
            return new Promise((resolve, reject) => {
                addRolePowerApi(params).then(response => {
                    const data = response.state
                    resolve(data)
                }).catch(error => {
                    console.log('catch:', error.data);
                })
            })
        },
        // 角色移权
        removeRolePower({
            commit
        }, params) {
            return new Promise((resolve, reject) => {
                removeRolePowerApi(params).then(response => {
                    const data = response.state
                    resolve(data)
                }).catch(error => {
                    console.log('catch:', error.data);
                })
            })
        },
    }

}
export default roleManager