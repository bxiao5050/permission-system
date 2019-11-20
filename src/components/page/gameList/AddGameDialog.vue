<template>
    <div >
        <el-form :model="addGameForm" :rules="rules" ref="addGame">
            <el-form-item label="游戏名" prop="gameName" :label-width="formLabelWidth">
                <el-input style="width: 300px;"  v-model="addGameForm.gameName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="版本号" prop="versions" :label-width="formLabelWidth">
                <el-input style="width: 300px;" disabled v-model="addGameForm.versions" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="游戏地区名" prop="gameArea" :label-width="formLabelWidth">
                <el-input style="width: 300px;" v-model="addGameForm.gameArea" autocomplete="off"></el-input>
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
  name: "addGameDialog",
  props:["dialogvVisible"],
  data() {
    return {
      formLabelWidth: '120px',
      addGameForm: {
        gameName: "",
        versions:"V1.0.0.0",
        gameArea:""
      },
      rules: {
        gameName: [{ required: true, message: '请输输入新增游戏名', trigger: 'blur' },],
        // gameArea: [{ required: true, message: '请输输入地区名', trigger: 'blur' },],
      }

    }
  },
  watch: {
    dialogvVisible(newValue,oldValue){
      newValue && this.$refs["addGame"].resetFields();
    },
  },
  methods: {
    cancelAddSystem(){
      this.$refs["addGame"].resetFields();
      this.$emit('handleDialog')
    },
    
    determineAddSystem() {
      this.$refs["addGame"].validate((valid) => {
        if (valid) {
          let _this = this;
          this.$confirm('确认添加？')
          .then(_ => {
            _this.$emit('handleDialog',this.addGameForm,1)
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