import { getZoneListApi, addZoneDataApi } from '@/api/index'
const zoneManager = {
    state: {
        zoneList: []
    },
    mutations: {
        SET_ZONE_LIST(state, data) {
            state.zoneList = data
        }
    },
    getters: {

    },
    actions: {
        // 获取区服列表
        getZoneList({ commit }, params) {
            return new Promise((resolve, reject) => {
                getZoneListApi(params).then(response => {
                    const data = response.state
                    commit("SET_ZONE_LIST", data)
                    resolve(data)
                }).catch(error => {
                    console.log('catch:', error.data);
                })
            })
        },
        // 新增区服
        addZoneData({ commit }, params) {
            return new Promise((resolve, reject) => {
                addZoneDataApi(params).then(response => {
                    const data = response.state
                    resolve(data)
                }).catch(error => {
                    console.log('catch:', error.data);
                })
            })
        },
        // 修改区服
        // changeGameData({ commit },params) {
        //   return new Promise((resolve, reject) => {
        //     changeGameDataApi(params).then(response => {
        //       const data = response.state
        //       resolve(data)
        //     }).catch(error => {
        //       console.log('catch:', error.data);
        //     })
        //   })
        // }, 



    }

}
export default zoneManager