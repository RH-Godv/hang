<template>
  <div>
    <!-- 面包屑 -->
    <el-bread></el-bread>
    <!-- 添加按钮 -->
    <div>
      <el-button @click="openDialog" type="primary" size="mini" plain>添加</el-button>
    </div>
    <!-- 表格渲染 -->
    <v-list @edit="edit"></v-list>
    <!-- 弹出对话框 -->
    <v-dialog ref="vDialog" :isShow="sonStatus" @closeDialog="closeDialog"></v-dialog>
  </div>
</template>

<script>
import elBread from "../../components/elBread";
import vList from "./list";
import vDialog from "./add";

export default {
  data() {
    return {
      sonStatus: {
        isAdd: true, 
        dialogShow: false, 
      },
    };
  },

  methods: {
    openDialog() {
      this.sonStatus.isAdd = true;
      this.sonStatus.dialogShow = true;
    },
    closeDialog(e) {
      this.sonStatus.dialogShow = e;
    },
    edit(e) {
      this.sonStatus.isAdd = e.isAdd;
      this.sonStatus.dialogShow = true;
      this.$refs.vDialog.update(e.id);
    },
  },
  components: {
    elBread,
    vList,
    vDialog,
  },
};
</script>

<style  lang="stylus" scoped>
.el-button {
  margin-bottom: 15px;
}
</style>
