<template>
    <div >
        <el-form :model="addMenuForm" :rules="rules" ref="addGame">
            <el-form-item label="添加位置" prop="formInline" :label-width="formLabelWidth">
             <el-cascader 
                v-model="addMenuForm.formInline"
                :props="{checkStrictly:true, expandTrigger: 'hover'}"
                :options="menuData"
                style="background:white"
            ></el-cascader>
            
            </el-form-item>
            <el-form-item label="资源Id" prop="resourceId" :label-width="formLabelWidth">
                <el-input style="width: 300px;"  v-model="addMenuForm.resourceId" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="资源名称" prop="resourceName" :label-width="formLabelWidth">
                <el-input style="width: 300px;"  v-model="addMenuForm.resourceName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="url" prop="url" :label-width="formLabelWidth">
                <el-input style="width: 300px;" v-model="addMenuForm.url" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="游戏id" prop="gameId" :label-width="formLabelWidth">
                <el-input style="width: 300px;" v-model="addMenuForm.gameId" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="资源类型" prop="resourceType" :label-width="formLabelWidth">
                <el-input style="width: 300px;" v-model="addMenuForm.resourceType" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="父id" prop="parentId" :label-width="formLabelWidth">
                <el-input style="width: 300px;" v-model="addMenuForm.parentId" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="资源路径" prop="path" :label-width="formLabelWidth">
                <el-input style="width: 300px;" v-model="addMenuForm.path" autocomplete="off"></el-input>
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
import MenuSelect from '../../common/menuSelect'
import { log } from 'util'
export default {
  name: "addGameDialog",
  props:["dialogvVisible"],
  components: {
    MenuSelect,
  },
  data() {
    return {
      formLabelWidth: '120px',
      addMenuForm: {
        resourceId: "",
        resourceName:"",
        url:"",
        gameId:"",
        resourceType:"",
        parentId:"",
        path:"",
        formInline:"",
      },
      rules: {
        formInline: [{ required: true, message: '请输入资源ID', trigger: 'blur' },],
        resourceId: [{ required: true, message: '请输入资源ID', trigger: 'blur' },],
        resourceName: [{ required: true, message: '请输入资源名称', trigger: 'blur' },],
        url: [{ required: true, message: '请输入url', trigger: 'blur' },],
        gameId: [{ required: true, message: '请输入游戏ID名', trigger: 'blur' },],
        resourceType: [{ required: true, message: '请输入资源类型', trigger: 'blur' },],
        parentId: [{ required: true, message: '请输入父ID', trigger: 'blur' },],
        path: [{ required: true, message: '请输入资源路径', trigger: 'blur' },],
      }

    }
  },
  computed: {
    menuData() {
      let menu = [{
          value: '999',
          label: '类别',
          children: this.$store.state.menusManager.menuData}]
      return menu;
    }
  },
  watch: {
    dialogvVisible(newValue,oldValue){
      newValue && this.$refs["addGame"].resetFields();
    },
    "addMenuForm.formInline"(newValue,oldValue){
      if (newValue.includes("999") && newValue.length===1) {
        this.addMenuForm.resourceName = "";
        this.addMenuForm.resourceId = 0;        
        this.addMenuForm.parentId = 0;
        this.addMenuForm.path = 0;
        this.addMenuForm.gameId = 0;
      }else if (newValue.length===2) {
        this.addMenuForm.resourceId = 0;
        this.addMenuForm.parentId = 0;
        this.addMenuForm.path = 0;
        this.addMenuForm.resourceType = newValue[1];
      }else if (newValue.length>1){
        let data1 = this.$store.state.menusManager.tableAllData.filter(todo=>todo.id===newValue[newValue.length-1])
        this.addMenuForm.resourceId = 0;
        this.addMenuForm.resourceType = newValue[1];
        this.addMenuForm.gameId = 0;
        this.addMenuForm.parentId =data1[0].id;
        this.addMenuForm.path = data1[0].id;
      }
    }
  },
  methods: {
    cancelAddSystem(){
      this.addMenuForm.formInline = []
      this.$refs["addGame"].resetFields();
      this.$emit('handleDialog')
    },
    
    determineAddSystem() {
      this.$refs["addGame"].validate((valid) => {
        if (valid) {
          let _this = this;
          this.$confirm('确认添加？')
          .then(_ => {
            _this.$emit('handleDialog',this.addMenuForm,1)
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