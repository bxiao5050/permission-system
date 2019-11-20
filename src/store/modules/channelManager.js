import { getChannelListApi, addChannelDataApi, changeChannelDataApi } from '@/api/index'
const channelManager = {
    state: {

    },
    mutations: {

    },
    getters: {

    },
    actions: {
        // 获取游戏列表
        getChannelList({ commit }, params) {
            return new Promise((resolve, reject) => {
                getChannelListApi(params).then(response => {
                    const data = response.state
                    resolve(data)
                }).catch(error => {
                    console.log('catch:', error.data);
                })
            })
        },
        // 新增渠道包
        addChannelData({ commit }, params) {
            return new Promise((resolve, reject) => {
                addChannelDataApi(params).then(response => {
                    const data = response.state
                    resolve(data)
                }).catch(error => {
                    console.log('catch:', error.data);
                })
            })
        },
        // 修改渠道包
        changeChannelData({ commit }, params) {
            return new Promise((resolve, reject) => {
                changeChannelDataApi(params).then(response => {
                    const data = response.state
                    resolve(data)
                }).catch(error => {
                    console.log('catch:', error.data);
                })
            })
        },



    }

}
export default channelManager