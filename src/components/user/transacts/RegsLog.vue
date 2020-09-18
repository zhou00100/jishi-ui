<!--业务办理模块子路由——挂号记录模块-->
<template>
    <div>
        <!--面包屑导航-->
        <!-- 面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: 'userHome' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>业务办理</el-breadcrumb-item>
            <el-breadcrumb-item>挂号记录</el-breadcrumb-item>
        </el-breadcrumb>

        <!--搜索框-->
        <el-row>
            <el-col :span="5">
                <!--<el-input placeholder="输入您的挂号医生" size="mini" v-model="query"></el-input>-->
                <el-date-picker
                        clearable
                        @clear="getPayLogList"
                        v-model="query"
                        type="date"
                        size="mini"
                        placeholder="选择日期">
                </el-date-picker>
            </el-col>
            <el-button type="" icon="el-icon-search" size="mini" @click="getPayLogList">搜索</el-button>
        </el-row>

        <el-table :data="rows">
            <el-table-column prop="payId" label="记录编号" width="100"></el-table-column>
            <el-table-column prop="doctor.name" label="挂号医生"></el-table-column>
            <el-table-column prop="price" label="挂号金额"></el-table-column>
            <el-table-column prop="payMode" label="支付方式"></el-table-column>
            <el-table-column prop="user.name" label="挂号人"></el-table-column>
            <el-table-column prop="departments.name" label="科室"></el-table-column>
            <el-table-column prop="regDate" label="挂号日期" :formatter="formatDate" sortable></el-table-column>
        </el-table>

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
</template>
<script>
    //引入date.js文件
    import {formatDate} from './date'
    export default {
        filter:{
            filters: {
                formatDate(regDate) {
                    var date = new Date(regDate);
                    return formatdate(date, 'yyyy-MM-dd');  // 根据自己的需要自定义想要的日期格式
                }
            }
        },
        data(){
            return{
                //查询搜索参数
                query:'',
                //当前页码
                currentPage: 1,
                //每页显示条数
                pageSize: 5,
                // 总数
                total:0,
                //挂号记录列表
                rows:[],

            }
        },
        //事件处理函数
        methods:{

           async getPayLogList(currentPage, pageSize){
                //获取请求地址/params:请求的参数
               const useid=sessionStorage.getItem('useId');
               const data= new URLSearchParams();
               data.append("currentPage",this.currentPage)
               data.append("pageSize",this.pageSize)
               data.append("regDate",this.query)
               data.append("useId",useid)
               const { data: res } = await this.$http.post('payLog/queryByPage',data)
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
                this.getPayLogList(this.currentPage, this.pageSize)
            },
            //页码值发生变化
            handleCurrentChange(newPage){
               this.currentPage=newPage
                this.getPayLogList(this.currentPage, this.pageSize)
            }
        } ,
        // 生命周期函数
        created() {
            //获取挂号记录列表
            this.getPayLogList(this.currentPage, this.pageSize)

        }
    }

</script>
<style>

</style>
