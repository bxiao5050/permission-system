<template>
    <div >
        <el-form :model="changeInfoForm" :rules="rules" ref="addSystem">
            <el-form-item label="系统名" prop="systemName" :label-width="formLabelWidth">
                <el-input style="width: 300px;"  v-model="changeInfoForm.systemName" autocomplete="off"></el-input>
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
  props:["dialogvVisible","changeInfoData"],
  data() {
    return {
      formLabelWidth: '120px',
      changeInfoForm: {
        systemName: "",
      },
      rules: {
        systemName: [{ required: true, message: '请输输入新增系统名', trigger: 'blur' },],
      }

    }
  },
  computed: {
    _systemName() {
      return this.$store.state.systemManager.changeSystem 
    }
  },
  watch: {
    dialogvVisible(newValue,oldValue){
      newValue && this.$refs["addSystem"].resetFields();
    },
    changeInfoData: {
      immediate: true, // 很重要！！！
      handler (val) {
        this.changeInfoForm.systemId = val.systemId;
        this.changeInfoForm.systemType = val.systemType;
        this.changeInfoForm.systemName = val.systemName;
        this.changeInfoForm.systemSequence = val.systemSequence;
      }
    }
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