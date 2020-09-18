<!-- 用户进入系统后的主页 -->
<template>
  <div>
    <h1>欢迎使用本系统 请选择你的角色</h1>
    <router-link to='/adminLogin'>
      <el-button type="primary">管理员</el-button>
    </router-link>
    ===
    <router-link to="/doctorLogin">
        <el-button type="primary">医生</el-button>
    </router-link>
    ===
    <router-link to="/userLogin">
        <el-button type="primary">用户</el-button>
    </router-link>
  </div>
</template>

<script>
export default {
};
</script>
<style scoped>
</style>