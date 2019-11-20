import { getMenuListApi, addMenuDataApi, changeMenuDataApi } from '@/api/index'
import Vue from 'vue'
const menusManager = {
    state: {
        tableAllData: [],
        tableData: [],
        menuData: [],
    },
    mutations: {
        SET_MENU_DATA(state, data) {
            state.menuData = data
        },
        SET_TABLE_ALL_DATA(state, data) {
            state.tableAllData = data
        },
        SET_TABLE_DATA(state, data) {
            state.tableData = data
        }
    },
    getters: {


    },
    actions: {
        // 获取菜单列表
        getMenuList({ dispatch, commit, getter }, params) {
            return new Promise((resolve, reject) => {
                getMenuListApi(params).then(response => {
                    const data = response.state
                    let menuData = []
                    if (!params.resourceIds && !params.isList) {
                        // 查菜单逻辑
                        commit('SET_MENU_DATA', data)
                    } else {
                        commit("SET_TABLE_DATA", data)
                        commit("SET_TABLE_ALL_DATA", data)
                    }
                    resolve()
                }).catch(error => {
                    console.log('catch:', error.data);
                })
            })
        },
        // 新增菜单
        addMenuData({ commit }, params) {
            return new Promise((resolve, reject) => {
                addMenuDataApi(params).then(response => {
                    const data = response.state
                    resolve(data)
                }).catch(error => {
                    console.log('catch:', error.data);
                })
            })
        },
        // 修改菜单
        changeMenuData({ commit }, params) {
            return new Promise((resolve, reject) => {
                changeMenuDataApi(params).then(response => {
                    const data = response.state
                    commit("SET_TABLE_DATA", data)
                    resolve(data)
                }).catch(error => {
                    console.log('catch:', error.data);
                })
            })
        },



    }

}
export default menusManager









function mapData(arr) {
    var child = node.children,
        arr = [];

    arr.push({ name: node.name });
    if (child) {
        child.forEach(function(node) {
            arr = arr.concat(traverseTree(node));
        });
    }
    return arr;
}

function traverseTree(arr) {
    var menuArr = []
    arr.forEach((todo) => {
        var children = todo.children
        todo.value = todo.id;
        todo.label = todo.resourceName
    })
    return arr
}