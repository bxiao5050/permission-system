<template>
    <div class="adduserBox">
        <el-form :model="addUserForm" :rules="rules" ref="addUser">
            <el-form-item label="用户名" prop="userComment" :label-width="formLabelWidth">
                <el-input style="width: 300px;" v-model="addUserForm.userComment" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="账号" prop="userName" :label-width="formLabelWidth">
                <el-input style="width: 300px;" v-model="addUserForm.userName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="passWord" :label-width="formLabelWidth">
                <el-input style="width: 300px;" v-model="addUserForm.passWord" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="userEmail" :label-width="formLabelWidth">
                <el-input style="width: 300px;" v-model="addUserForm.userEmail" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="手机号" prop="userMobile" :label-width="formLabelWidth">
                <el-input style="width: 300px;" v-model="addUserForm.userMobile" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="用户类型" prop="type" :label-width="formLabelWidth">
                <el-input style="width: 300px;" v-model="addUserForm.type" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="用户描述" prop="userDescription" :label-width="formLabelWidth">
                <el-input style="width: 300px;"  v-model="addUserForm.userDescription" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="cancelAddUser">取 消</el-button>
            <el-button type="primary" @click="determineAddUesr">确 定</el-button>
        </div>
    </div>
</template>
<script>
import LoginVue from '../Login.vue'
export default {
  name: "AddUserDialog",
  props:["dialogvVisible"],
  data() {
    return {
      formLabelWidth: '120px',
      addUserForm: {
        userName: "",
        passWord: "",
        userComment: "",
        userEmail: "",
        userMobile: "",
        type: "",
        userDescription: "",
      },
      rules: {
        userName: [{ required: true, message: '请输入用户名', trigger: 'blur' },],
        passWord: [{ required: true, message: '请输入密码', trigger: 'blur' },],
        userComment: [{ required: true, message: '请输入账号', trigger: 'blur' },],
        userEmail: [{ required: true, message: '请输入邮箱', trigger: 'blur' },],
        userMobile: [{ required: true, message: '请输入手机号', trigger: 'blur' },],
        type: [{ required: true, message: '请输入用户类型', trigger: 'blur' },],
        userDescription: [{ required: true, message: '请输入用户描述', trigger: 'blur' },],
      }

    }
  },
  watch: {
    dialogvVisible(newValue,oldValue){
      newValue && this.$refs["addUser"].resetFields();
    }
  },
  methods: {
    cancelAddUser(){
      this.$refs["addUser"].resetFields();
      this.$emit('handleDialog')

    },
    determineAddUesr() {
      this.$refs["addUser"].validate((valid) => {
        if (valid) {
          let _this = this;
          this.$confirm('确认添加？')
          .then(_ => {
            _this.$emit('handleDialog',this.addUserForm,1)
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