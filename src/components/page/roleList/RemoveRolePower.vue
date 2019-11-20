<template>
    <div class="adduserBox">
        <el-form :model="powerForm" :rules="rules" ref="removePower">
            <el-form-item label="菜单选择" prop="resources" :label-width="formLabelWidth">
                <menu-select :menuSelectInfo="menuSelectInfo"></menu-select>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="cancelremovePower">取 消</el-button>
            <el-button type="primary" @click="determineremovePower">确 定</el-button>
        </div>
    </div>
</template>
<script>
import MenuSelect from '../../common/menuSelect'
export default {
  name: "AddRolePower",
  components: {MenuSelect,},
  props:["changeInfoData"],
  data() {
    return {
      formLabelWidth: '120px',
      powerForm: {
        resources:"",
      },
      menuSelectInfo:{
        isPanel:false,
        isMultiple:true,
        isRadio:false,
        callBack: this.callBack,
        dataType:0
      },
      rules: {
        resources: [{ required: true, message: '请选择菜单', trigger: 'blur' },],
      }

    }
  },
  watch: {
    changeInfoData: {
      immediate: true, // 很重要！！！
      handler (val) {
        this.menuSelectInfo.dataType = 1;
        this.powerForm.roleId = val.roleId;
      }
    }
  },
  methods: {
    callBack(ev){
      let idData = []
      if (!!ev) {
        ev.forEach(element => {
          idData = idData.concat(element.slice(element.length-1))
        });
        this.powerForm.resources = idData.join() 
      }
    },
    cancelremovePower(){
      this.$refs["removePower"].resetFields();
      this.$emit('handleDialog')
    },
    determineremovePower() {
      this.$refs["removePower"].validate((valid) => {
        if (valid) {
          let _this = this;
          this.$confirm('确认修改？')
          .then(_ => {
            _this.$emit('handleDialog',this.powerForm,4)
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