<template>
    <div style="width:100%;height:100%">
        <div class="crumbs">
            <el-row>
                <el-button type="info" @click="addRole">添加角色</el-button>
            </el-row>
        </div>
        <el-row style="width:100%;height:90%">
            <el-table
                :data="tableData.filter(data => !search || data.systemName.toLowerCase().includes(search.toLowerCase()))"
                height="100%"
                style="width: 100%;"
            >
                <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
                <el-table-column
                    v-for="(item,i) in (Object.keys(tableData[0]?tableData[0]:[]))"
                    v-if="!hideTitle.includes(item)"
                    :key="i"
                    :label="ChineseTitle[i]"
                    :prop="item"
                    align="center"
                ></el-table-column>
                <el-table-column align="center" width="300px">
                    <template slot="header" slot-scope="scope">
                        <el-input v-model="search" size="medium " placeholder="输入账号搜索" />
                    </template>
                    <template slot-scope="scope">
                      <div v-if="tableData[scope.$index].roleStatus">
                        <el-button size="mini"
                            type="warning"
                         @click="handleEdit(scope.$index, scope.row)">修改</el-button>
                        <el-button
                            size="mini"
                            type="success"
                            @click="handlehRole(scope.$index, scope.row)"
                        >角色赋权</el-button>
                        <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)"
                        >角色移权</el-button>
                      </div>
                    </template>
                </el-table-column>
            </el-table>
        </el-row>
        <el-row>
            <el-dialog
                :title="dialogForm.dialogFormTitle"
                width="500px"
                :visible.sync="dialogForm.dialogFormVisible"
                :before-close="handleClose"
            >
                <add-role-dialog
                    @handleDialog="handleDialog"
                    :changeInfoData="changeInfo"
                    :dialogvVisible="dialogvVisible"
                    v-if="dialogForm.dialogFormIndex==1"
                ></add-role-dialog>
                <change-role-dialog
                    @handleDialog="handleDialog"
                    :changeInfoData="changeInfo"
                    :dialogvVisible="dialogvVisible"
                    v-if="dialogForm.dialogFormIndex==2"
                ></change-role-dialog>
                <add-role-power-dialog
                    @handleDialog="handleDialog"
                    :changeInfoData="changeInfo"
                    :dialogvVisible="dialogvVisible"
                    v-if="dialogForm.dialogFormIndex==3"
                ></add-role-power-dialog>
                <remove-power-dialog
                    @handleDialog="handleDialog"
                    :changeInfoData="changeInfo"
                    :dialogvVisible="dialogvVisible"
                    v-if="dialogForm.dialogFormIndex==4"
                ></remove-power-dialog>
            </el-dialog>
        </el-row>
    </div>
</template>

<script>
import AddRoleDialog from './AddRoleDialog'
import ChangeRoleDialog from './ChangeRoleDialog'
import AddRolePowerDialog from './AddRolePower'
import RemovePowerDialog from './RemoveRolePower'
export default {
  name:"roleListIndex",
  components: {
    AddRoleDialog,
    ChangeRoleDialog,
    AddRolePowerDialog,
    RemovePowerDialog,
  },
  data: function () {
    return {
      search: "",
      tableData: [],
      changeInfo: [],
      dialogvVisible: false,
      hideTitle: ["roleId", "systemType"],
      ChineseTitle: ["用户ID", "角色名", "系统类型", "角色状态", "系统名"],
      dialogForm: {
        dialogFormTitle: '',
        dialogFormVisible: false,
        dialogFormIndex: 0
      },

    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      this.$store.dispatch('getRoleList').then((data) => {
        this.tableData = data.data;
      })
    },
    addRole() {
      this.changeInfo = this.tableData.length + 1;
      this.dialogForm = {
        dialogFormTitle: "添加角色",
        dialogFormVisible: true,
        dialogFormIndex: 1
      }
    },
    handleClose() {
      this.dialogForm.dialogFormVisible = false;
      this.dialogvVisible = true
    },
    handleDialog(ev, dialogIndex) {
      if (!!ev) {
        switch (dialogIndex) {
          case 1:
            this.$store.dispatch('addNewUserData', ev).then((data) => {
              this.dialogForm.dialogFormVisible = false,
                this.dialogvVisible = true,
                this.tableData = data;
              this.$message.success('角色添加成功');
            })
            break;
          case 2:
            this.$store.dispatch('changeRoleInfo', ev).then((data) => {
              this.dialogForm.dialogFormVisible = false,
                this.dialogvVisible = true,
                this.tableData = data;
              this.$message.success('角色修改成功');
            })
            break;
          case 3:
            this.$store.dispatch('addRolePower', ev).then((data) => {
              this.dialogForm.dialogFormVisible = false,
                this.dialogvVisible = true,
              this.$message.success('角色赋权成功');
            })
            break;
          case 4:
             this.$store.dispatch('removeRolePower', ev).then((data) => {
              this.dialogForm.dialogFormVisible = false,
                this.dialogvVisible = true,
              this.$message.success('角色移权成功');
            })
            break;
          default:
            break;
        }
      } else {
        this.dialogForm.dialogFormVisible = false;
      }
    },
    handleEdit(index, row) {
      this.dialogForm = {
        dialogFormTitle: "修改角色",
        dialogFormVisible: true,
        dialogFormIndex: 2
      }
      this.changeInfo = row;
    },
    handlehRole(index, row) {
      this.dialogForm = {
        dialogFormTitle: "角色赋权",
        dialogFormVisible: true,
        dialogFormIndex: 3
      }
      this.changeInfo = row;
    },
    handleDelete(index, row) {
      let _this=this
      this.$store.dispatch('getRolePower', {roleId:row.roleId}).then((data) => {
        _this.dialogForm = {
          dialogFormTitle: "角色移权",
          dialogFormVisible: true,
          dialogFormIndex: 4
        }
        _this.changeInfo = row;
      })
      
    }
  },
}
</script>

<style scoped>
</style>