<template>
  <div>
    <el-bread></el-bread>
    <div>
      <el-button @click="openDialog" type="primary" size="mini" plain>添加</el-button>
    </div>
    <!-- table 表格渲染 -->
    <el-sort @update='update'></el-sort>
    <!-- 弹框的渲染 -->
    <v-add ref='vAdd' :isShow="sonStatus" @closeDialog="closeDialog"></v-add>
  </div>
</template>

<script>
import elBread from "../../components/elBread";
import elSort from "./list";
import vAdd from "./add";
export default {
  data() {
    return {
      sonStatus: {
        isAdd: true,
        dialogShow: false,
      },
    };
  },
  components: {
    elBread,
    elSort,
    vAdd,
  },
  methods: {
    openDialog() {
      this.sonStatus.isAdd = true;
      this.sonStatus.dialogShow = true;
    },
    closeDialog(e) {
      this.sonStatus.dialogShow = e;
    },
    update(e){
        this.sonStatus.isAdd = e.isAdd
        this.sonStatus.dialogShow = true
        this.$refs.vAdd.update(e.id)
    }
  },
};
</script>

<style  lang="" scoped>
.el-button {
  margin-bottom: 15px;
}
</style>
