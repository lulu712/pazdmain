
import { markRaw } from 'vue'

//定義、存儲狀態(菜單展開收起)
const state = {
  isCollapse: false,
  selectMenu: [],
  menuData: []
}

//修改狀態
const mutations = {
  collapseMenu(state) {
    //把 isCollapse 的布林值取反（true ↔ false）
    state.isCollapse = !state.isCollapse
  },
  addMenu(state, payload) {
    //須對數據進行去重複,加入新的選單項目,沒點過回傳-1然後添加
    //
    if (state.selectMenu.findIndex(item => item.path === payload.path) === -1) {
      state.selectMenu.push(payload)
    }
  },
  closeMenu(state, payload) {
    //1.找到點擊數據的索引
    const index = state.selectMenu.findIndex(val => val.name === payload.name)
    //2.通過索引刪除數組指定元素
    state.selectMenu.splice(index, 1)
  },


  dynamicMenu(state, payload) {
    const menuList = payload.data.data
    state.menuData = menuList

    // 後端 component → 實際檔案映射
    const componentMap = {
      'auth/admin': 'auth/admin/AdminIndex',
      'auth/group': 'auth/group/GroupIndex',
      'vppz/staff': 'vppz/staff/StaffIndex',
      'vppz/order': 'vppz/order/OrderIndex',
      'login': 'Login/LoginView',
      'mainPage': 'MainPage',
      'dashboard': 'dashboard/DashboardIndex'
    }

    const modules = require.context('../views', true, /\.vue$/)
    const available = modules.keys()
    console.log('Webpack 掃到的檔案清單 👉', available)

    // 遞歸處理路由註冊（扁平化註冊到 main 下）
    const bindRoutes = (list) => {
      list.forEach(item => {
        // 如果有 component，代表是實際頁面，需要註冊路由
        if (item.component) {
          console.log('🔍 正在處理選單項目:', item.meta?.name, '組件:', item.component)
          const compKey = componentMap[item.component.replace(/^\//, '')]
          const componentPath = `./${compKey}.vue`

          if (compKey && available.includes(componentPath)) {
            // 優先使用 meta.path，因為 treeMenu 也是跳轉到這個路徑
            const targetPath = (item.meta?.path || item.path || '').replace(/^\//, '')

            const route = {
              path: targetPath,
              name: item.name,
              meta: item.meta || {},
              component: markRaw(modules(componentPath).default)
            }

            // 直接添加到 main 路由下
            if (payload.router) {
              payload.router.addRoute('main', route)
            }
          }
        }

        // 遞歸處理子菜單
        if (item.children && item.children.length) {
          bindRoutes(item.children)
        }
      })
    }

    bindRoutes(menuList)
  }
}

export default {
  state,
  mutations,
}
