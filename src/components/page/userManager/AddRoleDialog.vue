<template>
    <div class="adduserBox">
        <el-form :model="addRoleForm" :rules="rules" ref="addRole">
            <el-form-item label="用户名" prop="userComment" :label-width="formLabelWidth">
                <el-input style="width: 300px;" disabled v-model="addRoleForm.userComment" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="账号" prop=" userName" :label-width="formLabelWidth">
                <el-input style="width: 300px;" disabled v-model="addRoleForm.userName" autocomplete="off"></el-input>
            </el-form-item>
             <el-form-item label="选择系统" :label-width="formLabelWidth" prop="systemType">
              <el-select v-model="addRoleForm.systemType" placeholder="请选择系统">
                <el-option v-for="(item,i) in addRoleForm.systemOptions" :key="i" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
             <el-form-item label="选择角色" :label-width="formLabelWidth" prop="roleId">
              <el-select v-model="addRoleForm.roleId" placeholder="请选择角色">
                <el-option v-for="(item,i) in addRoleForm.roleOptions" :key="i" :label="item.roleName" :value="item.roleId"></el-option>
              </el-select>
            </el-form-item>
             <el-form-item label="当前角色" :label-width="formLabelWidth">
                  <el-button v-if="addRoleForm.currentRole" type="success" disabled v-for="(item,i) in addRoleForm.currentRole" :key="i">{{item.systemName+'_'+item.roleName}}</el-button> 
                  <el-button v-if="!addRoleForm.currentRole" disabled>无</el-button> 
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="cancelAddRole">取 消</el-button>
            <el-button type="primary" @click="determineAddRole">确 定</el-button>
        </div>
    </div>
</template>
<script>
import LoginVue from '../Login.vue'
export default {
  name: "AddUserDialog",
  props:["dialogvVisible","changeInfoData"],
  data() {
    return {
      formLabelWidth: '120px',
      addRoleForm: {
        userName: "",
        userComment: "",
        userId:"",
        roleId:"",
        systemType:"",
        systemOptions:[],
        roleOptions:[],
      },
      allRole:[],
      rules: {
        roleId: [{ required: true, message: '请输选择角色', trigger: 'blur' },],
        systemType: [{ required: true, message: '请输选择系统', trigger: 'blur' },],
      }

    }
  },
  computed: {
    _roleInfoData() {
      return this.$store.getters.returnRoleInfo
    }
  },
  watch: {
    dialogvVisible(newValue,oldValue){
      newValue && this.$refs["addRole"].resetFields();
    },
    _roleInfoData(newValue,oldValue){
      this.addRoleForm.allRole = newValue.allRole;
      this.addRoleForm.currentRole = newValue.currentRole;
      this.addRoleForm.systemOptions = newValue.systemOptions;
    },
    'addRoleForm.systemType'(newVal, oldVal) {
      this.addRoleForm.roleOptions = this.addRoleForm.allRole.filter((todo)=>todo.systemType===newVal)
    }, 
    changeInfoData: {
      immediate: true, // 很重要！！！
      handler (val) {
        this.addRoleForm.userName = val.userName;
        this.addRoleForm.userId = val.userId;
        this.addRoleForm.userComment = val.userComment;
      }
    }
  },
  methods: {
    cancelAddRole(){
      this.$refs["addRole"].resetFields();
      this.$emit('handleDialog')
    },
    determineAddRole() {
      this.$refs["addRole"].validate((valid) => {
        if (valid) {
          let _this = this;
          this.$confirm('确认添加？')
          .then(_ => {
            let params = {
              userId:this.addRoleForm.userId,
              roleId:this.addRoleForm.roleId,
            }
            _this.$emit('handleDialog',params,3)
          }).catch(_ => {});
        }
       })
    }
  },
}
</script>
<style lang="scss" scoped>
.dialog-footer {
    display: flex;
    justify-content: flex-end;
}
</style>