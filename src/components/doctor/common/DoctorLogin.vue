<template>
    <div class="doctorLogin_box">
        <!-- 登录表单 -->
        <el-form label-width="80px" class="login_form" :rules="rules" ref="doctorLoginFormRef"
                 :model="doctorUserAndPwd">
            <!-- 用户名 -->
            <el-form-item prop="account" label="用户名:">
                <el-input
                        prefix-icon="fa fa-user"
                        v-model="doctorUserAndPwd.account"
                ></el-input>
            </el-form-item>
            <!-- 密码 -->
            <el-form-item prop="password" label="密码:">
                <el-input
                        prefix-icon="fa fa-unlock-alt"
                        v-model="doctorUserAndPwd.password"
                        type="password"
                ></el-input>
            </el-form-item>
            <!-- 登录按钮 -->
            <el-form-item>
                <el-button type="primary" @click="doctorLogin">登录</el-button>
                <el-button type="info" @click="reset">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                //医生的用户名和密码
                doctorUserAndPwd: {
                    account: 'lucaiyi',
                    password: '123456'
                },
                rules: {
                    account: [
                        {required: true, message: '请输入用户名', trigger: 'blur'},
                        {min: 6, max: 10, message: '用户名为6到10位字符', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                        {min: 3, max: 6, message: '密码为3到6位字符', trigger: 'blur'}
                    ]
                }
            }
        },
        methods: {
            //表单预验证，登陆前做判断
            doctorLogin() {
                this.$refs.doctorLoginFormRef.validate(async valid => {
                        //验证不通过直接终止
                        if (!valid) return

                        const {data: res} = await this.$http.post('login/doctor', this.doctorUserAndPwd);
                        if (res.code !== 200) {
                            return this.$message.error(res.msg);
                        }
                        //登录成功 存储登录医生的用户名
                        sessionStorage.setItem('imgUrl', res.data.imgUrl);
                        sessionStorage.setItem('docId', res.data.docId);
                        this.$message.success("登录成功!");
                        console.log("登录的医生信息:", res.data);
                        this.$router.push("/doctorHome");
                    }
                )
            },
            //重置
            reset() {
                this.$refs.doctorLoginFormRef.resetFields();
            }
        }
    }
</script>

<style scoped>
    .doctorLogin_box {
        width: 450px;
        height: 300px;
        background-color: #fff;
        border-radius: 10px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }
</style>