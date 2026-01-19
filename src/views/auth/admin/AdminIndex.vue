<template>
<div>Admine</div>
<el-table :data="tableData" style="width: 100%; margin-top: 16px">
    <el-table-column prop="id" label="ID" />
    <el-table-column prop="name" label="名稱" />
    <el-table-column label="操作">
      <template #default="scope">
        <el-button size="small" @click="open(scope.row)">編輯</el-button>
      </template>
    </el-table-column>
</el-table>





</template>

<script setup>
import { authAdmin } from '@/api';
import { reactive,onMounted } from 'vue';

const paginationData = reactive({
    pageNum:1,
    pageSize:10
})
onMounted(()=>{
    authAdmin(paginationData).then((data)=>{
        console.log(data,'authAdmin')
    })
})

</script>
<style lang="less" scoped></style>