import { getUserListApi, addUserDataApi, delUserDataApi, changeInfoDatApi, getRoleInfoApi, addRoleDataApi, removeRoleDataApi } from '@/api/index'

const user = {
    state: {
        userList: [],
        roleInfoData: {},
        currentInfoData: {},
    },

    mutations: {
        SET_USER_LIST(state, data) {
            state.userList = data;
        },
        SET_ROLE_INFO(state, data) {
            state.roleInfoData = data
        },
        SET_CURRENT_INFO(state, data) {
            state.currentInfoData = data
        },
    },
    getters: {
        returnRoleInfo(state) {
            let roleInfo = {
                allRole: [],
                systemOptions: [],
            };
            if (state.roleInfoData.allRole) {
                let systemName = [...new Set(state.roleInfoData.allRole.map((todo) => todo.systemName))]
                let systemType = [...new Set(state.roleInfoData.allRole.map((todo) => todo.systemType))]
                roleInfo.systemOptions = systemName.map((todo, i) => { return { label: todo, value: systemType[i] } });
                roleInfo.allRole = state.roleInfoData.allRole;
                !!state.roleInfoData.allRole.length && (roleInfo.currentRole = state.roleInfoData.currentRole);
            }
            return roleInfo
        }
    },
    actions: {
        // 获取用户列表
        getUserList({ commit }) {
            return new Promise((resolve, reject) => {
                getUserListApi().then(response => {
                    const data = response.state
                    commit("SET_USER_LIST", response.state)
                    resolve(data)
                }).catch(error => {
                    console.log('catch:', error.data);
                })
            })
        },
        //添加用户
        addUserData({ commit }, params) {
            return new Promise((resolve, reject) => {
                addUserDataApi(params).then(response => {
                    const data = response.state
                    resolve(data)
                }).catch(error => {
                    console.log('catch:', error.data);
                })
            })
        },
        // 删除 && 修改用户
        delUserData({ commit }, params) {
            return new Promise((resolve, reject) => {
                delUserDataApi(params).then(response => {
                    const data = response.state
                    resolve(data)
                }).catch(error => {
                    console.log('catch:', error.data);
                })
            })
        },
        // 修改信息
        changeInfoData({ commit }, params) {
            return new Promise((resolve, reject) => {
                changeInfoDatApi(params).then(response => {
                    const data = response.state
                    resolve(data)
                }).catch(error => {
                    console.log('catch:', error.data);
                })
            })
        },
        // 获取角色信息
        getRoleInfo({ commit, getter }, params) {
            return new Promise((resolve, reject) => {
                getRoleInfoApi().then(response => {
                    const value = response.state
                    getRoleInfoApi(params).then(response => {
                        const data = response.state
                        commit("SET_ROLE_INFO", { allRole: value, currentRole: response.state })
                        resolve({ allRole: value, currentRole: response.state })
                    }).catch(error => {
                        console.log('catch:', error.data);
                    })
                }).catch(error => {
                    console.log('catch:', error.data);
                })
            })
        },
        // 获取当前角色
        getCurrentRole({ commit }, params) {
            return new Promise((resolve, reject) => {
                getRoleInfoApi(params).then(response => {
                    const data = response.state
                    commit("SET_CURRENT_INFO", data)
                    resolve(data)
                }).catch(error => {
                    console.log('catch:', error.data);
                })
            })
        },
        // 添加用户角色
        addRoleData({ commit }, params) {
            return new Promise((resolve, reject) => {
                addRoleDataApi(params).then(response => {
                    const data = response.state
                    resolve(data)
                }).catch(error => {
                    console.log('catch:', error.data);
                })
            })
        },
        // 移除角色
        removeRoleData({ commit }, params) {
            return new Promise((resolve, reject) => {
                removeRoleDataApi(params).then(response => {
                    const data = response.state
                    resolve(data)
                }).catch(error => {
                    console.log('catch:', error.data);
                })
            })
        },


    }
}
export default user