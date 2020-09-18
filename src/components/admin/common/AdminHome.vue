
<template>
<div class="home-container" >
  <el-container >
    
    <!-- 头部区域 -->
    <el-header>
      <div>
        <img src="../../../assets/logo.png" width="50px" class="imgLogo" />
        <span>济世医院门诊系统</span>
      </div>
      <span>欢迎您管理员:{{userAccount}} <el-button type="info" >退出登录</el-button></span>
    </el-header>
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <div class="toggle-button" @click="toggleCollapse">| | |</div>
        <!-- 侧边栏菜单区域 -->
        <el-menu
          :default-active="activePath"
          router
          :collapse-transition="false"
          :collapse="isCollapse"
          unique-opened
          background-color="#333744"
          text-color="#fff"
          active-text-color="#409eff"
        >
          <!-- 一级菜单 -->
          <el-submenu :index="item.menId + ''" v-for="item in menuList" :key="item.menId">
            <!-- 一级菜单模板区域 -->
            <template slot="title">
              <!-- 图标 -->
              <i :class="item.iconClass"></i>
              <!-- 文本 -->
              <span>{{item.name}}</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item
              @click="saveNavState(subItem.path)"
              :index="subItem.path"
              v-for="subItem in item.children"
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 左侧菜单数据
      menuList: [],
      isCollapse: false,
      activePath: "", // 高亮的菜单地址,
      userAccount:null // 登录的用户信息
    };
  },
  created() {
    // data/methods中数据初始化完成后获取登录的用户账号
    this.userAccount = sessionStorage.getItem('userAccount')
    // 获取角色id调用查询所有菜单的方法
    this.getMenuList(sessionStorage.getItem('roleId'));
    // 获得需要高亮的菜单路径赋值给menu的default-active属性
    this.activePath = window.sessionStorage.getItem("activePath");
  },
  methods: {
    // 获取菜单数据
    async getMenuList(roleId) {
      const { data: res } = await this.$http.get(
        "menu/menus/" + roleId
      );
      if (res.code !== 200) return this.$message.error("获取菜单数据失败");
      this.menuList = res.data;
    },
    // 切换侧边栏菜单的折叠与展开
    toggleCollapse() {
      this.isCollapse = !this.isCollapse;
    },
    saveNavState(activePath) {
      // 保存链接的激活状态
      window.sessionStorage.setItem("activePath", activePath);
      // 并指定激活的菜单高亮
      this.activePath = this.$route.path;
    },
  },
};
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

.is-vertical {
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
.imgLogo{
  border-radius: 50%;
}
</style>
