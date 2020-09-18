<!-- 用户登录 -->
<template>
  <div style="width:500px;margin:0px auto;" name="first">
    <el-form :model="userForm" :rules="userRules" ref="userForm"    label-width="80px" status-icon>
      <el-form-item label="账号:" prop="account">
        <el-input v-model="userForm.account" prefix-icon="el-icon-user-solid" placeholder="请输入账号"></el-input>
      </el-form-item>
      <el-form-item label="密码:" prop="password">
        <el-input
         v-model="userForm.password"
          prefix-icon="el-icon-lock"
          placeholder="请输入密码"
          show-password
        ></el-input>
      </el-form-item>
      <el-form-item>
       
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login">登录</el-button>
        <el-button type="info" @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
    <router-link to="/userRegister">没有账号，前往注册</router-link>
  </div>
  
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      userForm: {
        account: "zhangsan",
        password: "123",
      },
      userRules: {
        account: [
          { required: true, message: "请输入账号", trigger: "blur" },
          { min: 3, message: "长度需要大于3", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", tirgger: "blur" }],
      },
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    resetForm() {
      this.$refs.userForm.resetFields();
    },
    
    login() {
      // 验证表单
      this.$refs.userForm.validate(async (valid) => {
        if (!valid) return;
        // 发起登录请求
        const { data: res } = await this.$http.post(
          "login/user",
          this.userForm
        );
        if (res.code !== 200) {
          return this.$message.error(res.msg);
        }
        // 存储登录用户
        this.$store.state.user = res.data;
        sessionStorage.setItem('userAccount',res.data.account);
        sessionStorage.setItem('useId',res.data.useId);
        sessionStorage.setItem('roleId',res.data.roleId);
        this.$message.success("登录成功!");
        console.log("登录的用户信息:", res.data);
        this.$router.push("/userHome");
      });
    },
  },
};
</script>
<style scoped>
/*@import url(); 引入公共css类*/
</style>