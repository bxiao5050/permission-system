import { getGameListApi, addGameDataApi, changeGameDataApi } from '@/api/index'
const gameList = {
    state: {

    },
    mutations: {

    },
    getters: {

    },
    actions: {
        // 获取游戏列表
        getGameList({ commit }, params) {
            return new Promise((resolve, reject) => {
                getGameListApi(params).then(response => {
                    const data = response.state
                    resolve(data)
                }).catch(error => {
                    console.log('catch:', error.data);
                })
            })
        },
        // 新增游戏
        addGameData({ commit }, params) {
            return new Promise((resolve, reject) => {
                addGameDataApi(params).then(response => {
                    const data = response.state
                    resolve(data)
                }).catch(error => {
                    console.log('catch:', error.data);
                })
            })
        },
        // 修改游戏
        changeGameData({ commit }, params) {
            return new Promise((resolve, reject) => {
                changeGameDataApi(params).then(response => {
                    const data = response.state
                    resolve(data)
                }).catch(error => {
                    console.log('catch:', error.data);
                })
            })
        },



    }

}
export default gameList