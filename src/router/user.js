// 用户模块路由配置
import UserHome from '@/components/user/common/UserHome'
import UserWelcome from '@/components/user/common/UserWelcome'
import PayInfo from '@/components/user/transacts/PayInfo'
import Registration from '@/components/user/transacts/Registration'
import RegsLog from '@/components/user/transacts/RegsLog'
import Introduce from '@/components/user/introduce/Introduce'
import Issue from '@/components/user/issue/Issue'
import Transacts from '@/components/user/transacts/Transacts'
import UserInfo from '@/components/user/message/UserInfo'
import UserList from '@//components/user/userManager/UserList'
import UserRegister from '@//components/user/common/UserRegister'
export default{
    
        path: '/userHome',
        component: UserHome,
        redirect: '/userWelcome',
        children: [
        {
            path: '/userWelcome',
            component: UserWelcome,
            meta: {
                requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
            },
        },
        {
            path: '/userInfo',
            component: UserInfo,
            meta: {
                requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
            },
        },
        {
            path: '/payInfo',
            component: PayInfo,
            meta: {
                requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
            },
        },
        {
            path: '/registration',
            component: Registration,
            meta: {
                requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
            },
        },
        {
            path: '/regsLog',
            component: RegsLog,
            meta: {
                requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
            },
        },
        {
            path: '/introduce',
            component: Introduce,
            meta: {
                requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
            },
        },
        {
            path: '/issue',
            component: Issue,
            meta: {
                requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
            },
        },
        {
            path: '/transacts',
            component: Transacts,
            meta: {
                requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
            },
        },
        {
            path: '/userList',
            component: UserList,
            meta: {
                requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
            }
        },
        {
            path:'/userRegister',
            component:UserRegister,
            meta:{
                requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
            }
        }
        
    ]
        
}