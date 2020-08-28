<template>
  <div>
    <el-dialog
      :before-close="reset"
      :title="isShow.isAdd?'添加商品分类':'编辑商品分类'"
      :visible.sync="isShow.dialogShow"
      center
    >
      <el-form :model="sortForm" :rules="rules" ref="ruleForm">
        <el-form-item prop="pid" label="上级分类：" :label-width="formLabelWidth">
          <el-select v-model="sortForm.pid" placeholder="请选择">
            <el-option label="顶级分类" :value="0">顶级分类</el-option>
            <el-option
              v-for="item in get_CateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="catename" label="分类名称：" :label-width="formLabelWidth">
          <el-input v-model="sortForm.catename"></el-input>
        </el-form-item>
        <el-form-item prop="img" label="图片" :label-width="formLabelWidth">
          <el-upload
            action="#"
            list-type="picture-card"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :auto-upload="false"
            :limit="1"
            :on-exceed="handleExceed"
            :file-list='fileList'
            :on-change = 'changeInfo'
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt />
          </el-dialog>
        </el-form-item>
        <el-form-item label="状态：" :label-width="formLabelWidth">
          <el-switch
            v-model="sortForm.status"
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
import { getCateAdd, getCateInfo, getCateEdit } from "../../util/axios";
export default {
  data() {
    return {
      imgUrl:'',
      fileList:[],
      dialogVisible: false,
      dialogImageUrl: "",
      editId: 0,
      defaultChecked: [], 
      formLabelWidth: "120px",
      sortForm: {
        pid: 0, 
        catename: "", 
        img: "", 
        status: 1,
      },
      rules: {
        pid: [
          { required: true, message: "请选择上级分类", trigger: "change" },
        ],
        catename: [
          { required: true, message: "请输入商品分类名称", trigger: "blur" },
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
    this.getCateListAction();
  },
  computed: {
    ...mapGetters(["get_CateList"]),
  },
  props: ["isShow"],
  methods: {
    handleRemove(file, fileList) {
    },
    handlePreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
    changeInfo(file){
      this.imgUrl = file.raw
    },
    reset() {
      this.sortForm = {
        pid: 0, 
        catename: "", 
        img: "", 
        status: 1,
      };
      this.fileList =[]
      this.$emit("closeDialog", false);
    },
    ...mapActions(["getCateListAction"]),
    update(id) {
      this.editId = id;
      getCateInfo({ id }).then((res) => {
        if (res.code === 200) {
          this.sortForm = res.list;
          this.fileList = this.sortForm.img ? [{url:`${this.uploadHttp}${this.sortForm.img}`}] :[]
        }
      });
    },
    add(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
        let data = this.sortForm
        let file = new FormData()
        for(let i in data){
          file.append(i,data[i])
        }
        file.append("img",this.imgUrl)
          if (this.isShow.isAdd) {
            getCateAdd(file).then((res) => {
              if (res.code === 200) {
                this.$message.success(res.msg);
                this.reset();
                  this.getCateListAction();
              }else{
                 this.$message.error(res.msg);
              }
            });
          } else {
            file.append('id',this.editId)
            getCateEdit(file).then((res) => {
              if (res.code === 200) {
                this.$message.success(res.msg);
                this.reset();
                this.getCateListAction();
              }else{
                 this.$message.error(res.msg);
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
