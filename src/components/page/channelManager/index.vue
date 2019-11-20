<template>
    <div>
        <div class="crumbs">
            <el-row>
                <el-button type="info" @click="addChannel">添加游戏渠道</el-button>
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
                    :data="tableData.filter(data => !search || data.packageName.toLowerCase().includes(search.toLowerCase()))"
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
                    <el-table-column align="center" width="170px" v-if="tableData.length">
                        <template slot="header" slot-scope="scope">
                            <el-input v-model="search" size="medium " placeholder="输入包名搜索" />
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
            <add-channel-dialog
                @handleDialog="handleDialog"
                :dialogvVisible="dialogvVisible"
                :changeInfoData="changeInfo"
                v-if="dialogForm.dialogFormIndex==1"
            ></add-channel-dialog>
            <change-channel-dialog
                @handleDialog="handleDialog"
                :dialogvVisible="dialogvVisible"
                :changeInfoData="changeInfo"
                v-if="dialogForm.dialogFormIndex==2"
            ></change-channel-dialog>
        </el-dialog>
    </div>
</template>

<script>
import AddChannelDialog from './AddChannelDialog';
import ChangeChannelDialog from './ChangeChannelDialog';
import { log } from 'util';
export default {
    name: 'channelManagerIndex',
    components: {
        ChangeChannelDialog,
        AddChannelDialog
    },
    data() {
        return {
            search: '',
            tableData: [],
            hideTitle: ['channelId', 'subChannelId', 'packageId',"status"],
            ChineseTitle: ['游戏ID', '游戏名', '渠道ID', '渠道名', '子渠道ID', '子渠道名', '包ID', '包名', '状态'],
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
            this.$store.dispatch('getChannelList', { gameId: newValue }).then(data => {
                this.tableData = data;
            });
        }
    },
    methods: {
        addChannel() {
            if (!this.gameId) return this.$message.error('请先选择游戏');
            this.dialogForm = {
                dialogFormTitle: '添加渠道',
                dialogFormVisible: true,
                dialogFormIndex: 1
            };
            let gameInfo = this.gameArr.filter(todo => todo.gameId === this.gameId);
            this.changeInfo = {gameInfo:gameInfo[0],channelInfo:this.tableData[0]};
        },
        formatter(row, column, cellValue, index) {
            const titleArr = ['创建时间', '标记时间'];
            if (titleArr.includes(column.label)) {
                return new Date(cellValue).Format('yyyy-MM-dd h:mm:ss');
            }
            return cellValue;
        },
        handleEdit(index, row) {
            this.dialogForm = {
                dialogFormTitle: '修改渠道',
                dialogFormVisible: true,
                dialogFormIndex: 2
            };
            this.changeInfo = row;
        },
        handleDialog(ev, dialogIndex) {
            if (!!ev) {
                switch (dialogIndex) {
                    case 1:
                        this.$store.dispatch('addChannelData', ev).then(data => {
                            (this.dialogForm.dialogFormVisible = false), (this.dialogvVisible = true), (this.tableData = data);
                            this.$message.success('添加渠道成功');
                        });
                        break;
                    case 2:
                        this.$store.dispatch('changeChannelData', ev).then(data => {
                            (this.dialogForm.dialogFormVisible = false), (this.dialogvVisible = true), (this.tableData = data);
                            this.$message.success('修改渠道成功');
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