<template>
    <div>
        <div class="power-header">菜单权限列表</div>
        <div class="power-body">
            <div class="total-power-list">
                <ul class="item-ul open">
                    <!--<li class="item-li" v-for="item in Menus" v-if="Menus.length>0">
                                    <cirMenuTree :data="item"></cirMenuTree>
                                  </li>-->
                    <cirMenuTree class="item-li" v-for="(item,index) in Menus" :key="index" :data="item"></cirMenuTree>
                    <div v-if="Menus.length==0&&!isNoData">正在获取菜单权限列表...</div>
                    <div v-if="Menus.length==0&&isNoData" style="color:red;">菜单权限列表为空!</div>
                </ul>
            </div>
            <div class="owner-power-list"></div>
        </div>
        <div class="power-footer">
            <div class="btn-group">
                <button class="submit-btn" @click="addGrantMenus()">保存</button>
                <button class="submit-btn" @click="$emit('close')">关闭</button>
            </div>
        </div>
    </div>
</template>
<script>
import { services } from '@/services/index.js'
import cirMenuTree from './cirMenuTree.vue'
export default {
    components: {
        'cirMenuTree': cirMenuTree
    },
    data() {
        return {
            Menus: [],
            isNoData: false,
        }
    },
    computed: {
        powerUser() {
            return this.$store.state.powerUser;
        },
        roleSelected() {
            return this.$store.state.roleSelected;
        }
    },
    mounted() {
        this.getPermissMenus();
    },
    methods: {
        getPermissMenus() {
            this.isNoData = false;
            var params = {
                actorId: this.roleSelected ? this.roleSelected.actorId : ""
            }
            services.user.getActorMenus(params).then((response) => {
                if (response.code == 401) {
                    if (response.state.length == 0||response.state[0].length == 0) {
                        this.isNoData = true;
                    }
                    this.Menus = response.state;
                } else {
                    showPrompt({
                        content: response.message,
                    })
                }
            }, (response) => {
                showPrompt({
                    content: response,
                    state: "error"
                })
                console.error(response)
            })
        },
        getAddParams() {
            var add = [];
            var edit = [];
            var del = [];
            var query = [];
            if (this.Menus.length == 0) {
                showPrompt({
                    content: "未获取到菜单权限数据",
                })
            } else {
                for (var i = 0; i < this.Menus.length; i++) {
                    for (var j = 0; j < this.Menus[i].childrenMenu.length; j++) {
                        if (this.Menus[i].childrenMenu[j].isAdd) {
                            add.push(this.Menus[i].childrenMenu[j])
                        }
                        if (this.Menus[i].childrenMenu[j].isDel) {
                            del.push(this.Menus[i].childrenMenu[j])
                        }
                        if (this.Menus[i].childrenMenu[j].isEdit) {
                            edit.push(this.Menus[i].childrenMenu[j])
                        }
                        if (this.Menus[i].childrenMenu[j].isQeury) {
                            query.push(this.Menus[i].childrenMenu[j])
                        }
                    }
                }
            }
            return {
                userName: this.powerUser.userName,
                menuId1: add.map(function (node) {
                    return node.menuId;
                }).join(","),
                menuId2: del.map(function (node) {
                    return node.menuId;
                }).join(","),
                menuId3: edit.map(function (node) {
                    return node.menuId;
                }).join(","),
                menuId4: query.map(function (node) {
                    return node.menuId;
                }).join(","),
                // menuIdName1: add.map(function (node) {
                //     return node.menuName;
                // }).join(","),
                // menuIdName2: del.map(function (node) {
                //     return node.menuName;
                // }).join(","),
                // menuIdName3: edit.map(function (node) {
                //     return node.menuName;
                // }).join(","),
                // menuIdName4: query.map(function (node) {
                //     return node.menuName;
                // }).join(","),
                actorId: this.roleSelected ? this.roleSelected.actorId : ""
            }
        },
        addGrantMenus() {
            var params = this.getAddParams();
            services.user.setActorMenus(params).then((response) => {
                var data = JSON.parse(response)
                if (data.code == 401) {
                    if (data.state) {
                        showPrompt({
                            content: "操作成功",
                            state: "success"
                        })
                    }
                    else {
                        showPrompt({
                            content: "操作失败",
                            state: "error"
                        })
                    }
                } else {
                    showPrompt({
                        content: data.message,
                        state: "error"
                    })
                }
            }, (response) => {
                showPrompt({
                    content: response,
                    state: "error"
                })
                console.error(response)
            })
        }

    }
}
</script>
