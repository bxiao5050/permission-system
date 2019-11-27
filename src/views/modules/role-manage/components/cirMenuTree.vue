<template>
  <li>
    <div class="item-content" @click="toggleTree()">
      <i :class="{'icon-folder':data.childrenMenu&&data.childrenMenu.length>0,'icon-file':!data.childrenMenu||data.childrenMenu.length==0}"></i>
      <span>{{data.menuName}}</span>
      <!--<input type="checkbox" v-model="data.isOwner">-->
    </div>
    <ul class="item-ul" v-show="open" v-if="data.childrenMenu && data.childrenMenu.length > 0">
      <!--<li class="item-li" v-for="item in data.childrenMenu">
        <cirmenutree :data="item"></cirmenutree>
      </li>-->
       <cirmenutree class="item-li" v-for="(item,index) in data.childrenMenu" :key="index" :data="item">
      </cirmenutree>
    </ul>
    <ul class="item-ul" v-show="powOpen" v-else>
      <li class="item-li" v-if="data.hasOwnProperty('isAdd')">
        <div class="item-content">
          <label>
            <input type="checkbox" v-model="data.isAdd">
            <!--<i class="icon-lightning"></i>-->
            <span>新增权限</span>
          </label>
  
        </div>
      </li>
      <li class="item-li" v-if="data.hasOwnProperty('isEdit')">
        <div class="item-content">
          <label>
            <input type="checkbox" v-model="data.isEdit">
            <!--<i class="icon-lightning"></i>-->
            <span>修改权限</span>
          </label>
        </div>
      </li>
      <li class="item-li" v-if="data.hasOwnProperty('isDel')">
        <div class="item-content">
          <label>
            <input type="checkbox" v-model="data.isDel">
            <!--<i class="icon-lightning"></i>-->
            <span>删除权限</span>
          </label>
        </div>
      </li>
      <li class="item-li" v-if="data.hasOwnProperty('isQeury')">
        <div class="item-content">
          <label>
            <input type="checkbox" v-model="data.isQeury">
            <!--<i class="icon-lightning"></i>-->
            <span>查看权限</span>
          </label>
        </div>
      </li>
    </ul>
  </li>
</template>
<script>
export default {
  name:"cirmenutree",
  props: ["data"],
  data() {
    return {
      open: false,
      powOpen: false
    }
  },
  methods: {
    toggleTree() {
      if (this.data.childrenMenu && this.data.childrenMenu.length > 0) {
        this.open = !this.open;
      } else {
        this.powOpen = !this.powOpen;
      }
    }
  }
}
</script>
