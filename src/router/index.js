import { createRouter, createWebHashHistory } from 'vue-router'

import Layout from '../views/MainPage.vue'
import Login from '../views/Login/LoginView.vue'
import store from '../store'
import { menuPermissions } from '../api'

const routes = [
    {
        path: '/',
        component: Layout,
        name: 'main',
        children: []
    },
    {
        path: '/Login',
        component: Login
    }
]



const router = createRouter({
    //路由數據
    routes,
    //路由匹配模式
    history: createWebHashHistory()
})
router.beforeEach(async (to) => {
    const token = localStorage.getItem('pz_token')

    // 沒登入，且不是去 login → 導回 login
    if (!token && to.path !== '/Login') return '/Login'

    // 已登入，但想去 login → 導回首頁
    if (token && to.path === '/Login') return '/dashboard'

    // 動態路由不可用時（如刷新頁面），重新獲取並添加路由
    if (token && store.state.menu.menuData.length === 0) {
        try {
            // 調用 API 獲取選單數據
            const data = await menuPermissions()
            // 提交 mutation 添加動態路由
            store.commit('dynamicMenu', { ...data, router })
            // 使用 replace: true 確保當前導航被替換為重定向
            return { ...to, replace: true }
        } catch (e) {
            console.error('動態路由加載失敗', e)
            localStorage.removeItem('pz_token')
            return '/Login'
        }
    }
})


export default router