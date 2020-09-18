<template>
    <el-container class="home-container">
        <!-- 头部区域 -->
        <el-header>
            <div>
                <img src="../../../assets/logo.png" width="50px"/>
                <span>济世医院门诊系统</span>
            </div>
            <!--图片区域-->
            <div class="divImg">
                <!-- <el-image :src="doctorImgUrl" style="width: 60px;height:60px;border-radius: 50%;"></el-image>-->
                <el-avatar :size="60" :src="doctorImgUrl" icon="el-icon-user-solid"></el-avatar>
            </div>
        </el-header>
        <el-container>
            <!-- 侧边栏 -->
            <el-aside :width="isCollapse ? '64px' : '200px'">
                <div class="toggle-button" @click="toggleCollapse">
                    | | |
                </div>
                <!-- 侧边栏菜单区域 -->
                <el-menu :default-active="activePath" router :collapse-transition="false"
                         :collapse="isCollapse"
                         unique-opened background-color="#333744" text-color="#fff" active-text-color="#409eff">
                    <el-menu-item :index="item.path" v-for="item in menuList" :key="item.menId">
                        <!-- 图标 -->
                        <i :class="item.iconClass"></i>
                        <!-- 文本 -->
                        <span>{{item.name}}</span>
                    </el-menu-item>
                </el-menu>
            </el-aside>
            <!-- 内容主体区域 -->
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    export default {
        data() {
            return {
                // 左侧菜单数据
                menuList: [],
                isCollapse: false,
                activePath: '', // 高亮的菜单地址
                doctorImgUrl: null,//图片路径
            }
        },
        created() {
            // data/methods中数据初始化完成后获取医生登录的图片
            this.doctorImgUrl = sessionStorage.getItem('imgUrl')
            // 获取医生id
            this.doctorById = sessionStorage.getItem('docId')
            // 调用查询所有菜单的方法
            this.getMenuList(1);
            // 获得需要高亮的菜单路径赋值给menu的default-active属性
            this.activePath = window.sessionStorage.getItem('activePath');
        },
        methods: {
            async getMenuList(docId) {
                const {data: res} = await this.$http.get('menu/menus/' + docId)
                if (res.code !== 200) return this.$message.error('获取菜单数据失败')
                this.menuList = res.data
            },
            // 切换侧边栏菜单的折叠与展开
            toggleCollapse() {
                this.isCollapse = !this.isCollapse;
            }
        }
    }
</script>

<style lang="less" scope>
    .el-header {
        background-color: #373d41;
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: #fff;
        font-size: 20px;

        > div {
            display: flex;
            align-items: center;

            .divImg {
                margin-left: 15px;
            }
        }
    }

    .home-container {
        height: 100%;
    }

    .el-aside {
        background-color: #333744;

        .el-menu {
            border-right: none;
        }
    }

    .el-main {
        background-color: #eaedf1;
    }

    .toggle-button {
        background-color: #4a5064;
        color: #fff;
        font-size: 10px;
        line-height: 24px;
        text-align: center;
        cursor: pointer;
    }
</style>
