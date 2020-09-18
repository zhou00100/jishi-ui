// 医生模块路由配置
import DoctorHome from "@/components/doctor/common/DoctorHome"
import SeePatient from "@/components/doctor/patient/SeePatient"
import PreManager from "@/components/doctor/prescription/PreManager"
import DoctorWelcome from "@/components/doctor/common/DoctorWelcome"
import doctorInfo from "@/components/doctor/message/DoctorInfo"

export default {
    path: '/doctorHome',
    component: DoctorHome,
    redirect: '/doctorWelcome',
    children: [
        {
            path: '/doctorWelcome',
            component: DoctorWelcome,
            meta: {
                requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
            }
        },
        
        {
            path: '/seePatient',
            component: SeePatient,
            meta: {
                requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
            },
        },
        {
            path: '/preManager',
            component: PreManager,
            meta: {
                requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
            },
        },
        {
            path: '/doctorInfo',
            component: doctorInfo,
            meta: {
                requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
            },
        },
    ]
}