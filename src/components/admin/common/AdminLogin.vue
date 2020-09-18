<!-- 管理员登录 -->
<template>
  <div class="login_comtainer">
    <div class="login_box">
      <!-- 头像区域 -->
      <div class="avatar_box">
        <img
          src="@/assets/logo.png"
          alt
        />
      </div>
      <!-- 登录表单 -->
       <el-form :model="adminForm" :rules="adminRules" ref="adminForm" label-width="80px" status-icon  class="login_form">
      <el-form-item label="账号:" prop="account">
        <el-input v-model="adminForm.account" prefix-icon="el-icon-user-solid" placeholder="请输入账号"></el-input>
      </el-form-item>
      <el-form-item label="密码:" prop="password">
        <el-input
          v-model="adminForm.password"
          prefix-icon="el-icon-lock"
          placeholder="请输入密码"
          show-password
        ></el-input>
      </el-form-item>
      <el-form-item class="btns">
        <el-button type="primary" @click="login">登录</el-button>
        <el-button type="info" @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
    </div>
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
      adminForm: {
        account: "",
        password: "",
      },
      adminRules: {
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
      this.$refs.adminForm.resetFields();
    },
    login() {
      // 验证表单
      this.$refs.adminForm.validate(async (valid) => {
        if (!valid) return;
        // 发起登录请求
        const { data: res } = await this.$http.post(
          "login/admin",
          this.adminForm
        );
        if (res.code !== 200) {
          return this.$message.error(res.msg);
        }
        // 存储登录用户
        this.$store.state.user = res.data;
        sessionStorage.setItem('userAccount',res.data.account);
        sessionStorage.setItem('roleId',res.data.roleId);
        this.$message.success("登录成功!");
        console.log("登录的管理员信息:", res.data);
        this.$router.push("/adminHome");
      });
    },
  },
};
</script>


<style lang="less" scoped>
.login_comtainer {
  background-color: #2b4b6b;
  height: 100%;
}
.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 5px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  .avatar_box {
    width: 130px;
    height: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
}
.btns {
  display: flex;
  justify-content: flex-end;
}
.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
</style>