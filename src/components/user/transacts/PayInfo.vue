<!--业务办理模块子路由——缴费信息模块-->
<template>
    <div>
        <!-- 面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: 'userHome' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>业务办理</el-breadcrumb-item>
            <el-breadcrumb-item>缴费信息</el-breadcrumb-item>
        </el-breadcrumb>


        <el-table :data="rows"  style="width: 100%">
            <el-table-column prop="outPayId" label="缴费编号" width="100"></el-table-column>
            <el-table-column prop="departments.name" label="所属科室"></el-table-column>
            <el-table-column prop="payMode" label="支付方式"></el-table-column>
            <el-table-column prop="payPrice" label="支付金额"></el-table-column>
            <el-table-column prop="user.name" label="缴费用户"></el-table-column>
            <el-table-column prop="tradeDate" label="缴费日期"></el-table-column>
        </el-table>

        <!--分页数据-->
        <div class="page">
            <!--分页区域-->
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[2, 5, 8, 10]"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                //查询参数
                //当前页码
                currentPage: 1,
                //每页显示条数
                pageSize: 5,
                // 总数
                total:0,
                //挂号记录列表
                rows:[],
                inputContent:'',
            }

        },

        methods:{
           //缴费信息的全部查询
            async show(currentPage, pageSize){
                const useid=sessionStorage.getItem('useId');
                const data= new URLSearchParams();
                data.append("currentPage",this.currentPage)
                data.append("pageSize",this.pageSize)
                data.append("useId",useid)
                //获取请求地址/params:请求的参数
                const { data: res } = await this.$http.post('outpatientPayLog/queryByPage', data)
                // 状态码不为200获取数据失败
                if (res.code !=200){
                    return this.$message.error('获取列表数据失败')
                }
                // 为200获取数据成功
                console.log(res)
                this.total=res.data.total
                this.rows=res.data.list
            },

            //pagesize发生变化
            handleSizeChange(newSize){
                this.pageSize=newSize
                this.show(this.currentPage, this.pageSize)
            },
            //页码值发生变化
            handleCurrentChange(newPage){
                this.currentPage=newPage
                this.show(this.currentPage, this.pageSize)
            }

        },

        mounted() {
            this.show(this.currentPage,this.pageSize);
        },
    }


</script>

<style>

</style>
