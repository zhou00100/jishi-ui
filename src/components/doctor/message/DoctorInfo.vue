<template>
    <div>
        <el-tabs v-model="activeName">
            <el-tab-pane label="我的信息" name="first">
                <table border="0" width="800" height="800" align="center" cellpadding="0" cellspacing="0"
                       v-for="message in doctorMessage" :key="doctorMessage.docId">
                    <tr>
                        <td width="260" border="1" valign="top">
                            <table>
                                <tr height="100">
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td width="230" align="right"><img :src="message.imgUrl"
                                                                       style="width: 200px;height: 200px"
                                                                       alt="人物图片"></td>
                                    <td width="30"></td>
                                </tr>
                            </table>
                        </td>
                        <td width="30"></td>

                        <td width="480" valign="top">
                            <table border="0" cellpadding="0" cellspacing="0" width="480">
                                <tr height="75">
                                    <td></td>
                                </tr>
                                <tr>
                                    <td align="right"></td>
                                </tr>
                            </table>


                            <hr>
                            <table border="0" cellpadding="0" cellspacing="0" width="480">
                                <tr height="30">
                                    <td></td>
                                </tr>
                                <tr>
                                    <td colspan="2"><font color="#5f5f5f" size="4">个人信息</font></td>
                                </tr>
                                <tr>
                                <tr height="10">
                                    <td></td>
                                </tr>
                                <td width="50%">姓名 : <font color="#5f5f5f" size="3">{{ message.name }}</font></td>
                                <td width="50%">性别 : <font color="#5f5f5f">{{ message.gender }}</font></td>
                                <tr>
                                <tr height="10">
                                    <td></td>
                                </tr>
                                <td width="50%">职位 : <font color="#5f5f5f">{{ message.position }}</font></td>
                                <td width="50%">移动电话 : <font color="#5f5f5f">{{ message.phone }}</font></td>
                            </table>
                            <table border="0" cellpadding="0" cellspacing="0" width="480">
                                <tr height="30">
                                    <td></td>
                                </tr>
                                <tr>
                                    <td colspan="2"><font color="#5f5f5f" size="4">教育背景及工作经历</font></td>
                                </tr>
                                <tr>
                                <tr height="10">
                                    <td></td>
                                </tr>
                                <td colspan="2">简介: <font color="#5f5f5f" size="3">{{ message.introduction }}</font>
                                </td>
                            </table>
                            <table border="0" cellpadding="0" cellspacing="0" width="480">
                                <tr height="30">
                                    <td></td>
                                </tr>
                                <tr>
                                <tr height="10">
                                    <td></td>
                                </tr>
                                <td colspan="2">擅长: <font color="#5f5f5f">{{ message.skillful }}</font></td>
                            </table>
                        </td>
                        <td width="30"></td>
                    </tr>
                </table>
            </el-tab-pane>
            <el-tab-pane label="修改个人信息" name="second">
                <el-form v-model="doctorMessage">
                    <table border="0" width="800" height="800" align="center" cellpadding="0" cellspacing="0">
                        <tr>
                            <td width="260" border="1" valign="top">
                                <table>
                                    <tr height="100">
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td width="230" align="right"><img :src="doctor.imgUrl"
                                                                           style="width: 200px;height: 200px"
                                                                           alt="人物图片"></td>
                                        <td width="30"></td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <el-button type="primary"
                                                       style="position: absolute;left: 300px; top: 628px;"
                                                       @click="doctorUpdate()">
                                                修改个人信息
                                            </el-button>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                            <td width="30"></td>

                            <td width="480" valign="top">
                                <table border="0" cellpadding="0" cellspacing="0" width="480">
                                    <tr height="75">
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td align="right"></td>
                                    </tr>
                                </table>
                                <hr>
                                <table border="0" cellpadding="0" cellspacing="0" width="480">
                                    <tr height="30">
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td colspan="2"><font color="#5f5f5f" size="4">个人信息</font></td>
                                    </tr>
                                    <tr>
                                    <tr height="10">
                                        <td></td>
                                    </tr>
                                    <td width="50%">姓名 : <font color="#5f5f5f" size="3">
                                        <el-input v-model="doctor.name" placeholder="请输入您的姓名"></el-input>
                                    </font></td>
                                    <td width="50%">性别 : <font color="#5f5f5f">
                                        <el-input v-model="doctor.gender" placeholder="请输入您的性别"></el-input>
                                    </font></td>
                                    <tr>
                                    <tr height="10">
                                        <td></td>
                                    </tr>
                                    <td width="50%">职位 : <font color="#5f5f5f">
                                        <el-input v-model="doctor.position" placeholder="请输入您的职位"></el-input>
                                    </font></td>
                                    <td width="50%">移动电话 : <font color="#5f5f5f">
                                        <el-input v-model="doctor.phone" placeholder="请输入您的电话"></el-input>
                                    </font></td>
                                </table>

                                <table border="0" cellpadding="0" cellspacing="0" width="480">
                                    <tr height="30">
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td colspan="2"><font color="#5f5f5f" size="4">教育背景及工作经历</font></td>
                                    </tr>
                                    <tr>
                                    <tr height="10">
                                        <td></td>
                                    </tr>
                                    <td colspan="2">简介: <font color="#5f5f5f" size="3">
                                        <el-input :autosize="{ minRows: 5, maxRows: 8}" type="textarea"
                                                  placeholder="请输入您的简介" v-model="doctor.introduction"
                                                  maxlength="300" show-word-limit>
                                        </el-input>
                                    </font>
                                    </td>
                                </table>
                                <table border="0" cellpadding="0" cellspacing="0" width="480">
                                    <tr height="30">
                                        <td></td>
                                    </tr>
                                    <tr>
                                    <tr height="10">
                                        <td></td>
                                    </tr>
                                    <td colspan="2">擅长: <font color="#5f5f5f">
                                        <el-input :autosize="{ minRows: 5, maxRows: 8}" type="textarea"
                                                  placeholder="请输入您的擅长" v-model="doctor.skillful"
                                                  maxlength="300" show-word-limit>
                                        </el-input>
                                    </font></td>
                                </table>
                            </td>
                            <td width="30"></td>
                        </tr>
                    </table>
                </el-form>
            </el-tab-pane>
        </el-tabs>


    </div>
</template>

<script>

    export default {
        data() {
            return {
                activeName: 'first',//默认中的标签页
                doctorById: '',//医生的编号
                doctorMessage: [], //医生信息
                doctor: { //医生对象
                    docId: 0,//编号
                    imgUrl: '',//图片
                    name: '', //姓名
                    gender: '',//性别
                    position: '',//职位
                    phone: '',//电话
                    introduction: '',//简介
                    skillful: ''//擅长
                }
            }
        },
        created() {
            //取出医生的编号
            this.doctorById = sessionStorage.getItem('docId');
            this.getDoctorList();
        },
        methods: {
            //获取医生的个人信息
            async getDoctorList() {
                const {data: res} = await this.$http.get('doctor/queryById/' + this.doctorById)
                if (res.code !== 200) return this.$message.error('获取医生个人信息失败!')
                this.doctorMessage.push(res.data);
                //修改默认值
                this.doctor.docId = res.data.docId
                this.doctor.imgUrl = res.data.imgUrl
                this.doctor.name = res.data.name
                this.doctor.gender = res.data.gender
                this.doctor.position = res.data.position
                this.doctor.phone = res.data.phone
                this.doctor.introduction = res.data.introduction
                this.doctor.skillful = res.data.skillful
            },
            //修改医生个人信息
            async doctorUpdate() {
                const {data: res} = await this.$http.put('doctor/update/', this.doctor);
                if (res.code !== 200) return this.$message.error('修改医生个人信息失败!');
                this.$message.success('修改医生个人信息成功!');
                this.getDoctorList();
                this.doctorMessage = [];
                this.activeName = 'first'

            }
        }
    }
</script>

<style scoped>
</style>