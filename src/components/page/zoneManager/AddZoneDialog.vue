<template>
    <div>
        <el-form :model="addZoneForm" :rules="rules" ref="addGame">
            <el-form-item label="选择地区" prop="area" :label-width="formLabelWidth">
                <el-select v-model="addZoneForm.area" allow-create filterable placeholder="可输入">
                    <el-option v-for="(item,i) in areaOptions" :key="i" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="选择游戏服" prop="zoneName" :label-width="formLabelWidth">
                <el-select v-model="addZoneForm.zoneName" placeholder="请选择游戏服">
                    <el-option label="混服" value="混服"></el-option>
                    <el-option label="正式服" value="正式服"></el-option>
                </el-select>
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
  props: ["dialogvVisible","changeInfoData"],
  data() {
    return {
      formLabelWidth: '120px',
      addZoneForm: {
        gameId: "",
        zoneName: "",
        area: "",
      },
      rules: {
        zoneName: [{ required: true, message: '请选择游戏服', trigger: 'blur' },],
        area: [{ required: true, message: '请选择地区', trigger: 'blur' },],
      },
      areaOptions: [
        { label: "新马印尼地区", value: "新马印尼地区" },
        { label: "新马印菲地区", value: "新马印菲地区" },
        { label: "东南亚地区", value: "东南亚地区" },
        { label: "全球英文", value: "全球英文" },
        { label: "印尼地区", value: "印尼地区" },
        { label: "德国地区", value: "德国地区" },
        { label: "新马地区", value: "新马地区" },
        { label: "欧美地区", value: "欧美地区" },
        { label: "法国地区", value: "法国地区" },
        { label: "泰国地区", value: "泰国地区" },
        { label: "港台地区", value: "港台地区" },
        { label: "越南地区", value: "越南地区" },
        { label: "韩国地区", value: "韩国地区" },
        { label: "测试汇总", value: "测试汇总" },
        { label: "其它地区", value: "其它地区" },
      ]

    }
  },
  watch: {
    dialogvVisible(newValue, oldValue) {
      newValue && this.$refs["addGame"].resetFields();
    },
    changeInfoData: {
      immediate: true, // 很重要！！！
      handler (val) {
        this.addZoneForm.gameId = val;
      }
    }
  },
  methods: {
    cancelAddSystem() {
      this.$refs["addGame"].resetFields();
      this.$emit('handleDialog')
    },

    determineAddSystem() {
      this.$refs["addGame"].validate((valid) => {
        if (valid) {
          let _this = this;
          this.$confirm('确认添加？')
            .then(_ => {
              _this.$emit('handleDialog', this.addZoneForm, 1)
            }).catch(_ => { });
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