<template>
  <div>
    <el-dialog
      :before-close="reset"
      :title="isShow.isAdd?'添加商品规格':'编辑商品规格'"
      :visible.sync="isShow.dialogShow"
      center
    >
      <el-form :model="specsForm" :rules="rules" ref="ruleForm">
        <el-form-item prop="specsname" label="规格名称：" :label-width="formLabelWidth">
          <el-input v-model="specsForm.specsname"></el-input>
        </el-form-item>
        <el-form-item
          :label-width="formLabelWidth"
          v-for="(item, index) in specsArr"
          label="规格属性:"
          :key="index"
        >
          <el-input style="width:70%" v-model="item.value"></el-input>
          <el-button v-if="index==0" @click="addSpecs(item)" type="primary">新增规格属性</el-button>
          <el-button v-else @click="delSpecs(item)">删除</el-button>
        </el-form-item>
        <el-form-item label="状态：" :label-width="formLabelWidth">
          <el-switch
            v-model="specsForm.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="reset">取 消</el-button>
        <el-button type="primary" @click="add('ruleForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
//引入接口
import { getSpecsAdd, getSpecsInfo, getSpecsEdit } from "../../util/axios";
export default {
  data() {
    return {
      specsArr: [
        {
          value: "",
        },
      ], 
      editId: 0,
      changePage: 1,
      formLabelWidth: "120px", 
      specsForm: {
        specsname: "", 
        attrs: "", 
        status: 1,
      },
      rules: {
        specsname: [
          { required: true, message: "请输入商品规格名称", trigger: "blur" },
          {
            min: 2,
            max: 15,
            message: "长度在 2 到 15 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  mounted() {
    this.getRoleListAction();
  },
  computed: {
    ...mapGetters(["get_RoleList"]),
  },
  props: ["isShow"],
  methods: {
    addSpecs(item) {
      if (this.specsArr.length <= 6) {
        this.specsArr.push({
          value: "",
        });
      } else {
        this.$message.warning("最多只能添加6个");
      }
    },
    delSpecs(item) {
      let index = this.specsArr.indexOf(item);
      if (index !== -1) {
        this.specsArr.splice(index, 1);
      }
    },
    reset() {
      this.specsForm = {
        specsname: "",
        attrs: "",
        status: 1,
      };
      this.specsArr = [
        {
          value: "",
        },
      ];
      this.$emit("closeDialog", false);
    },
    ...mapActions(["getRoleListAction", "getSpecsListAction"]),
    update(id, changePage) {
      this.editId = id;
      this.changePage = changePage;
      getSpecsInfo({ id }).then((res) => {
        if (res.code === 200) {
          this.specsForm = res.list[0];
          this.specsForm.attrs.map((item, index) => {
            if (index == 0) {
              this.specsArr[0].value = item;
            } else {
              this.specsArr.push({
                value: item,
              });
            }
          });
        }
      });
    },
    add(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let arr = this.specsArr.map((item) => item.value);
          this.specsForm.attrs = arr ? arr.join(",") : "";
          if (this.isShow.isAdd) {
            getSpecsAdd(this.specsForm).then((res) => {
              if (res.code === 200) {
                this.$message.success(res.msg);
                this.reset();
                
                this.isShow.getCount();
              }
            });
          } else {
            this.specsForm.id = this.editId;
            getSpecsEdit(this.specsForm).then((res) => {
              if (res.code === 200) {
                this.$message.success(res.msg);
                this.reset();
                this.getSpecsListAction({
                  size: 2,
                  page: this.changePage,
                });
              }
            });
          }
        } else {
          return false;
        }
      });
    },
  },
};
</script>

<style  lang="" scoped>
</style>
