import request from'../utils/request'

//發送驗證碼
export const getCode = (data)=>{
    return request.post('/get/code',data)
}


//註冊用戶
export const userAuthentication =(data) =>{
     return request.post('/user/authentication',data)
}

//登錄頁面
export const login =(data) =>{
     return request.post('/login',data)
}


//權限管理列表
export const authAdmin =(params) =>{
     return request.get('/auth/admin',{params})
}

//菜單權限數據
export const userGetMenu =() =>{
     return request.get('/user/getmenu')
}

//菜單權限修改
export const userSetMenu =(data) =>{
     return request.post('/user/setmenu',data)

}
//菜單權限列表
export const menuList = (params) => {
  return request.get('/menu/list', { params })
}



