<template>
<div>Admine</div>
<el-table :data="tableData.list" style="width: 100%; margin-top: 16px">
    <el-table-column prop="id" label="ID" />
    <el-table-column prop="name" label="名稱" />
    <el-table-column prop="permissions_id" label="所屬組別">
        <template #default="scope">
            {{permissionName (scope.row.permissions_id)}}
        </template>
    </el-table-column>
    <el-table-column prop="mobile" label="手機號碼" />

    <el-table-column prop="active" label="狀態">
        <template #default="scope">
           <el-tag :type="scope.row.active ? 'success' : 'danger' ">{{ scope.row.active ? '正常' : '失效'}}</el-tag>
        </template>
    </el-table-column>
    
    <el-table-column label="創建時間">
        <template #default="scope">
            <div class="flex-box">
                <el-icon> <Clock/></el-icon>
                <span style="margin-left:10px">{{ scope.row.create_time }}</span>
            </div>
        </template>
    </el-table-column>

    <el-table-column label="操作">
      <template #default="scope">
        <el-button size="small" @click="open(scope.row)">編輯</el-button>
      </template>
    </el-table-column>
</el-table>
</template>

<script setup>
import { authAdmin,menuSelectList } from '@/api';
import {ref,reactive,onMounted } from 'vue';
import dayjs from 'dayjs';

//Vue會自動更新畫面（分頁參數：第幾頁,幾筆資料）
const paginationData = reactive({
    pageNum:1,
    pageSize:10
})

//列表數據
    const tableData=reactive({
      list:[],
      total:0
    })

onMounted(()=>{
    authAdmin(paginationData).then((data)=>{
        console.log(data,'authAdmin')
         console.log('API 原始回傳:', data)
        console.log('原始 list:', data.data.data?.list)
        //API 回傳有資料 → 用回傳的 list,PI 回傳沒有資料 → 用空陣列 []，避免後面 .forEach 爆炸
        //因爲list的層級很深，來確保不會回傳undefined導致錯誤
        const list = data.data.data?.list || []
        const total = data.data.data?.total || 0
        console.log('tableData.list:', tableData.list)
        list.forEach(item=>{
            item.create_time = dayjs(item.create_time).format('YYYY-MM-DD')
        })
        tableData.list=list
        tableData.total=total
  

    })
    menuSelectList().then(({data})=>{
        options.value=data.data
        console.log('權限清單', options.value)
    })
})
//創建一個ref來存儲權限清單
const options=ref([])
//根據權限id匹配權限名稱
const permissionName=(id)=>{
   const data = options.value.find(el=> el.id === id)
    return data ? data.name:'超級管理員'


}

const open=()=>{
}

</script>
<style lang="less" scoped>
    .flex-box{
        display: flex;
        align-items:center ;
    }


</style>