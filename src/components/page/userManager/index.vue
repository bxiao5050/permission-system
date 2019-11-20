<template>
    <div class="userBox">
        <el-row>
            <el-button type="info" @click="addUser">添加用户</el-button>
        </el-row>
        <el-row style="width:100%;height:90%" >
            <el-table
                :data="tableData.filter(data => !search || data.userName.toLowerCase().includes(search.toLowerCase()))"
                :default-sort = "{prop: 'userStatus', order: 'descending'}"
                height="100%"
                style="width: 100%;">
                <el-table-column
                type="index"
                label="序号"
                width="50"
                align="center">
                </el-table-column>
                <el-table-column
                v-for="(item,i) in (Object.keys(tableData[0]?tableData[0]:[]))"
                v-if="!hideTitle.includes(item)"
                :key="i"
                :label="ChineseTitle[i]"
                :prop="item"
                :formatter="formatter"
                align="center">
                </el-table-column>
                <el-table-column
                align="center"
                width="330px">
                <template slot="header" slot-scope="scope">
                    <el-input
                    v-model="search"
                    size="medium "
                    placeholder="输入账号搜索"/>
                </template>
                <template slot-scope="scope">
                    <div v-if="tableData[scope.$index].userStatus">
                        <el-row>
                            <el-button size="mini" type="warning" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
                            <el-button size="mini" type="success" @click="handlehRole(scope.$index, scope.row)">添加角色</el-button>
                        </el-row>
                        <el-row>
                            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                            <el-button size="mini" type="danger" @click="handlehRemove(scope.$index, scope.row)">移除角色</el-button>
                        </el-row>
                    </div>
                </template>
                </el-table-column>
            </el-table>
        </el-row>
        <el-row>
            <el-dialog :title="dialogForm.dialogFormTitle" width="500px" :visible.sync="dialogForm.dialogFormVisible" :before-close="handleClose">
                <add-user-dialog @handleDialog="handleDialog" :dialogvVisible="dialogvVisible" v-if="dialogForm.dialogFormIndex==1"></add-user-dialog>
                <change-info-dialog @handleDialog="handleDialog" :changeInfoData="changeInfo"  v-if="dialogForm.dialogFormIndex==2"></change-info-dialog>
                <add-role-dialog @handleDialog="handleDialog" :changeInfoData="changeInfo" :dialogvVisible="dialogvVisible" v-if="dialogForm.dialogFormIndex==3"></add-role-dialog>
                <remove-role-dialog @handleDialog="handleDialog" :changeInfoData="changeInfo" :dialogvVisible="dialogvVisible" v-if="dialogForm.dialogFormIndex==4"></remove-role-dialog>
            </el-dialog>
        </el-row>
    </div>
</template>

<script>
import md5 from 'md5'
import AddUserDialog from './AddUserDialog'
import ChangeInfoDialog from './ChangeInfoDialog'
import AddRoleDialog from './AddRoleDialog'
import RemoveRoleDialog from './RemoveRoleDialog'
export default {
    name: 'userManagerIndex',
    components:{AddUserDialog,ChangeInfoDialog,AddRoleDialog,RemoveRoleDialog},
    data() {
        return {
            search:'',
            tableData:[],
            changeInfo:{},
            dialogForm:{
                dialogFormTitle:'',
                dialogFormVisible:false,
                dialogFormIndex:0
            },
            dialogvVisible:false,
            hideTitle : ["userId","passWord","timeflag"],
            ChineseTitle:["用户ID","账号","密码","用户名","邮箱","手机号","状态","创建时间","最后修改时间","timeflag","类型","描述"]
            
        };
    },
    created() {
        this.getData()
    },
    methods: {
        getData(){
            this.$store.dispatch('getUserList').then((data) => {
                this.tableData = data;
            })
        },
        addUser(){
            this.dialogForm ={
                dialogFormTitle:"添加用户",
                dialogFormVisible : true,
                dialogFormIndex:1
            }
        },
        handleEdit(index, row) {
            this.changeInfo = row;
            this.dialogForm ={
                dialogFormTitle:"修改用户",
                dialogFormVisible : true,
                dialogFormIndex:2
            }
        },
        handlehRemove(index, row){
            var params = {
                userId:row.userId,
            }
            this.$store.dispatch('getCurrentRole',params).then((data) => {               
                let userInfo =  {
                    userName:row.userName,
                    userComment:row.userComment,
                    userId:row.userId,
                };
                this.changeInfo = userInfo
                
            })

            this.dialogForm ={
                dialogFormTitle:"移除角色",
                dialogFormVisible : true,
                dialogFormIndex:4
            }
        },
        handlehRole(index, row){
            var params = {
                userId:row.userId,
            }
            this.$store.dispatch('getRoleInfo',params).then((data) => {               
                let userInfo =  {
                    userName:row.userName,
                    userComment:row.userComment,
                    userId:row.userId,
                };
                this.changeInfo = userInfo
                
            })

            this.dialogForm ={
                dialogFormTitle:"添加角色",
                dialogFormVisible : true,
                dialogFormIndex:3
            }
        },
        handleDelete(index, row) {
            let params = {
                userId:row.userId,
                userStatus:0
            }
            let _that = this;
            this.$confirm('确认删除？')
            .then(_ => {
                 _that.$store.dispatch('delUserData',params).then((data) => {
                    this.tableData = data;
                    this.$message.success('删除成功');
                })
            })
            .catch(_ => {});
        },
        handleDialog(ev,dialogIndex){
            if (!!ev) {
                switch (dialogIndex) {
                    case 1:
                        ev.passWord = md5(ev.passWord)
                        this.$store.dispatch('addUserData',ev).then((data) => {
                            this.dialogForm.dialogFormVisible=false,
                            this.dialogvVisible = true,
                            this.tableData = data;
                            this.$message.success('添加成功');
                        })
                        break;
                    case 2:
                        this.$store.dispatch('changeInfoData',ev).then((data) => {
                            this.dialogForm.dialogFormVisible=false,
                            this.dialogvVisible = true,
                            this.tableData = data;
                            this.$message.success('修改成功');
                        })
                        break;
                    case 3:
                        this.$store.dispatch('addRoleData',ev).then((data) => {
                            this.dialogForm.dialogFormVisible=false,
                            this.dialogvVisible = true,
                            // this.tableData = data;
                            this.$message.success('角色添加成功');
                        })
                        break;
                    case 4:
                        this.$store.dispatch('removeRoleData',ev).then((data) => {
                            this.dialogForm.dialogFormVisible=false,
                            this.dialogvVisible = true,
                            // this.tableData = data;
                            this.$message.success('角色移除成功');
                        })
                        break;
                    default:
                        break;
                }
                
            }else{
                this.dialogForm.dialogFormVisible = false;
            }
            
        },
        handleClose(){
            let _that = this;
            // this.$confirm('确认关闭？')
            // .then(_ => {
                this.dialogForm.dialogFormVisible = false;
                this.dialogvVisible=true
            // })
            // .catch(_ => {});
        },
        formatter(row, column, cellValue, index) {
            const titleArr = ["创建时间","最后修改时间"]
            if (titleArr.includes(column.label)) {
                return  new Date(cellValue).Format("yyyy-MM-dd h:mm:ss"); 
            }
            return cellValue;
        }

    }
};
</script>


<style scoped>
.el-row {
    margin-bottom: 20px;
}
.userBox{
    width: 100%;
    height: 100%;
}
</style>
