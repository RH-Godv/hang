<template>
    <div>
        <el-dialog :before-close="reset" :title="isShow.isAdd?'添加角色':'编辑角色'" :visible.sync="isShow.dialogShow" center>
        <el-form :model="roleForm" :rules="rules" ref="ruleForm">
            <el-form-item prop="rolename" label="角色名称：" :label-width="formLabelWidth">
            <el-input v-model="roleForm.rolename"></el-input>
        </el-form-item>
            <el-form-item label="角色权限：" :label-width="formLabelWidth">
        
            <el-tree
                :data="get_MenuList"
                show-checkbox
                default-expand-all
                node-key="id"
                ref="tree"
                :props="defaultProps"
                :default-checked-keys="defaultChecked"
                check-strictly
            ></el-tree>
            </el-form-item>
            <el-form-item label="状态：" :label-width="formLabelWidth">
            <el-switch
                v-model="roleForm.status"
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
import { getRoleAdd, getRoleInfo, getRoleEdit } from "../../util/axios";
export default {
    data() {
        return {
        editId: 0,
        defaultChecked: [],       
        formLabelWidth: "120px",
        roleForm: {
            rolename: "",
            status: 1,
        },
        rules: {
            rolename: [
           
            { required: true, message: "请输入角色名称", trigger: "blur" },
            { min: 2, max: 8, message: "长度在 2 到 8 个字符", trigger: "blur" },
            ],
        },
        defaultProps: {
            children: "children",
            label: "title",
        },
        };
    },
    mounted() {
        this.getMenuListAction();
        this.getRoleListAction();
    },
    computed: {
        ...mapGetters(["get_MenuList"]),
    },
    props: ["isShow"],
    methods: {
        reset() {
        this.roleForm = {
            rolename: "",
            status: 1,
        };
        this.$refs.tree.setCheckedKeys([]);
        this.$emit("closeDialog", false);
    },
    ...mapActions(["getMenuListAction", "getRoleListAction"]),
    update(id) {
        this.editId = id;
        getRoleInfo({ id }).then((res) => {
            if (res.code === 200) {
            console.log(res, "一条数据");
            this.roleForm = res.list;
            this.defaultChecked = this.roleForm.menus
                ? this.roleForm.menus.split(",")
                : [];
            }
        });
    },
    add(formName) {
        this.$refs[formName].validate((valid) => {
            if (valid) {
            this.roleForm.menus = this.$refs.tree.getCheckedKeys().join(",");
            
            if (this.isShow.isAdd) {
                getRoleAdd(this.roleForm).then((res) => {
                if (res.code === 200) {
                    this.$message.success(res.msg);
                    this.reset();
                    this.getRoleListAction();
                }
            });
            } else {           
            this.roleForm.id = this.editId;
            getRoleEdit(this.roleForm).then((res) => {
                if (res.code === 200) {
                    this.$message.success(res.msg);                 
                    this.reset();
                    this.getRoleListAction();
                }
            });
            }
            } else {
            console.log("error submit!!");
            return false;
            }
        });
        },
    },
};
</script>

<style  lang="" scoped>
</style>
