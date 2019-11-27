<template>
  <header class="header">
    <div class="sys-info-group">
      <i class="admin-logo icon-system"></i>
      <span class="admin-title">权限管理系统{{isOfficial?'(正式)':'(测试)'}}</span>
      <div class="toggle-collage" @click="$emit('setCollapse')">
        <i class="icon-toggle-sm"></i>
      </div>
    </div>
  
    <div class="user-group">
      <!--<div class="list-item">
                    <i class="animate-icon icon-system"></i><span class="badge badge-grey">8</span></div>
                  <div class="list-item">
                    <i class="animate-icon icon-system"></i><span class="badge badge-important">8</span></div>
                  <div class="list-item">
                    <i class="animate-icon icon-system"></i><span class="badge badge-success">8</span></div>-->
      <div class="user-info-group">
        <i class="animate-icon icon-user"></i>
        <span>{{userInfo.nickName||'undefined'}}</span>
      </div>
      <div class="list-item exit" @click="exitSystem">
        <span class="animate-icon icon-exit"></span>退出
      </div>
    </div>
  </header>
</template>
<script>
import config from '@/config'
export default {
  name: 'adminHeader',
  computed: {
    userInfo() {
      return this.$store.state.powerUser
    },
    isOfficial() {
      return config.server.isOfficial
    }
  },
  methods: {
    exitSystem: function() {
      showPrompt({
        content: '确认退出系统？',
        type: 'confirm',
        confirm: () => {
          this.$router.push({ name: 'login' })
        }
      })
      // if (confirm("确认退出系统？")) {
      //   this.$router.push({ name: "login" })
      // }
    }
  }
}
</script>
