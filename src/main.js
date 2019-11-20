import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'; // 默认主题
// import './assets/css/theme-green/index.css'; // 浅绿色主题
import './assets/css/icon.css';
import './components/common/directives';
import 'babel-polyfill';
Vue.config.productionTip = false;
Vue.use(ElementUI, {
    size: 'small'
});

Date.prototype.Format = function(fmt) { //author: meizz 
        var o = {
            "M+": this.getMonth() + 1, //月份 
            "d+": this.getDate(), //日 
            "h+": this.getHours(), //小时 
            "m+": this.getMinutes(), //分 
            "s+": this.getSeconds(), //秒 
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
            "S": this.getMilliseconds() //毫秒 
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    }
    //使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title} | permission-system`;
    const role = sessionStorage.getItem('ms_username');
    if (!role && to.path !== '/login') {
        next('/login');
    } else {
        // 简单的判断IE10及以下不进入富文本编辑器，该组件不兼容
        if (navigator.userAgent.indexOf('MSIE') > -1 && to.path === '/editor') {
            Vue.prototype.$alert('vue-quill-editor组件不兼容IE10及以下浏览器，请使用更高版本的浏览器查看', '浏览器不兼容通知', {
                confirmButtonText: '确定'
            });
        } else {
            // 获取菜单列表
            store.dispatch('getMenuList', { resourceIds: '', isList: 0 }).then((data) => {
                store.dispatch('getMenuList', { resourceIds: '', isList: 1 })
            });
            next();

        }
    }
});
Vue.prototype.$fiterMenu = function(arr) {
    var menuArr = []
    arr.forEach((todo) => {
        var children = todo.children
        todo.value = todo.id;
        todo.label = todo.resourceName;
        if (children && !!children.length) {
            children.forEach(function(todo) {
                var children = todo.children
                todo.value = todo.id;
                todo.label = todo.resourceName;
                if (children && !!children.length) {
                    Vue.prototype.$fiterMenu(children)
                } else {
                    delete todo.children
                }
            });
        } else {
            delete todo.children
        }
    })
    return arr
}
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');