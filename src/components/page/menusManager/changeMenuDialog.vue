<template>
    <div >
        <el-form :model="changeInfoForm" :rules="rules" ref="addMenu">
            <el-form-item label="资源名称" prop="resourceName" :label-width="formLabelWidth">
                <el-input style="width: 300px;"  v-model="changeInfoForm.resourceName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="url"  :label-width="formLabelWidth">
                <el-input style="width: 300px;"  v-model="changeInfoForm.url" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="cancelAddMenu">取 消</el-button>
            <el-button type="primary" @click="determineChangeMenu">确 定</el-button>
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
      changeInfoForm: {
        resourceName: "",
        url:"",
      },
      rules: {
        resourceName: [{ required: true, message: '请输入资源名称', trigger: 'blur' },],
      }

    }
  },
  watch: {
    dialogvVisible(newValue,oldValue){
      newValue && this.$refs["addMenu"].resetFields();
    },
    changeInfoData: {
      immediate: true, // 很重要！！！
      handler (val) {
        this.changeInfoForm.resourceName = val.resourceName;
        this.changeInfoForm.url = val.url;
        this.changeInfoForm.resourceId = val.resourceId;
        this.changeInfoForm.gameId = val.gameId;
        this.changeInfoForm.resourceType = val.resourceType;
        this.changeInfoForm.parentId = val.parentId;
        this.changeInfoForm.path = val.path;
        this.changeInfoForm.id = val.id;
      }
    }
  },
  
  methods: {
    cancelAddMenu(){
      this.$refs["addMenu"].resetFields();
      this.$emit('handleDialog')
    },
    determineChangeMenu() {
      this.$refs["addMenu"].validate((valid) => {
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