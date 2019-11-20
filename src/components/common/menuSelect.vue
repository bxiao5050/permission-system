<template>
    <div class="crumbs">
        <section style="position:relative" v-if="menuSelectInfo.isPanel">
            <p>菜单目录 :</p>
            <el-cascader-panel 
                v-model="formInline"
                @change="logmenu"
                :props="{checkStrictly:menuSelectInfo.isRadio, multiple: menuSelectInfo.isMultiple,}"
                :options="menuData"
                style="background:white"
            ></el-cascader-panel>
            <el-button
                type="info"
                @click="clearCheckedNodes"
                style="position: absolute;bottom: 10px;right: 80px;"
            >重置</el-button>
            <el-button
                type="primary"
                @click="getMent"
                style="position: absolute;bottom: 10px;right: 10px;"
            >查询</el-button>
        </section>
        <section style="position:relative" v-else>
            <el-cascader 
                v-model="multipleData"
                collapse-tags
                :props="{multiple: menuSelectInfo.isMultiple,expandTrigger: 'hover'}"
                :options="menuData"
                style="background:white"
            ></el-cascader>
        </section>
    </div>
</template>
<script>
import Vue from 'vue'
export default {
    name:"menuSelect",
    props: {
        menuSelectInfo:{
            type:Object,
            default: {}
        },

    },
    data() {
        return {
            formInline: [],
            multipleData:[],
        };
    },
    computed: {
        menuData() {
            let powerMenu = Vue.prototype.$fiterMenu(this.$store.state.roleManager.powerData) 
            let menuData = Vue.prototype.$fiterMenu(this.$store.state.menusManager.menuData)
            return this.menuSelectInfo.dataType?powerMenu:menuData;
        }
    },
    watch: {
        multipleData(newValue, oldValue) {
            this.menuSelectInfo.callBack && this.menuSelectInfo.callBack(newValue)

            
        }
    },
    methods: {
        logmenu(ev) {
            console.log(ev);
        },
        getMent() {
            console.log(this.formInline);
            this.$store.dispatch('getMenuList', { resourceIds: this.formInline[this.formInline.length - 1],isList:1 });
        },
        clearCheckedNodes(){
            this.formInline = []

        }
    }
};
</script>