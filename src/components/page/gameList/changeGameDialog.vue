<template>
    <div >
        <el-form :model="changeInfoForm" :rules="rules" ref="addSystem">
            <el-form-item label="游戏名" prop="gameName" :label-width="formLabelWidth">
                <el-input style="width: 300px;"  v-model="changeInfoForm.gameName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="游戏状态" prop="gameStatus" :label-width="formLabelWidth">
              <el-radio v-model="changeInfoForm.gameStatus" label="0">0</el-radio>
              <el-radio v-model="changeInfoForm.gameStatus" label="1">1</el-radio>
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
        gameName: "",
        gameStatus:"",
      },
      rules: {
        gameName: [{ required: true, message: '请输输入新增系统名', trigger: 'blur' },],
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
        this.changeInfoForm.gameId = val.gameId;
        this.changeInfoForm.gameName = val.gameName;
        this.changeInfoForm.versions = val.versions;
        this.changeInfoForm.gameArea = val.gameArea;
        this.changeInfoForm.gameStatus = String(val.gameStatus);
        this.changeInfoForm.mainGameId = val.mainGameId;
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