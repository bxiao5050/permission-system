<template>
  <div class="user-manage">
    <div class="module-header">
      用户管理
    </div>
    <div class="user-content">
      <div class="user-content-header">
        <span class="panel-title">用户列表:</span>
        <input placeholder="请输入用户名" class="form-control" v-model="userSearchKey" type="search">
        <div class="btn-group">
          <button type="button" class="btn btn-success" @click="getUsers();">
            <i class="icon-refresh"></i>刷新</button>
          <!--<button type="button" class="btn btn-primary">
                                 <i class="icon-add"></i>新增</button>-->
          <!--<button type="button" class="btn btn-danger">
                                 <i class="icon-del"></i>删除</button>-->
        </div>
      </div>
      <div class="user-table">
        <table class="table table-bordered table-hover">
          <thead>
            <tr>
              <th width="80px">ID</th>
              <th>用户名</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,index) in userFiterData" :key="index" @click="selectUser(item)" :class="{selected:selectedUser&&selectedUser.userId==item.userId}">
              <td>{{item.userId}}</td>
              <td>{{item.userName}}</td>
            </tr>
          </tbody>
          <tfoot v-if="userFiterData.length==0">
            <tr>
              <td colspan="3">无数据</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  
    <div class="role-content">
      <div class="role-content-header">
        <span class="panel-title">用户角色列表({{selectedUser?selectedUser.userName:"无"}}):</span>
        <div class="btn-group">
          <input placeholder="请输入角色名" class="form-control" v-model="roleSearchKey" type="search">
          <button type="button" class="btn btn-success" @click="getUserRole">
            <i class="icon-refresh"></i>刷新</button>
          <!--<button type="button" class="btn btn-primary">
                                 <i class="icon-add"></i>新增</button>-->
          <button type="button" class="btn btn-warning" @click="showSetRole" :disabled="!selectedUser">
            <i class="icon-set"></i>设置用户角色</button>
          <!--<button type="button" class="btn btn-danger">
                                 <i class="icon-del"></i>删除</button>-->
        </div>
      </div>
      <div class="role-table">
        <table class="table table-bordered table-hover">
          <thead>
            <tr>
              <th width="80px">ID</th>
              <th>角色名</th>
              <th>描述</th>
              <th width="100">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,index) in roleFiterData" :key="index">
              <td>{{item.actorId}}</td>
              <td>{{item.actorName}}</td>
              <td>{{item.description}}</td>
              <td><button class="btn btn-danger" @click="removeUserRole(item)">移除</button></td>
            </tr>
          </tbody>
          <tfoot v-if="roleFiterData.length==0">
            <tr>
              <td colspan="4">无数据</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  
    <Modal v-if="isShowSetRole" headerName="设置角色" width="500" mbHeight="260" @close="isShowSetRole=false">
      <div slot="modal-body">
        <div class="form-group">
          <span class="input-title">用户id:</span>
          <span class="form-control">{{selectedUser.userId}}</span>
        </div>
        <div class="form-group">
          <span class="input-title">用户名:</span>
          <span class="form-control">{{selectedUser.userName}}</span>
        </div>
        <div class="form-group">
          <span class="input-title">角色列表:</span>
          <select type="text" class="form-control" v-model="selectedRole">
            <option v-for="(item,index) in roleList" :value="item">{{item.actorName}}</option>
          </select>
        </div>
        <div style="color:red;">注意:已分配的角色无法再次分配</div>
      </div>
      <div slot="modal-footer">
        <button type="button" class="btn btn-primary" @click="setActorForUser">确定</button>
      </div>
    </Modal>
  </div>
</template>
<script>
import Modal from '@/components/modal.vue'
import { services } from '@/services/index.js'
export default {
  components: {
    Modal
  },
  data() {
    return {
      userData: [],

      roleData: [],

      roleList: [],//所有角色列表

      selectedUser: null,
      selectedRole: null,
      isShowSetRole: false,

      userSearchKey: "",
      roleSearchKey: ""
    }
  },
  computed: {
    userFiterData() {
      return this.userData.filter((item) => {
        if (item.userName.toString().indexOf(this.userSearchKey) != -1) {
          return item;
        }
      })
    },
    roleFiterData() {
      return this.roleData.filter((item) => {
        if (item.actorName.toString().indexOf(this.roleSearchKey) != -1) {
          return item;
        }
      })
    },
  },
  mounted() {
    this.getUsers();
    this.getAllRole();
  },
  methods: {
    getUsers() {
      this.userSearchKey = "";
      services.user.getUsers({}).then((data) => {
        if (data.code == 401) {
          this.userData = data.state;
        }
        else {
          showPrompt({ content: data.message });
        }
      })
    },
    selectUser(item) {
      this.selectedUser = item;
      this.getUserRole();
    },
    getAllRole() {
      this.roleSearchKey = "";
      services.user.getActorList({}).then((data) => {
        if (data.code == 401) {
          this.roleList = data.state;
        }
      }, (err) => {
        console.error(err)
      })
    },
    getUserRole() {
      if (this.selectedUser) {
        this.getRoleList({ userId: this.selectedUser.userId })
      }
    },
    getRoleList(params) {
      this.roleSearchKey = "";
      services.user.getActorList(params).then((data) => {
        if (data.code == 401) {
          this.roleData = data.state;
        }
      }, (err) => {
        console.error(err)
      })
    },


    showSetRole() {
      if (this.selectedUser) {
        // this.selectedUser = item;
        // this.selectedRole= null,
        this.isShowSetRole = true;
      }
    },
    setActorForUser() {
      if (this.selectedRole) {
        var params = {
          userId: this.selectedUser.userId,
          actorId: this.selectedRole.actorId
        }
        services.user.setActorForUser(params).then((data) => {
          if (data.code == 303) {
            showPrompt({ content: "操作成功" });
            this.selectedUser = null;
            this.selectedRole = null;
            this.roleData=[];
            this.isShowSetRole = false;
          }
          else {
            showPrompt({ content: data.message });
          }
        })
      }
    },
    removeUserRole(item) {
      if(confirm(`确认移除用户 ${this.selectedUser.userName} 的角色 ${item.actorName} ?`))
      var params = {
        userId: this.selectedUser.userId,
        actorId: item.actorId
      }
      services.user.removeUserRole(params).then((data) => {
        if(data.code === 401){
          showPrompt({ content: '移除用户角色成功!'})

          this.roleData = []
          this.selectedUser = null
        } else{
           showPrompt({ content: data.message})
        }
      })
    },

  }
}
</script>
<style lang="scss">
.user-manage {
  .user-content {
    width: 50%;
    height: 100%;
    float: left;
    border-right: 1px solid #bbb;
    .user-content-header {
      text-align: right;
      padding: 10px 0;
      .panel-title {
        float: left;
        margin-left: 10px;
      }
      .form-control {
        width: auto;
        display: inline-block;
        vertical-align: middle;
      }
      .btn-group {
        position: relative;
        vertical-align: middle;
        .btn {
          margin: 0 5px;
        }
      }
    }
    .user-table {
      width: 100%;
      height: calc(100% - 54px - 41px);
      overflow-x: hidden;
      overflow-y: scroll;
    }
    .selected {
      background-color: lightskyblue;
    }
  }
  .role-content {
    width: 50%;
    height: 100%;
    float: left;
    .role-content-header {
      text-align: right;
      padding: 10px 0;
      .panel-title {
        float: left;
        margin-left: 10px;
      }
      .form-control {
        width: auto;
        // display: inline-block;
        float: left;
        vertical-align: middle;
      }
      .btn-group {
        position: relative;
        vertical-align: middle;
        .btn {
          margin: 0 5px;
        }
      }
    }
    .role-table {
      width: 100%;
      height: calc(100% - 54px - 41px);
      overflow-x: hidden;
      overflow-y: scroll;
    }
    .selected {
      background-color: lightskyblue;
    }
  }
  .input-group {
    margin: 0;
    .input-title {
      line-height: 30px;
      width: 100px;
      text-align: center;
    }
  }
}
</style>
