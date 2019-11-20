import { getSystemListApi, addSystemDataApi, changeSystemDataApi } from '@/api/index'
const roleManager = {
    state: {
        systemSequence: -1,
        changeSystem: null,
    },
    mutations: {
        SET_SYSTEM_SEQUENCE(state, data) {
            state.systemSequence = data;

        },
        SET_CHANGE_INFO(state, data) {
            state.changeSystem = data;
        }
    },
    getters: {

    },
    actions: {
        // 获取系统列表
        getSystemList({ commit }, params) {
            return new Promise((resolve, reject) => {
                getSystemListApi(params).then(response => {
                    const data = response.state
                    commit("SET_SYSTEM_SEQUENCE", data.length + 1)
                    resolve(data)
                }).catch(error => {
                    console.log('catch:', error.data);
                })
            })
        },
        // 新增系统
        addSystemData({ commit }, params) {
            return new Promise((resolve, reject) => {
                addSystemDataApi(params).then(response => {
                    const data = response.state
                    resolve(data)
                }).catch(error => {
                    console.log('catch:', error.data);
                })
            })
        },
        // 修改系统
        changeSystemData({ commit }, params) {
            return new Promise((resolve, reject) => {
                changeSystemDataApi(params).then(response => {
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