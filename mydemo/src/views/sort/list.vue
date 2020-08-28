<template>
  <div>
    <el-table
      :data="get_CateList"
      border
      row-key="id"
      default-expand-all
      :tree-props="{children: 'children'}"
    >
      <el-table-column prop="id" label="分类编号" width="180"></el-table-column>
      <el-table-column prop="catename" label="分类名称" width="180"></el-table-column>
      <el-table-column prop="img" label="图片" width="180">
        <template slot-scope="item">
          <div>
            <img class="uploadImg" :src="item.row.img? uploadHttp+item.row.img : ''" />
          </div>
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
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
//调用接口
import { getCateDel } from "../../util/axios";
export default {
  data() {
    return {};
  },
  mounted() {
    this.getCateListAction();
  },
  computed: {
    ...mapGetters(["get_CateList"]),
  },
  methods: {
    ...mapActions(["getCateListAction"]),
    update(id) {
      this.$emit("update", {
        id,
        isAdd: false,
      });
    },
    del(id) {
      this.$confirm("确定要删除该数据吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          getCateDel({ id }).then((res) => {
            if (res.code === 200) {
              this.$message({
                type: "success",
                message: res.msg,
              });
              this.getCateListAction();
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
  },
};
</script>

<style  lang="" scoped>
.uploadImg {
  width: 200px;
}
</style>


