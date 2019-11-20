<template>
    <div>
        <el-button size="mini" type="info" @click="handleAdd()">新增菜单</el-button>
        <menu-select :menuSelectInfo="menuSelectInfo"></menu-select>
        <div class="container">
            <el-row>
                <el-table
                    :data="tableData.filter(data => !search || data.resourceName.toLowerCase().includes(search.toLowerCase()))"
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
                    <el-table-column align="center" width="170px" v-if="tableData.length">
                        <template slot="header" slot-scope="scope">
                            <el-input v-model="search" size="medium " placeholder="输入菜单名搜索" />
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
            <add-menu-dialog
                @handleDialog="handleDialog"
                :dialogvVisible="dialogvVisible"
                :changeInfoData="changeInfo"
                v-if="dialogForm.dialogFormIndex==1"
            ></add-menu-dialog>
            <change-menu-dialog
                @handleDialog="handleDialog"
                :dialogvVisible="dialogvVisible"
                :changeInfoData="changeInfo"
                v-if="dialogForm.dialogFormIndex==2"
            ></change-menu-dialog>
        </el-dialog>
    </div>
</template>

<script>
import AddMenuDialog from './AddMenuDialog';
import ChangeMenuDialog from './changeMenuDialog';
import MenuSelect from '../../common/menuSelect';
import Vue from 'vue'
export default {
    name: 'menuManagerIndex',
    components: {
        ChangeMenuDialog,
        AddMenuDialog,
        MenuSelect
    },
    data() {
        return {
            search: '',
            menuOptions: [],
            hideTitle: ['children', 'path', 'id', 'resourceId'],
            ChineseTitle: ['ID', 'resourceId', '菜单名称', 'url', '游戏ID', '资源类型', '父ID', 'path', 'children'],
            changeInfo: null,
            dialogForm: {
                dialogFormTitle: '',
                dialogFormVisible: false,
                dialogFormIndex: 0
            },
            menuSelectInfo:{
                isPanel:true,
                isRadio:true,
                isMultiple:false,
                dataType:0,
            },
            dialogvVisible: false
        };
    },
    computed: {
        tableData() {           
            return this.$store.state.menusManager.tableData
        }
    },
    methods: {

        formatter(row, column, cellValue, index) {
            const titleArr = ['创建时间', '标记时间'];
            if (titleArr.includes(column.label)) {
                return new Date(cellValue).Format('yyyy-MM-dd h:mm:ss');
            }
            return cellValue;
        },
        handleAdd(index, row) {
            this.dialogForm = {
                dialogFormTitle: '新增菜单',
                dialogFormVisible: true,
                dialogFormIndex: 1
            };
            this.changeInfo = row;
        },
        handleEdit(index, row) {
            this.dialogForm = {
                dialogFormTitle: '修改权限菜单',
                dialogFormVisible: true,
                dialogFormIndex: 2
            };
            this.changeInfo = row;
        },
        handleDialog(ev, dialogIndex) {
            if (!!ev) {
                switch (dialogIndex) {
                    case 1:
                        this.$store.dispatch('addMenuData', ev).then(data => {
                            (this.dialogForm.dialogFormVisible = false), (this.dialogvVisible = true);
                            this.$store.dispatch('getMenuList', { resourceIds: '', isList: 0 });
                            this.$message.success('添加权限菜单成功');
                        });
                        break;
                    case 2:
                        this.$store.dispatch('changeMenuData', ev).then(data => {
                            (this.dialogForm.dialogFormVisible = false), (this.dialogvVisible = true);
                            this.$message.success('修改权限菜单成功');
                        });
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
            this.dialogvVisible = true;
            // })
            // .catch(_ => {});
        }
    }
};
</script>