<template>
    <div class="box">
        <el-form
        :model="ruleForm"
        :rules="rules"          
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
        >
        <el-form-item class="first" label="用户名" prop="username">
            <el-input v-model="ruleForm.username" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
            <el-input v-model="ruleForm.password" autocomplete="off" clearable show-password></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="login('ruleForm')">登录</el-button>
        </el-form-item>
        </el-form>
    </div>
</template>

<script>
import {getLogin} from '../util/axios'
export default {
    data() {
        return {
        ruleForm: {
            usernamename: "",
            password: "",
        },
        rules: {
            usernamename: [
            { required: true, message: "请输入用户名",  trigger: "blur" },
            {
            min: 2,
            max: 15,
            message: "长度在 2 到 15 个字符",
            trigger: "blur",
            },
            ],
            pass: [
            { required: true, message: "请输入密码", trigger: "blur" },
            {
            min: 6,
            max: 18,
            message: "长度在 6 到 18 个字符",
            trigger: "blur",
            },
            ],
        },
        }
    },
    methods: {
        login(formName){
            this.$refs[formName].validate((valid) => {
            if (valid) {
                getLogin(this.ruleForm).then(res=>{
                    if(res.code == 200){
                         this.$router.push('/index')
                        sessionStorage.setItem('userInfo',JSON.stringify(res.list))
                    }else{
                        this.$message.error('用户名或者密码错误')  
                    }
                })
            } else {
                console.log('error submit!!');
                return false;
            }
            });
        }
        },
    }
</script>

<style lang="stylus" scoped>
@import '../stylus/index.styl';
.box
    width 100vw 
    height 100vh 
    background $firstBgColor 
.demo-ruleForm
    position absolute 
    left 50% 
    top 50% 
    margin  -150px 0 0 -290px 
    background $secondBgColor 
    width 600px 
    height 300px 
    border-radius 20px 
    padding 10px 5px
.el-input
    width 80% 
.el-form-item:nth-child(1)
    margin-top 50px
.el-button
    margin-left 130px
</style>
