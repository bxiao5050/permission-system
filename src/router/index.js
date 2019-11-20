import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [{
            path: '/',
            redirect: '/userManager'
        },
        {
            path: '/',
            component: () =>
                import ( /* webpackChunkName: "home" */ '../components/common/Home.vue'),
            meta: { title: '自述文件' },
            children: [{
                    path: '/user-*',
                },
                {
                    path: '/userManager',
                    component: () =>
                        import ('../components/page/userManager/index.vue'),
                    meta: { title: '用户管理' }
                },
                {
                    path: '/roleList',
                    component: () =>
                        import ('../components/page/roleList/index.vue'),
                    meta: { title: '角色列表' }
                },
                {
                    path: '/systemManager',
                    component: () =>
                        import ('../components/page/systemManager/index.vue'),
                    meta: { title: '系统管理' }
                },
                {
                    path: '/menusManager',
                    component: () =>
                        import ('../components/page/menusManager/index.vue'),
                    meta: { title: '菜单管理' }
                },
                {
                    path: '/zoneManager',
                    component: () =>
                        import ('../components/page/zoneManager/index.vue'),
                    meta: { title: '区服管理' }
                },
                {
                    path: '/gameList',
                    component: () =>
                        import ('../components/page/gameList/index.vue'),
                    meta: { title: '游戏列表' }
                },
                {
                    path: '/channelManager',
                    component: () =>
                        import ('../components/page/channelManager/index.vue'),
                    meta: { title: '渠道管理' }
                },
                {
                    path: '/404',
                    component: () =>
                        import ('../components/page/404.vue'),
                    meta: { title: '404' }
                },
            ]
        },
        {
            path: '/login',
            component: () =>
                import ('../components/page/Login.vue'),
            meta: { title: '登录' }
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
});