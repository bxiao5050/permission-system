<template>
    <div >
        <el-form :model="addSystemForm" :rules="rules" ref="addSystem">
            <el-form-item label="系统名" prop="syatemName" :label-width="formLabelWidth">
                <el-input style="width: 300px;"  v-model="addSystemForm.syatemName" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="cancelAddSystem">取 消</el-button>
            <el-button type="primary" @click="determineAddSystem">确 定</el-button>
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
      addSystemForm: {
        syatemName: "",
      },
      rules: {
        syatemName: [{ required: true, message: '请输输入新增系统名', trigger: 'blur' },],
      }

    }
  },
  watch: {
    dialogvVisible(newValue,oldValue){
      newValue && this.$refs["addSystem"].resetFields();
    },
  },
  methods: {
    cancelAddSystem(){
      this.$refs["addSystem"].resetFields();
      this.$emit('handleDialog')
    },
    
    determineAddSystem() {
      this.$refs["addSystem"].validate((valid) => {
        if (valid) {
          let _this = this;
          this.$confirm('确认添加？')
          .then(_ => {
            let params = {
              systemName:this.addSystemForm.syatemName,
              systemSequence:this.$store.state.systemManager.systemSequence
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