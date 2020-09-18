import Vue from 'vue'
import VueRouter from 'vue-router'
import Welcome from '@/components/common/Welcome'
import AdminLogin from '@/components/admin/common/AdminLogin'
import UserLogin from '@/components/user/common/UserLogin'
import DoctorLogin from "@/components/doctor/common/DoctorLogin"
// 导入外部路由
import doctor from '@/router/doctor.js'
import user from '@/router/user.js'
import admin from '@/router/admin.js'


Vue.use(VueRouter)

// 公共的路由规则
const routes = [
    {
        path: '/',
        name: 'Welcome',
        component: Welcome
        
    },
    {
        path: '/adminLogin',
        name: 'AdminLogin',
        component: AdminLogin
    },
    {
        path:'/userLogin',
        name:'UserLogin',
        component:UserLogin,
    },
    {
        path: '/doctorLogin',
        name: 'DoctorLogin',
        component: DoctorLogin
    },
    doctor,
    admin,
    user
    
]





const router = new VueRouter({
    routes
})

export default router
