<template>
  <div id="power-manage">
    <div class="game-tree">
      <ul class="item-ul open">
        <li v-for="system in systemGame" class="item-li">
          <div class="first-content" @click="system.open=!system.open">
            <a class="content-text" href="javascript:void(0)">
              <i class="icon-folder-open"></i>
              <span>{{system.system_name}}</span>
            </a>
            <i class="icon-arrow-right" :class="{'down':system.open,'right':!system.open}"></i>
          </div>
          <ul class="item-ul" v-show="system.open">
            <li v-for="game in system.children" @click="OAChange(game)">
              <div class="second-content">
                <a class="content-text" :class="{'active':currentGame&&currentGame.system_id==system.system_id&&currentGame.game_id==game.game_id}" href="javascript:void(0)">
                  <span>{{game.game_name}}</span>
                </a>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <div class="power-group">
      <div class="power-top" v-if="menuList.length>0">
        <ul class="type-list">
          <li v-for="(item,index) in menuList" :key="index" class="type-item" :class="{'active':currentMenu.menu_id==item.menu_id}" @click="selectCurrentMenu(item)">
            <div class="type-content">
              <a class="type-text" href="javascript:void(0)">
                <i class="icon-system"></i>
                <span>{{item.menu_name}}</span>
              </a>
            </div>
          </li>
        </ul>
      </div>
      <div class="power-component">
        <div class="main-page" v-if="currentMenu==null">
          <div class="main-content">
            <div>首页</div>
          </div>
        </div>
        <component class="power-list" :is="currentView" @close="$emit('close')" v-if="currentMenu"></component>
      </div>
    </div>
  </div>
</template>
<script>

import { services } from '@/services/index.js'
import Menus from './components/menus.vue'
import Zones from './components/zones.vue'
import Channels from './components/channels.vue'
import payChannels from './components/paychannels.vue'
export default {
  name: "roleset",
  components: {
    'Menus': Menus,//菜单组件
    'Zones': Zones,//区服组件
    'Channels': Channels,//注册渠道组件
    'payChannels': payChannels,//付费渠道组件
  },
  data() {
    return {
      currentMenu: null,
      menuList: [],

      currentView: ""
    }
  },
  computed: {
    systemGame() {
      return this.$store.state.systemGame;
    },
    currentGame() {
      return this.$store.state.currentGame;
    },
    roleSelected() {
      return this.$store.state.roleSelected;
    }
  },
  mounted() {
    this.$store.commit('clearSystemGameState');
  },
  methods: {
    selectCurrentMenu: function (item) {
      this.currentMenu = item;
    },
    OAChange: function (item) {
      // this.currentGame = item;
      this.$store.commit("setPowerCurGame", item)
      var params = {
        systemId: item.system_id,
        gameId: item.game_id
      }
      services.user.OAChange(params).then((response) => {
        if (response.code == 303) {
          this.getOAMenus();
        } else {
          showPrompt({
            content: response.state
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
    getOAMenus: function () {
      this.menuList = [];
      this.currentMenu = null;
      services.user.getOAMenus({}).then((response) => {
        if (response.code == 401) {
          if (response.state[0].length == 0) {
            showPrompt({
              content: "未获取到权限菜单!"
            })
            return;
          }
          var menuList = this.formatTypeMenus(response.state[0]); //菜单数结构数组
          this.menuList = menuList[0].children; //只取二级菜单
          this.currentMenu = this.menuList[0];

        } else {
          showPrompt({
            content: response.state
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
    formatTypeMenus: function (oaMenus) {
      var result = [];
      for (var i = 0; i < oaMenus.length; i++) {
        if (oaMenus[i].parent_id == 0) {
          result.push({
            menu_id: oaMenus[i].menu_id,
            menu_name: oaMenus[i].menu_name,
            parent_id: oaMenus[i].parent_id,
            is_leaf: oaMenus[i].is_leaf,
            dataview_name: oaMenus[i].dataview_name,
            children: []
          });
        }
      }
      for (var i = 0; i < result.length; i++) {
        for (var j = 0; j < oaMenus.length; j++) {
          if (result[i].menu_id == oaMenus[j].parent_id) {
            result[i].children.push(oaMenus[j]);
          }
        }
      }
      return result;
    },
    getUrlInfo: function () {
      var search = window.location.search.replace("?", "").split("&");
      for (var i = 0; i < search.length; i++) {
        var item = search[i].split("=");
        if (item[0] == "oaId") {
          $scope.oaId = item[1];
          continue;
        }
        if (item[0] == "userName") {
          $rootScope.userName = item[1];
          continue;
        }
      }
    }
  },
  watch: {
    currentMenu: {
      deep: true,
      handler(v, ov) {
        if (v && v != ov) {
          if (v.menu_id == 601) {
            this.currentView = "Menus";
          }
          else if (v.menu_id == 602) {
            this.currentView = "Zones";
          }
          else if (v.menu_id == 603) {
            this.currentView = "Channels";
          }
          else if (v.menu_id == 604) {
            this.currentView = "payChannels";
          }
        }
      }
    }
  }
}
</script>
<style lang="scss">
@import './scss/power.scss';
</style>
