import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
//引入vuex
import store from './store'

// router.beforeEach((to) => {
//   const token = localStorage.getItem('pz_token')

//   // 未登入，且不是登入頁 → 跳登入
//   if (!token && to.path !== '/login') {
//     return '/login'
//   }
//   // 已登入，還想進登入頁 → 回首頁
//   if (token && to.path === '/login') {
//     return '/'
//   }
//   // 其他情況放行
//   return true
// })


// Element Plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'


import * as ElementPlusIconsVue from '@element-plus/icons-vue'


const app=createApp(App)
app.use(ElementPlus)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

//路由掛載
app.use(router)
//store掛載
app.use(store)
app.mount('#app')

