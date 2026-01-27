//定義、存儲狀態(菜單展開收起)
const state={
    isCollapse:false,
    selectMenu:[]
}

//修改狀態
const mutations={
    collapseMenu(state){
        //把 isCollapse 的布林值取反（true ↔ false）
        state.isCollapse=!state.isCollapse
    },
    addMenu(state,payload){
        //須對數據進行去重複,加入新的選單項目,沒點過回傳-1然後添加
        //
      if(state.selectMenu.findIndex(item => item.path === payload.path) === -1){
        state.selectMenu.push(payload)
      } 
    },
    closeMenu(state,payload){
        //1.找到點擊數據的索引
        const index = state.selectMenu.findIndex(val=>val.name === payload.name)
        //2.通過索引刪除數組指定元素
        state.selectMenu.splice(index,1)
    },


dynamicMenu(state, payload) {
  const menuList = payload.data.data

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

  const toRoute = menu => menu.map(item => {
    const route = { path: '/' + item.path, name: item.name, meta: item.meta || {} }

    if (item.component) {
      const compKey = componentMap[item.component.replace(/^\//, '')]
      if (!compKey) return console.error('❌ 後端 component 沒映射表：', item.component), route

      const componentPath = `./${compKey}.vue`
      if (available.includes(componentPath)) route.component = modules(componentPath).default
      else console.error('❌ 找不到元件：', componentPath)
    }

    if (item.children?.length) route.children = toRoute(item.children)
    return route
  })

  state.menuRoutes = toRoute(menuList)
  console.log('所有 route 👉', state.menuRoutes)
}



}

export default{
    state,
    mutations,
}
