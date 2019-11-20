<template>
    <div>
        <div class="crumbs">
            <el-row>
                <el-button type="info" @click="addSystem">添加游戏区服</el-button>
                <el-select filterable v-model="gameId" placeholder="请选择游戏(输入可搜索)" style="marginLeft:15px">
                    <el-option
                        v-for="item in gameArr"
                        :key="item.value"
                        :label="item.gameName"
                        :value="item.gameId"
                    ></el-option>
                </el-select>
            </el-row>
        </div>
        <div class="container">
            <el-row>
                <el-table
                    :data="tableData.filter(data => !search || data.gameName.toLowerCase().includes(search.toLowerCase()))"
                    style="width: 100%;"
                >
                    <el-table-column
                        v-if="tableData.length"
                        type="index"
                        label="序号"
                        width="50"
                        align="center"
                    ></el-table-column>
                    <el-table-column
                        v-for="(item,i) in (Object.keys(tableData[0]?tableData[0]:[]))"
                        v-if="!hideTitle.includes(item)"
                        :key="i"
                        :formatter="formatter"
                        :label="ChineseTitle[i]"
                        :prop="item"
                        align="center"
                    ></el-table-column>
                </el-table>
            </el-row>
        </div>
        <el-dialog
            :title="dialogForm.dialogFormTitle"
            width="500px"
            :visible.sync="dialogForm.dialogFormVisible"
            :before-close="handleClose"
        >
            <add-zone-dialog
                @handleDialog="handleDialog"
                :dialogvVisible="dialogvVisible"
                :changeInfoData="changeInfo"
                v-if="dialogForm.dialogFormIndex==1"
            ></add-zone-dialog>
        </el-dialog>
    </div>
</template>

<script>
import AddZoneDialog from './AddZoneDialog';
import { log } from 'util';
export default {
    name: 'zoneManagerIndex',
    components: {
        AddZoneDialog
    },
    data() {
        return {
            search: '',
            tableData: [],
            hideTitle: ['regionId', 'platId', 'platName', 'agentId', 'agentStatus', 'agentSequence'],
            ChineseTitle: ['游戏ID', '游戏名', 'regionId', '地区', 'platId', 'platName', 'agentId', '区服', 'agentStatus', 'agentSequence'],
            gameArr: [],
            gameId: '',
            changeInfo: null,
            dialogForm: {
                dialogFormTitle: '',
                dialogFormVisible: false,
                dialogFormIndex: 0
            },
            dialogvVisible: false
        };
    },
    mounted() {
        this.$store.dispatch('getGameList').then(data => {
            this.gameArr = data;
        });
    },
    watch: {
        gameId(newValue, oldValue) {
            this.$store.dispatch('getZoneList', { gameId: newValue }).then(data => {
                this.tableData = data;
            });
        }
    },
    methods: {
        addSystem() {
            if (!this.gameId) return this.$message.error('请先选择游戏');
            this.dialogForm = {
                dialogFormTitle: '添加区服',
                dialogFormVisible: true,
                dialogFormIndex: 1
            };
            this.changeInfo = this.gameId;
        },
        formatter(row, column, cellValue, index) {
            const titleArr = ['创建时间', '标记时间'];
            if (titleArr.includes(column.label)) {
                return new Date(cellValue).Format('yyyy-MM-dd h:mm:ss');
            }
            return cellValue;
        },
        handleDialog(ev, dialogIndex) {
            if (!!ev) {
                switch (dialogIndex) {
                    case 1:
                        this.$store.dispatch('addZoneData', ev).then(data => {
                            (this.dialogForm.dialogFormVisible = false), (this.dialogvVisible = true), (this.tableData = data);
                            this.$message.success('添加区服成功');
                        });
                        break;
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