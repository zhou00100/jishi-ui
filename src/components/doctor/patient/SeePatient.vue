<template>
    <div style="width: 100%;height: 100%">
        <el-card class="box-card">
            <el-input style="width: 400px" v-model="para.name" placeholder="请输入患者姓名" clearable @clear="queryByPageList">
                <el-button slot="append" icon="el-icon-search" type="success" @click="queryByPageList"></el-button>
            </el-input>
            <el-table border style="width: 100%" :data="patientList">
                <el-table-column label="姓名" prop="user.name"></el-table-column>
                <el-table-column label="性别" prop="user.gender"></el-table-column>
                <el-table-column label="年龄" prop="user.age"></el-table-column>
                <el-table-column label="电话" prop="user.phone"></el-table-column>
                <el-table-column label="挂号日期" prop="regDate"></el-table-column>
                <el-table-column label="挂号金额" prop="price"></el-table-column>
                <el-table-column label="支付方式" prop="payMode"></el-table-column>
            </el-table>
            <!--分页区域-->
            <el-pagination
                    align="center"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="para.currentPage"
                    :page-sizes="[2, 5, 8, 10]"
                    :page-size="para.pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="sum">
            </el-pagination>
        </el-card>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                para: {
                    name: '',//患者姓名
                    docId: '',//医生编号
                    //当前页数
                    currentPage: 1,
                    //显示多少数据
                    pageSize: 2
                },
                //记录总数
                sum: 0,
                //所有患者列表
                patientList: []
            }
        },
        created() {
            //取出医生的编号
            this.para.docId = sessionStorage.getItem('docId');
            this.queryByPageList();
        },
        methods: {
            //查询患者的信息
            async queryByPageList() {
                const data = new URLSearchParams();
                data.append('name', this.para.name); //患者姓名
                data.append('docId',  this.para.docId);//医生编号
                data.append('currentPage', this.para.currentPage);//页码
                data.append('pageSize', this.para.pageSize);//页大小
                const {data: res} = await this.$http.post('payLog/queryByPage', data);
                if (res.code !== 200) return this.$message.error('获取患者信息失败!');
                this.patientList = res.data.list
                console.log(this.patientList)
                this.sum = res.data.total
            },
            //监听pageSize 的事件处理函数
            handleSizeChange(pageSize) {
                this.para.pageSize = pageSize
                //重新获取数据
                this.queryByPageList()
            },
            //监听页码值改变的事件处理函数
            handleCurrentChange(currentPage) {
                this.para.currentPage = currentPage
                this.queryByPageList();
            }

        }
    }
</script>

<style scoped>

</style>