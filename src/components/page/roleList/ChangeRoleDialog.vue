<template>
    <div class="adduserBox">
        <el-form :model="changeInfoForm" :rules="rules" ref="changeRole">
            <el-form-item label="角色名" prop="roleName" :label-width="formLabelWidth">
                <el-input style="width: 300px;" v-model="changeInfoForm.roleName" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="cancelChangeRole">取 消</el-button>
            <el-button type="primary" @click="determineChangeRole">确 定</el-button>
        </div>
    </div>
</template>
<script>
import LoginVue from '../Login.vue'
export default {
  name: "ChangeRoleDialog",
  props:["changeInfoData"],
  data() {
    return {
      formLabelWidth: '120px',
      changeInfoForm: {
        roleName:"",
      },
      rules: {
        roleName: [{ required: true, message: '请输入角色名', trigger: 'blur' },],
      }
    }
  },
  watch: {
    changeInfoData: {
      immediate: true, // 很重要！！！
      handler (val) {
        this.changeInfoForm.roleId = val.roleId;
        this.changeInfoForm.roleName = val.roleName;
        this.changeInfoForm.systemType = val.systemType;
        this.changeInfoForm.roleSequence = val.roleId;
      }
    }
  },
  methods: {
    cancelChangeRole(){
      this.$refs["changeRole"].resetFields();
      this.$emit('handleDialog')
    },
    determineChangeRole() {
      this.$refs["changeRole"].validate((valid) => {
        if (valid) {
          let _this = this;
          this.$confirm('确认修改？')
          .then(_ => {
            _this.$emit('handleDialog',this.changeInfoForm,2)
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