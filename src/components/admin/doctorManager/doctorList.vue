<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/adminHome/' }"
        >首页</el-breadcrumb-item
      >
      <el-breadcrumb-item>医生管理</el-breadcrumb-item>
      <el-breadcrumb-item>医生列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片区域 -->
   <el-card class="box-card">
      
      <!-- 高级查询区域 -->
      <el-row :gutter="20">
        <el-col :span="4">
          <template>
            <el-select v-model="doctorForm.depId" @change="getdoctorList">
              <el-option :label="'请选择科室'" :value="0"> </el-option>
              <el-option
                v-for="dep in depaOptions"
                :key="dep.depId"
                :label="dep.name"
                :value="dep.depId"
              >
              </el-option>
            </el-select>
          </template>
        </el-col>
        <el-col :span="12">
          <el-input
            placeholder="请输入医生姓名"
            v-model="doctorForm.name"
            clearable
            @clear="getdoctorList"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getdoctorList"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addDialogFormVisible = true"
            >办理医生入职</el-button
          >
          
        </el-col>
      </el-row>
      <!-- 表格区域 -->
      <el-row>
        <el-col :span="22">
          <template>
            <el-table :data="pageInfo.list" border stripe style="width: 100%">
              <el-table-column type="index"></el-table-column>
              <el-table-column label="医生头像" class="img" width="85px">
                <template slot-scope="scope">
                  <div class="demo-image__preview">
                    <el-image
                      style="width: 65px; height: 65px"
                      :src="scope.row.imgUrl"
                    >
                    </el-image>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="account" label="账号"></el-table-column>
              <el-table-column prop="name" label="姓名"></el-table-column>
              <el-table-column prop="phone" label="手机号码"> </el-table-column>
              <el-table-column prop="gender" label="性别"></el-table-column>
              <el-table-column prop="position" label="医生职称">
              </el-table-column>
              <el-table-column prop="registerPrice" label="挂号价格">
              </el-table-column>
              <el-table-column prop="departments.name" label="科室名称">
              </el-table-column>
              <el-table-column label="操作" width="150px">
                <template slot-scope="scope">
                  <div>
                    <!-- 编辑 -->
                    <el-button
                      type="primary"
                      icon="el-icon-edit"
                      size="mini"
                      @click="showUpdateDialogVisible(scope.row.id)"
                    ></el-button>
                    <!-- 删除 -->
                    <el-button
                      type="danger"
                      icon="el-icon-delete"
                      size="mini"
                      @click="removeUserById(scope.row.id)"
                    ></el-button>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-col>
      </el-row>

      <!-- 分页区域 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageInfo.pageNum"
        :page-sizes="[5, 10, 15]"
        :page-size="pageInfo.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageInfo.total"
      >
      </el-pagination>
    </el-card>
    <!-- 添加对话框区域 -->
    <el-dialog
      title="办理医生入职"
      :visible.sync="addDialogFormVisible"
      width="50%"
      @close="addDialogClose"
    >
      <!-- 主体区域 -->

      <el-form :model="doctorForm" :rules="addFormRules" ref="addFormRef">
        <!-- 头像上传 -->
        <el-form-item label="头像上传" prop="imgUrl">
          <el-upload
            class="avatar-uploader"
            action="http://localhost:8888/jishi/doctor/upload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            list-type="picture-card"
          >
            <img
              v-if="imageUrl"
              :src="imageUrl"
              width="140px"
              height="140px"
              class="avatar"
            />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <!-- 医生信息区域 -->
        <el-row>
          <el-col :span="12">
            <el-form-item label="医生账号" prop="account" class="col-margin">
              <el-input v-model="doctorForm.account"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="医生密码" prop="password">
              <el-input v-model="doctorForm.password"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 一行 -->
        <el-row>
          <el-col :span="12">
            <el-form-item label="医生姓名" prop="name" class="col-margin">
              <el-input v-model="doctorForm.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="手机号码" prop="phone">
              <el-input v-model="doctorForm.phone"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 一行 -->
        <el-row>
          <el-col :span="12">
            <el-form-item label="科室" prop="depId" class="col-margin">
              <el-select
                v-model="doctorForm.depId"
                placeholder="请选择科室"
                style="width:100%;"
                ><el-option :label="'请选择科室'" :value="0"></el-option>
                <el-option
                  v-for="dep in depaOptions"
                  :key="dep.depId"
                  :label="dep.name"
                  :value="dep.depId"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="性别">
              <br />
              <el-switch
                v-model="doctorForm.gender"
                active-text="女"
                inactive-text="男"
              >
              </el-switch>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 一行 -->
        <el-row>
          <el-col :span="12">
            <el-form-item label="科室" prop="depId" class="col-margin">
              <el-select
                v-model="doctorForm.position"
                placeholder="医生职称"
                @change="registerPrice"
                style="width:100%;"
              >
                <el-option label="主任医生" value="主任医生"></el-option>
                <el-option label="副主任医生" value="副主任医生"></el-option>
                <el-option label="主治医生" value="主治医生"></el-option>
                <el-option label="住院医生" value="住院医生"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="挂号价格">
              <el-input
                v-model="doctorForm.registerPrice"
                :placeholder="doctorForm.registerPrice"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 一行 -->
        <el-form-item label="医生擅长" prop="skillful">
          <el-input type="textarea" v-model="doctorForm.skillful"></el-input>
        </el-form-item>
        <!-- 一行 -->
        <el-form-item label="医生简介" prop="introduction">
          <el-input
            type="textarea"
            v-model="doctorForm.introduction"
          ></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addDoctor">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
//把js部分分离出了
import doctorList from "./doctorList";
export default doctorList;
</script>

<style lang="less" scope>
.el-image {
  border-radius: 50%;
}
.col-margin {
  margin-right: 20px;
}
</style>
