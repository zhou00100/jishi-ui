<template>
    <div>
        <el-tabs v-model="activeName">
            <el-tab-pane label="我的信息" name="first">
                <table border="0" width="800" height="200" align="center" cellpadding="0" cellspacing="0"
                       v-for="message in userMessage" :key="userMessage.useId">
                    <tr>
                        
                        <td width="30"></td>
                    
                        <td width="480" valign="top">
                            
                            <hr>
                            <table border="0" cellpadding="0" cellspacing="0" width="480">
                                <tr height="30">
                                    <td>
                                        <tr>
                                    <td width="230" align="right"><img :src="message.imgUrl"
                                                                       style="width: 200px;height: 200px"
                                                                       alt="头像"></td>
                                    <td width="30"></td>
                                        </tr>
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="2"><font color="#5f5f5f" size="4">个人信息</font></td>
                                </tr>
                                <tr>
                                <tr height="10">
                                    <td></td>
                                </tr>
                                <td width="50%">账号 : <font color="#5f5f5f" size="3">{{ message.account }}</font></td>
                                <td width="50%">姓名 : <font color="#5f5f5f" size="3">{{ message.name }}</font></td>
                                <tr height="10">
                                    <td></td>
                                </tr>
                                <td width="50%">性别 : <font color="#5f5f5f">{{ message.gender }}</font></td>
                                <td width="50%">邮箱: <font color="#5f5f5f">{{ message.email }}</font></td>
                                 <tr height="10">
                                    <td></td>
                                </tr>
                                <tr>
                                <td width="50%">移动电话 : <font color="#5f5f5f">{{ message.phone }}</font></td>
                                </tr>
                                
                                
                                <tr height="10">
                                    <td></td>
                                </tr>
                                
                            </table>
                        </td>
                        <td width="30"></td>
                    </tr>
                     <tr height="10" >
                <td colspan="2"><font color="#5f5f5f" size="4">就诊卡信息</font></td>
                </tr>
               
                </table>
                <div> 
    <!-- 卡片视图区域 -->
    <el-card style="width:800px;margin-bottom:5px;margin-left:200px" align="center" >
      <el-table stripe border :data="rows" >
        <el-table-column type="index" style="disable"></el-table-column>
        <el-table-column prop="cardNum" label="卡号" ></el-table-column>
        <el-table-column prop="balance" label="余额" ></el-table-column>
        <el-table-column prop="" label="持卡人" ></el-table-column>
        <el-table-column prop="regDate" label="开通日期" ></el-table-column>
      </el-table>

      <!-- 分页组件 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
  </div>
            </el-tab-pane>
            <el-tab-pane label="修改个人信息" name="second">
                <el-form v-model="userMessage">
                    <table border="0" width="800" height="800" align="center" cellpadding="0" cellspacing="0">
                        <tr>
                            <td width="260" border="1" valign="top">
                                <table>
                                    <tr height="100">
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        
                                       
                                    </tr>
                                    <tr>
                                        <td>
                                            <el-button type="primary"
                                                       style="position: absolute;left: 300px; top: 628px;"
                                                       @click="userUpdate()">
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
                                <table border="0" cellpadding="0" cellspacing="0" width="480" algin="algin">
                                    <tr height="30">
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td colspan="4" align="align"><font color="#5f5f5f" size="4">个人信息</font></td>
                                    </tr>
                                    <tr>
                                    <tr height="10">
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <el-upload
                                            class="avatar-uploader"
                                            action="https://localhost:8081/"
                                        :show-file-list="false"
                                        :on-success="handleAvatarSuccess"
                                        :before-upload="beforeAvatarUpload">
                                        <img v-if="imageUrl" :src="user.imgUrl" class="avatar" alt="用户头像">
                                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                        </el-upload>
                                        <td width="30"></td>
                                    </tr>
                                    <td width="50%">姓名 : <font color="#5f5f5f" size="3">
                                        <el-input v-model="user.name" placeholder="请输入您的姓名"></el-input>
                                    </font></td>
                                    <td width="50%">性别 : <font color="#5f5f5f">
                                        <el-input v-model="user.gender" placeholder="请输入您的性别"></el-input>
                                    </font></td>
                                   <tr>
                                        <td width="50%">邮箱 : <font color="#5f5f5f">
                                        <el-input v-model="user.email" placeholder="请输入您的性别"></el-input>
                                    </font></td>
                                    <td width="50%">移动电话 : <font color="#5f5f5f">
                                        <el-input v-model="user.phone" placeholder="请输入您的电话"></el-input>
                                    </font></td>
                                       </tr> 
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
                userId: '',//用户的编号
                userMessage: [], //用户信息
                user: { //用户对象
                    useId: '',//编号
                    imgUrl: '',//图片
                    name: '', //姓名
                    gender: '',//性别
                    email: '',//邮箱
                    phone: '',//电话
                  
                },
                currentPage: 1,
                pageSize: 5,
                rows: [],
                total: 0,
            }
        },
        created() {
            this.getmedicalCardList(this.currentPage, this.pageSize);
            //取出用户的编号
            this.userById = sessionStorage.getItem('useId')
            this.getUserList();
        },
        methods: {
            //获取用户的个人信息
            async getUserList() {
                const {data: res} = await this.$http.get('user/queryById/' + this.userById)
                if (res.code !== 200) return this.$message.error('获取用户个人信息失败!')
                this.userMessage.push(res.data);
                //修改默认值
                this.user.useId = res.data.useId
                this.user.imgUrl = res.data.imgUrl
                this.user.name = res.data.name
                this.user.gender = res.data.gender
                this.user.email = res.data.email
                this.user.phone = res.data.phone
               
            },
            //修改用户个人信息
            async userUpdate() {
                const {data: res} = await this.$http.put('user/update/',this.user);
                if (res.code !== 200) return this.$message.error('修改用户个人信息失败!');
                console.log("修改的用户信息",res.data.user.phone);
                this.$message.success('修改用户个人信息成功!');
                this.getUserList();
                this.UserMessage = [];
                this.activeName = 'first'

            },
            async getmedicalCardList(currentPage, pageSize) {
                const data= new URLSearchParams
                data.append('currentPage'),
                data.append('pageSize'),
                data.append('useId')
      const { data: res } = await this.$http.post("medicalCard/queryAllByUserId"+data)
      if (res.code !== 200) return;
      this.rows = res.data.list;
      this.total = res.data.total;
    },
    handleSizeChange(newVal) {
      this.pageSize = newVal;
      this.getmedicalCardList(this.currentPage, this.pageSize);
    },
    handleCurrentChange(newVal) {
      this.currentPage = newVal;
      this.getmedicalCardList(this.currentPage, this.pageSize);
    },
             handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
        }
    }
</script>

<style scoped>
avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>