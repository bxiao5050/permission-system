<template>
    <div >
        <el-form :model="addChannelForm" :rules="rules" ref="addChannel">
            <el-form-item label="主代理Id" prop="channelId" :label-width="formLabelWidth">
                <el-input style="width: 300px;" :disabled="TypeIsOptional || paramsIsModify" v-model="addChannelForm.channelId" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="主代理名" prop="channelName" :label-width="formLabelWidth">
                <el-input style="width: 300px;"  :disabled="paramsIsModify" v-model="addChannelForm.channelName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="子代理Id" prop="subChannelId" :label-width="formLabelWidth">
                <el-input style="width: 300px;"  :disabled="paramsIsModify" v-model="addChannelForm.subChannelId" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="子代理名" prop="subChannelName" :label-width="formLabelWidth">
                <el-input style="width: 300px;"  :disabled="paramsIsModify" v-model="addChannelForm.subChannelName" autocomplete="off"></el-input>
            </el-form-item> 
            <el-form-item label="渠道Id " prop="packageId" :label-width="formLabelWidth">
                <el-input style="width: 300px;"  v-model="addChannelForm.packageId" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="渠道名 " prop="packageName" :label-width="formLabelWidth">
                <el-input style="width: 300px;"  v-model="addChannelForm.packageName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="添加类型"    prop="type"  :label-width="formLabelWidth">
              <el-radio v-model="addChannelForm.type" :disabled="TypeIsOptional"   label="1"  name="type">添加渠道包</el-radio>
              <el-radio v-model="addChannelForm.type"  label="2"  name="type">完全新增渠道包</el-radio>
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
  name: "addChannelDialog",
  props:["dialogvVisible","changeInfoData"],
  data() {
    return {
      formLabelWidth: '120px',
      paramsIsModify:false,
      TypeIsOptional:false,
      addChannelForm: {
        channelId:"",
        subChannelId:"",
        channelName: "",
        subChannelName:"",
        packageId:"",
        packageName:"",
        type:"1",
      },
      rules: {
        channelId: [{ required: true, message: '请输入主代理ID', trigger: 'blur' },],
        subChannelId: [{ required: true, message: '请输入游戏ID', trigger: 'blur' },],
        channelName: [{ required: true, message: '请输入主代理名', trigger: 'blur' },],
        subChannelName: [{ required: true, message: '请输入子代理名', trigger: 'blur' },],
        packageId: [{ required: true, message: '请输入渠道ID', trigger: 'blur' },],
        packageName: [{ required: true, message: '请输输入渠道名', trigger: 'blur' },],
        channelName: [{ required: true, message: '请输输入新增游戏名', trigger: 'blur' },],
        type: [{ required: true, message: '请选择添加类型', trigger: 'blur' },]
      }

    }
  },
  watch: {
    dialogvVisible(newValue,oldValue){
      newValue && this.$refs["addChannel"].resetFields();
    },
    changeInfoData: {
      immediate: true, // 很重要！！！
      handler (val) {
        this.addChannelForm.gameId = val.gameInfo.gameId;
        this.addChannelForm.gameName = val.gameInfo.gameName;
        if (!val.channelInfo) {
          this.TypeIsOptional = true;
          this.paramsIsModify = false;
          this.addChannelForm.type = "2";
          this.addChannelForm.channelId = 0;
          this.addChannelForm.channelName = "千奇";
          this.addChannelForm.subChannelId = val.gameInfo.gameId;
          this.addChannelForm.subChannelName = "千奇";
        }else{
          this.paramsIsModify = true;
          this.TypeIsOptional = false;
          this.addChannelForm.type = "1";
          this.addChannelForm.channelId =  val.channelInfo.channelId;
          this.addChannelForm.channelName = val.channelInfo.channelName;
          this.addChannelForm.subChannelId = val.channelInfo.subChannelId;
          this.addChannelForm.subChannelName = val.channelInfo.subChannelName;
        }
        
      }
    }
  },
  methods: {
    cancelAddSystem(){
      this.$refs["addChannel"].resetFields();
      this.$emit('handleDialog')
    },
    
    determineAddSystem() {
      this.$refs["addChannel"].validate((valid) => {
        if (valid) {
          let _this = this;
          this.$confirm('确认添加？')
          .then(_ => {
            _this.$emit('handleDialog',this.addChannelForm,1)
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