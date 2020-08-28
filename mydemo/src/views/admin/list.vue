<template>
    <div>
        <!-- table表格 -->
        <el-table :data="get_UserList" border style="width: 100%">
            <el-table-column prop="uid" label="用户编号" width="180"></el-table-column>
            <el-table-column prop="username" label="用户名称" width="180"></el-table-column>
            <el-table-column prop="rolename" label="所属角色" width="180"></el-table-column>
            <el-table-column prop="status" label="状态">
                <template slot-scope="item">
                    <el-tag v-if="item.row.status ==1" type="success">正常</el-tag>
                    <el-tag v-else type="danger">禁用</el-tag>
                </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作">
                <template slot-scope="item">
                    <el-button @click='update(item.row.uid)' type="primary">编辑</el-button>
                    <el-button @click="del(item.row.uid)" type="danger">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        
        <el-pagination
            background
            layout="prev, pager, next"
            :total="total"
            :page-size="pageInfo.size"
            @current-change="getChange"
            @prev-click="prevInfo"
            @next-click="nextInfo"
        ></el-pagination>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { getUserDel,getUserCount,getUserAdd, } from "../../util/axios";   
export default {
    data() {
        return{
            total: 0,
            pageInfo: {
                size: 2,
                page: 1, 
            },
            changePage: 1,
        }
    },
    mounted() {
    this.getCount();
    this.getUserListAction(this.pageInfo);
    },
    computed: {
        ...mapGetters(["get_UserList"]),
    },
    methods: {
        ...mapActions(["getUserListAction"]),
        update(uid){
            this.$emit('update',{
                uid,
                isAdd:false,
                changePage: this.changePage,
            })
        },
        del(uid) {
            this.$confirm("确定要删除该数据吗", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            })
                .then(() => {
                getUserDel({ uid }).then((res) => {
                    if (res.code === 200) {
                    this.$message({
                        type: "success",
                        message: res.msg,
                    });
                    this.getCount();
                    } else {
                    this.$message.error(res.msg);
                    }
                });
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除",
                    });
                });
            },
            getCount() {

            getUserCount().then((res) => {
                if (res.code === 200) {

                this.total = res.list[0].total;
              
                if (this.pageInfo.page != 1 && this.get_UserList.length == 1) {
                    this.pageInfo.page--;
                }
                this.getUserListAction(this.pageInfo);
                }
            });
            },
            getChange(n) {
            this.pageInfo.page = n;
            this.changePage = n;
            this.getUserListAction(this.pageInfo);
            },
            prevInfo(n) {
            console.log(n, "当前页");
            this.pageInfo.page = n;
            this.changePage = n;
            this.getUserListAction(this.pageInfo);
            },
            nextInfo(n) {
            console.log(n, "当前页");
            this.pageInfo.page = n;
            this.changePage = n;
            this.getUserListAction(this.pageInfo);
            },
        },
    }
</script>

<style lang="" scoped>
.el-pagination {
    float: right;
    margin: 16px 0;
}
</style>
