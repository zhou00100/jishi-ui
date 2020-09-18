<!-- 管理用户页面 -->
<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: 'userHome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>常见问题</el-breadcrumb-item>

    </el-breadcrumb>
    <!-- 卡片视图区域 -->
    <el-card>
      <el-table stripe border :data="rows" style="width: 100%;margin-bottom:5px">
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="question" label="常见问题" ></el-table-column>
        <el-table-column prop="answer" label="解答" ></el-table-column>
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
      currentPage: 1,
      pageSize: 5,
      rows: [],
      total: 0,
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    // 分页获取用户列表的方法
    async gethelpQAList(currentPage, pageSize) {
      const { data: res } = await this.$http.get("helpQA/queryByPage", {
        params: {
          currentPage,
          pageSize,
        },
      });
      if (res.code !== 200) return;
      this.rows = res.data.list;
      this.total = res.data.total;
    },
    handleSizeChange(newVal) {
      this.pageSize = newVal;
      this.gethelpQAList(this.currentPage, this.pageSize);
    },
    handleCurrentChange(newVal) {
      this.currentPage = newVal;
      this.gethelpQAList(this.currentPage, this.pageSize);
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.gethelpQAList(this.currentPage, this.pageSize);
  },
};
</script>
<style scoped>
/*@import url(); 引入公共css类*/
</style>
