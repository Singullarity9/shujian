<template>
    <section class="navBar2" style="height:80px">
        <el-row>
            <el-col :span="7">
                <div class="grid-content bg-purple"><router-link to="/"><img :src="$imgLogo" alt="" height="60"
                            style="margin:10px 0"></router-link></div>
            </el-col>
            <el-col :span="10" class="search">
                <div>
                    <el-input placeholder="请输入内容" v-model="input1" style="width:533px">
                        <el-button type="primary" icon="el-icon-search" slot="append">搜索</el-button>
                    </el-input>
                </div>
            </el-col>
            <el-col :span="7" class="shopChart">
                <div>
                    <router-link to="/shopCart">我的购物车</router-link>
                </div>
            </el-col>
        </el-row>

    </section>
</template>

<script>
export default {
    name: 'NavBar',
    data() {
        return {
            input1: ''
        }
    }
}

</script>
<style lang="less" scoped>
.search {
    height: 80px;
    display: flex;
    align-items: center;
}

.shopChart {
    text-align: right;
    line-height: 80px;
}
</style>