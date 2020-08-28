<template>
  <div>
    <el-table :data="get_SpecsList" border>
      <el-table-column prop="id" label="规格编号" width="180"></el-table-column>
      <el-table-column prop="specsname" label="规格名称" width="180"></el-table-column>
      <el-table-column prop="attrs" label="规格属性" width="180">
        <template slot-scope="item">
          <el-tag v-for='attr in item.row.attrs' type='info' :key='attr'>{{attr}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="item">
          <el-tag v-if="item.row.status ==1" type="success">正常</el-tag>
          <el-tag v-else type="danger">禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="item">
          <el-button type="primary" @click="update(item.row.id)" icon="el-icon-edit" circle></el-button>
          <el-button type="danger" icon="el-icon-delete" @click="del(item.row.id)" circle></el-button>
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
import {
  getSpecsDel,
  getSpecsCount,
  getSpecsAdd,
  getSpecsEdit,
} from "../../util/axios";
export default {
  data() {
    return {
      total: 0, 
      pageInfo: {
        size: 2, 
        page: 1, 
      },
      changePage: 1,
    };
  },
  mounted() {
    this.getCount();
    this.getSpecsListAction(this.pageInfo);
  },
  computed: {
    ...mapGetters(["get_SpecsList"]),
  },
  methods: {
    ...mapActions(["getSpecsListAction"]),
    update(id) {
      this.$emit("update", {
        id,
        isAdd: false,
        changePage: this.changePage,
      });
    },
    del(id) {
      this.$confirm("确定要删除该数据吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          getSpecsDel({ id }).then((res) => {
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
      getSpecsCount().then((res) => {
        if (res.code === 200) {
          this.total = res.list[0].total;
          if (this.pageInfo.page != 1 && this.get_SpecsList.length == 1) {
            this.pageInfo.page--;
          }
          this.getSpecsListAction(this.pageInfo);
        }
      });
    },
    getChange(n) {
      this.pageInfo.page = n;
      this.changePage = n;
      this.getSpecsListAction(this.pageInfo);
    },
    prevInfo(n) {
      this.pageInfo.page = n;
      this.changePage = n;
      this.getSpecsListAction(this.pageInfo);
    },
    nextInfo(n) {
      this.pageInfo.page = n;
      this.changePage = n;
      this.getSpecsListAction(this.pageInfo);
    },
  },
};
</script>

<style  lang="" scoped>
.el-pagination {
  float: right;
  margin: 16px 0;
}
</style>


