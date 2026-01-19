import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import store from './store'

// Element Plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// 開發環境防止 ResizeObserver loop
if (process.env.NODE_ENV === 'development') {
  const RO = window.ResizeObserver
  window.ResizeObserver = class extends RO {
    constructor(cb) {
      super((entries, observer) => {
        try {
          cb(entries, observer)
        } catch (err) {
          // 忽略 ResizeObserver loop 錯誤
        }
      })
    }
  }
}

const app = createApp(App)

// Element Plus
app.use(ElementPlus)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

// Router & Store
app.use(router)
app.use(store)

// Mount
app.mount('#app')
