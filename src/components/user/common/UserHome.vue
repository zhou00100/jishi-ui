<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header>
      <div>
        <img src="../../../assets/logo.png" width="50px" />
        <span>济世医院门诊系统</span>
      </div>
      <div class="divImg">
                <!-- <el-image :src="userImgUrl" style="width: 60px;height:60px;border-radius: 50%;"></el-image>-->
                <el-avatar :size="60" :src="userImgUrl" icon="el-icon-user-solid"></el-avatar>
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
          <!-- 一级菜单 -->
          <el-submenu :index="item.menId + ''" v-for="item in menuList" :key="item.menId"  
          
          >

          
            <!-- 一级菜单模板区域 -->
            <template slot="title">
              <!-- 图标 -->
              <i :class="item.iconClass"></i>
              <!-- 文本 -->
              <span>{{item.name}}</span>
            </template>

            <!-- 二级菜单 -->
            <!-- 如果没有子菜单，将自己本身当作子菜单显示 -->
             <el-menu-item  @click="saveNavState(subItem.path)" 
            :index="item.path" 
            :key="item.menId"
            >
              <template slot="title">
                <i :class="item.iconClass"></i>
                <span>{{item.name}}</span>
              </template>
            </el-menu-item> 
          <!-- 如果有子菜单，正常显示 -->
            <el-menu-item  @click="saveNavState(subItem.path)" 
            :index="subItem.path" v-for="subItem in item.children " 
            :key="subItem.menId"
            >
              <template slot="title">
                <i :class="subItem.iconClass"></i>
                <span>{{subItem.name}}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 内容主体区域 -->
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default{
    data(){
        return {
            // 左侧菜单数据
            menuList: [],
            isCollapse: false,
            activePath: '' // 高亮的菜单地址
        }
    },
    created(){
      this.getMenuList(); 
      this.activePath = window.sessionStorage.getItem('activePath');
    },
    methods:{
        async getMenuList(){
            const {data : res} = await this.$http.get('menu/menus/' + this.$store.state.user.roleId)
            if (res.code !== 200) return this.$message.error('获取菜单数据失败')
            this.menuList = res.data
            console.log(res.data)
        },
        // 切换侧边栏菜单的折叠与展开
        toggleCollapse(){
            this.isCollapse = !this.isCollapse;
        },
        saveNavState(activePath){
            // 保存链接的激活状态
            window.sessionStorage.setItem('activePath',activePath);
            // 并指定激活的菜单高亮
            this.activePath = this.$route.path;
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
    span {
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

.toggle-button{
    background-color: #4a5064;
    color: #fff;
    font-size: 10px;
    line-height: 24px;
    text-align: center;
    cursor: pointer;
}
</style>
