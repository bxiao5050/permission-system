import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'hash', // Demo is living in GitHub.io, so required!
  linkActiveClass: 'open active',
  routes: [{
      path: '/',
      name: 'index',
      redirect:'login',
      component: (resolve) => {
        require(['@/views/index.vue'], resolve)
      },
      children: [{
        path: 'role-manage',
        name: 'role-manage',
        component: (resolve) => {
          require(['@/views/modules/role-manage/index.vue'], resolve)
        }
      },{
        path: 'user-manage',
        name: 'user-manage',
        component: (resolve) => {
          require(['@/views/modules/user-manage/index.vue'], resolve)
        }
      }]
    },
    {
      path: '/login',
      name: 'login',
      component: (resolve) => {
        require(['@/views/login.vue'], resolve)
      }
    },{
      path: '*',
      redirect: 'login',
    }
  ]
})
