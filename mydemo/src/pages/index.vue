<template>
    <div>
        <el-container>
        <el-header>后台管理</el-header>
        <el-container>
        <el-aside width="200px">
        <v-nav></v-nav>
        </el-aside>
        <el-main>
            <!-- 二级路由出口 -->
            <router-view></router-view>
        </el-main>
        </el-container>
        </el-container>
    </div>
</template>

<script>
import vNav from '../components/nav'
export default {
    data() {
    return {

    };
    },
    components:{
        vNav
    }
};
</script>

<style lang="stylus" scoped>
@import '../stylus/index.styl';
.el-header
    background $thirdBgColor 
    text-align center 
    height 100px !important 
    line-height 100px 
    font-size 30px 
    font-weight bold 
    // color white

</style>
