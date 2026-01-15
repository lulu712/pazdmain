import { createRouter,createWebHashHistory } from 'vue-router'

import Layout from '../views/MainPage.vue'
import Login from '../views/Login/LoginView.vue'
import Admin from'../views/auth/admin/AdminIndex.vue'
import Group from'../views/auth/group/GroupIndex.vue'
import Order from '../views/vppz/order/OrderIndex.vue'
import Staff from '../views/vppz/staff/StaffIndex.vue'
import Dashboard from '../views/dashboard/DashboardIndex.vue'

const routes =[
    {
        path:'/',
        component:Layout,
        name:'main',
        children:[
            {
                path:'dashboard',
                meta:{id:'1',name:'控制台',icon:'Platform',path:'/dashboard',describe:'用於展示當前系統中統計數據、報表'},
                component:Dashboard
            },
            {
                path:'auth',
                meta:{id:'2',name:'權限管理',icon:'Grid'},
                children:[
                    {
                        path:'',
                        alias:['admin'],
                        meta:{id:'1',name:'帳號管理',icon:'Avatar',path:'/auth/admin',describe:'管理員可以進行編輯，權限修改需'},
                        component:Admin
                    },
                    {
                        path:'group',
                        meta:{id:'2',name:'菜單管理',icon:'Menu',path:'/auth/group',describe:'菜單規則通常對應一個控制器得方法'},
                        component:Group
                    }
                ]
            },
            {
                path:'vppz',
                meta:{id:'3',name:'LuLu陪診',icon:'BellFilled'},
                children:[
                    {
                       path:'order',
                       meta:{id:'1',name:'陪護管理',icon:'Checked',path:'/vppz/order',describe:'菜單管理'},
                       component:Order
                    },
                    {
                       path:'staff',
                       meta:{id:'2',name:'訂單管理',icon:'Tickets',path:'/vppz/staff',describe:'人員管理'},
                       component:Staff
                    }
                ]
            }
        ]
    },
    {
        path:'/login',
        component:Login
    }
]



const router = createRouter({
    //路由數據
    routes,
    //路由匹配模式
    history:createWebHashHistory()   
})
router.beforeEach((to) => {
  const token = localStorage.getItem('pz_token')

  // 沒登入，且不是去 login → 導回 login
  if (!token && to.path !== '/Login') return '/Login'

  // 已登入，但想去 login → 導回首頁
  if (token && to.path === '/Login') return '/dashboard'
})


export default router