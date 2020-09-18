// 医生模块路由配置
import UserList from '@/components/admin/userManager/UserList'
import AdminHome from '@/components/admin/common/AdminHome'
import AdminWelcome from '@/components/admin/common/Welcome'
import doctorList from '@/components/admin/doctorManager/doctorList.vue'
import departments from '@/components/admin/departmentsManager/departments'
import Welcome from '@/components/common/Welcome'

export default {
    path: '/adminHome',
    component: AdminHome,
    // redirect: '/welcome', 此方法子路由path需要使用绝对路径,会导致url没用层次感
    children: [
        {path: "/", redirect: "/welcome"},
        {
            path: '/welcome',
            component: AdminWelcome,
            meta: {
                requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
            },
        },
        {
            path: '/userList',
            component: UserList,
            meta: {
                requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
            },
        },{
            //医生管理
            path: '/doctorList',
            component: doctorList,
            meta: {
                requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
            },
        },
        {   //科室管理  
            path: '/depList',
            component: departments,
            meta: {
                requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
            },
        },
        
        {
            //数据监控
            path: '/dataMonitoring',
            component: Welcome,
            meta: {
                requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
            },
        },
        {
            //数据报表
            path: '/dataForms',
            component: Welcome,
            meta: {
                requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
            },
        }
    ]
}