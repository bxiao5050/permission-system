<template>
    <div class="adduserBox">
        <el-form :model="addRoleForm" :rules="rules" ref="addRole">
            <el-form-item label="角色名" prop="roleName" :label-width="formLabelWidth">
                <el-input style="width: 300px;"  v-model="addRoleForm.roleName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="角色排序"  :label-width="formLabelWidth">
                <el-input style="width: 300px;" disabled v-model="changeInfoData" autocomplete="off"></el-input>
            </el-form-item>
             <el-form-item label="选择系统" :label-width="formLabelWidth" prop="systemType">
              <el-select v-model="addRoleForm.systemType" placeholder="请选择系统">
                <el-option v-for="(item,i) in $store.state.roleManager.systemType" :key="i" :label="item.label" :value="item.value"></el-option>
              </el-select>
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
        roleName: "",
        systemType:"",
      },
      allRole:[],
      rules: {
        roleName: [{ required: true, message: '请输输入新增角色名', trigger: 'blur' },],
        systemType: [{ required: true, message: '请输选择系统', trigger: 'blur' },],
      }

    }
  },
  watch: {
    dialogvVisible(newValue,oldValue){
      newValue && this.$refs["addRole"].resetFields();
    },
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
              roleName:this.addRoleForm.roleName,
              systemType:this.addRoleForm.systemType,
              roleSequence:this.changeInfoData
            }
            _this.$emit('handleDialog',params,1)
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