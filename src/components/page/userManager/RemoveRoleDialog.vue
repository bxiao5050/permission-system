<template>
    <div class="adduserBox">
        <el-form :model="removeRoleForm" :rules="rules" ref="removeRole">
            <el-form-item label="用户名" prop="userComment" :label-width="formLabelWidth">
                <el-input style="width: 300px;" disabled v-model="removeRoleForm.userComment" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="账号" prop=" userName" :label-width="formLabelWidth">
                <el-input style="width: 300px;" disabled v-model="removeRoleForm.userName" autocomplete="off"></el-input>
            </el-form-item>

             <el-form-item label="移除角色" :label-width="formLabelWidth" prop="id">
              <el-select v-model="removeRoleForm.id" placeholder="请选择需要移除的角色">
                <el-option v-for="(item,i) in _roleInfoData" :key="i" :label="item.systemName+'--'+item.roleName" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="cancelRemoveRole">取 消</el-button>
            <el-button type="primary" @click="determineRemoveRole">确 定</el-button>
        </div>
    </div>
</template>
<script>
import LoginVue from '../Login.vue'
export default {
  name: "RemoveRoleDialog",
  props:["dialogvVisible","changeInfoData"],
  data() {
    return {
      formLabelWidth: '120px',
      removeRoleForm: {
        userName: "",
        userComment: "",
        id:"",
        roleOptions:[],
      },
      rules: {
        id: [{ required: true, message: '请输选择角色', trigger: 'blur' },],
      }
    }
  },
  computed: {
    _roleInfoData() {
      return this.$store.state.userManager.currentInfoData
    }
  },
  watch: {
    dialogvVisible(newValue,oldValue){
      newValue && this.$refs["removeRole"].resetFields();
    },
    changeInfoData: {
      immediate: true, // 很重要！！！
      handler (val) {
        this.removeRoleForm.userName = val.userName;
        this.removeRoleForm.userComment = val.userComment;
      }
    }
  },
  methods: {
    cancelRemoveRole(){
      this.$refs["removeRole"].resetFields();
      this.$emit('handleDialog')
    },
    determineRemoveRole() {
      this.$refs["removeRole"].validate((valid) => {
        if (valid) {
          let _this = this;
          this.$confirm('确认添加？')
          .then(_ => {
            _this.$emit('handleDialog',{id:this.removeRoleForm.id},4)
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