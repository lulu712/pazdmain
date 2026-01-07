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
    }

}

export default{
    state,
    mutations,
}
