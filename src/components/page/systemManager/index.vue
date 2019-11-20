<template>
    <div>
        <div class="crumbs">
            <el-row>
                <el-button type="info" @click="addSystem">新增系统</el-button>
            </el-row>
        </div>
        <div class="container">
            <el-row>
                <el-table
                    :data="tableData.filter(data => !search || data.systemName.toLowerCase().includes(search.toLowerCase()))"
                    style="width: 100%;"
                >
                    <el-table-column
                        v-for="(item,i) in (Object.keys(tableData[0]?tableData[0]:[]))"
                        v-if="!hideTitle.includes(item)"
                        :key="i"
                        :formatter="formatter"
                        :label="ChineseTitle[i]"
                        :prop="item"
                        align="center"
                    ></el-table-column>
                    <el-table-column align="center" width="170px">
                        <template slot="header" slot-scope="scope">
                            <el-input v-model="search" size="medium " placeholder="输入账号搜索" />
                        </template>
                        <template slot-scope="scope">
                            <el-button
                                size="mini"
                                type="warning"
                                @click="handleEdit(scope.$index, scope.row)"
                            >修改</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-row>
        </div>
        <el-dialog
            :title="dialogForm.dialogFormTitle"
            width="500px"
            :visible.sync="dialogForm.dialogFormVisible"
            :before-close="handleClose"
        >
            <add-system-dialog
                @handleDialog="handleDialog"
                :dialogvVisible="dialogvVisible"
                :changeInfoData="changeInfo"
                v-if="dialogForm.dialogFormIndex==1"
            ></add-system-dialog>
            <change-system-dialog
                @handleDialog="handleDialog"
                :dialogvVisible="dialogvVisible"
                :changeInfoData="changeInfo"
                v-if="dialogForm.dialogFormIndex==2"
            ></change-system-dialog>
        </el-dialog>
    </div>
</template>

<script>
import AddSystemDialog from './AddSystemDialog'
import ChangeSystemDialog from './changeSystemDialog'
export default {
  name: 'syatemManagerIndex',
  components: {
    AddSystemDialog, ChangeSystemDialog
  },
  data() {
    return {
      search: "",
      tableData: [],
      hideTitle: ["systemId", "systemSequence"],
      ChineseTitle: ["系统ID", "系统类型", "系统名", "systemSequence", "创建时间", "标记时间"],
      changeInfo: null,
      dialogForm: {
        dialogFormTitle: '',
        dialogFormVisible: false,
        dialogFormIndex: 0
      },
      dialogvVisible: false,
    };
  },
  created() {
    this.getSystemList();
  },
  methods: {
    getSystemList() {
      this.$store.dispatch('getSystemList').then((data) => {
        this.tableData = data;
      })
    },
    addSystem() {
      this.dialogForm = {
        dialogFormTitle: "添加系统",
        dialogFormVisible: true,
        dialogFormIndex: 1
      }
    },
    formatter(row, column, cellValue, index) {
      const titleArr = ["创建时间", "标记时间"]
      if (titleArr.includes(column.label)) {
        return new Date(cellValue).Format("yyyy-MM-dd h:mm:ss");
      }
      return cellValue;
    },
    handleEdit(index, row) {
      this.dialogForm = {
        dialogFormTitle: "修改系统",
        dialogFormVisible: true,
        dialogFormIndex: 2
      }
      this.changeInfo = row
    },
    handleDialog(ev, dialogIndex) {
      if (!!ev) {
        switch (dialogIndex) {
          case 1:
            this.$store.dispatch('addSystemData', ev).then((data) => {
              this.dialogForm.dialogFormVisible = false,
                this.dialogvVisible = true,
                this.tableData = data;
              this.$message.success('添加系统成功');
            })
            break;
          case 2:
            this.$store.dispatch('changeSystemData', ev).then((data) => {
              this.dialogForm.dialogFormVisible = false,
                this.dialogvVisible = true,
                this.tableData = data;
              this.$message.success('修改系统成功');
            })
            break;
          default:
            break;
        }

      } else {
        this.dialogForm.dialogFormVisible = false;
      }

    },
    handleClose() {
      let _that = this;
      // this.$confirm('确认关闭？')
      // .then(_ => {
      this.dialogForm.dialogFormVisible = false;
      this.dialogvVisible = true
      // })
      // .catch(_ => {});
    },
  }
};
</script>