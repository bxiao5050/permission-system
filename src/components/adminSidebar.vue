<template>
  <div class="sidebar">
    <ul class="sidebar-tree">
      <li class="sidebar-item-li" v-for="(first,index) in Menus">
        <a class="item-content" @click="toggleMenu(index)">
          <i class="menu-icon icon-system"></i>
          <span class="item-text">{{first.name}}</span>
          <i class="icon-arrow-right" :class="{'right':activeItem!=index,'down':activeItem==index}"></i>
        </a>
        <ul class="sub-menu" v-show="activeItem==index">
          <li class="sub-item-li" v-for="second in first.children">
            <router-link tag="a" :to="{name:second.menuUrl}" class="item-content">
              <!--<i class="icon-round"></i>-->
              <span class="item-text">{{second.name}}</span>
              <i></i>
            </router-link>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'adminSideBar',
  data: function () {
    return {
      open: true,
      activeItem: 0,
      Menus: [{
        id: 1,
        name: '权限管理',
        menuUrl: null,
        children: [{
          id: 11,
          name: '角色管理',
          menuUrl: 'role-manage'
        },{
          id: 12,
          name: '用户管理',
          menuUrl: 'user-manage'
        }]
      }]
    }
  },
  methods: {
    toggleMenu(index) {
      if (this.activeItem == index) {
        this.activeItem = -1;
      }
      else {
        this.activeItem = index
      }

    }
  }
}
</script>
