<template>
    <div>
        <!-- 面包屑 -->
        <el-bread></el-bread>
        <!-- 添加按钮 -->
        <div>
            <el-button @click="openDialog" type="primary" size="mini" plain>添加</el-button>
        </div>
        <!-- table表格渲染 -->
        <el-user ref='elUser' @update='update'></el-user>
        <!-- 弹框的渲染 -->
        <v-add ref='vAdd' :isShow="sonStatus" @closeDialog="closeDialog"></v-add>
    </div>
</template>
<script>
import elBread from "../../components/elBread";
import elUser from "./list";
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
    elUser,
    vAdd,
  },
  methods: {
    //打开弹框
    openDialog() {
      this.sonStatus.isAdd = true;
      this.sonStatus.dialogShow = true;
      this.sonStatus.getCount = this.$refs.elUser.getCount
    },
    //关闭弹框事件
    closeDialog(e) {
      this.sonStatus.dialogShow = e;
    },
    //update事件
    update(e){
      this.sonStatus.isAdd = e.isAdd
      this.sonStatus.dialogShow = true
      this.$refs.vAdd.update(e.uid,e.changePage)
    }
  },
};
</script>

<style  lang="" scoped>
.el-button {
  margin-bottom: 15px;
}
</style>
