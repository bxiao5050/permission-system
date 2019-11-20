import { login } from '@/api/index'

const user = {
    state: {
        name: '',
        avatar: '',
        roles: [],
        systemMenu: [],
    },

    mutations: {
        SET_SYSTEM_MENU(state, data) {
            state.systemMenu = data;
        },
    },
    actions: {
        // 登录
        Login({ commit }, userInfo) {
            return new Promise((resolve, reject) => {
                login(userInfo).then(response => {
                    const data = response.state
                        // 侧边栏导航菜单
                    let menu = []
                    let config_routes = []
                    for (let index = 0; index < response.state.length; index++) {
                        menu.push({ icon: 'el-icon-menu', index: response.state[index].url, title: response.state[index].resourceName })
                        if (response.state[index].children.length) {
                            let subs = []
                            for (let msg = 0; msg < response.state[index].children.length; msg++) {
                                subs.push({ icon: 'el-icon-menu', index: response.state[index].children[msg].url, title: response.state[index].children[msg].resourceName })
                                if (response.state[index].children[msg].children.length) {
                                    let data = response.state[index].children[msg].children;
                                    subs[msg].subs = [...data.map(todo => { return { icon: 'el-icon-menu', index: todo.url, title: todo.resourceName } })]
                                }
                            }
                            menu[index].subs = subs
                        }
                    }
                    sessionStorage.setItem('menu', JSON.stringify(menu[0].subs));
                    sessionStorage.setItem('ms_username', userInfo.userName);
                    commit("SET_SYSTEM_MENU", menu[0].subs)
                    resolve(data)
                }).catch(error => {
                    console.log('catch:', error.data);
                })
            })
        },
    }
}
export default user