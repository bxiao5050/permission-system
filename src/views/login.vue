<template>
  <div class="login-page">
    <div class="login-form">
      <div class="form-header">
        <span>权限管理系统 v1.0</span>
      </div>
      <div class="form-group">
        <span>帐号</span>
        <input ref="acc" type="text" class="form-control" @keyup.enter="focusToPwd" v-model="account" placeholder="请输入帐号">
      </div>
      <div class="form-group">
        <span>密码</span>
        <input ref="pwd" type="password" class="form-control" @keyup.enter="login" v-model="password" placeholder="请输入密码">
      </div>
      <div class="form-footer">
        <button type="button" class="btn btn-success btn-block" @click="login">登录</button>
      </div>
    </div>
  </div>
</template>
<script>
import { services } from '@/services/index.js'
import md5 from 'js-md5'
export default {
  data: function () {
    return {
      account: '',
      password: ''
    }
  },
  methods: {
    focusToPwd: function () {
      this.$refs.pwd.focus();
    },
    login: function () {
      if (!this.account || !this.password) {
        showPrompt({ content: "请输入用户名和密码!" })
        return;
      }
      var params = {
        userName: this.account,
        password: md5(this.password)
      }
      services.user.OALogin(params).then((response) => {
        if (response.code == 301) {
          var userInfo = {
            userName: params.userName,
            nickName: response.state.userName
          }
          this.$store.commit('setPowerUser', userInfo);

          this.getSystemGame();
          this.$router.push({name:"role-manage"})
        } else {
          showPrompt({ content: response.message })
        }
      });
    },
    getSystemGame: function () {
      services.user.getSystemGame({}).then((response) => {
        if (response.code == 401) {
          console.log(response)
          var systemGame = this.formatSystemGame(response.state[0]);
          this.$store.commit('setSystemGame', systemGame)
        }
        else {
          showPrompt({ content: response.message })
        }
      })
    },
    formatSystemGame: function (userGame) {
      var result = [];
      for (var i = 0; i < userGame.length; i++) {
        var flag = false;
        for (var j = 0; j < result.length; j++) {
          if (userGame[i].system_id == result[j].system_id) {
            flag = true;
            break;
          }
        }
        if (!flag) {
          result.push({
            system_id: userGame[i].system_id,
            system_name: userGame[i].system_name,
            open: false,
            children: []
          })
        }
      }
      for (var i = 0; i < result.length; i++) {
        for (var j = 0; j < userGame.length; j++) {
          if (result[i].system_id == userGame[j].system_id) {
            result[i].children.push(userGame[j]);
          }
        }
      }
      return result;
    },
  }
}
</script>
