<template>
  <div id="role-manage">
    <div class="module-header">
      角色管理
    </div>
    <div class="role-power-content">
      <div class="role-header">
        <input placeholder="请输入角色ID或名称" class="form-control" type="search" v-model="searchKey">
        <div class="btn-group">
          <button type="button" class="btn btn-success" @click="getRoleList">
            <i class="icon-refresh"></i>刷新</button>
          <button type="button" class="btn btn-primary" @click="showRoleAdd">
            <i class="icon-add"></i>新增</button>
          <button type="button" class="btn btn-warning" @click="roleSet" :disabled="!roleSelected">
            <i class="icon-setpower"></i>授权</button>
          <button type="button" class="btn btn-danger" @click="deleteRoleItem" disabled>
            <i class="icon-del"></i>删除</button>
        </div>
      </div>
      <div class="role-table">
        <table class="table table-bordered table-hover">
          <thead>
            <tr>
              <th width="80px">序号</th>
              <th>角色名称</th>
              <th>描述</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,index) in roleFiterData" :key="index" @click="selectRole(item)" :class="{selected:roleSelected&&roleSelected.actorId==item.actorId}">
              <td>{{index+1}}</td>
              <td>{{item.actorName}}</td>
              <td>{{item.description}}</td>
            </tr>
          </tbody>
          <tfoot v-if="roleFiterData.length==0">
            <tr>
              <td colspan="3">无数据</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
    <Modal v-if="isShowRoleAdd" headerName="新增角色" width="500" mbHeight="150" @close="isShowRoleAdd=false">
      <div slot="modal-body">
        <div class="form-group">
          <span class="input-title">角色名称:</span>
          <input type="text" class="form-control" v-model="addForm.actorName" placeholder="请输入角色名称" />
        </div>
        <div class="form-group">
          <span class="input-title">描述:</span>
          <input type="text" class="form-control" v-model="addForm.description" placeholder="角色描述" />
        </div>
      </div>
      <div slot="modal-footer">
        <button type="button" class="btn btn-primary" @click="roleAdd">确定</button>
      </div>
    </Modal>
    <Modal v-if="isShowRoleSet" :headerName="roleSelected?'角色授权 '+roleSelected.actorName:'角色授权'" width="1000" mbHeight="700" @close="isShowRoleSet=false">
      <roleSet slot="modal-body" @close="isShowRoleSet=false"></roleSet>
    </Modal>
  </div>
</template>
<script>
import Modal from '@/components/modal.vue'
import { services } from '@/services/index.js'
import roleSet from './roleset.vue'
export default {
  name: "role-manage",
  components: {
    'Modal': Modal,
    'roleSet': roleSet
  },
  data() {
    return {
      searchKey: "",
      roleData: [],
      // roleSelected:null,

      addForm: {
        actorName: "",
        description: ""
      },

      isShowRoleAdd: false,
      isShowRoleSet: false
    }
  },
  computed: {
    roleFiterData() {
      return this.roleData.filter((item) => {
        if (item.actorId.toString().indexOf(this.searchKey) != -1 || item.actorName.indexOf(this.searchKey) != -1) {
          return item;
        }
      })
    },
    roleSelected() {
      return this.$store.state.roleSelected;
    }
  },
  mounted() {
    this.getRoleList();
  },
  methods: {
    getRoleList() {
      this.$store.commit('clearPowerInfo');
      this.searchKey = "";
      services.user.getActorList({}).then((data) => {
        if (data.code == 401) {
          this.roleData = data.state;
        }
      }, (err) => {
        console.error(err)
      })
    },
    selectRole(item) {
      this.$store.commit('setRoleSelected', item)
    },
    showRoleAdd() {
      this.isShowRoleAdd = true;
    },
    roleAdd() {
      var params = {
        actorName: this.addForm.actorName,
        description: this.addForm.description
      }
      services.user.addActor(params).then((data) => {
        if (data.code == 401) {
          this.addForm = {
            actorName: "",
            description: ""
          }
          this.isShowRoleAdd = false;
          showPrompt({
            content: "操作成功!",
            state: "success"
          })
          this.getRoleList();
        }
        else {
          showPrompt({
            content: data.message,
            state: "error"
          })
        }
      }, (err) => {
        showPrompt({
          content: err,
          state: "error"
        })
        console.error(err)
      })
    },
    roleSet() {
      if (this.roleSelected) {
        this.isShowRoleSet = true;
      }
    },
    deleteRoleItem() {
      if (this.roleSelected && confirm("确认删除角色 " + this.roleSelected.actorName + "?")) {

      }
    }
  }
}
</script>
<style lang="scss">
#role-manage {
  .role-power-content {
    width: 100%;
    height: calc(100% - 41px);
    .role-header {
      text-align: right;
      padding: 10px 0;
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
    .role-table {
      width: 100%;
      height: calc(100% - 54px);
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
