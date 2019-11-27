<template>
    <div>
        <div class="power-header">区服权限列表</div>
        <div class="power-body">
            <div class="total-power-list">
                <ul class="item-ul open">
                    <!-- <li class="item-li" v-for="item in Zones" v-if="Zones.length>0">
                                                        <cirMenuTree :data="item"></cirMenuTree>
                                                      </li>-->
                    <cirZoneTree class="item-li" v-for="(item,index) in Zones" :key="index" :data="item"></cirZoneTree>
                    <div v-if="Zones.length==0&&!isNoData">正在获取区服权限列表...</div>
                    <div v-if="Zones.length==0&&isNoData" style="color:red;">区服权限列表为空!</div>
                </ul>
            </div>
        </div>
        <div class="power-footer">
            <div class="btn-group">
                <button class="submit-btn" @click="addGrantZones()">保存</button>
                <button class="submit-btn" @click="$emit('close')">关闭</button>
            </div>
        </div>
    </div>
</template>
<script>
import { services } from "@/services/index.js";
import cirZoneTree from "./cirZoneTree.vue";
import utils from "@/utils/utils.js";
export default {
  components: {
    cirZoneTree: cirZoneTree
  },
  // props: ["userName", "currentGame"],
  data() {
    return {
      Zones: [],
      isNoData: false,

      level: 0,
      zoneConfig: {
        1: {
          id: "zone_id",
          name: "zone_name"
        },
        3: {
          grand_id: "region_id",
          grand_name: "region_name",
          parent_id: "agent_id",
          parent_name: "agent_name",
          id: "game_zone_id",
          name: "game_zone_name"
        }
      }
      // zoneConfig: {
      //   default: {
      //     level: 1
      //   },
      //   1: {
      //     level: 3
      //   },
      //   2: {
      //     level: 3 //层级
      //   },
      //   3: {
      //     level: 1
      //   },
      //   5: {
      //     level: 3
      //   },
      //   6: {
      //     level: 3
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
    this.getPermissZones();
  },
  methods: {
    getPermissZones() {
      this.isNoData = false;
      var params = {
        actorId: this.roleSelected ? this.roleSelected.actorId : ""
      };
      services.user.getActorZones(params).then(
        response => {
          if (response.code == 401) {
            if (response.state.length == 0||response.state[0].length == 0) {
              this.isNoData = true;
            }
            this.Zones = this.formatZones(response.state[0]);
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
    // 获取区服层级(目前只有一层和三层的情况，从多到少判断)
    getZoneLevel(zones) {
      for (var i = 0; i < zones.length; i++) {
        if (
          zones[i][this.zoneConfig[3].grand_id] &&
          zones[i][this.zoneConfig[3].parent_id] &&
          zones[i][this.zoneConfig[3].id]
        ) {
          return 3;
        } else if (zones[i][this.zoneConfig[1].id]) {
          return 1;
        }
        return 0;
      }
    },
    formatZones: function(zones) {
      // console.log(this.currentGame)
      if (this.currentGame) {
        var systemId = this.currentGame.system_id;
        // var level = 3;
        this.level = this.getZoneLevel(zones)
        // if (this.zoneConfig[systemId] && this.zoneConfig[systemId].level) {
        //   level = this.zoneConfig[systemId].level;
        // } else {
        //   level = this.zoneConfig.default.level;
        // }

        if (this.level == 1) {
          return this.getOneLevel(zones);
        } else if (this.level == 2) {
          return this.getTwoLevel(zones);
        } else if (this.level == 3) {
          return this.getThreeLevel(zones);
        }
        return [];
      }
      return [];
    },
    addGrantZones: function() {
      var params = this.getZoneParams();
      services.user.setActorZones(params).then(
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
    getZoneParams: function() {
      var systemId = this.currentGame.system_id;
      // var level = this.zoneConfig[systemId].level || 1;
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
      for (var i in this.Zones) {
        for (var j in this.Zones[i].children) {
          if (this.Zones[i].children[j].isowner) {
            result.push(this.Zones[i].children[j]);
          }
        }
      }
      return {
        userName: this.powerUser.userName,
        zoneId: result
          .map(function(node) {
            return node.id;
          })
          .join(","),
        // zoneName: result.map(function (node) { return node.name; }).join(","),
        actorId: this.roleSelected ? this.roleSelected.actorId : ""
      };
    },
    getTwoParams: function() {
      return {
        userName: this.powerUser.userName,
        zoneId: "",
        // zoneName: "",
        actorId: this.roleSelected ? this.roleSelected.actorId : ""
      };
    },
    getThreeParams: function() {
      var result = [];
      for (var i in this.Zones) {
        if (this.Zones[i].isowner) {
          result.push(this.Zones[i]);
        } else {
          for (var j in this.Zones[i].children) {
            if (this.Zones[i].children[j].isowner) {
              result.push(this.Zones[i].children[j]);
            } else {
              for (var k in this.Zones[i].children[j].children) {
                if (this.Zones[i].children[j].children[k].isowner) {
                  result.push(this.Zones[i].children[j].children[k]);
                }
              }
            }
          }
        }
      }
      return {
        userName: this.powerUser.userName,
        zoneId: result
          .map(function(node) {
            return node.id;
          })
          .join(","),
        // zoneName: result.map(function (node) { return node.name; }).join(","),
        actorId: this.roleSelected ? this.roleSelected.actorId : ""
      };
    },
    /**
     * 格式化一层代理商
     */
    getOneLevel: function(zones) {
      var obj = {
        id: "1,2",
        name: "平台-联运",
        children: {},
        length: 0,
        isowner: false
      };
      var result = {};
      zones.forEach(item => {
        let first = result; //['1,2'].children;
        first[obj.id] = obj;

        let second = first[obj.id].children;
        if (!second.hasOwnProperty(item.zone_id)) {
          second[item.zone_id] = {
            id: item.zone_id,
            name: item.zone_name.trim(),
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
    getTwoLevel: function(zones) {
      return [];
    },
    /**
     * 格式化三层代理商
     */
    getThreeLevel: function(zones) {
      var result = {};
      zones.forEach(item => {
        let first = result;
        if (!first.hasOwnProperty(item.region_id)) {
          first[item.region_id] = {
            id: item.region_id,
            name: item.region_name.trim(),
            children: {},
            length: 0,
            isowner: false
          };
        }
        let second = first[item.region_id].children;
        if (!second.hasOwnProperty(item.agent_id)) {
          second[item.agent_id] = {
            id: item.agent_id,
            name: item.agent_name.trim(),
            parent_id: item.region_id,
            parent_name: item.region_name.trim(),
            children: {},
            length: 0,
            isowner: false
          };
          first[item.region_id].length++;
        }
        let third = second[item.agent_id].children;
        if (!third.hasOwnProperty(item.game_zone_id)) {
          third[item.game_zone_id] = {
            id: item.game_zone_id,
            name: item.game_zone_name.trim(),
            parent_id: item.agent_id,
            parent_name: item.agent_name.trim(),
            grand_id: item.region_id,
            grand_name: item.region_name.trim(),
            isowner: item.isowner == "t" ? true : false
          };
        }
        second[item.agent_id].length++;
      });

      for (let index in result) {
        result[index].isowner = this.setParentState(result[index]);
      }
      return result;
    },

    setParentState: function(zoneData) {
      var count = 0;
      if (zoneData.children && !utils._isEmpty(zoneData.children)) {
        for (var index in zoneData.children) {
          zoneData.isowner = this.setParentState(zoneData.children[index]);

          if (zoneData.children[index].isowner) {
            count++;
          }
        }
        if (count == zoneData.length) {
          return true;
        } else {
          return false;
        }
      } else {
        if (zoneData.isowner) {
          return true;
        }
      }
    }
  }
};
</script>
