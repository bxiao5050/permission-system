<template>
  <div>
    <div class="power-header">付费渠道权限列表</div>
    <div class="power-body">
      <div class="total-power-list">
        <ul class="item-ul open">
          <cirChannelTree class="item-li" v-for="(item,index) in Channels" :key="index" :data="item"></cirChannelTree>
          <div v-if="Channels.length==0&&!isNoData">正在获取付费渠道权限列表...</div>
          <div v-if="Channels.length==0&&isNoData" style="color:red;">付费渠道权限列表为空!</div>
        </ul>
      </div>
    </div>
    <div class="power-footer">
      <div class="btn-group">
        <button class="submit-btn" @click="addGrantChannels()">保存</button>
        <button class="submit-btn" @click="$emit('close')">关闭</button>
      </div>
    </div>
  </div>
</template>
<script>
import { services } from "@/services/index.js";
import cirChannelTree from "./cirChannelTree.vue";
import utils from "@/utils/utils.js";
export default {
  components: {
    cirChannelTree: cirChannelTree
  },
  // props: ["userName", "currentGame"],
  data() {
    return {
      Channels: [],
      isNoData: false,

      level: 0,
      channelConfig: {
        1: {
          id: "id",
          name: "name"
        },
        3: {
          grand_id: "channel_id",
          grand_name: "channel_name",
          parent_id: "sub_channel_id",
          parent_name: "sub_channel_name",
          id: "package_id",
          name: "package_name"
        }
      }
      // channelConfig: {
      //   default:{
      //     level: 1
      //   },
      //   1: {
      //     level: 1
      //   },
      //   2: {
      //     level: 3 //层级
      //   },
      //   3: {
      //     level: 1
      //   },
      //   5:{
      //     level: 1
      //   },
      //   6:{
      //     level: 1
      //   }
      // }
    };
  },
  computed: {
    powerUser() {
      return this.$store.state.powerUser;
    },
    currentGame() {
      return this.$store.state.currentGame;
    },
    roleSelected() {
      return this.$store.state.roleSelected;
    }
  },
  mounted() {
    this.getPermissChannels();
  },
  methods: {
    getPermissChannels() {
      this.isNoData = false;
      var params = {
        actorId: this.roleSelected ? this.roleSelected.actorId : ""
      };
      services.user.getActorPayChannels(params).then(
        response => {
          if (response.code == 401) {
            if (response.state.length == 0||response.state[0].length == 0) {
              this.isNoData = true;
            }
            this.Channels = this.formatChannels(response.state[0]);
          } else {
            showPrompt({
              content: response.message
            });
          }
        },
        response => {
          showPrompt({
            content: response,
            state: "error"
          });
          console.error(response);
        }
      );
    },
    getChannelLevel(channels){
      for(var i=0;i<channels.length;i++){
        if(channels[i][this.channelConfig[3].grand_id]&&channels[i][this.channelConfig[3].parent_id]&&channels[i][this.channelConfig[3].id]){
          return 3
        } else if(channels[i][this.channelConfig[1].id]){
          return 1
        }
        return 0
      }
    },
    formatChannels: function(channels) {
      if (this.currentGame) {
        var systemId = this.currentGame.system_id;
        // var level = this.channelConfig[systemId].level || 1;
        // var level = 1;
        // if (
        //   this.channelConfig[systemId] &&
        //   this.channelConfig[systemId].level
        // ) {
        //   level = this.channelConfig[systemId].level;
        // } else {
        //   level = this.channelConfig.default.level;
        // }
        this.level = this.getChannelLevel(channels)
        if (this.level == 1) {
          return this.getOneLevel(channels);
        } else if (this.level == 2) {
          return this.getTwoLevel(channels);
        } else if (this.level == 3) {
          return this.getThreeLevel(channels);
        }
        return [];
      }
      return [];
    },
    addGrantChannels: function() {
      var params = this.getChannelParams();
      services.user.setActorPayChannels(params).then(
        function(response) {
          var data = JSON.parse(response);
          if (data.code == 401) {
            if (data.state) {
              showPrompt({
                content: "操作成功",
                state: "success"
              });
            } else {
              showPrompt({
                content: "操作失败",
                state: "error"
              });
            }
          } else {
            showPrompt({
              content: data.message
            });
          }
        },
        function(response) {
          showPrompt({
            content: response,
            state: "error"
          });
          console.error(response);
        }
      );
    },
    getChannelParams: function() {
      var systemId = this.currentGame.system_id;
      // var level = this.channelConfig[systemId].level || 1;
      if (this.level == 1) {
        return this.getOneParams();
      } else if (this.level == 2) {
        return this.getTwoParams();
      } else if (this.level == 3) {
        return this.getThreeParams();
      }
    },
    getOneParams: function() {
      var result = [];
      for (var i in this.Channels) {
        for (var j in this.Channels[i].children) {
          if (this.Channels[i].children[j].isowner) {
            result.push(this.Channels[i].children[j]);
          }
        }
      }
      return {
        userName: this.powerUser.userName,
        channelId: result
          .map(function(node) {
            return node.id;
          })
          .join(","),
        // channelName: result.map(function (node) { return node.name; }).join(","),
        actorId: this.roleSelected ? this.roleSelected.actorId : ""
      };
    },
    getTwoParams: function() {
      return {
        userName: this.powerUser.userName,
        channelId: "",
        // channelName: "",
        actorId: this.roleSelected ? this.roleSelected.actorId : ""
      };
    },
    getThreeParams: function() {
      var result = [];
      for (var i in this.Channels) {
        if (this.Channels[i].isowner) {
          result.push(this.Channels[i]);
        } else {
          for (var j in this.Channels[i].children) {
            if (this.Channels[i].children[j].isowner) {
              result.push(this.Channels[i].children[j]);
            } else {
              for (var k in this.Channels[i].children[j].children) {
                if (this.Channels[i].children[j].children[k].isowner) {
                  result.push(this.Channels[i].children[j].children[k]);
                }
              }
            }
          }
        }
      }
      return {
        userName: this.powerUser.userName,
        channelId: result
          .map(function(node) {
            return node.id;
          })
          .join(","),
        // channelName: result.map(function (node) { return node.name; }).join(","),
        actorId: this.roleSelected ? this.roleSelected.actorId : ""
      };
    },
    /**
     * 格式化一层渠道
     */
    getOneLevel: function(channel) {
      console.log(111)
      var obj = {
        id: "0",
        name: "所有渠道",
        children: {},
        length: 0,
        isowner: false
      };
      var result = {};
      channel.forEach(item => {
        let first = result; //['1,2'].children;
        first[obj.id] = obj;

        let second = first[obj.id].children;
        if (!second.hasOwnProperty(item.id)) {
          second[item.id] = {
            id: item.id,
            name: item.name.trim(),
            isowner: item.isowner == "t" ? true : false
          };
        }
        first[obj.id].length++;
      });
      for (let index in result) {
        result[index].isowner = this.setParentState(result[index]);
      }
      return result;
    },
    /**
     * 格式化二层代理商
     */
    getTwoLevel: function(channel) {
      return [];
    },
    /**
     * 格式化三层代理商
     */
    getThreeLevel: function(channel) {
      var result = {};
      channel.forEach(item => {
        let first = result;
        if (!first.hasOwnProperty(item.channel_id)) {
          first[item.channel_id] = {
            id: item.channel_id,
            name: item.channel_name.trim(),
            children: {},
            length: 0,
            isowner: false
          };
        }
        let second = first[item.channel_id].children;
        if (!second.hasOwnProperty(item.sub_channel_id)) {
          second[item.sub_channel_id] = {
            id: item.sub_channel_id,
            name: item.sub_channel_name.trim(),
            parent_id: item.channel_id,
            parent_name: item.channel_name.trim(),
            children: {},
            length: 0,
            isowner: false
          };
          first[item.channel_id].length++;
        }
        let third = second[item.sub_channel_id].children;
        if (!third.hasOwnProperty(item.package_id)) {
          third[item.package_id] = {
            id: item.package_id,
            name: item.package_name.trim(),
            parent_id: item.sub_channel_id,
            parent_name: item.sub_channel_name.trim(),
            grand_id: item.channel_id,
            grand_name: item.channel_name.trim(),
            isowner: item.isowner == "t" ? true : false
          };
        }
        second[item.sub_channel_id].length++;
      });

      for (let index in result) {
        result[index].isowner = this.setParentState(result[index]);
      }
      return result;
    },

    setParentState: function(channelData) {
      var count = 0;
      if (channelData.children && !utils._isEmpty(channelData.children)) {
        for (var index in channelData.children) {
          channelData.isowner = this.setParentState(
            channelData.children[index]
          );

          if (channelData.children[index].isowner) {
            count++;
          }
        }
        if (count == channelData.length) {
          return true;
        } else {
          return false;
        }
      } else {
        if (channelData.isowner) {
          return true;
        }
      }
    }
  }
};
</script>
