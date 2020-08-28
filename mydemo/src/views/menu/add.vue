<template>
  <div>
    <el-dialog
      :before-close="reset"
      :title="isShow.isAdd?'添加菜单':'编辑菜单'"
      :visible.sync="isShow.dialogShow"
      center
    >
      <el-form :model="menuForm" :rules="rules" ref="ruleForm">
        <el-form-item prop="title" label="菜单名称：" :label-width="formLabelWidth">
          <el-input v-model="menuForm.title"></el-input>
        </el-form-item>
        <el-form-item prop="pid" label="上级菜单：" :label-width="formLabelWidth">
          <el-select v-model="menuForm.pid" placeholder="请选择">
            <el-option value disabled>--请选择--</el-option>
            <el-option label="顶级菜单" :value="0">顶级菜单</el-option>
            <el-option
              v-for="item in get_MenuList"
              :key="item.id"
              :label="item.title"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单类型：" :label-width="formLabelWidth">
          <el-radio v-model="menuForm.type" :label="1">目录</el-radio>
          <el-radio v-model="menuForm.type" :label="2">菜单</el-radio>
        </el-form-item>
        <el-form-item
          v-if="menuForm.type==1"
          prop="icon"
          label="菜单图标："
          :label-width="formLabelWidth"
        >
          <el-input v-model="menuForm.icon"></el-input>
        </el-form-item>
        <el-form-item prop="url" v-if="menuForm.type==2" label="菜单地址：" :label-width="formLabelWidth">
          <el-input v-model="menuForm.url"></el-input>
        </el-form-item>
        <el-form-item label="状态：" :label-width="formLabelWidth">
          <el-switch
            v-model="menuForm.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="reset">取 消</el-button>
        <el-button @click="add('ruleForm')" type="primary">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions,mapGetters } from "vuex";
import { getMenuAdd, getMenuInfo, getMenuEdit } from "../../util/axios";
export default {
  props: ["isShow"],
  computed: {
      ...mapGetters(['get_MenuList'])
  },
  data() {
    return {
      isAdd:true, 
      editId: 0,
      formLabelWidth: "120px", 
      menuForm: {
        title: "",
        pid: 0,
        type: 1, 
        url: "",
        status: 1,
        icon: "",
      },
      
      rules: {
        title: [
          
          { required: true, message: "请输入菜单名称", trigger: "blur" },
         
          { min: 3, max: 9, message: "长度在 3 到 9 个字符", trigger: "blur" },
        ],
        pid: [
          { required: true, message: "请选择上级菜单", trigger: "change" },
        ],
      },
    };
  },
  methods: {
    update(id) {
      this.editId = id;
      this.isAdd = false;
      getMenuInfo({ id }).then((res) => {
        if (res.code == 200) {
          this.menuForm = res.list;
        }
      });
    },
    ...mapActions(["getMenuListAction"]),
    
    reset(){
      this.isShow.dialogShow = false;
      this.$refs['ruleForm'].resetFields();
    },
    add(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if(this.isAdd){
              getMenuAdd(this.menuForm).then(res=>{
                if(res.code === 200){
                  this.$message.success(res.msg);
                  this.reset();
                    this.getMenuListAction();
                  } 
                }) 
                }else{
                  this.menuForm.id = this.editId;
                  getMenuEdit(this.menuForm).then(res=>{
                    if(res.code == 200){
                      this.$message.success(res.msg);
                        this.reset();
                        this.getMenuListAction();
                    }
                  }) 
                }
                    
                } else {
                console.log('error submit!!');
                return false;
                }
              });
                
                },
                ...mapActions(['getMenuListAction']),
                del(id){
                  this.$confirm('确认要删除该信息吗', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                  }).then(() => {
                      getMenuDel({id}).then(res=>{
                        if(res.code===200){
                            this.$message({
                            type: 'success',
                            message: res.msg
                        })
                        this.getMenuListAction()
                        }else{
                            this.$message.error(res.msg)
                        }
                      })                      
                  }).catch(() => {
                  this.$message({
                      type: 'info',
                      message: '已取消删除'
                    });          
                  })  
          },
          edit(id){
            this.editId = id;
            this.isAdd = false    
            getMenuInfo({id}).then(res=>{
              console.log(res,"一条数据")
              if(res.code == 200){
                this.dialogShow = true;
                this.menuForm = res.list;
              }
            })
          },
  },
};
</script>

<style  lang="" scoped>
</style>
